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
/******/ 	return __webpack_require__(__webpack_require__.s = "./js/table.js");
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

/***/ "./js/components/TableComponent.js":
/*!*****************************************!*\
  !*** ./js/components/TableComponent.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return TableComponent; });\n/**\r\n * This function genereate main table body\r\n * @param {any} header JSON from TableModel\r\n * @param {Array} list - left list of names\r\n * @param {JSON} values - values JSON\r\n * @param {Element} target - target element\r\n */\r\nfunction TableComponent(header, list, values, target) {\r\n    // html skeleton\r\n    for (let j = 0; j < list.length; j++) {\r\n        let tr = document.createElement(\"tr\");\r\n        let nameTd = document.createElement(\"td\");\r\n        nameTd.innerHTML = `<button data-id='${list[j].id}' type='button' class='btn btn-link text-left'>${list[j].fullName} (${list[j].department})</button>`\r\n        nameTd.classList.add(\"item-for-search\")\r\n        tr.append(nameTd)\r\n        for (let i = 0; i < header.weeks.length; i++) {\r\n            let td = document.createElement(\"td\");\r\n            let week = parseInt(header.weeks[i])\r\n            td.innerHTML = values[list[j].id][week]\r\n            td.classList.add(\"text-center\")\r\n            tr.append(td)\r\n        }\r\n        target.append(tr)\r\n    }\r\n\r\n    // DOM queries\r\n    const nameBtns = document.querySelectorAll(\".btn-link\");\r\n\r\n\r\n\r\n    // Event listeners\r\n    nameBtns.forEach((button) => {\r\n        button.addEventListener(\"click\", (e) => {\r\n            let workerId = e.srcElement.dataset.id;\r\n            let y_start = header.dateRange.year_start;\r\n            let y_end = header.dateRange.year_end;\r\n            let w_start = header.dateRange.week_start;\r\n            let w_end = header.dateRange.week_end;\r\n            let url = `edit/${workerId}?year_start=${y_start}&year_end=${y_end}&week_start=${w_start}&week_end=${w_end}`;\r\n            window.location = url;\r\n        });\r\n    });\r\n}\r\n\n\n//# sourceURL=webpack:///./js/components/TableComponent.js?");

/***/ }),

/***/ "./js/table.js":
/*!*********************!*\
  !*** ./js/table.js ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _tools_tableFunctions_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tools/tableFunctions.js */ \"./js/tools/tableFunctions.js\");\n/* harmony import */ var _tools_utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./tools/utils.js */ \"./js/tools/utils.js\");\n/* harmony import */ var _components_TableComponent_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/TableComponent.js */ \"./js/components/TableComponent.js\");\n/* harmony import */ var _components_HeaderComponent_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/HeaderComponent.js */ \"./js/components/HeaderComponent.js\");\n\r\n\r\n\r\n\r\n\r\n\r\n// data parsers\r\nlet header = JSON.parse(document.querySelector(\"#dataholder\").dataset.header);\r\n\r\nlet tableModel = JSON.parse(document.querySelector(\"#dataholder\").dataset.tablemodel);\r\nlet workerList = tableModel.workerList;\r\nlet values = tableModel.values;\r\n\r\n\r\nfunction regenerateTable(data) {\r\n    let tableModel = data.tableModel;\r\n    workerList = tableModel.workerList;\r\n    values = tableModel.values;\r\n    header = data.header;\r\n    theader.innerHTML = \"\";\r\n    tbody.innerHTML = \"\";\r\n    Object(_components_HeaderComponent_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(header, theader);\r\n    Object(_components_TableComponent_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(header, workerList, values, tbody);\r\n}\r\n \r\n\r\n// DOM queries\r\nconst theader = document.querySelector(\"#header\");\r\nconst tbody = document.querySelector(\"#body\");\r\nconst searchInput = document.querySelector(\"#search\");\r\nconst departmentForm = document.querySelector(\"#form-department\");\r\nconst rangeForm = document.querySelector(\"#range-form\");\r\nconst dateForm = document.querySelector(\"#date-form\");\r\nconst moveRightBtn = document.querySelector(\"#move-right\");\r\nconst moveLeftBtn = document.querySelector(\"#move-left\");\r\nconst moveBtnGroup = document.querySelector(\"#move\");\r\n\r\n// Components\r\nObject(_components_HeaderComponent_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(header, theader);\r\nObject(_components_TableComponent_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(header, workerList, values, tbody);\r\n\r\n\r\n// Event listeners\r\n\r\nsearchInput.addEventListener(\"keyup\", () => {   \r\n    Object(_tools_tableFunctions_js__WEBPACK_IMPORTED_MODULE_0__[\"tableSearch\"])();\r\n});\r\n\r\n\r\nrangeForm.addEventListener(\"submit\", (e) => {\r\n    e.preventDefault();\r\n    let [weekFrom, yearFrom] = document.querySelector(\"#data-range-from\").value.split(\"/\");\r\n    let [weekTo, yearTo] = document.querySelector(\"#data-range-to\").value.split(\"/\");\r\n    let data = {\r\n        \"dateRange\": {\r\n            \"year_start\": yearFrom,\r\n            \"year_end\": yearTo,\r\n            \"week_start\": weekFrom,\r\n            \"week_end\": weekTo\r\n        },\r\n        \"nameList\": workerList\r\n    }\r\n    fetch('/table/navigation/set_range', {\r\n        method: 'POST',\r\n        body: JSON.stringify(data),\r\n    })\r\n    .then(response => response.json())\r\n    .then(data => {\r\n        regenerateTable(data);\r\n    });\r\n});\r\n\r\n\r\ndateForm.addEventListener(\"submit\", (e) => {\r\n    e.preventDefault();\r\n    let weekAndYear = document.querySelector(\"#data-week\").value;\r\n    let dateString = document.querySelector(\"#data-date\").value;\r\n    let year, weekNumber = \"\"\r\n\r\n    if (weekAndYear != \"\") {\r\n        [weekNumber, year] = weekAndYear.split(\"/\")\r\n    }\r\n    else if (dateString != \"\") {\r\n        let [month, day, y] = dateString.split(\"/\");\r\n        year = y;       \r\n        let date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));  // the month is 0-indexed        \r\n        weekNumber = Object(_tools_utils_js__WEBPACK_IMPORTED_MODULE_1__[\"ISO8601_week_number\"])(date).toString();\r\n    }\r\n    let data = {\r\n        \"date\": {\r\n            \"weekNumber\": weekNumber,\r\n            \"year\": year\r\n        },\r\n        \"nameList\": workerList\r\n    };\r\n    \r\n    fetch('/table/navigation/set_week', {\r\n        method: 'POST',\r\n        body: JSON.stringify(data),\r\n    })\r\n    .then(response => response.json())\r\n    .then(data => {\r\n        regenerateTable(data);\r\n    });   \r\n});\r\n\r\n\r\ndepartmentForm.addEventListener(\"submit\", (e) => {\r\n    e.preventDefault();\r\n    let department = document.querySelector(\"#department-value\").value;\r\n    let data = {\r\n        \"department\": department,\r\n        \"header\": header\r\n    }\r\n    fetch('/table/set_department', {\r\n        method: 'POST',\r\n        body: JSON.stringify(data),\r\n    })\r\n    .then(response => response.json())\r\n    .then(data => {\r\n        regenerateTable(data);\r\n    })\r\n})\r\n\r\nmoveBtnGroup.addEventListener(\"click\", (e) => {\r\n    const step = 10;\r\n\r\n    let dateStart = Object(_tools_utils_js__WEBPACK_IMPORTED_MODULE_1__[\"getDateOfWeek\"])(header.dateRange.week_start, header.dateRange.year_start);\r\n    let dateEnd = Object(_tools_utils_js__WEBPACK_IMPORTED_MODULE_1__[\"getDateOfWeek\"])(header.dateRange.week_end, header.dateRange.year_end);\r\n\r\n    let dateStartPlus = new Date();\r\n    let dateEndPlus = new Date();\r\n\r\n    if (e.srcElement.name === \"right\") {\r\n        dateStartPlus = Object(_tools_utils_js__WEBPACK_IMPORTED_MODULE_1__[\"add_weeks\"])(dateStart, step);\r\n        dateEndPlus = Object(_tools_utils_js__WEBPACK_IMPORTED_MODULE_1__[\"add_weeks\"])(dateEnd, step);\r\n    }\r\n    else if (e.srcElement.name === \"left\") {\r\n        dateStartPlus = Object(_tools_utils_js__WEBPACK_IMPORTED_MODULE_1__[\"sub_weeks\"])(dateStart, step);\r\n        dateEndPlus = Object(_tools_utils_js__WEBPACK_IMPORTED_MODULE_1__[\"sub_weeks\"])(dateEnd, step);\r\n    }\r\n    let data = {\r\n        \"dateRange\": {\r\n            \"year_start\": dateStartPlus.getFullYear().toString(),\r\n            \"year_end\":  dateEndPlus.getFullYear().toString(),\r\n            \"week_start\": Object(_tools_utils_js__WEBPACK_IMPORTED_MODULE_1__[\"ISO8601_week_number\"])(dateStartPlus).toString(),\r\n            \"week_end\": Object(_tools_utils_js__WEBPACK_IMPORTED_MODULE_1__[\"ISO8601_week_number\"])(dateEndPlus).toString(),\r\n        },\r\n        \"nameList\": workerList\r\n    }\r\n    fetch('/table/navigation/set_range', {\r\n        method: 'POST',\r\n        body: JSON.stringify(data),\r\n    })\r\n    .then(response => response.json())\r\n    .then(data => {\r\n        regenerateTable(data);\r\n    });\r\n})\n\n//# sourceURL=webpack:///./js/table.js?");

/***/ }),

/***/ "./js/tools/tableFunctions.js":
/*!************************************!*\
  !*** ./js/tools/tableFunctions.js ***!
  \************************************/
/*! exports provided: toMatrix, computeSum, sumOfAll, removeSelected, saveChanges, tableSearch */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"toMatrix\", function() { return toMatrix; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"computeSum\", function() { return computeSum; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"sumOfAll\", function() { return sumOfAll; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"removeSelected\", function() { return removeSelected; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"saveChanges\", function() { return saveChanges; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"tableSearch\", function() { return tableSearch; });\n/**\r\n * Convert HTML table td data to matrix\r\n * @param {NodeListOf<Element>} data\r\n * @returns {Array}\r\n */\r\nfunction toMatrix(data, header) {    \r\n    let result = [], row = [];\r\n    let counter = 0;   \r\n    for (let i = 0; i < data.length; i++) {\r\n        let value = data[i].innerHTML\r\n        row.push(value)\r\n        counter++\r\n        if (counter === header.weeks.length) {\r\n            result.push(row)\r\n            row = []\r\n            counter = 0\r\n        }\r\n    }\r\n    return result \r\n}\r\n\r\n/**\r\n * Compute vertical sum from given matrix\r\n * @param {Array} matrix\r\n * @returns {Array} \r\n */\r\nfunction computeSum(matrix) {\r\n    let result = []\r\n    for (let j = 0; j < matrix[0].length; j++) {\r\n        let sum = 0\r\n        for (let i = 0; i < matrix.length; i++) {\r\n            let value = matrix[i][j] != \"\" ? parseInt(matrix[i][j]) : 0\r\n            sum += value\r\n        }\r\n        result.push(sum)\r\n    }\r\n    return result\r\n}\r\n\r\n/**Compute vertical sum of Projects and Opportunities */\r\nfunction sumOfAll(header) {\r\n    let matr1 = toMatrix(document.querySelectorAll(\".project-data\"), header)\r\n    let matr2 = toMatrix(document.querySelectorAll(\".opportunity-data\"), header)\r\n    let masterMatrix = []\r\n    if (matr1.length != 0) {\r\n        masterMatrix.push(computeSum(matr1))\r\n    }\r\n    if (matr2.length != 0) {\r\n        masterMatrix.push(computeSum(matr2))\r\n    }\r\n    return computeSum(masterMatrix)\r\n}\r\n\r\n\r\n/**function remove selected area */\r\nfunction removeSelected() {\r\n    document.querySelectorAll(\".selected\").forEach((element) => {\r\n        element.classList.remove(\"selected\"); \r\n        document.querySelector(\"#multi-insert\").blur()\r\n    });\r\n}\r\n\r\n\r\nfunction saveChanges(changes) {\r\n    fetch('/edit/save_changes/', {\r\n        method: 'POST',\r\n        body: JSON.stringify(changes),\r\n    })\r\n    .then(response => response.json())\r\n    .then(data => {\r\n        window.location.reload();\r\n        console.log(\"succes\", data);\r\n    })\r\n}\r\n\r\n/**\r\n * use for searching in main tables\r\n * looking for elements with item-for-search class\r\n */\r\nfunction tableSearch() {     \r\n    let input, filter, table, tr, td, i, txtValue;\r\n    input = document.getElementById(\"search\");\r\n    filter = input.value.toUpperCase();\r\n    table = document.getElementById(\"table\");\r\n    tr = table.getElementsByTagName(\"tr\");\r\n\r\n    for (i = 0; i < tr.length; i++) {\r\n        td = tr[i].getElementsByClassName(\"item-for-search\")[0];\r\n        if (td) {\r\n          txtValue = td.textContent || td.innerText;\r\n          if (txtValue.toUpperCase().indexOf(filter) > -1) {\r\n              tr[i].style.display = \"\";\r\n          }\r\n          else {\r\n              tr[i].style.display = \"none\";\r\n          }\r\n        }\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack:///./js/tools/tableFunctions.js?");

/***/ }),

/***/ "./js/tools/utils.js":
/*!***************************!*\
  !*** ./js/tools/utils.js ***!
  \***************************/
/*! exports provided: get_year, ISO8601_week_number, getDateOfWeek, add_weeks, sub_weeks */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"get_year\", function() { return get_year; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ISO8601_week_number\", function() { return ISO8601_week_number; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getDateOfWeek\", function() { return getDateOfWeek; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"add_weeks\", function() { return add_weeks; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"sub_weeks\", function() { return sub_weeks; });\n\r\n/**\r\n * \r\n * @param {string} week \r\n */\r\nfunction get_year(week, header) {\r\n    if (header.dateRange.year_start == header.dateRange.year_end || parseInt(week) > parseInt(header.weeks[header.weeks.length - 1])){\r\n        return header.dateRange.year_start;\r\n    } else {\r\n        return header.dateRange.year_end;\r\n    }\r\n}\r\n\r\n/**\r\n * Convert Date to week number\r\n * @param {Date} dt\r\n * @returns {Number} returns week number for given date\r\n */\r\nfunction ISO8601_week_number(dt) {\r\n    const today = dt\r\n    const firstDayOfYear = new Date(today.getFullYear(), 0, 1);\r\n    const pastDaysOfYear = (today - firstDayOfYear) / 86400000;\r\n    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);\r\n}\r\n\r\n/**\r\n * \r\n * @param {Number} weekNumber \r\n * @param {Number} year \r\n * @returns {Date} returns Date based on given week and year\r\n */\r\nfunction getDateOfWeek(weekNumber,year){\r\n    // Create a date object starting january first of chosen year, plus\r\n    // the number of days in a week multiplied by the week number to get the right date.\r\n    return new Date(year, 0, 1+((weekNumber-1)*7));\r\n}\r\n\r\n/**\r\n * \r\n * @param {Date} dt Base Date\r\n * @param {Number} n step in weeks\r\n * @returns {Date} returns dt + n weeks\r\n */\r\nfunction add_weeks(dt, n) {\r\n    return new Date(dt.setDate(dt.getDate() + (n * 7)));      \r\n}\r\n\r\n/**\r\n * \r\n * @param {Date} dt Base Date\r\n * @param {Number} n step in weeks\r\n * @returns {Date} returns dt - n weeks\r\n */\r\nfunction sub_weeks(dt, n) {\r\n    return new Date(dt.setDate(dt.getDate() - (n * 7)));      \r\n}\r\n\n\n//# sourceURL=webpack:///./js/tools/utils.js?");

/***/ })

/******/ });