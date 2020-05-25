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
/******/ 	return __webpack_require__(__webpack_require__.s = "./js/edit.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./js/edit.js":
/*!********************!*\
  !*** ./js/edit.js ***!
  \********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _tools_generators_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tools/generators.js */ \"./js/tools/generators.js\");\n/* harmony import */ var _tools_tableFunctions_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./tools/tableFunctions.js */ \"./js/tools/tableFunctions.js\");\n/* harmony import */ var _tools_utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./tools/utils.js */ \"./js/tools/utils.js\");\n/* harmony import */ var _simonwep_selection_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @simonwep/selection-js */ \"./node_modules/@simonwep/selection-js/dist/selection.min.js\");\n/* harmony import */ var _simonwep_selection_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_simonwep_selection_js__WEBPACK_IMPORTED_MODULE_3__);\n\r\n\r\n\r\n\r\n\r\n\r\n// dataholder JSON parser\r\nlet header = JSON.parse(document.querySelector(\"#dataholder\").dataset.header);\r\nlet body = JSON.parse(document.querySelector(\"#dataholder\").dataset.body);\r\n\r\n// def variables and consts\r\nlet projectList = body.projects.projectList;\r\nlet projectValues = body.projects.values;\r\nlet opportunityList = body.opportunities.opportunityList;\r\nlet opportunityValues = body.opportunities.values;\r\n\r\n\r\n// Cunstome functions\r\nfunction computeSum() {\r\n    let horizontalSum = _tools_tableFunctions_js__WEBPACK_IMPORTED_MODULE_1__[\"sumOfAll\"](header)\r\n    document.querySelectorAll(\".sum-value\").forEach((element, index) => {\r\n        element.innerHTML = horizontalSum[index]\r\n    })\r\n}\r\n\r\n\r\n// DOM Querries\r\nconst theader = document.querySelector(\"#header\");\r\nconst projects = document.querySelector(\"#projects\");\r\nconst opportunities = document.querySelector(\"#opportunities\");\r\nconst sum = document.querySelector(\"#sum\");\r\n\r\n// generator functions call\r\n_tools_generators_js__WEBPACK_IMPORTED_MODULE_0__[\"headerGenerator\"](header, theader);\r\n_tools_generators_js__WEBPACK_IMPORTED_MODULE_0__[\"editProjectsGenerator\"](header, projectList, projectValues, \"1\", projects);\r\n_tools_generators_js__WEBPACK_IMPORTED_MODULE_0__[\"editProjectsGenerator\"](header, opportunityList, opportunityValues, \"0\", opportunities);\r\n_tools_generators_js__WEBPACK_IMPORTED_MODULE_0__[\"sumGenerator\"](header, sum);\r\ncomputeSum();\r\n\r\n// DOM Querries\r\nconst input = document.querySelector(\"#multi-insert\");\r\nconst dropDown = document.querySelector(\".dropdown-menu\");\r\nconst dropbtn = document.querySelector(\".dropdown-toggle\");\r\nconst savebtn = document.querySelector(\"#save\");\r\n\r\n\r\nconst defaultProjectValues = _tools_tableFunctions_js__WEBPACK_IMPORTED_MODULE_1__[\"toMatrix\"](document.querySelectorAll(\".project-data\"), header)\r\nconst defaultOpportunitysValues = _tools_tableFunctions_js__WEBPACK_IMPORTED_MODULE_1__[\"toMatrix\"](document.querySelectorAll(\".opportunity-data\"), header)\r\n\r\n\r\n// Event listenners\r\ndropbtn.addEventListener(\"click\", () => {\r\n    _tools_generators_js__WEBPACK_IMPORTED_MODULE_0__[\"projectListGenerator\"](header, dropDown)\r\n})\r\n\r\ninput.addEventListener(\"keyup\", (e) => {\r\n    if (e.key === \"ArrowRight\") {\r\n        let sel = document.querySelector(\".selected\");\r\n        let next = sel.nextSibling.classList.add(\"selected\");\r\n        sel.classList.remove(\"selected\"); \r\n        input.value = \"\"\r\n    }\r\n    else if (e.key === \"ArrowLeft\") {\r\n        let sel = document.querySelector(\".selected\");\r\n        let next = sel.previousSibling.classList.add(\"selected\");\r\n        sel.classList.remove(\"selected\");    \r\n        input.value = \"\"\r\n    }\r\n    else if (e.key != \"Control\") {\r\n        document.querySelectorAll(\".selected\").forEach((element) => {\r\n            element.innerHTML = input.value;\r\n        });\r\n    }\r\n    // sum upgrade\r\n    computeSum();\r\n})\r\n\r\ndocument.body.addEventListener('dblclick', function (e) {\r\n    _tools_tableFunctions_js__WEBPACK_IMPORTED_MODULE_1__[\"removeSelected\"]()\r\n});\r\n\r\n// make and save changes\r\nsavebtn.addEventListener(\"click\", () => {\r\n    let changes = []\r\n    let currentProjectValues = _tools_tableFunctions_js__WEBPACK_IMPORTED_MODULE_1__[\"toMatrix\"](document.querySelectorAll(\".project-data\"), header)\r\n    let currentOpportunityValues = _tools_tableFunctions_js__WEBPACK_IMPORTED_MODULE_1__[\"toMatrix\"](document.querySelectorAll(\".opportunity-data\"), header)\r\n    let workerId = window.location.pathname.split(\"/\").pop()\r\n    for (let i = 0; i < currentProjectValues.length; i++) {\r\n        for (let j = 0; j < currentProjectValues[i].length; j++) {\r\n            if (currentProjectValues[i][j] !== defaultProjectValues[i][j]) {\r\n                let value = currentProjectValues[i][j]\r\n                let week = header.weeks[j]\r\n                let year = _tools_utils_js__WEBPACK_IMPORTED_MODULE_2__[\"get_year\"](week, header)\r\n                changes.push({\"workerId\": workerId, \"cid\": projectList[i].cid, \"typeZpid\": \"1\", \"year\": year, \"week\": week, \"value\": value});\r\n            }\r\n        }\r\n    }\r\n    for (let i = 0; i < currentOpportunityValues.length; i++) {\r\n        for (let j = 0; j < currentOpportunityValues[i].length; j++) {\r\n            if (currentOpportunityValues[i][j] !== defaultOpportunitysValues[i][j]) {\r\n                let value = currentOpportunityValues[i][j]\r\n                let week = header.weeks[j]\r\n                let year = get_year(week)\r\n                changes.push({\"workerId\": workerId, \"cid\": opportunityList[i].cid, \"typeZpid\": \"0\", \"year\": year, \"week\": week, \"value\": value});\r\n            }\r\n        }\r\n    }\r\n    _tools_tableFunctions_js__WEBPACK_IMPORTED_MODULE_1__[\"saveChanges\"](changes)\r\n});\r\n\r\n\r\n// search\r\n$(document).ready(function(){\r\n    $(\"#myInput\").on(\"keyup\", function() {\r\n        var value = $(this).val().toLowerCase();\r\n        $(\".dropdown-menu a\").filter(function() {\r\n            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)\r\n        });\r\n    });\r\n});\r\n\r\n\r\n// Initialize selectionjs\r\n\r\n/**\r\n * this is library from https://github.com/Simonwep/selection\r\n * doc https://simonwep.github.io/selection/\r\n */\r\nconst selection = _simonwep_selection_js__WEBPACK_IMPORTED_MODULE_3___default.a.create({\r\n\r\n    // Class for the selection-area\r\n    class: 'selection',\r\n\r\n    // All elements in this container can be selected\r\n    selectables: ['.selectable'],\r\n\r\n    // The container is also the boundary in this case\r\n    boundaries: ['table']\r\n}).on('beforestart', evt => {\r\n    // removeSelected()\r\n    input.value = \"\"\r\n    return true\r\n\r\n}).on('start', ({inst, selected, oe}) => {\r\n\r\n    // Remove class if the user isn't pressing the control key or ⌘ key\r\n    if (!oe.ctrlKey && !oe.metaKey) {\r\n\r\n        // Unselect all elements\r\n        for (const el of selected) {\r\n            el.classList.remove('selected');\r\n            inst.removeFromSelection(el);\r\n        }\r\n\r\n        // Clear previous selection\r\n        inst.clearSelection();\r\n    }\r\n\r\n}).on('move', ({changed: {removed, added}}) => {\r\n    \r\n    // Add a custom class to the elements that where selected.\r\n    for (const el of added) {\r\n        el.classList.add('selected');\r\n    }\r\n\r\n    // Remove the class from elements that where removed\r\n    // since the last selection\r\n    for (const el of removed) {\r\n        el.classList.remove('selected');\r\n    }\r\n\r\n}).on('stop', ({inst}) => {\r\n    inst.keepSelection();\r\n    input.focus();\r\n});\r\n\n\n//# sourceURL=webpack:///./js/edit.js?");

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

/***/ }),

/***/ "./node_modules/@simonwep/selection-js/dist/selection.min.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@simonwep/selection-js/dist/selection.min.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/*! Selectionjs 1.7.0 MIT | https://github.com/Simonwep/selection */\n!function(e,t){ true?module.exports=t():undefined}(window,(function(){return function(e){var t={};function n(o){if(t[o])return t[o].exports;var r=t[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}return n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){\"undefined\"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:\"Module\"}),Object.defineProperty(e,\"u\",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&\"object\"==typeof e&&e&&e.u)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,\"default\",{enumerable:!0,value:e}),2&t&&\"string\"!=typeof e)for(var r in e)n.d(o,r,function(t){return e[t]}.bind(null,r));return o},n.n=function(e){var t=e&&e.u?function(){return e.default}:function(){return e};return n.d(t,\"a\",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p=\"dist/\",n(n.s=1)}([function(e){e.exports=JSON.parse('{\"a\":\"1.7.0\"}')},function(e,t,n){\"use strict\";function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function r(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){c(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function c(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function l(e,t,n,o,c={}){t instanceof HTMLCollection||t instanceof NodeList?t=Array.from(t):Array.isArray(t)||(t=[t]),Array.isArray(n)||(n=[n]);for(const l of t)for(const t of n)l[e](t,o,r({capture:!1},c));return Array.prototype.slice.call(arguments,1)}n.r(t);const s=l.bind(null,\"addEventListener\"),i=l.bind(null,\"removeEventListener\"),a=(e,t=\"px\")=>\"number\"==typeof e?e+t:e;function u(e,t,n){const o=e&&e.style;if(o)if(\"object\"==typeof t)for(const[e,n]of Object.entries(t))o[e]=a(n);else n&&\"string\"==typeof t&&(o[t]=a(n))}function f(e,t,n){switch(n||\"touch\"){case\"center\":{const n=t.left+t.width/2,o=t.top+t.height/2;return n>=e.left&&n<=e.right&&o>=e.top&&o<=e.bottom}case\"cover\":return t.left>=e.left&&t.top>=e.top&&t.right<=e.right&&t.bottom<=e.bottom;case\"touch\":return e.right>=t.left&&e.left<=t.right&&e.bottom>=t.top&&e.top<=t.bottom;default:throw new Error(\"Unkown intersection mode: \".concat(n))}}function d(e,t=document){Array.isArray(e)||(e=[e]);const n=[];for(let o=0,r=e.length;o<r;o++){const r=e[o];\"string\"==typeof r?n.push(...t.querySelectorAll(r)):r instanceof t.defaultView.HTMLElement&&n.push(r)}return n}function m(e){let t=e.path||e.composedPath&&e.composedPath();if(t&&t.length>0)return t;let n=e.target;for(t=[n];n=n.parentElement;)t.push(n);return t.push(document,window),t}function p(e,t){const n=e.indexOf(t);~n&&e.splice(n,1)}function v(e){const t=e.touches&&e.touches[0]||e;return{tap:t,x:t.clientX,y:t.clientY,target:t.target}}var b=n(0);const{abs:h,max:y,min:_,round:g,ceil:w}=Math,j=e=>e.preventDefault();function x(e={}){const t={options:Object.assign({class:\"selection-area\",frame:document,mode:\"touch\",tapMode:\"native\",startThreshold:10,singleClick:!0,disableTouch:!1,selectables:[],scrollSpeedDivider:10,manualScrollSpeed:750,startareas:[\"html\"],boundaries:[\"html\"],selectionAreaContainer:\"body\"},e),v:[],h:[],_:[],g:{added:[],removed:[]},j:{beforestart:[],start:[],move:[],stop:[]},O:null,S:null,T:null,A:!0,M:{x:null,y:null},L(){const{frame:e}=t.options;t.O=e.createElement(\"div\"),t.T=e.createElement(\"div\"),t.T.appendChild(t.O),t.O.classList.add(t.options.class),u(t.O,{willChange:\"top, left, bottom, right, width, height\",top:0,left:0,position:\"fixed\"}),u(t.T,{overflow:\"hidden\",position:\"fixed\",transform:\"translate3d(0, 0, 0)\",pointerEvents:\"none\",zIndex:\"1\"}),t.enable()},k(e){const{frame:n}=t.options,o=\"on\"===e?s:i;o(n,\"mousedown\",t.C),t.options.disableTouch||o(n,\"touchstart\",t.C,{passive:!1})},C(e,n=!1){const{x:o,y:r,target:c}=v(e),{startareas:l,boundaries:i,frame:a}=t.options,u=c.getBoundingClientRect(),p=d(l,a);t.D=d(i,a),t.R=t.D.find(e=>f(e.getBoundingClientRect(),u));const b=m(e);t.R&&p.find(e=>b.includes(e))&&t.D.find(e=>b.includes(e))&&(n||!1!==t.F(\"beforestart\",e))&&(t.H=o,t.q=r,t.N=0,t.U=0,t.W=!0,t.clearSelection(!1),s(a,\"selectstart\",j),s(a,[\"touchmove\",\"mousemove\"],t.I,{passive:!1}),s(a,[\"mouseup\",\"touchcancel\",\"touchend\"],t.J),e.preventDefault())},P(e){const{tapMode:n}=t.options,o=v(e);let r=null;if(\"native\"===n)r=o.target;else{if(\"touch\"!==n)throw new Error(\"Unknown tapMode option: \".concat(n));{t.resolveSelectables();const{x:e,y:n}=o;r=t.h.find(t=>{const{right:o,left:r,top:c,bottom:l}=t.getBoundingClientRect();return e<o&&e>r&&n<l&&n>c})}}if(!r)return!1;for(t.resolveSelectables();!t.h.includes(r);){if(!r.parentElement)return;r=r.parentElement}t.F(\"start\",e);const c=t.v;if(e.shiftKey&&c.length){const n=c[c.length-1],[o,l]=4&n.compareDocumentPosition(r)?[r,n]:[n,r],s=[...t.h.filter(e=>4&e.compareDocumentPosition(o)&&2&e.compareDocumentPosition(l)),r];t.select(s),t.F(\"move\",e),t.F(\"stop\",e)}else t.v.includes(r)?t.removeFromSelection(r):t.select(r),t.F(\"move\",e),t.F(\"stop\",e)},I(e){const{x:n,y:o}=v(e),{startThreshold:r,frame:c}=t.options,{H:l,q:a}=t,f=typeof r;if(\"number\"===f&&h(n+o-(l+a))>=r||\"object\"===f&&h(n-l)>=r.x||h(o-a)>=r.y){i(c,[\"mousemove\",\"touchmove\"],t.I,{passive:!1}),s(c,[\"mousemove\",\"touchmove\"],t.B,{passive:!1}),u(t.O,\"display\",\"block\"),d(t.options.selectionAreaContainer,c)[0].appendChild(t.T),t.resolveSelectables(),t.W=!1;const n=t.G=t.R.getBoundingClientRect();g(t.R.scrollHeight)!==g(n.height)||g(t.R.scrollWidth)!==g(n.width)?(t.A=!0,s(window,\"wheel\",t.K,{passive:!1}),t.h=t.h.filter(e=>t.R.contains(e)),u(t.T,{top:n.top,left:n.left,width:n.width,height:n.height}),u(t.O,{marginTop:-n.top,marginLeft:-n.left})):(t.A=!1,u(t.T,{top:0,left:0,width:\"100%\",height:\"100%\"}),u(t.O,{marginTop:0,marginLeft:0})),t.B(e),t.F(\"start\",e)}e.preventDefault()},B(e){const{x:n,y:o}=v(e),{scrollSpeedDivider:r}=t.options,c=t.R;let l=t.M;t.N=n,t.U=o,!t.A||null===l.y&&null===l.x?(t.V(),t.X(),t.F(\"move\",e),t.Y()):requestAnimationFrame((function n(){l=t.M;const o=null!==l.y,s=null!==l.x;if(!o&&!s)return;const{scrollTop:i,scrollLeft:a}=c;o&&(c.scrollTop+=w(l.y/r),t.q-=c.scrollTop-i),s&&(c.scrollLeft+=w(l.x/r),t.H-=c.scrollLeft-a),t.V(),t.X(),t.F(\"move\",e),t.Y(),requestAnimationFrame(n)})),e.preventDefault()},K(e){const{manualScrollSpeed:n}=t.options,o=e.deltaY?e.deltaY>0?1:-1:0,r=e.deltaX?e.deltaX>0?1:-1:0;t.M.y+=o*n,t.M.x+=r*n,t.B(e),e.preventDefault()},V(){const{scrollTop:e,scrollHeight:n,clientHeight:o,scrollLeft:r,scrollWidth:c,clientWidth:l}=t.R,s=t.G,i=t.M;let a=t.N,u=t.U;a<s.left?(i.x=r?-h(s.left-a):null,a=s.left):a>s.left+s.width?(i.x=c-r-l?h(s.left+s.width-a):null,a=s.left+s.width):i.x=null,u<s.top?(i.y=e?-h(s.top-u):null,u=s.top):u>s.top+s.height?(i.y=n-e-o?h(s.top+s.height-u):null,u=s.top+s.height):i.y=null;const f=_(t.H,a),d=_(t.q,u),m=y(t.H,a),p=y(t.q,u);t.S=new DOMRect(f,d,m-f,p-d)},Y(){const{x:e,y:n,width:o,height:r}=t.S,c=t.O.style;c.transform=\"translate3d(\"+e+\"px,\"+n+\"px, 0)\",c.width=o+\"px\",c.height=r+\"px\"},J(e,n){const{frame:o,singleClick:r}=t.options;i(o,[\"mousemove\",\"touchmove\"],t.I),i(o,[\"touchmove\",\"mousemove\"],t.B),i(o,[\"mouseup\",\"touchcancel\",\"touchend\"],t.J),e&&t.W&&r?t.P(e):t.W||n||(t.X(),t.F(\"stop\",e)),t.M={x:null,y:null},i(window,\"wheel\",t.K),t.T.remove(),i(o,\"selectstart\",j),u(t.O,\"display\",\"none\")},X(){const{_:e,h:n,options:o,S:r}=t,{mode:c}=o,l=[],s=[],i=[];for(let t=0;t<n.length;t++){const o=n[t];f(r,o.getBoundingClientRect(),c)&&(e.includes(o)||s.push(o),l.push(o))}for(let t=0;t<e.length;t++){const n=e[t];l.includes(n)||i.push(n)}t._=l,t.g={added:s,removed:i}},F(e,n){let o=!0;for(const r of t.j[e])o=r.call(t,{inst:t,area:t.O,selected:t._.concat(t.v),changed:t.g,oe:n})&&o;return o},trigger(e,n=!0){t.C(e,n)},on:(e,n)=>(t.j[e].push(n),t),off(e,n){const o=t.j[e];if(o){const e=o.indexOf(n);~e&&o.splice(e,1)}return t},resolveSelectables(){t.h=d(t.options.selectables,t.options.frame)},keepSelection(){const{_:e,v:n}=t;for(let t=0;t<e.length;t++){const o=e[t];n.includes(o)||n.push(o)}},clearSelection(e=!0){e&&(t.v=[]),t._=[],t.g.added=[],t.g.removed=[]},removeFromSelection(e){t.g.removed.push(e),p(t.v,e),p(t._,e)},getSelection:()=>t.v,cancel(e=!1){t.J(null,!e)},option(e,n){const{options:o}=t;return void 0===n?o[e]:o[e]=n},disable(){t.k(\"off\")},destroy(){t.disable(),t.T.remove()},enable(){t.k(\"on\")},select(e){const{_:n,v:o,options:r}=t,c=d(e,r.frame).filter(e=>!n.includes(e)&&!o.includes(e));return t._.push(...c),t.g.added.push(...c),c}};return t.L(),t}x.utils={on:s,off:i,css:u,intersects:f,selectAll:d,eventPath:m,removeElement:p},x.create=e=>x(e),x.version=b.a;t.default=x}]).default}));\n//# sourceMappingURL=selection.min.js.map\n\n//# sourceURL=webpack:///./node_modules/@simonwep/selection-js/dist/selection.min.js?");

/***/ })

/******/ });