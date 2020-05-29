/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./js/projects.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./js/components/HeaderComponent.js":
/*!******************************************!*\
  !*** ./js/components/HeaderComponent.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return HeaderComponent; });\n// HEADER\r\n\r\n/**\r\n * This function Display table Header from TableHeader Model\r\n * @param {Element} target target parent element\r\n * @param {any} header JSON from TableModel\r\n */\r\nfunction HeaderComponent(header, target) {\r\n    let weeksTr = document.createElement(\"tr\");\r\n    let datesTr = document.createElement(\"tr\");\r\n\r\n    weeksTr.append(document.createElement(\"td\"))\r\n    datesTr.append(document.createElement(\"td\"))\r\n    for (let i = 0; i < header.weeks.length; i++) {\r\n        let td = document.createElement(\"td\");\r\n        td.innerHTML = `${header.weeks[i]} (${header.workingHours[i]})`\r\n        weeksTr.append(td)\r\n    }    \r\n    for (let i = 0; i < header.weeks.length; i++) {\r\n        let td = document.createElement(\"td\");\r\n        td.innerHTML = header.dates[i]\r\n        datesTr.append(td)\r\n    } \r\n    target.append(weeksTr);\r\n    target.append(datesTr);\r\n}\r\n\n\n//# sourceURL=webpack:///./js/components/HeaderComponent.js?");

/***/ }),

/***/ "./js/components/ProjectsComponent.js":
/*!********************************************!*\
  !*** ./js/components/ProjectsComponent.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return ProjectsComponent; });\n/**\r\n * This function genereate Project Overview\r\n * @param {any} header JSON from TableModel\r\n * @param {Array} list - left list of names\r\n * @param {JSON} values - values JSON\r\n * @param {Element} target - target element\r\n */\r\nfunction ProjectsComponent(header, list, values, target) {\r\n    for (let j = 0; j < list.length; j++) {\r\n        let tr = document.createElement(\"tr\");\r\n        let nameTd = document.createElement(\"td\");\r\n        nameTd.innerHTML = `<button data-cid='${list[j].cid}' type='button' class='btn btn-link text-left'>${list[j].fullName}</button>`\r\n        nameTd.classList.add(\"item-for-search\")\r\n        tr.append(nameTd)\r\n        for (let i = 0; i < header.weeks.length; i++) {\r\n            let td = document.createElement(\"td\");\r\n            let week = parseInt(header.weeks[i])\r\n            td.innerHTML = values[list[j].cid][week]\r\n            td.classList.add(\"text-center\")\r\n            tr.append(td)\r\n        }\r\n        target.append(tr)\r\n    }\r\n\r\n    // DOM Queries\r\n    const nameBtns = document.querySelectorAll(\".item-for-search\")\r\n\r\n    // Event Listeners\r\n    nameBtns.forEach((button) => {\r\n        button.addEventListener(\"click\", (e) => {\r\n            let cid = e.srcElement.dataset.cid\r\n            let y_start = header.dateRange.year_start\r\n            let y_end = header.dateRange.year_end\r\n            let w_start = header.dateRange.week_start\r\n            let w_end = header.dateRange.week_end\r\n            let url = `project_edit/${cid}?year_start=${y_start}&year_end=${y_end}&week_start=${w_start}&week_end=${w_end}`\r\n            window.location = url\r\n        })\r\n    })    \r\n}\n\n//# sourceURL=webpack:///./js/components/ProjectsComponent.js?");

/***/ }),

/***/ "./js/projects.js":
/*!************************!*\
  !*** ./js/projects.js ***!
  \************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _tools_tableFunctions_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tools/tableFunctions.js */ \"./js/tools/tableFunctions.js\");\n/* harmony import */ var _components_ProjectsComponent_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/ProjectsComponent.js */ \"./js/components/ProjectsComponent.js\");\n/* harmony import */ var _components_HeaderComponent_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/HeaderComponent.js */ \"./js/components/HeaderComponent.js\");\n\r\n\r\n\r\n\r\n\r\n// Data Parsers\r\nlet header = JSON.parse(document.querySelector(\"#dataholder\").dataset.header);\r\nlet tableModel = JSON.parse(document.querySelector(\"#dataholder\").dataset.projecttablemodel);\r\n\r\n\r\n// def variables\r\nlet projectList = tableModel.projectList\r\nlet values = tableModel.values\r\n\r\n\r\n// DOM queries\r\nconst theader = document.querySelector(\"#header\");\r\nconst tbody = document.querySelector(\"#body\")\r\n\r\n// generators\r\nObject(_components_HeaderComponent_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(header, theader)\r\nObject(_components_ProjectsComponent_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(header, projectList, values, tbody)\r\n\r\n// DOM queries\r\nconst searchInput = document.querySelector(\"#search\");\r\n\r\n\r\n// Event listeners\r\nsearchInput.addEventListener(\"keyup\", () => {   \r\n    Object(_tools_tableFunctions_js__WEBPACK_IMPORTED_MODULE_0__[\"tableSearch\"])()\r\n});\r\n\r\n\n\n//# sourceURL=webpack:///./js/projects.js?");

/***/ }),

/***/ "./js/tools/tableFunctions.js":
/*!************************************!*\
  !*** ./js/tools/tableFunctions.js ***!
  \************************************/
/*! exports provided: toMatrix, computeSum, sumOfAll, removeSelected, saveChanges, tableSearch */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"toMatrix\", function() { return toMatrix; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"computeSum\", function() { return computeSum; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"sumOfAll\", function() { return sumOfAll; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"removeSelected\", function() { return removeSelected; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"saveChanges\", function() { return saveChanges; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"tableSearch\", function() { return tableSearch; });\n/**\r\n * Convert HTML table td data to matrix\r\n * @param {NodeListOf<Element>} data\r\n * @returns {Array}\r\n */\r\nfunction toMatrix(data, header) {    \r\n    let result = [], row = [];\r\n    let counter = 0;   \r\n    for (let i = 0; i < data.length; i++) {\r\n        let value = data[i].innerHTML\r\n        row.push(value)\r\n        counter++\r\n        if (counter === header.weeks.length) {\r\n            result.push(row)\r\n            row = []\r\n            counter = 0\r\n        }\r\n    }\r\n    return result \r\n}\r\n\r\n/**\r\n * Compute vertical sum from given matrix\r\n * @param {Array} matrix\r\n * @returns {Array} \r\n */\r\nfunction computeSum(matrix) {\r\n    let result = []\r\n    for (let j = 0; j < matrix[0].length; j++) {\r\n        let sum = 0\r\n        for (let i = 0; i < matrix.length; i++) {\r\n            let value = matrix[i][j] != \"\" ? parseInt(matrix[i][j]) : 0\r\n            sum += value\r\n        }\r\n        result.push(sum)\r\n    }\r\n    return result\r\n}\r\n\r\n/**Compute vertical sum of Projects and Opportunities */\r\nfunction sumOfAll(header) {\r\n    let matr1 = toMatrix(document.querySelectorAll(\".project-data\"), header)\r\n    let matr2 = toMatrix(document.querySelectorAll(\".opportunity-data\"), header)\r\n    let masterMatrix = []\r\n    if (matr1.length != 0) {\r\n        masterMatrix.push(computeSum(matr1))\r\n    }\r\n    if (matr2.length != 0) {\r\n        masterMatrix.push(computeSum(matr2))\r\n    }\r\n    return computeSum(masterMatrix)\r\n}\r\n\r\n\r\n/**function remove selected area */\r\nfunction removeSelected() {\r\n    document.querySelectorAll(\".selected\").forEach((element) => {\r\n        element.classList.remove(\"selected\"); \r\n        document.querySelector(\"#multi-insert\").blur()\r\n    });\r\n}\r\n\r\n\r\nfunction saveChanges(changes) {\r\n    fetch('/edit/save_changes/', {\r\n        method: 'POST',\r\n        body: JSON.stringify(changes),\r\n    })\r\n    .then(response => response.json())\r\n    .then(data => {\r\n        window.location.reload();\r\n        console.log(\"succes\", data);\r\n    })\r\n}\r\n\r\n/**\r\n * use for searching in main tables\r\n * looking for elements with item-for-search class\r\n */\r\nfunction tableSearch() {     \r\n    let input, filter, table, tr, td, i, txtValue;\r\n    input = document.getElementById(\"search\");\r\n    filter = input.value.toUpperCase();\r\n    table = document.getElementById(\"table\");\r\n    tr = table.getElementsByTagName(\"tr\");\r\n\r\n    for (i = 0; i < tr.length; i++) {\r\n        td = tr[i].getElementsByClassName(\"item-for-search\")[0];\r\n        if (td) {\r\n          txtValue = td.textContent || td.innerText;\r\n          if (txtValue.toUpperCase().indexOf(filter) > -1) {\r\n              tr[i].style.display = \"\";\r\n          }\r\n          else {\r\n              tr[i].style.display = \"none\";\r\n          }\r\n        }\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack:///./js/tools/tableFunctions.js?");

/***/ })

/******/ });