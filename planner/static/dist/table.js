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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return HeaderComponent; });\n// HEADER\n\n/**\r\n * This function Display table Header from TableHeader Model\r\n * @param {Element} target target parent element\r\n * @param {any} header JSON from TableModel\r\n */\nfunction HeaderComponent(header, target) {\n  let weeksTr = document.createElement(\"tr\");\n  let datesTr = document.createElement(\"tr\");\n  weeksTr.appendChild(document.createElement(\"td\"));\n  datesTr.appendChild(document.createElement(\"td\"));\n\n  for (let i = 0; i < header.weeks.length; i++) {\n    let td = document.createElement(\"td\");\n    td.innerHTML = `${header.weeks[i]} (${header.workingHours[i]})`;\n    weeksTr.appendChild(td);\n  }\n\n  for (let i = 0; i < header.weeks.length; i++) {\n    let td = document.createElement(\"td\");\n    td.innerHTML = header.dates[i];\n    datesTr.appendChild(td);\n  }\n\n  target.appendChild(weeksTr);\n  target.appendChild(datesTr);\n}\n\n//# sourceURL=webpack:///./js/components/HeaderComponent.js?");

/***/ }),

/***/ "./js/components/TableComponent.js":
/*!*****************************************!*\
  !*** ./js/components/TableComponent.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return TableComponent; });\n/* harmony import */ var _tools_tableFunctions_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../tools/tableFunctions.js */ \"./js/tools/tableFunctions.js\");\n\n/**\r\n * This function genereate main table body\r\n * @param {any} header JSON from TableModel\r\n * @param {Array} list - left list of names\r\n * @param {JSON} values - values JSON\r\n * @param {Element} target - target element\r\n */\n\nfunction TableComponent(header, list, values, target) {\n  // html skeleton\n  for (let j = 0; j < list.length; j++) {\n    let tr = document.createElement(\"tr\");\n    let nameTd = document.createElement(\"td\");\n    nameTd.innerHTML = `<button data-id='${list[j].id}' type='button' class='btn btn-link text-left'>${list[j].fullName} (${list[j].department})</button>`;\n    nameTd.classList.add(\"item-for-search\");\n    tr.appendChild(nameTd);\n\n    for (let i = 0; i < header.weeks.length; i++) {\n      let td = document.createElement(\"td\");\n      let week = parseInt(header.weeks[i]);\n      td.innerHTML = values[list[j].id][week];\n      td.classList.add(\"text-center\");\n      let colorClass = Object(_tools_tableFunctions_js__WEBPACK_IMPORTED_MODULE_0__[\"coloringResult\"])(header.workingHours[i], values[list[j].id][week]);\n\n      if (colorClass) {\n        td.classList.add(colorClass);\n      }\n\n      tr.appendChild(td);\n    }\n\n    target.appendChild(tr);\n  } // DOM queries\n\n\n  const nameBtns = document.querySelectorAll(\".btn-link\"); // Event listeners\n\n  nameBtns.forEach(button => {\n    button.addEventListener(\"click\", e => {\n      let workerId = e.srcElement.dataset.id;\n      let y_start = header.dateRange.year_start;\n      let y_end = header.dateRange.year_end;\n      let w_start = header.dateRange.week_start;\n      let w_end = header.dateRange.week_end;\n      let url = `edit/${workerId}?year_start=${y_start}&year_end=${y_end}&week_start=${w_start}&week_end=${w_end}`;\n      localStorage.setItem('header', JSON.stringify(header));\n      localStorage.setItem(\"list\", JSON.stringify(list));\n      localStorage.setItem(\"values\", JSON.stringify(values));\n      window.location = url;\n    });\n  });\n}\n\n//# sourceURL=webpack:///./js/components/TableComponent.js?");

/***/ }),

/***/ "./js/table.js":
/*!*********************!*\
  !*** ./js/table.js ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _tools_tableFunctions_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tools/tableFunctions.js */ \"./js/tools/tableFunctions.js\");\n/* harmony import */ var _tools_utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./tools/utils.js */ \"./js/tools/utils.js\");\n/* harmony import */ var _components_TableComponent_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/TableComponent.js */ \"./js/components/TableComponent.js\");\n/* harmony import */ var _components_HeaderComponent_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/HeaderComponent.js */ \"./js/components/HeaderComponent.js\");\n\n\n\n // data parsers\n\nlet header = JSON.parse(document.querySelector(\"#dataholder\").dataset.header);\nlet tableModel = JSON.parse(document.querySelector(\"#dataholder\").dataset.tablemodel);\nlet workerList = tableModel.workerList;\nlet values = tableModel.values; // DOM queries\n\nconst theader = document.querySelector(\"#header\");\nconst tbody = document.querySelector(\"#body\");\nconst searchInput = document.querySelector(\"#search\");\nconst departmentForm = document.querySelector(\"#form-department\");\nconst rangeForm = document.querySelector(\"#range-form\");\nconst dateForm = document.querySelector(\"#date-form\");\nconst moveBtnGroup = document.querySelector(\"#move\");\nconst deepSearchForm = document.querySelector(\"#form-deep-search\");\nconst inputSearch = document.querySelector(\"#myInput\");\nconst dropbtn = document.querySelector(\".dropdown-toggle\"); // Event listeners\n\nwindow.addEventListener('load', generateTable(tableModel, header));\nsearchInput.addEventListener(\"keyup\", _tools_tableFunctions_js__WEBPACK_IMPORTED_MODULE_0__[\"tableSearch\"]);\ndepartmentForm.addEventListener(\"submit\", setDepartment);\ndeepSearchForm.addEventListener(\"submit\", deepSearch);\ninputSearch.addEventListener(\"keyup\", _tools_utils_js__WEBPACK_IMPORTED_MODULE_1__[\"dropDwonSearch\"]);\ndropbtn.addEventListener(\"click\", groupListGenerator); // NAVIGATION\n\nrangeForm.addEventListener(\"submit\", setRange);\ndateForm.addEventListener(\"submit\", setDate);\nmoveBtnGroup.addEventListener(\"click\", navigationMove); // Functions\n\nfunction generateTable(tableModel, newheader) {\n  workerList = tableModel.workerList;\n  values = tableModel.values;\n  header = newheader;\n  theader.innerHTML = \"\";\n  tbody.innerHTML = \"\";\n  Object(_components_HeaderComponent_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(header, theader);\n  Object(_components_TableComponent_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(header, workerList, values, tbody);\n}\n\nasync function groupListGenerator() {\n  const dropDown = document.querySelector(\".dropdown-menu\");\n  if (dropDown.childElementCount !== 1) return;\n  const response = await fetch(\"/groups/show_groups\");\n  const responseData = await response.json();\n\n  for (let group of responseData.data) {\n    let dropDownItem = document.createElement(\"a\");\n    dropDownItem.innerHTML = `${group}`;\n    dropDownItem.classList.add(\"dropdown-item\");\n    dropDownItem.href = \"javascript:;\";\n    dropDownItem.dataset.groupName = `${group}`;\n    dropDownItem.addEventListener(\"click\", chooseGroup);\n    dropDown.append(dropDownItem);\n  }\n}\n\nasync function chooseGroup(e) {\n  const groupName = e.srcElement.dataset.groupName;\n  const response = await fetch('/table/set_group', {\n    method: 'POST',\n    body: JSON.stringify(groupName)\n  });\n  const responseData = await response.json();\n  generateTable(responseData.tableModel, responseData.header);\n}\n\nasync function setDepartment(event) {\n  event.preventDefault();\n  let department = document.querySelector(\"#department-value\").value;\n  let data = {\n    \"department\": department,\n    \"header\": header\n  };\n  const response = await fetch('/table/set_department', {\n    method: 'POST',\n    body: JSON.stringify(data)\n  });\n  const responseData = await response.json();\n  generateTable(responseData.tableModel, responseData.header);\n}\n\nasync function deepSearch(event) {\n  event.preventDefault();\n  let searchString = document.querySelector(\"#search\").value;\n  let data = {\n    \"search\": searchString,\n    \"header\": header\n  };\n  const response = await fetch('/table/deepsearch', {\n    method: 'POST',\n    body: JSON.stringify(data)\n  });\n  const responseData = await response.json();\n  generateTable(responseData.tableModel, responseData.header);\n}\n\nasync function setRange(event) {\n  event.preventDefault();\n  let [weekFrom, yearFrom] = document.querySelector(\"#data-range-from\").value.split(\"/\");\n  let [weekTo, yearTo] = document.querySelector(\"#data-range-to\").value.split(\"/\");\n  let data = {\n    \"dateRange\": {\n      \"year_start\": yearFrom,\n      \"year_end\": yearTo,\n      \"week_start\": weekFrom,\n      \"week_end\": weekTo\n    },\n    \"nameList\": workerList\n  };\n  const response = await fetch('/table/navigation/set_range', {\n    method: 'POST',\n    body: JSON.stringify(data)\n  });\n  const responseData = await response.json();\n  generateTable(responseData.tableModel, responseData.header);\n}\n\nasync function setDate(event) {\n  event.preventDefault();\n  let weekAndYear = document.querySelector(\"#data-week\").value;\n  let dateString = document.querySelector(\"#data-date\").value;\n  let year,\n      weekNumber = \"\";\n\n  if (weekAndYear != \"\") {\n    [weekNumber, year] = weekAndYear.split(\"/\");\n  } else if (dateString != \"\") {\n    let [month, day, y] = dateString.split(\"/\");\n    year = y;\n    let date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day)); // the month is 0-indexed        \n\n    weekNumber = Object(_tools_utils_js__WEBPACK_IMPORTED_MODULE_1__[\"ISO8601_week_number\"])(date).toString();\n  }\n\n  let data = {\n    \"date\": {\n      \"weekNumber\": weekNumber,\n      \"year\": year\n    },\n    \"nameList\": workerList\n  };\n  const response = await fetch('/table/navigation/set_week', {\n    method: 'POST',\n    body: JSON.stringify(data)\n  });\n  const responseData = await response.json();\n  generateTable(responseData.tableModel, responseData.header);\n}\n\nasync function navigationMove(event) {\n  const step = 10;\n  let dateStart = Object(_tools_utils_js__WEBPACK_IMPORTED_MODULE_1__[\"getDateOfWeek\"])(header.dateRange.week_start, header.dateRange.year_start);\n  let dateEnd = Object(_tools_utils_js__WEBPACK_IMPORTED_MODULE_1__[\"getDateOfWeek\"])(header.dateRange.week_end, header.dateRange.year_end);\n  let dateStartPlus = new Date();\n  let dateEndPlus = new Date();\n\n  if (event.srcElement.name === \"right\") {\n    dateStartPlus = Object(_tools_utils_js__WEBPACK_IMPORTED_MODULE_1__[\"add_weeks\"])(dateStart, step);\n    dateEndPlus = Object(_tools_utils_js__WEBPACK_IMPORTED_MODULE_1__[\"add_weeks\"])(dateEnd, step);\n  } else if (event.srcElement.name === \"left\") {\n    dateStartPlus = Object(_tools_utils_js__WEBPACK_IMPORTED_MODULE_1__[\"sub_weeks\"])(dateStart, step);\n    dateEndPlus = Object(_tools_utils_js__WEBPACK_IMPORTED_MODULE_1__[\"sub_weeks\"])(dateEnd, step);\n  }\n\n  let data = {\n    \"dateRange\": {\n      \"year_start\": dateStartPlus.getFullYear().toString(),\n      \"year_end\": dateEndPlus.getFullYear().toString(),\n      \"week_start\": Object(_tools_utils_js__WEBPACK_IMPORTED_MODULE_1__[\"ISO8601_week_number\"])(dateStartPlus).toString(),\n      \"week_end\": Object(_tools_utils_js__WEBPACK_IMPORTED_MODULE_1__[\"ISO8601_week_number\"])(dateEndPlus).toString()\n    },\n    \"nameList\": workerList\n  };\n  const response = await fetch('/table/navigation/set_range', {\n    method: 'POST',\n    body: JSON.stringify(data)\n  });\n  const responseData = await response.json();\n  generateTable(responseData.tableModel, responseData.header);\n}\n\n//# sourceURL=webpack:///./js/table.js?");

/***/ }),

/***/ "./js/tools/tableFunctions.js":
/*!************************************!*\
  !*** ./js/tools/tableFunctions.js ***!
  \************************************/
/*! exports provided: toMatrix, computeSum, sumOfAll, removeSelected, tableSearch, coloringResult */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"toMatrix\", function() { return toMatrix; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"computeSum\", function() { return computeSum; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"sumOfAll\", function() { return sumOfAll; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"removeSelected\", function() { return removeSelected; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"tableSearch\", function() { return tableSearch; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"coloringResult\", function() { return coloringResult; });\n/**\r\n * Convert HTML table td data to matrix\r\n * @param {NodeListOf<Element>} data\r\n * @returns {Array}\r\n */\nfunction toMatrix(data, header) {\n  let result = [],\n      row = [];\n  let counter = 0;\n\n  if (!data.length) {\n    let nullRow = [];\n\n    for (let i = 0; i < header.weeks.length; i++) {\n      nullRow.push(0);\n    }\n\n    result.push(nullRow);\n    return result;\n  }\n\n  for (let i = 0; i < data.length; i++) {\n    let value = data[i].innerHTML;\n    row.push(value);\n    counter++;\n\n    if (counter === header.weeks.length) {\n      result.push(row);\n      row = [];\n      counter = 0;\n    }\n  }\n\n  return result;\n}\n/**\r\n * Compute vertical sum from given matrix\r\n * @param {Array} matrix\r\n * @returns {Array} \r\n */\n\nfunction computeSum(matrix) {\n  let result = [];\n\n  for (let j = 0; j < matrix[0].length; j++) {\n    let sum = 0;\n\n    for (let i = 0; i < matrix.length; i++) {\n      let value = matrix[i][j] != \"\" ? parseInt(matrix[i][j]) : 0;\n      sum += value;\n    }\n\n    result.push(sum);\n  }\n\n  return result;\n}\n/**Compute vertical sum of Projects and Opportunities */\n\nfunction sumOfAll(header) {\n  let projectData = document.querySelectorAll(\".project-data\");\n  let opportunityData = document.querySelectorAll(\".opportunity-data\");\n  let matr1,\n      matr2,\n      masterMatrix = [];\n  matr1 = toMatrix(projectData, header);\n  matr2 = toMatrix(opportunityData, header);\n  masterMatrix.push(computeSum(matr1));\n  masterMatrix.push(computeSum(matr2));\n  return computeSum(masterMatrix);\n}\n/**function remove selected area */\n\nfunction removeSelected() {\n  document.querySelectorAll(\".selected\").forEach(element => {\n    element.classList.remove(\"selected\");\n    document.querySelector(\"#multi-insert\").blur();\n  });\n}\n/**\r\n * use for searching in main tables\r\n * looking for elements with item-for-search class\r\n */\n\nfunction tableSearch() {\n  let input, filter, table, tr, td, i, txtValue;\n  input = document.getElementById(\"search\");\n  filter = input.value.toUpperCase();\n  table = document.getElementById(\"table\");\n  tr = table.getElementsByTagName(\"tr\");\n\n  for (i = 0; i < tr.length; i++) {\n    td = tr[i].getElementsByClassName(\"item-for-search\")[0];\n\n    if (td) {\n      txtValue = td.textContent || td.innerText;\n\n      if (txtValue.toUpperCase().indexOf(filter) > -1) {\n        tr[i].style.display = \"\";\n      } else {\n        tr[i].style.display = \"none\";\n      }\n    }\n  }\n}\n/**\r\n * \r\n * @param {String | number} workingHours \r\n * @param {String | number} planned \r\n * @returns {String} - returns colour class name\r\n */\n\nfunction coloringResult(workingHours, planned) {\n  if (planned == \"\") return;\n  const wHours = parseInt(workingHours);\n  const plan = parseInt(planned);\n  if (wHours - plan >= 5) return \"ultraless\";else if (wHours === plan) return \"optimal\";else if (wHours - plan >= -5) return \"over\";else if (wHours - plan >= -6) return \"notultraover\";else if (wHours - plan >= -10) return \"ultraover\";else return \"\";\n}\n\n//# sourceURL=webpack:///./js/tools/tableFunctions.js?");

/***/ }),

/***/ "./js/tools/utils.js":
/*!***************************!*\
  !*** ./js/tools/utils.js ***!
  \***************************/
/*! exports provided: get_year, ISO8601_week_number, getDateOfWeek, add_weeks, sub_weeks, dropDwonSearch */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"get_year\", function() { return get_year; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ISO8601_week_number\", function() { return ISO8601_week_number; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getDateOfWeek\", function() { return getDateOfWeek; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"add_weeks\", function() { return add_weeks; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"sub_weeks\", function() { return sub_weeks; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"dropDwonSearch\", function() { return dropDwonSearch; });\n/**\r\n * \r\n * @param {string} week \r\n */\nfunction get_year(week, header) {\n  if (header.dateRange.year_start == header.dateRange.year_end || parseInt(week) > parseInt(header.weeks[header.weeks.length - 1])) {\n    return header.dateRange.year_start;\n  } else {\n    return header.dateRange.year_end;\n  }\n}\n/**\r\n * Convert Date to week number\r\n * @param {Date} dt\r\n * @returns {Number} returns week number for given date\r\n */\n\nfunction ISO8601_week_number(dt) {\n  const today = dt;\n  const firstDayOfYear = new Date(today.getFullYear(), 0, 1);\n  const pastDaysOfYear = (today - firstDayOfYear) / 86400000;\n  return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);\n}\n/**\r\n * \r\n * @param {Number} weekNumber \r\n * @param {Number} year \r\n * @returns {Date} returns Date based on given week and year\r\n */\n\nfunction getDateOfWeek(weekNumber, year) {\n  // Create a date object starting january first of chosen year, plus\n  // the number of days in a week multiplied by the week number to get the right date.\n  return new Date(year, 0, 1 + (weekNumber - 1) * 7);\n}\n/**\r\n * \r\n * @param {Date} dt Base Date\r\n * @param {Number} n step in weeks\r\n * @returns {Date} returns dt + n weeks\r\n */\n\nfunction add_weeks(dt, n) {\n  return new Date(dt.setDate(dt.getDate() + n * 7));\n}\n/**\r\n * \r\n * @param {Date} dt Base Date\r\n * @param {Number} n step in weeks\r\n * @returns {Date} returns dt - n weeks\r\n */\n\nfunction sub_weeks(dt, n) {\n  return new Date(dt.setDate(dt.getDate() - n * 7));\n}\n/**\r\n * \r\n */\n\nfunction dropDwonSearch() {\n  let value = $(this).val().toLowerCase();\n  $(\".dropdown-menu a\").filter(function () {\n    $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);\n  });\n}\n\n//# sourceURL=webpack:///./js/tools/utils.js?");

/***/ })

/******/ });