/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/functions/generateCertificate.ts":
/*!**********************************************!*\
  !*** ./src/functions/generateCertificate.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"handle\": () => (/* binding */ handle)\n/* harmony export */ });\n/* harmony import */ var _utils_dynamodbClient__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/dynamodbClient */ \"./src/utils/dynamodbClient.ts\");\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! path */ \"path\");\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! fs */ \"fs\");\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var handlebars__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! handlebars */ \"handlebars\");\n/* harmony import */ var handlebars__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(handlebars__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! dayjs */ \"dayjs\");\n/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(dayjs__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var aws_sdk__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! aws-sdk */ \"aws-sdk\");\n/* harmony import */ var aws_sdk__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(aws_sdk__WEBPACK_IMPORTED_MODULE_5__);\n\r\nconst chromium = __webpack_require__(/*! chrome-aws-lambda */ \"chrome-aws-lambda\");\r\n\r\n\r\n\r\n\r\n\r\nconst compile = async function (data) {\r\n    const filePath = path__WEBPACK_IMPORTED_MODULE_1___default().join(process.cwd(), \"src\", \"templates\", \"certificates.hbs\");\r\n    const html = fs__WEBPACK_IMPORTED_MODULE_2___default().readFileSync(filePath, 'utf-8');\r\n    return handlebars__WEBPACK_IMPORTED_MODULE_3___default().compile(html)(data);\r\n};\r\nconst handle = async (event) => {\r\n    const { id, name, grade } = JSON.parse(event.body);\r\n    const response = await _utils_dynamodbClient__WEBPACK_IMPORTED_MODULE_0__.document.query({\r\n        TableName: 'users_certificates',\r\n        KeyConditionExpression: 'id = :id',\r\n        ExpressionAttributeValues: {\r\n            \":id\": id\r\n        }\r\n    }).promise();\r\n    const userAlreadyExists = response.Items[0];\r\n    if (!userAlreadyExists) {\r\n        await _utils_dynamodbClient__WEBPACK_IMPORTED_MODULE_0__.document.put({\r\n            TableName: 'users_certificates',\r\n            Item: {\r\n                id, name, grade\r\n            }\r\n        }).promise();\r\n    }\r\n    const medalPath = path__WEBPACK_IMPORTED_MODULE_1___default().join(process.cwd(), \"src\", 'templates', 'selo.png');\r\n    const medal = fs__WEBPACK_IMPORTED_MODULE_2___default().readFileSync(medalPath, 'base64');\r\n    const data = {\r\n        date: dayjs__WEBPACK_IMPORTED_MODULE_4__().format(\"DD/MM/YYYY\"),\r\n        grade,\r\n        name,\r\n        id,\r\n        medal\r\n    };\r\n    const content = await compile(data);\r\n    const browser = await chromium.puppeteer.launch({\r\n        headless: true,\r\n        args: chromium.args,\r\n        defaultViewport: chromium.defaultViewReport,\r\n        executablePath: await chromium.executablePath,\r\n    });\r\n    const page = await browser.newPage();\r\n    await page.setContent(content);\r\n    const pdf = await page.pdf({\r\n        format: 'a4',\r\n        landscape: true,\r\n        path: process.env.IS_OFFLINE ? \"certificate.pdf\" : null,\r\n        printBackground: true,\r\n        preferCSSPageSize: true\r\n    });\r\n    await browser.close();\r\n    const s3 = new aws_sdk__WEBPACK_IMPORTED_MODULE_5__.S3();\r\n    await s3.putObject({\r\n        Bucket: 'serverlesscertificatesignite12',\r\n        Key: `${id}.pdf`,\r\n        ACL: 'public-read',\r\n        Body: pdf,\r\n        ContentType: 'application/pdf'\r\n    }).promise();\r\n    return {\r\n        statusCode: 201,\r\n        body: JSON.stringify({\r\n            message: 'Certificate created!',\r\n            url: `https://serverlesscertificatesignite12.s3.sa-east-1.amazonaws.com/${id}.pdf`\r\n        }),\r\n        headers: {\r\n            'Content-type': 'application/json',\r\n        }\r\n    };\r\n};\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvZnVuY3Rpb25zL2dlbmVyYXRlQ2VydGlmaWNhdGUudHMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFnQkE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUdBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUlBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFHQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2lnbml0ZWNlcnRpZmljYXRlLy4vc3JjL2Z1bmN0aW9ucy9nZW5lcmF0ZUNlcnRpZmljYXRlLnRzP2E1YWUiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZG9jdW1lbnR9IGZyb20gJy4uL3V0aWxzL2R5bmFtb2RiQ2xpZW50J1xuY29uc3QgY2hyb21pdW0gPSByZXF1aXJlKCdjaHJvbWUtYXdzLWxhbWJkYScpO1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCdcbmltcG9ydCBmcyBmcm9tICdmcydcbmltcG9ydCBoYW5kbGViYXJzIGZyb20gJ2hhbmRsZWJhcnMnO1xuaW1wb3J0ICogYXMgZGF5anMgZnJvbSAnZGF5anMnO1xuaW1wb3J0IHsgUzMgfSBmcm9tICdhd3Mtc2RrJ1xuXG5pbnRlcmZhY2UgSUNyZWF0ZUNlcnRpZmljYXRlIHtcbiAgICBpZDogc3RyaW5nO1xuICAgIG5hbWU6IHN0cmluZztcbiAgICBncmFkZTogc3RyaW5nO1xufVxuXG5pbnRlcmZhY2UgSVRlbXBsYXRlIHtcbiAgICBpZDogc3RyaW5nO1xuICAgIG5hbWU6IHN0cmluZztcbiAgICBncmFkZTogc3RyaW5nO1xuICAgIGRhdGU6IHN0cmluZztcbiAgICBtZWRhbDogc3RyaW5nO1xufVxuXG5jb25zdCBjb21waWxlID0gYXN5bmMgZnVuY3Rpb24oZGF0YTogSVRlbXBsYXRlKSB7XG4gICAgY29uc3QgZmlsZVBhdGggPSBwYXRoLmpvaW4ocHJvY2Vzcy5jd2QoKSwgXCJzcmNcIiwgXCJ0ZW1wbGF0ZXNcIiwgXCJjZXJ0aWZpY2F0ZXMuaGJzXCIpXG4gICAgY29uc3QgaHRtbCA9IGZzLnJlYWRGaWxlU3luYyhmaWxlUGF0aCwgJ3V0Zi04JylcbiAgICBcbiAgICByZXR1cm4gaGFuZGxlYmFycy5jb21waWxlKGh0bWwpKGRhdGEpO1xufVxuXG5cbmV4cG9ydCBjb25zdCBoYW5kbGUgPSBhc3luYyAoZXZlbnQpID0+IHtcbiAgIC8vaWQsIG5hbWUsIGdyYWRlXG4gICBjb25zdCB7IGlkLCBuYW1lICwgZ3JhZGV9ID0gSlNPTi5wYXJzZShldmVudC5ib2R5KSBhcyBJQ3JlYXRlQ2VydGlmaWNhdGVcblxuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZG9jdW1lbnQucXVlcnkoe1xuICAgICAgICBUYWJsZU5hbWU6ICd1c2Vyc19jZXJ0aWZpY2F0ZXMnLFxuICAgICAgICBLZXlDb25kaXRpb25FeHByZXNzaW9uOiAnaWQgPSA6aWQnLFxuICAgICAgICBFeHByZXNzaW9uQXR0cmlidXRlVmFsdWVzOiB7XG4gICAgICAgICAgICBcIjppZFwiOiBpZFxuICAgICAgICB9XG4gICAgfSkucHJvbWlzZSgpXG5cbiAgICBjb25zdCB1c2VyQWxyZWFkeUV4aXN0cyA9IHJlc3BvbnNlLkl0ZW1zWzBdXG5cbiAgICBpZighdXNlckFscmVhZHlFeGlzdHMpIHsgICAgXG4gICAgICAgICAgIGF3YWl0IGRvY3VtZW50LnB1dCh7XG4gICAgICAgICAgICAgICBUYWJsZU5hbWU6ICd1c2Vyc19jZXJ0aWZpY2F0ZXMnLFxuICAgICAgICAgICAgICAgSXRlbToge1xuICAgICAgICAgICAgICAgICAgIGlkLCBuYW1lLCBncmFkZVxuICAgICAgICAgICAgICAgfVxuICAgICAgICAgICB9KS5wcm9taXNlKClcbiAgICB9XG5cbiAgIGNvbnN0IG1lZGFsUGF0aCA9IHBhdGguam9pbihwcm9jZXNzLmN3ZCgpLCBcInNyY1wiLCAndGVtcGxhdGVzJywgJ3NlbG8ucG5nJylcbiAgIGNvbnN0IG1lZGFsID0gZnMucmVhZEZpbGVTeW5jKG1lZGFsUGF0aCwgJ2Jhc2U2NCcpXG5cbiAgIGNvbnN0IGRhdGE6IElUZW1wbGF0ZSA9IHtcbiAgICAgICBkYXRlOiBkYXlqcygpLmZvcm1hdChcIkREL01NL1lZWVlcIiksXG4gICAgICAgZ3JhZGUsXG4gICAgICAgbmFtZSxcbiAgICAgICBpZCxcbiAgICAgICBtZWRhbFxuICAgfVxuXG4gICAvLyBnZXJhIG8gY2VydGlmaWNhZG8sIGNvbXBpbGFyIHVzYW5kbyBoYW5kbGViYXJzLCB0cmFuc2Zvcm1hciBlbSBwZGYgZSBzYWx2YXIgbm8gczNcblxuICAgY29uc3QgY29udGVudCA9IGF3YWl0IGNvbXBpbGUoZGF0YSlcblxuICAgY29uc3QgYnJvd3NlciA9IGF3YWl0IGNocm9taXVtLnB1cHBldGVlci5sYXVuY2goe1xuICAgICAgIGhlYWRsZXNzOiB0cnVlLFxuICAgICAgIGFyZ3M6IGNocm9taXVtLmFyZ3MsXG4gICAgICAgZGVmYXVsdFZpZXdwb3J0OiBjaHJvbWl1bS5kZWZhdWx0Vmlld1JlcG9ydCxcbiAgICAgICBleGVjdXRhYmxlUGF0aDogYXdhaXQgY2hyb21pdW0uZXhlY3V0YWJsZVBhdGgsXG4gICB9KVxuXG4gICBjb25zdCBwYWdlPSBhd2FpdCBicm93c2VyLm5ld1BhZ2UoKTtcblxuICAgYXdhaXQgcGFnZS5zZXRDb250ZW50KGNvbnRlbnQpXG5cbiAgIGNvbnN0IHBkZiA9IGF3YWl0IHBhZ2UucGRmKHtcbiAgICAgICBmb3JtYXQ6ICdhNCcsXG4gICAgICAgbGFuZHNjYXBlOiB0cnVlLFxuICAgICAgIHBhdGg6IHByb2Nlc3MuZW52LklTX09GRkxJTkUgPyBcImNlcnRpZmljYXRlLnBkZlwiIDogbnVsbCxcbiAgICAgICBwcmludEJhY2tncm91bmQ6IHRydWUsXG4gICAgICAgcHJlZmVyQ1NTUGFnZVNpemU6IHRydWVcbiAgIH0pXG5cbiAgIGF3YWl0IGJyb3dzZXIuY2xvc2UoKTtcblxuICAgLy9TYXZlIG9uIFMzXG4gICBjb25zdCBzMyA9IG5ldyBTMygpO1xuXG4gICBhd2FpdCBzMy5wdXRPYmplY3Qoe1xuICAgICAgIEJ1Y2tldDogJ3NlcnZlcmxlc3NjZXJ0aWZpY2F0ZXNpZ25pdGUxMicsXG4gICAgICAgS2V5OiBgJHtpZH0ucGRmYCxcbiAgICAgICBBQ0w6ICdwdWJsaWMtcmVhZCcsXG4gICAgICAgQm9keTogcGRmLFxuICAgICAgIENvbnRlbnRUeXBlOiAnYXBwbGljYXRpb24vcGRmJ1xuICAgfSkucHJvbWlzZSgpXG5cbiAgIHJldHVybiB7XG4gICAgICAgc3RhdHVzQ29kZTogMjAxLFxuICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICAgbWVzc2FnZTogJ0NlcnRpZmljYXRlIGNyZWF0ZWQhJyxcbiAgICAgICAgICAgdXJsOiBgaHR0cHM6Ly9zZXJ2ZXJsZXNzY2VydGlmaWNhdGVzaWduaXRlMTIuczMuc2EtZWFzdC0xLmFtYXpvbmF3cy5jb20vJHtpZH0ucGRmYFxuICAgICAgIH0pLFxuICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgJ0NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICB9XG4gICB9XG59Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/functions/generateCertificate.ts\n");

/***/ }),

/***/ "./src/utils/dynamodbClient.ts":
/*!*************************************!*\
  !*** ./src/utils/dynamodbClient.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"document\": () => (/* binding */ document)\n/* harmony export */ });\n/* harmony import */ var aws_sdk__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! aws-sdk */ \"aws-sdk\");\n/* harmony import */ var aws_sdk__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(aws_sdk__WEBPACK_IMPORTED_MODULE_0__);\n\r\nconst options = {\r\n    region: \"localhost\",\r\n    endpoint: \"http://localhost:8000\"\r\n};\r\nconst isOffline = () => {\r\n    return process.env.IS_OFFLINE;\r\n};\r\nconst document = isOffline()\r\n    ? new aws_sdk__WEBPACK_IMPORTED_MODULE_0__.DynamoDB.DocumentClient(options)\r\n    : new aws_sdk__WEBPACK_IMPORTED_MODULE_0__.DynamoDB.DocumentClient();\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvdXRpbHMvZHluYW1vZGJDbGllbnQudHMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2lnbml0ZWNlcnRpZmljYXRlLy4vc3JjL3V0aWxzL2R5bmFtb2RiQ2xpZW50LnRzPzQ1MTMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtEeW5hbW9EQn0gZnJvbSAnYXdzLXNkaydcclxuXHJcblxyXG5jb25zdCBvcHRpb25zID0ge1xyXG4gICAgcmVnaW9uOiBcImxvY2FsaG9zdFwiLFxyXG4gICAgZW5kcG9pbnQ6IFwiaHR0cDovL2xvY2FsaG9zdDo4MDAwXCJcclxufVxyXG5cclxuY29uc3QgaXNPZmZsaW5lID0gKCkgPT4ge1xyXG4gICAgcmV0dXJuIHByb2Nlc3MuZW52LklTX09GRkxJTkU7XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgZG9jdW1lbnQgPSBpc09mZmxpbmUoKSBcclxuICAgID8gbmV3IER5bmFtb0RCLkRvY3VtZW50Q2xpZW50KG9wdGlvbnMpIFxyXG4gICAgOiBuZXcgRHluYW1vREIuRG9jdW1lbnRDbGllbnQoKSJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/utils/dynamodbClient.ts\n");

/***/ }),

/***/ "aws-sdk":
/*!**************************!*\
  !*** external "aws-sdk" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("aws-sdk");

/***/ }),

/***/ "chrome-aws-lambda":
/*!************************************!*\
  !*** external "chrome-aws-lambda" ***!
  \************************************/
/***/ ((module) => {

module.exports = require("chrome-aws-lambda");

/***/ }),

/***/ "dayjs":
/*!************************!*\
  !*** external "dayjs" ***!
  \************************/
/***/ ((module) => {

module.exports = require("dayjs");

/***/ }),

/***/ "handlebars":
/*!*****************************!*\
  !*** external "handlebars" ***!
  \*****************************/
/***/ ((module) => {

module.exports = require("handlebars");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

module.exports = require("fs");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("path");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval-source-map devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/functions/generateCertificate.ts");
/******/ 	var __webpack_export_target__ = exports;
/******/ 	for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
/******/ 	if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ 	
/******/ })()
;