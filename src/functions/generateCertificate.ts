import { document} from '../utils/dynamodbClient'
const chromium = require('chrome-aws-lambda');
import path from 'path'
import fs from 'fs'
import handlebars from 'handlebars';
import * as dayjs from 'dayjs';
import { S3 } from 'aws-sdk'

interface ICreateCertificate {
    id: string;
    name: string;
    grade: string;
}

interface ITemplate {
    id: string;
    name: string;
    grade: string;
    date: string;
    medal: string;
}

const compile = async function(data: ITemplate) {
    const filePath = path.join(process.cwd(), "src", "templates", "certificates.hbs")
    const html = fs.readFileSync(filePath, 'utf-8')
    
    return handlebars.compile(html)(data);
}


export const handle = async (event) => {
   //id, name, grade
   const { id, name , grade} = JSON.parse(event.body) as ICreateCertificate

    const response = await document.query({
        TableName: 'users_certificates',
        KeyConditionExpression: 'id = :id',
        ExpressionAttributeValues: {
            ":id": id
        }
    }).promise()

    const userAlreadyExists = response.Items[0]

    if(!userAlreadyExists) {    
           await document.put({
               TableName: 'users_certificates',
               Item: {
                   id, name, grade
               }
           }).promise()
    }

   const medalPath = path.join(process.cwd(), "src", 'templates', 'selo.png')
   const medal = fs.readFileSync(medalPath, 'base64')

   const data: ITemplate = {
       date: dayjs().format("DD/MM/YYYY"),
       grade,
       name,
       id,
       medal
   }

   // gera o certificado, compilar usando handlebars, transformar em pdf e salvar no s3

   const content = await compile(data)

   const browser = await chromium.puppeteer.launch({
       ignoreDefaultArgs: ['--disable-extensions'],
       headless: true,
       args: chromium.args,
       defaultViewport: chromium.defaultViewReport,
       executablePath: await chromium.executablePath,
   })

   const page= await browser.newPage();

   await page.setContent(content)

   const pdf = await page.pdf({
       format: 'a4',
       landscape: true,
       path: process.env.IS_OFFLINE ? "certificate.pdf" : null,
       printBackground: true,
       preferCSSPageSize: true
   })

   await browser.close();

   //Save on S3
   const s3 = new S3();

   await s3.putObject({
       Bucket: 'serverlesscertificatesignite12',
       Key: `${id}.pdf`,
       ACL: 'public-read',
       Body: pdf,
       ContentType: 'application/pdf'
   }).promise()

   return {
       statusCode: 201,
       body: JSON.stringify({
           message: 'Certificate created!',
           url: `https://serverlesscertificatesignite12.s3.sa-east-1.amazonaws.com/${id}.pdf`
       }),
       headers: {
           'Content-type': 'application/json',
       }
   }
}