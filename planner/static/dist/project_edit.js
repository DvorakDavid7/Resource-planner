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
/******/ 	return __webpack_require__(__webpack_require__.s = "./js/project_edit.js");
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

/***/ "./js/components/ProjectEditComponent.js":
/*!***********************************************!*\
  !*** ./js/components/ProjectEditComponent.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return projectEditGenerator; });\n/**\r\n * Function generate Project Edit\r\n * @param {*} header table header\r\n * @param {*} list name List\r\n * @param {*} values JSON of userIds: vals\r\n * @param {Element} target Element for enbeding result\r\n */\nfunction projectEditGenerator(header, list, values, target) {\n  for (let j = 0; j < list.length; j++) {\n    let tr = document.createElement(\"tr\");\n    let workerName = document.createElement(\"td\");\n    workerName.innerHTML = `<b>${list[j].fullName} (${list[j].department})</b>`;\n    tr.append(workerName);\n\n    for (let i = 0; i < header.weeks.length; i++) {\n      // main td - everything is in it\n      let td = document.createElement(\"td\"); // cell table with two rows\n\n      let cell = document.createElement(\"table\");\n      cell.style = \"margin: auto;\";\n      let plannedTr = document.createElement(\"tr\");\n      let alocatedTr = document.createElement(\"tr\");\n      let plannedTd = document.createElement(\"td\");\n      let alocatedTd = document.createElement(\"td\");\n      let workerId = list[j].id;\n      let week = String(Number(header.weeks[i])); // planned styling\n\n      plannedTd.innerHTML = values[workerId][week].planned;\n      plannedTd.classList.add(\"text-center\");\n      plannedTd.classList.add(\"data\");\n      plannedTd.contentEditable = true;\n      plannedTd.style = \"width:40px\";\n      plannedTr.append(plannedTd); // alocated styling\n\n      alocatedTd.innerHTML = values[workerId][week].alocated;\n      alocatedTd.classList.add(\"text-center\");\n      alocatedTd.style = \"font-size:65%\";\n      alocatedTr.append(alocatedTd);\n      cell.append(plannedTr);\n      cell.append(alocatedTr);\n      td.append(cell);\n      tr.append(td);\n    }\n\n    target.append(tr);\n  }\n}\n\n//# sourceURL=webpack:///./js/components/ProjectEditComponent.js?");

/***/ }),

/***/ "./js/project_edit.js":
/*!****************************!*\
  !*** ./js/project_edit.js ***!
  \****************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _tools_generators_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tools/generators.js */ \"./js/tools/generators.js\");\n/* harmony import */ var _tools_tableFunctions_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./tools/tableFunctions.js */ \"./js/tools/tableFunctions.js\");\n/* harmony import */ var _tools_utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./tools/utils.js */ \"./js/tools/utils.js\");\n/* harmony import */ var _components_ProjectEditComponent_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/ProjectEditComponent.js */ \"./js/components/ProjectEditComponent.js\");\n/* harmony import */ var _components_HeaderComponent_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/HeaderComponent.js */ \"./js/components/HeaderComponent.js\");\n\n\n\n\n\n // data parsers\n\nlet header = JSON.parse(document.querySelector(\"#dataholder\").dataset.header);\nlet tableModel = JSON.parse(document.querySelector(\"#dataholder\").dataset.model); // def variables\n\nlet nameList = tableModel.nameList;\nlet values = tableModel.values;\nlet default_values = []; // DOM Querries\n\nconst theader = document.querySelector(\"#header\");\nconst tbody = document.querySelector(\"#body\");\nconst dropbtn = document.querySelector(\".dropdown-toggle\");\nconst dropDown = document.querySelector(\".dropdown-menu\");\nconst submitBtn = document.querySelector(\"#submit-changes\");\nconst rangeForm = document.querySelector(\"#range-form\");\nconst dateForm = document.querySelector(\"#date-form\");\nconst moveBtnGroup = document.querySelector(\"#move\");\nconst inputSearch = document.querySelector(\"#myInput\"); // event listeners\n\nwindow.addEventListener('load', generateTable(tableModel, header));\ndropbtn.addEventListener(\"click\", _tools_generators_js__WEBPACK_IMPORTED_MODULE_0__[\"nameListGenerator\"](dropDown, header));\nsubmitBtn.addEventListener(\"click\", saveChanges);\ninputSearch.addEventListener(\"keyup\", dropDwonSearch); // NAVIGATION\n\nrangeForm.addEventListener(\"submit\", setRange);\ndateForm.addEventListener(\"submit\", setDate);\nmoveBtnGroup.addEventListener(\"click\", navigationMove); // functions\n\nasync function send_changes(changes) {\n  const response = await fetch('/project_edit/save_changes', {\n    method: 'POST',\n    body: JSON.stringify(changes)\n  });\n  const responseData = await response.json();\n  console.log(\"succes\", responseData);\n  location.reload();\n}\n\nfunction generateTable(tableModel, header) {\n  Object(_components_HeaderComponent_js__WEBPACK_IMPORTED_MODULE_4__[\"default\"])(header, theader);\n  Object(_components_ProjectEditComponent_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(header, tableModel.nameList, tableModel.values, tbody);\n  let data = document.querySelectorAll(\".data\");\n  default_values = _tools_tableFunctions_js__WEBPACK_IMPORTED_MODULE_1__[\"toMatrix\"](data, header);\n}\n\nfunction saveChanges() {\n  let data = document.querySelectorAll(\".data\");\n  let current_values = _tools_tableFunctions_js__WEBPACK_IMPORTED_MODULE_1__[\"toMatrix\"](data, header);\n  let changes = [];\n  let cid = window.location.pathname.split(\"/\").pop();\n\n  for (let i = 0; i < current_values.length; i++) {\n    for (let j = 0; j < current_values[i].length; j++) {\n      if (current_values[i][j] !== default_values[i][j]) {\n        let new_value = current_values[i][j];\n        let worker_id = nameList[i].id;\n        let week = header.weeks[j];\n        let year = _tools_utils_js__WEBPACK_IMPORTED_MODULE_2__[\"get_year\"](week, header);\n        changes.push({\n          \"cid\": cid,\n          \"workerId\": worker_id,\n          \"week\": week,\n          \"value\": new_value,\n          \"year\": year\n        });\n      }\n    }\n  }\n\n  send_changes(changes);\n}\n\nfunction setRange(event) {\n  event.preventDefault();\n  let [weekFrom, yearFrom] = document.querySelector(\"#data-range-from\").value.split(\"/\");\n  let [weekTo, yearTo] = document.querySelector(\"#data-range-to\").value.split(\"/\");\n  let search = `?year_start=${yearFrom}&year_end=${yearTo}&week_start=${weekFrom}&week_end=${weekTo}`;\n  window.location = window.location.pathname + search;\n}\n\nasync function setDate(event) {\n  event.preventDefault();\n  let weekAndYear = document.querySelector(\"#data-week\").value;\n  let dateString = document.querySelector(\"#data-date\").value;\n  let year,\n      weekNumber = \"\";\n\n  if (weekAndYear != \"\") {\n    [weekNumber, year] = weekAndYear.split(\"/\");\n  } else if (dateString != \"\") {\n    let [month, day, y] = dateString.split(\"/\");\n    year = y;\n    let date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day)); // the month is 0-indexed        \n\n    weekNumber = Object(_tools_utils_js__WEBPACK_IMPORTED_MODULE_2__[\"ISO8601_week_number\"])(date).toString();\n  }\n\n  let data = {\n    \"date\": {\n      \"weekNumber\": weekNumber,\n      \"year\": year\n    }\n  };\n  const response = await fetch('/navigation/set_week', {\n    method: 'POST',\n    body: JSON.stringify(data)\n  });\n  const responseData = await response.json();\n  let {\n    year_start,\n    year_end,\n    week_start,\n    week_end\n  } = responseData.dateRange;\n  let search = `?year_start=${year_start}&year_end=${year_end}&week_start=${week_start}&week_end=${week_end}`;\n  window.location = window.location.pathname + search;\n}\n\nfunction navigationMove(event) {\n  const step = 10;\n  let dateStart = Object(_tools_utils_js__WEBPACK_IMPORTED_MODULE_2__[\"getDateOfWeek\"])(header.dateRange.week_start, header.dateRange.year_start);\n  let dateEnd = Object(_tools_utils_js__WEBPACK_IMPORTED_MODULE_2__[\"getDateOfWeek\"])(header.dateRange.week_end, header.dateRange.year_end);\n  let dateStartPlus = new Date();\n  let dateEndPlus = new Date();\n\n  if (event.srcElement.name === \"right\") {\n    dateStartPlus = Object(_tools_utils_js__WEBPACK_IMPORTED_MODULE_2__[\"add_weeks\"])(dateStart, step);\n    dateEndPlus = Object(_tools_utils_js__WEBPACK_IMPORTED_MODULE_2__[\"add_weeks\"])(dateEnd, step);\n  } else if (event.srcElement.name === \"left\") {\n    dateStartPlus = Object(_tools_utils_js__WEBPACK_IMPORTED_MODULE_2__[\"sub_weeks\"])(dateStart, step);\n    dateEndPlus = Object(_tools_utils_js__WEBPACK_IMPORTED_MODULE_2__[\"sub_weeks\"])(dateEnd, step);\n  }\n\n  let year_start = dateStartPlus.getFullYear().toString();\n  let year_end = dateEndPlus.getFullYear().toString();\n  let week_start = Object(_tools_utils_js__WEBPACK_IMPORTED_MODULE_2__[\"ISO8601_week_number\"])(dateStartPlus).toString();\n  let week_end = Object(_tools_utils_js__WEBPACK_IMPORTED_MODULE_2__[\"ISO8601_week_number\"])(dateEndPlus).toString();\n  let search = `?year_start=${year_start}&year_end=${year_end}&week_start=${week_start}&week_end=${week_end}`;\n  window.location = window.location.pathname + search;\n}\n\nfunction dropDwonSearch() {\n  let value = $(this).val().toLowerCase();\n  $(\".dropdown-menu a\").filter(function () {\n    $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);\n  });\n}\n\n//# sourceURL=webpack:///./js/project_edit.js?");

/***/ }),

/***/ "./js/tools/generators.js":
/*!********************************!*\
  !*** ./js/tools/generators.js ***!
  \********************************/
/*! exports provided: projectListGenerator, nameListGenerator */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"projectListGenerator\", function() { return projectListGenerator; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"nameListGenerator\", function() { return nameListGenerator; });\n/**\r\n * This function send GET request to server and then generate DropDown menu with projects and opportunities\r\n * @param {Element} target \r\n */\nfunction projectListGenerator(header, target) {\n  if (target.childElementCount !== 1) return;\n  fetch(\"/edit/project_list\").then(response => response.json()).then(data => {\n    data.projects.forEach(project => {\n      let dropDownItem = document.createElement(\"a\");\n      dropDownItem.innerHTML = `p: ${project.fullName}`;\n      dropDownItem.classList.add(\"dropdown-item\");\n      dropDownItem.href = \"javascript:;\";\n      dropDownItem.addEventListener(\"click\", () => addProject(header, project.cid, \"1\"));\n      target.append(dropDownItem);\n    });\n    data.opportunities.forEach(opportunity => {\n      let dropDownItem = document.createElement(\"a\");\n      dropDownItem.innerHTML = `o: ${opportunity.fullName}`;\n      dropDownItem.classList.add(\"dropdown-item\");\n      dropDownItem.href = \"javascript:;\";\n      dropDownItem.addEventListener(\"click\", () => addProject(header, opportunity.cid, \"0\"));\n      target.append(dropDownItem);\n    });\n  });\n}\n/**\r\n * This function send GET request to server and then generate DropDown menu with names\r\n * @param {Element} target \r\n */\n\nfunction nameListGenerator(target, header) {\n  if (target.childElementCount !== 1) return;\n  fetch(\"/project_edit/get_names\").then(response => response.json()).then(data => {\n    data.workers.forEach(worker => {\n      let dropDownItem = document.createElement(\"a\");\n      dropDownItem.innerHTML = `${worker.fullName} (${worker.department})`;\n      dropDownItem.classList.add(\"dropdown-item\");\n      dropDownItem.href = \"javascript:;\";\n      dropDownItem.addEventListener(\"click\", () => add_worker(worker.id, header));\n      target.append(dropDownItem);\n    });\n  });\n}\n\nfunction add_worker(worker_id, header) {\n  let record = {\n    \"cid\": window.location.pathname.split(\"/\").pop(),\n    \"workerId\": worker_id,\n    \"week\": header.weeks[0],\n    \"plannedHours\": \"0\",\n    \"year\": header.dateRange.year_start\n  };\n  fetch('/project_edit/add_worker', {\n    method: 'POST',\n    body: JSON.stringify(record)\n  }).then(response => response.json()).then(data => {\n    console.log(\"succes\", data);\n    location.reload();\n  });\n}\n\nfunction addProject(header, cid, typeZpid) {\n  let workerId = window.location.pathname.split(\"/\").pop();\n  let year = header.dateRange.year_start;\n  let week = header.weeks[0];\n  let plannedHours = \"0\";\n  let record = {\n    \"workerId\": workerId,\n    \"cid\": cid,\n    \"typeZpid\": typeZpid,\n    \"year\": year,\n    \"week\": week,\n    \"plannedHours\": plannedHours\n  };\n  fetch('/edit/add_new_project/', {\n    method: 'POST',\n    body: JSON.stringify(record)\n  }).then(response => response.json()).then(data => {\n    console.log(\"succes\", data);\n    window.location.reload();\n  });\n}\n\n//# sourceURL=webpack:///./js/tools/generators.js?");

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