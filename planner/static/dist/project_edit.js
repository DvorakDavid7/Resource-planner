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

/***/ "./js/project_edit.js":
/*!****************************!*\
  !*** ./js/project_edit.js ***!
  \****************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _tools_generators_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tools/generators.js */ \"./js/tools/generators.js\");\n/* harmony import */ var _tools_tableFunctions_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./tools/tableFunctions.js */ \"./js/tools/tableFunctions.js\");\n/* harmony import */ var _tools_utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./tools/utils.js */ \"./js/tools/utils.js\");\n\r\n\r\n\r\n\r\n\r\n\r\n// data parsers\r\nlet header = JSON.parse(document.querySelector(\"#dataholder\").dataset.header);\r\nlet model = JSON.parse(document.querySelector(\"#dataholder\").dataset.model);\r\n\r\n\r\n// def variables\r\nlet nameList = model.nameList;\r\nlet values = model.values;\r\n\r\n\r\n// custome functions\r\nfunction send_changes(changes) {\r\n    fetch('/project_edit/save_changes', {\r\n            method: 'POST',\r\n            body:JSON.stringify(changes),\r\n        }\r\n    )\r\n    .then(response => response.json())\r\n    .then(data => {\r\n        console.log(\"succes\", data);\r\n        location.reload();\r\n    })\r\n}\r\n\r\n// DOM Querries\r\nconst theader = document.querySelector(\"#header\");\r\nconst tbody = document.querySelector(\"#body\");\r\n\r\n// generator functions call\r\n_tools_generators_js__WEBPACK_IMPORTED_MODULE_0__[\"headerGenerator\"](header, theader);\r\n_tools_generators_js__WEBPACK_IMPORTED_MODULE_0__[\"projectEditGenerator\"](header, nameList, values, tbody);\r\n\r\n// DOM Querries\r\nconst dropbtn = document.querySelector(\".dropdown-toggle\");\r\nconst dropDown = document.querySelector(\".dropdown-menu\");\r\nconst submitBtn = document.querySelector(\"#submit-changes\");\r\n\r\n\r\nlet data = document.querySelectorAll(\".data\");\r\nlet default_values = _tools_tableFunctions_js__WEBPACK_IMPORTED_MODULE_1__[\"toMatrix\"](data, header);\r\n\r\n\r\n// event listeners\r\ndropbtn.addEventListener(\"click\", () => {\r\n    _tools_generators_js__WEBPACK_IMPORTED_MODULE_0__[\"nameListGenerator\"](dropDown, header);\r\n})\r\n\r\nsubmitBtn.addEventListener(\"click\", () => {\r\n    let data = document.querySelectorAll(\".data\");\r\n    let current_values = _tools_tableFunctions_js__WEBPACK_IMPORTED_MODULE_1__[\"toMatrix\"](data, header);\r\n    let changes = [];\r\n    let cid = window.location.pathname.split(\"/\").pop();\r\n    for (let i = 0; i < current_values.length; i++) {\r\n        for (let j = 0; j < current_values[i].length; j++) {\r\n            if (current_values[i][j] !== default_values[i][j]) {\r\n                let new_value = current_values[i][j];\r\n                let worker_id = nameList[i].id;\r\n                let week = header.weeks[j];\r\n                let year = _tools_utils_js__WEBPACK_IMPORTED_MODULE_2__[\"get_year\"](week, header);\r\n                changes.push({\"cid\": cid, \"workerId\": worker_id, \"week\": week, \"value\": new_value, \"year\": year});         \r\n            }\r\n        }\r\n    }\r\n    console.log(changes);\r\n    send_changes(changes);\r\n});\r\n\r\n\r\n// search\r\n$(document).ready(function(){\r\n    $(\"#myInput\").on(\"keyup\", function() {\r\n        var value = $(this).val().toLowerCase();\r\n        $(\".dropdown-menu a\").filter(function() {\r\n            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)\r\n        });\r\n    });\r\n});\r\n\n\n//# sourceURL=webpack:///./js/project_edit.js?");

/***/ }),

/***/ "./js/tools/generators.js":
/*!********************************!*\
  !*** ./js/tools/generators.js ***!
  \********************************/
/*! exports provided: headerGenerator, mainTableGenerator, editProjectsGenerator, sumGenerator, projectListGenerator, projectsTableGenerator, projectEditGenerator, nameListGenerator */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"headerGenerator\", function() { return headerGenerator; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"mainTableGenerator\", function() { return mainTableGenerator; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"editProjectsGenerator\", function() { return editProjectsGenerator; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"sumGenerator\", function() { return sumGenerator; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"projectListGenerator\", function() { return projectListGenerator; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"projectsTableGenerator\", function() { return projectsTableGenerator; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"projectEditGenerator\", function() { return projectEditGenerator; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"nameListGenerator\", function() { return nameListGenerator; });\n// HEADER\r\n\r\n/**\r\n * This function Display table Header from TableHeader Model\r\n * @param {Element} target target parent element\r\n * @param {any} header JSON from TableModel\r\n */\r\nfunction headerGenerator(header, target) {\r\n    let weeksTr = document.createElement(\"tr\");\r\n    let datesTr = document.createElement(\"tr\");\r\n\r\n    weeksTr.append(document.createElement(\"td\"))\r\n    datesTr.append(document.createElement(\"td\"))\r\n    for (let i = 0; i < header.weeks.length; i++) {\r\n        let td = document.createElement(\"td\");\r\n        td.innerHTML = `${header.weeks[i]} (${header.workingHours[i]})`\r\n        weeksTr.append(td)\r\n    }    \r\n    for (let i = 0; i < header.weeks.length; i++) {\r\n        let td = document.createElement(\"td\");\r\n        td.innerHTML = header.dates[i]\r\n        datesTr.append(td)\r\n    } \r\n    target.append(weeksTr);\r\n    target.append(datesTr);\r\n}\r\n\r\n// MAIN TABLE\r\n\r\n/**\r\n * This function genereate main table body\r\n * @param {any} header JSON from TableModel\r\n * @param {Array} list - left list of names\r\n * @param {JSON} values - values JSON\r\n * @param {Element} target - target element\r\n */\r\nfunction mainTableGenerator(header, list, values, target) {\r\n    for (let j = 0; j < list.length; j++) {\r\n        let tr = document.createElement(\"tr\");\r\n        let nameTd = document.createElement(\"td\");\r\n        nameTd.innerHTML = `<button data-id='${list[j].id}' type='button' class='btn btn-link text-left'>${list[j].fullName} (${list[j].department})</button>`\r\n        nameTd.classList.add(\"item-for-search\")\r\n        tr.append(nameTd)\r\n        for (let i = 0; i < header.weeks.length; i++) {\r\n            let td = document.createElement(\"td\");\r\n            let week = parseInt(header.weeks[i])\r\n            td.innerHTML = values[list[j].id][week]\r\n            td.classList.add(\"text-center\")\r\n            tr.append(td)\r\n        }\r\n        target.append(tr)\r\n    }\r\n}\r\n\r\n// EDIT\r\n\r\n/**\r\n * Function generate Edit Table Body \r\n * @param {*} list projectList or OpportunityList \r\n * @param {*} values JSON of cid: vals\r\n * @param {Element} target Element for enbeding result\r\n * @param {String} typeZPID \"1\" - for projects \"0\" - for opportunities \r\n */\r\nfunction editProjectsGenerator(header, list, values, typeZPID, target) {\r\n    for (let j = 0; j < list.length; j++) {\r\n        let tr = document.createElement(\"tr\");\r\n        let projectNameTd = document.createElement(\"td\");\r\n        if (typeZPID === \"1\") {\r\n            projectNameTd.innerHTML = `<b>${list[j].fullName}</b>`\r\n        }\r\n        else if (typeZPID === \"0\") {\r\n            projectNameTd.innerHTML = `<i>${list[j].fullName}</i>`\r\n        }\r\n        tr.append(projectNameTd);\r\n\r\n        for (let i = 0; i < header.weeks.length; i++) {\r\n            let td = document.createElement(\"td\");\r\n            let cid = list[j].cid;\r\n            let week = String(Number(header.weeks[i]));\r\n            td.innerHTML = values[cid][week];\r\n            if (typeZPID === \"1\") {\r\n                td.classList.add(\"project-data\")\r\n            }\r\n            else if (typeZPID === \"0\") {\r\n                td.classList.add(\"opportunity-data\")\r\n            }\r\n            td.classList.add(\"selectable\")\r\n            td.classList.add(\"text-center\")\r\n            tr.append(td);\r\n        }\r\n        target.append(tr);\r\n    }\r\n}\r\n\r\n/**\r\n * This function generate empty row for with sum elements\r\n * @param {any} header JSON from TableModel\r\n * @param {Element} target \r\n */\r\nfunction sumGenerator(header, target) {\r\n    let sumTr = document.createElement(\"tr\");\r\n    let td = document.createElement(\"td\");\r\n    // let verticalSum = sumOfAll();\r\n    sumTr.append(td)\r\n    for (let i = 0; i < header.weeks.length; i++) {\r\n        let td = document.createElement(\"td\");\r\n        // td.innerHTML = verticalSum[i]\r\n        td.classList.add(\"sum-value\")\r\n        td.classList.add(\"text-center\")\r\n        sumTr.append(td)\r\n    }\r\n    target.append(sumTr)\r\n}\r\n\r\n/**\r\n * This function send GET request to server and then generate DropDown menu with projects and opportunities\r\n * @param {Element} target \r\n */\r\nfunction projectListGenerator(header, target) {\r\n    if (target.childElementCount !== 1) return;\r\n    fetch(\"/edit/project_list\")\r\n    .then(response => response.json())\r\n    .then(data => {\r\n        data.projects.forEach((project) => {\r\n            let dropDownItem = document.createElement(\"a\");\r\n            dropDownItem.innerHTML = `p: ${project.fullName}`;\r\n            dropDownItem.classList.add(\"dropdown-item\");\r\n            dropDownItem.href = \"javascript:;\";\r\n            dropDownItem.addEventListener(\"click\", () => addProject(header, project.cid, \"1\"))\r\n            target.append(dropDownItem)\r\n        })\r\n        data.opportunities.forEach((opportunity) => {\r\n            let dropDownItem = document.createElement(\"a\");\r\n            dropDownItem.innerHTML = `o: ${opportunity.fullName}`;\r\n            dropDownItem.classList.add(\"dropdown-item\");\r\n            dropDownItem.href = \"javascript:;\";\r\n            dropDownItem.addEventListener(\"click\", () => addProject(header, opportunity.cid, \"0\"))\r\n            target.append(dropDownItem)\r\n        })\r\n    });\r\n}\r\n\r\n// PROJECT PAGES\r\n\r\n/**\r\n * This function genereate Project Overview\r\n * @param {any} header JSON from TableModel\r\n * @param {Array} list - left list of names\r\n * @param {JSON} values - values JSON\r\n * @param {Element} target - target element\r\n */\r\nfunction projectsTableGenerator(header, list, values, target) {\r\n    for (let j = 0; j < list.length; j++) {\r\n        let tr = document.createElement(\"tr\");\r\n        let nameTd = document.createElement(\"td\");\r\n        nameTd.innerHTML = `<button data-cid='${list[j].cid}' type='button' class='btn btn-link text-left'>${list[j].fullName}</button>`\r\n        nameTd.classList.add(\"item-for-search\")\r\n        tr.append(nameTd)\r\n        for (let i = 0; i < header.weeks.length; i++) {\r\n            let td = document.createElement(\"td\");\r\n            let week = parseInt(header.weeks[i])\r\n            td.innerHTML = values[list[j].cid][week]\r\n            td.classList.add(\"text-center\")\r\n            tr.append(td)\r\n        }\r\n        target.append(tr)\r\n    }\r\n}\r\n\r\n/**\r\n * Function generate Project Edit\r\n * @param {*} list name List\r\n * @param {*} values JSON of userIds: vals\r\n * @param {Element} target Element for enbeding result\r\n */\r\nfunction projectEditGenerator(header, list, values, target) {\r\n    for (let j = 0; j < list.length; j++) {\r\n        let tr = document.createElement(\"tr\");\r\n        let workerName = document.createElement(\"td\");\r\n        workerName.innerHTML = `<b>${list[j].fullName} (${list[j].department})</b>`\r\n        tr.append(workerName);\r\n\r\n        for (let i = 0; i < header.weeks.length; i++) {\r\n            // main td - everything is in it\r\n            let td = document.createElement(\"td\")\r\n\r\n            // cell table with two rows\r\n            let cell = document.createElement(\"table\");\r\n            cell.style = \"margin: auto;\"\r\n            let plannedTr = document.createElement(\"tr\")\r\n            let alocatedTr = document.createElement(\"tr\")\r\n\r\n            let plannedTd = document.createElement(\"td\");\r\n            let alocatedTd = document.createElement(\"td\");\r\n            let workerId = list[j].id;\r\n            let week = String(Number(header.weeks[i]))\r\n\r\n            // planned styling\r\n            plannedTd.innerHTML = values[workerId][week].planned;\r\n            plannedTd.classList.add(\"text-center\")\r\n            plannedTd.classList.add(\"data\")\r\n            plannedTd.contentEditable = true\r\n            plannedTd.style = \"width:40px\"\r\n            plannedTr.append(plannedTd)\r\n            \r\n            // alocated styling\r\n            alocatedTd.innerHTML = values[workerId][week].alocated;\r\n            alocatedTd.classList.add(\"text-center\")\r\n            alocatedTd.style = \"font-size:65%\"\r\n            alocatedTr.append(alocatedTd)\r\n            \r\n            cell.append(plannedTr)\r\n            cell.append(alocatedTr)\r\n            td.append(cell)\r\n            tr.append(td);\r\n        }\r\n        target.append(tr);\r\n    }\r\n}\r\n\r\n\r\n/**\r\n * This function send GET request to server and then generate DropDown menu with names\r\n * @param {Element} target \r\n */\r\nfunction nameListGenerator(target, header) {\r\n    if (target.childElementCount !== 1) return;\r\n    fetch(\"/project_edit/get_names\")\r\n    .then(response => response.json())\r\n    .then(data => {\r\n        data.workers.forEach((worker) => {\r\n            let dropDownItem = document.createElement(\"a\");\r\n            dropDownItem.innerHTML = `${worker.fullName} (${worker.department})`;\r\n            dropDownItem.classList.add(\"dropdown-item\");\r\n            dropDownItem.href = \"javascript:;\";\r\n            dropDownItem.addEventListener(\"click\", () => add_worker(worker.id, header))\r\n            target.append(dropDownItem)\r\n        })\r\n    });\r\n}\r\n\r\nfunction add_worker(worker_id, header) {\r\n    let record = {\r\n        \"cid\": window.location.pathname.split(\"/\").pop(),\r\n        \"workerId\": worker_id,\r\n        \"week\": header.weeks[0],\r\n        \"plannedHours\": \"0\",\r\n        \"year\": header.dateRange.year_start\r\n    }\r\n    fetch('/project_edit/add_worker', {\r\n            method: 'POST',\r\n            body:JSON.stringify(record),\r\n        }\r\n    )\r\n    .then(response => response.json())\r\n    .then(data => {\r\n        console.log(\"succes\", data);\r\n        location.reload();\r\n    })\r\n}\r\n\r\n\r\nfunction addProject(header, cid, typeZpid) {\r\n    let workerId = window.location.pathname.split(\"/\").pop()\r\n    let year = header.dateRange.year_start\r\n    let week = header.weeks[0]\r\n    let plannedHours = \"0\"\r\n    let record = {\"workerId\": workerId, \"cid\": cid, \"typeZpid\": typeZpid, \"year\": year, \"week\": week, \"plannedHours\": plannedHours}\r\n    fetch('/edit/add_new_project/', {\r\n        method: 'POST',\r\n        body: JSON.stringify(record),\r\n    })\r\n    .then(response => response.json())\r\n    .then(data => {\r\n        console.log(\"succes\", data);\r\n        window.location.reload();\r\n    })\r\n}\r\n\n\n//# sourceURL=webpack:///./js/tools/generators.js?");

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
/*! exports provided: get_year */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"get_year\", function() { return get_year; });\n\r\n/**\r\n * \r\n * @param {string} week \r\n */\r\nfunction get_year(week, header) {\r\n    if (header.dateRange.year_start == header.dateRange.year_end || parseInt(week) > parseInt(header.weeks[header.weeks.length - 1])){\r\n        return header.dateRange.year_start;\r\n    } else {\r\n        return header.dateRange.year_end;\r\n    }\r\n}\n\n//# sourceURL=webpack:///./js/tools/utils.js?");

/***/ })

/******/ });