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
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return HeaderComponent; });
// HEADER

/**
 * This function Display table Header from TableHeader Model
 * @param {Element} target target parent element
 * @param {any} header JSON from TableModel
 */
function HeaderComponent(header, target) {
    let weeksTr = document.createElement("tr");
    let datesTr = document.createElement("tr");

    weeksTr.appendChild(document.createElement("td"))
    datesTr.appendChild(document.createElement("td"))
    for (let i = 0; i < header.weeks.length; i++) {
        let td = document.createElement("td");
        td.innerHTML = `${header.weeks[i]} (${header.workingHours[i]})`
        weeksTr.appendChild(td)
    }    
    for (let i = 0; i < header.weeks.length; i++) {
        let td = document.createElement("td");
        td.innerHTML = header.dates[i]
        datesTr.appendChild(td)
    } 
    target.appendChild(weeksTr);
    target.appendChild(datesTr);
}


/***/ }),

/***/ "./js/components/ProjectEditComponent.js":
/*!***********************************************!*\
  !*** ./js/components/ProjectEditComponent.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return projectEditGenerator; });
/**
 * Function generate Project Edit
 * @param {*} header table header
 * @param {*} list name List
 * @param {*} values JSON of userIds: vals
 * @param {Element} target Element for enbeding result
 */
function projectEditGenerator(header, list, values, target) {
    for (let j = 0; j < list.length; j++) {
        let tr = document.createElement("tr");
        let workerName = document.createElement("td");
        workerName.innerHTML = `<b>${list[j].fullName} (${list[j].department})</b>`
        tr.append(workerName);

        for (let i = 0; i < header.weeks.length; i++) {
            // main td - everything is in it
            let td = document.createElement("td")

            // cell table with two rows
            let cell = document.createElement("table");
            cell.style = "margin: auto;"
            let plannedTr = document.createElement("tr")
            let alocatedTr = document.createElement("tr")

            let plannedTd = document.createElement("td");
            let alocatedTd = document.createElement("td");
            let workerId = list[j].id;
            let week = String(Number(header.weeks[i]))

            // planned styling
            plannedTd.innerHTML = values[workerId][week].planned;
            plannedTd.classList.add("text-center")
            plannedTd.classList.add("data")
            plannedTd.contentEditable = true
            plannedTd.style = "width:40px"
            plannedTr.append(plannedTd)
            
            // alocated styling
            alocatedTd.innerHTML = values[workerId][week].alocated;
            alocatedTd.classList.add("text-center")
            alocatedTd.style = "font-size:65%"
            alocatedTr.append(alocatedTd)
            
            cell.append(plannedTr)
            cell.append(alocatedTr)
            td.append(cell)
            tr.append(td);
        }
        target.append(tr);
    }
}

/***/ }),

/***/ "./js/project_edit.js":
/*!****************************!*\
  !*** ./js/project_edit.js ***!
  \****************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _tools_generators_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tools/generators.js */ "./js/tools/generators.js");
/* harmony import */ var _tools_tableFunctions_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./tools/tableFunctions.js */ "./js/tools/tableFunctions.js");
/* harmony import */ var _tools_utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./tools/utils.js */ "./js/tools/utils.js");
/* harmony import */ var _components_ProjectEditComponent_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/ProjectEditComponent.js */ "./js/components/ProjectEditComponent.js");
/* harmony import */ var _components_HeaderComponent_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/HeaderComponent.js */ "./js/components/HeaderComponent.js");
/* harmony import */ var _tools_navigationFunctions_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./tools/navigationFunctions.js */ "./js/tools/navigationFunctions.js");








// data parsers
let header = JSON.parse(document.querySelector("#dataholder").dataset.header);
let tableModel = JSON.parse(document.querySelector("#dataholder").dataset.model);
// def variables
let nameList = tableModel.nameList;
let values = tableModel.values;
let default_values = []

// DOM Querries
const theader = document.querySelector("#header");
const tbody = document.querySelector("#body");
const dropbtn = document.querySelector(".dropdown-toggle");
const dropDown = document.querySelector(".dropdown-menu");
const submitBtn = document.querySelector("#submit-changes");
const rangeForm = document.querySelector("#range-form");
const dateForm = document.querySelector("#date-form");
const moveBtnGroup = document.querySelector("#move");
const inputSearch = document.querySelector("#myInput");


// event listeners
window.addEventListener('load', () => generateTable(tableModel, header));
dropbtn.addEventListener("click", () => _tools_generators_js__WEBPACK_IMPORTED_MODULE_0__["nameListGenerator"](dropDown, header));
submitBtn.addEventListener("click", saveChanges);
inputSearch.addEventListener("keyup", _tools_utils_js__WEBPACK_IMPORTED_MODULE_2__["dropDwonSearch"]);
// NAVIGATION
rangeForm.addEventListener("submit", _tools_navigationFunctions_js__WEBPACK_IMPORTED_MODULE_5__["setRangeUrl"]);
dateForm.addEventListener("submit", e => Object(_tools_navigationFunctions_js__WEBPACK_IMPORTED_MODULE_5__["setDateUrl"])(e, '/navigation/set_week'));
moveBtnGroup.addEventListener("click", e => Object(_tools_navigationFunctions_js__WEBPACK_IMPORTED_MODULE_5__["navigationMoveUrl"])(e, header));


// functions

function generateTable(tableModel, header) {
    Object(_components_HeaderComponent_js__WEBPACK_IMPORTED_MODULE_4__["default"])(header, theader);
    Object(_components_ProjectEditComponent_js__WEBPACK_IMPORTED_MODULE_3__["default"])(header, tableModel.nameList, tableModel.values, tbody);
    let data = document.querySelectorAll(".data");
    default_values = _tools_tableFunctions_js__WEBPACK_IMPORTED_MODULE_1__["toMatrix"](data, header);
}


async function send_changes(changes) {
    const response = await fetch('/project_edit/save_changes', {
            method: 'POST',
            body:JSON.stringify(changes),
        });
    const responseData = await response.json()
    console.log("succes", responseData);
    location.reload();
}


function saveChanges() {
    let data = document.querySelectorAll(".data");
    let current_values = _tools_tableFunctions_js__WEBPACK_IMPORTED_MODULE_1__["toMatrix"](data, header);
    let changes = [];
    let cid = window.location.pathname.split("/").pop();
    let validationReg = /^[0-9]{0,2}$/
    for (let i = 0; i < current_values.length; i++) {
        for (let j = 0; j < current_values[i].length; j++) {
            if (current_values[i][j] !== default_values[i][j]) {
                let new_value = current_values[i][j];
                if (!validationReg.test(new_value)) {
                    alert("Some fields contain invalid content");
                    return;
                }
                let worker_id = nameList[i].id;
                let week = header.weeks[j];
                let year = _tools_utils_js__WEBPACK_IMPORTED_MODULE_2__["get_year"](week, header);
                changes.push({"cid": cid, "workerId": worker_id, "week": week, "value": new_value, "year": year});         
            }
        }
    }
    send_changes(changes);
}


/***/ }),

/***/ "./js/tools/generators.js":
/*!********************************!*\
  !*** ./js/tools/generators.js ***!
  \********************************/
/*! exports provided: projectListGenerator, nameListGenerator */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "projectListGenerator", function() { return projectListGenerator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "nameListGenerator", function() { return nameListGenerator; });
/**
 * This function send GET request to server and then generate DropDown menu with projects and opportunities
 * @param {Element} target 
 */
function projectListGenerator(header, target) {
    if (target.childElementCount !== 1) return;
    fetch("/edit/project_list")
    .then(response => response.json())
    .then(data => {
        data.projects.forEach((project) => {
            let dropDownItem = document.createElement("a");
            dropDownItem.innerHTML = `p: ${project.fullName}`;
            dropDownItem.classList.add("dropdown-item");
            dropDownItem.href = "javascript:;";
            dropDownItem.addEventListener("click", () => addProject(header, project.cid, "1"))
            target.append(dropDownItem)
        })
        data.opportunities.forEach((opportunity) => {
            let dropDownItem = document.createElement("a");
            dropDownItem.innerHTML = `o: ${opportunity.fullName}`;
            dropDownItem.classList.add("dropdown-item");
            dropDownItem.href = "javascript:;";
            dropDownItem.addEventListener("click", () => addProject(header, opportunity.cid, "0"))
            target.append(dropDownItem)
        })
    });
}

/**
 * This function send GET request to server and then generate DropDown menu with names
 * @param {Element} target 
 */
function nameListGenerator(target, header) {
    if (target.childElementCount !== 1) return;
    fetch("/project_edit/get_names")
    .then(response => response.json())
    .then(data => {
        data.workers.forEach((worker) => {
            let dropDownItem = document.createElement("a");
            dropDownItem.innerHTML = `${worker.fullName} (${worker.department})`;
            dropDownItem.classList.add("dropdown-item");
            dropDownItem.href = "javascript:;";
            dropDownItem.addEventListener("click", () => add_worker(worker.id, header))
            target.append(dropDownItem)
        })
    });
}

function add_worker(worker_id, header) {
    let record = {
        "cid": window.location.pathname.split("/").pop(),
        "workerId": worker_id,
        "week": header.weeks[0],
        "plannedHours": "0",
        "year": header.dateRange.year_start
    }
    fetch('/project_edit/add_worker', {
            method: 'POST',
            body:JSON.stringify(record),
        }
    )
    .then(response => response.json())
    .then(data => {
        console.log("succes", data);
        location.reload();
    })
}


function addProject(header, cid, typeZpid) {
    let workerId = window.location.pathname.split("/").pop()
    let year = header.dateRange.year_start
    let week = header.weeks[0]
    let plannedHours = "0"
    let record = {"workerId": workerId, "cid": cid, "typeZpid": typeZpid, "year": year, "week": week, "plannedHours": plannedHours}
    fetch('/edit/add_new_project/', {
        method: 'POST',
        body: JSON.stringify(record),
    })
    .then(response => response.json())
    .then(data => {
        console.log("succes", data);
        window.location.reload();
    })
}


/***/ }),

/***/ "./js/tools/navigationFunctions.js":
/*!*****************************************!*\
  !*** ./js/tools/navigationFunctions.js ***!
  \*****************************************/
/*! exports provided: setRange, setDate, navigationMove, setRangeUrl, setDateUrl, navigationMoveUrl */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setRange", function() { return setRange; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setDate", function() { return setDate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "navigationMove", function() { return navigationMove; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setRangeUrl", function() { return setRangeUrl; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setDateUrl", function() { return setDateUrl; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "navigationMoveUrl", function() { return navigationMoveUrl; });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "./js/tools/utils.js");
/* harmony import */ var _vaidators_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./vaidators.js */ "./js/tools/vaidators.js");




async function setRange(event, list, apiEndpoint) {
    event.preventDefault();
    let inputFrom = document.querySelector("#data-range-from");
    let inputTo = document.querySelector("#data-range-to");

    // validation
    if (!Object(_vaidators_js__WEBPACK_IMPORTED_MODULE_1__["emptyFieldsValidation"])(inputFrom, inputTo)) {
        alert("Field(s) are empty");
        return;
    }

    if (!Object(_vaidators_js__WEBPACK_IMPORTED_MODULE_1__["matchFormatValidation"])([inputFrom.value, inputTo.value], /^[0-9]{0,1}[0-9]\/[0-9]{4}$/)) {
        alert("Bad format please be sure that data are in week/year format")
        return
    }

    let [weekFrom, yearFrom] = document.querySelector("#data-range-from").value.split("/");
    let [weekTo, yearTo] = document.querySelector("#data-range-to").value.split("/");

    let data = {
        "dateRange": {
            "year_start": yearFrom,
            "year_end": yearTo,
            "week_start": weekFrom,
            "week_end": weekTo
        },
        "list": list
    }

    const response = await fetch(apiEndpoint, {
        method: 'POST',
        body: JSON.stringify(data),
    });
    const responseData = await response.json();
    if (response.status !== 200) {
        alert(responseData.err)
        return
    }
    const formEvent = new CustomEvent("formEvent", {
        detail: {
            tableModel: responseData.tableModel,
            header: responseData.header
        }
    }); 
    document.querySelector(".navbar").dispatchEvent(formEvent);
}


async function setDate(event, list, apiEndpoint) {
    event.preventDefault();
    let weekAndYear = document.querySelector("#data-week");
    let dateString = document.querySelector("#data-date");
    let year, weekNumber = ""

    // validation
    if (!Object(_vaidators_js__WEBPACK_IMPORTED_MODULE_1__["emptyFieldsValidation"])(weekAndYear, dateString)) {
        alert("Field(s) are empty");
        return;
    }

    if (weekAndYear.value != "" && dateString.value === "") {
        if (!Object(_vaidators_js__WEBPACK_IMPORTED_MODULE_1__["matchFormatValidation"])([weekAndYear.value], /^[0-9]{0,1}[0-9]\/[0-9]{4}$/)) {
            alert("the week/year field has incorrect format")
            return
        }
        [weekNumber, year] = weekAndYear.value.split("/")
    }
    else if (weekAndYear.value === "" && dateString.value != "") {
        if (!Object(_vaidators_js__WEBPACK_IMPORTED_MODULE_1__["matchFormatValidation"])([dateString.value], /^[0-9]{1,2}\/[0-1]{0,1}[0-9]\/[0-9]{4}$/)) {
            alert("the date field has incorrect format")
            return
        }
        let [day, month, y] = dateString.value.split("/");
        year = y;       
        let date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));  // the month is 0-indexed        
        weekNumber = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["ISO8601_week_number"])(date).toString();
    }
    else {
        alert("Enter either week/year or date, not both")
        return
    }

    let data = {
        "date": {
            "weekNumber": weekNumber,
            "year": year
        },
        "list": list
    };
    const response = await fetch(apiEndpoint, {
        method: 'POST',
        body: JSON.stringify(data),
    });
    if (response.status !== 200) {
        alert(responseData.err);
        return;
    }
    const responseData = await response.json();
    const formEvent = new CustomEvent("formEvent", {
        detail: {
            tableModel: responseData.tableModel,
            header: responseData.header
        }
    });
    document.querySelector(".navbar").dispatchEvent(formEvent);
}


async function navigationMove(event, list, header, apiEndpoint) {
    const step = 10;
    let dateStart = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["getDateOfWeek"])(header.dateRange.week_start, header.dateRange.year_start);
    let dateEnd = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["getDateOfWeek"])(header.dateRange.week_end, header.dateRange.year_end);
    let dateStartPlus = new Date();
    let dateEndPlus = new Date();

    if (event.srcElement.name === "right") {
        dateStartPlus = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["add_weeks"])(dateStart, step);
        dateEndPlus = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["add_weeks"])(dateEnd, step);
    }
    else if (event.srcElement.name === "left") {
        dateStartPlus = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["sub_weeks"])(dateStart, step);
        dateEndPlus = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["sub_weeks"])(dateEnd, step);
    }
    let data = {
        "dateRange": {
            "year_start": dateStartPlus.getFullYear().toString(),
            "year_end":  dateEndPlus.getFullYear().toString(),
            "week_start": Object(_utils__WEBPACK_IMPORTED_MODULE_0__["ISO8601_week_number"])(dateStartPlus).toString(),
            "week_end": Object(_utils__WEBPACK_IMPORTED_MODULE_0__["ISO8601_week_number"])(dateEndPlus).toString(),
        },
        "list": list
    }
    const response = await fetch(apiEndpoint, {
        method: 'POST',
        body: JSON.stringify(data),
    });
    const responseData = await response.json();
    const formEvent = new CustomEvent("formEvent", {
        detail: {
            tableModel: responseData.tableModel,
            header: responseData.header
        }
    });
    document.querySelector(".navbar").dispatchEvent(formEvent);
}

// Navigation based on URL

function setRangeUrl(event) {
    event.preventDefault();
    let inputFrom = document.querySelector("#data-range-from");
    let inputTo = document.querySelector("#data-range-to");

    // validation
    if (!Object(_vaidators_js__WEBPACK_IMPORTED_MODULE_1__["emptyFieldsValidation"])(inputFrom, inputTo)) {
        alert("Field(s) are empty");
        return;
    }

    if (!Object(_vaidators_js__WEBPACK_IMPORTED_MODULE_1__["matchFormatValidation"])([inputFrom.value, inputTo.value], /^[0-9]{0,1}[0-9]\/[0-9]{4}$/)) {
        alert("Bad format please be sure that data are in week/year format")
        return
    }

    let [weekFrom, yearFrom] = inputFrom.value.split("/");
    let [weekTo, yearTo] = inputTo.value.split("/");
    let search = `?year_start=${yearFrom}&year_end=${yearTo}&week_start=${weekFrom}&week_end=${weekTo}`
    window.location = window.location.pathname + search
}


async function setDateUrl(event, apiEndpoint) {
    event.preventDefault();
    let weekAndYear = document.querySelector("#data-week");
    let dateString = document.querySelector("#data-date");
    let year, weekNumber = ""

    // validation
    if (!Object(_vaidators_js__WEBPACK_IMPORTED_MODULE_1__["emptyFieldsValidation"])(weekAndYear, dateString)) {
        alert("Field(s) are empty");
        return;
    }

    if (weekAndYear.value != "" && dateString.value === "") {
        if (!Object(_vaidators_js__WEBPACK_IMPORTED_MODULE_1__["matchFormatValidation"])([weekAndYear.value], /^[0-9]{0,1}[0-9]\/[0-9]{4}$/)) {
            alert("the week/year field has incorrect format")
            return
        }
        [weekNumber, year] = weekAndYear.value.split("/")
    }
    else if (weekAndYear.value === "" && dateString.value != "") {
        if (!Object(_vaidators_js__WEBPACK_IMPORTED_MODULE_1__["matchFormatValidation"])([dateString.value], /^[0-9]{1,2}\/[0-1]{0,1}[0-9]\/[0-9]{4}$/)) {
            alert("the date field has incorrect format")
            return
        }
        let [day, month, y] = dateString.value.split("/");
        year = y;       
        let date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));  // the month is 0-indexed        
        weekNumber = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["ISO8601_week_number"])(date).toString();
    }
    else {
        alert("Enter either week/year or date, not both")
        return
    }

    let data = {
        "date": {
            "weekNumber": weekNumber,
            "year": year
        }
    };
    const response = await fetch(apiEndpoint, {
        method: 'POST',
        body: JSON.stringify(data),
    });
    const responseData = await response.json();
    if (response.status !== 200) {
        alert(responseData.err);
        return;
    }
    let {year_start, year_end, week_start, week_end} = responseData.dateRange;
    let search = `?year_start=${year_start}&year_end=${year_end}&week_start=${week_start}&week_end=${week_end}`;
    window.location = window.location.pathname + search;
}

function navigationMoveUrl(event, header) {
    const step = 10;
    let dateStart = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["getDateOfWeek"])(header.dateRange.week_start, header.dateRange.year_start);
    let dateEnd = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["getDateOfWeek"])(header.dateRange.week_end, header.dateRange.year_end);
    let dateStartPlus = new Date();
    let dateEndPlus = new Date();

    if (event.srcElement.name === "right") {
        dateStartPlus = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["add_weeks"])(dateStart, step);
        dateEndPlus = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["add_weeks"])(dateEnd, step);
    }
    else if (event.srcElement.name === "left") {
        dateStartPlus = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["sub_weeks"])(dateStart, step);
        dateEndPlus = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["sub_weeks"])(dateEnd, step);
    }            
    let year_start = dateStartPlus.getFullYear().toString();
    let year_end =  dateEndPlus.getFullYear().toString();
    let week_start = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["ISO8601_week_number"])(dateStartPlus).toString();
    let week_end = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["ISO8601_week_number"])(dateEndPlus).toString();

    let search = `?year_start=${year_start}&year_end=${year_end}&week_start=${week_start}&week_end=${week_end}`;
    window.location = window.location.pathname + search;
}

/***/ }),

/***/ "./js/tools/tableFunctions.js":
/*!************************************!*\
  !*** ./js/tools/tableFunctions.js ***!
  \************************************/
/*! exports provided: toMatrix, computeSum, sumOfAll, removeSelected, tableSearch, coloringResult */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toMatrix", function() { return toMatrix; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "computeSum", function() { return computeSum; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sumOfAll", function() { return sumOfAll; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "removeSelected", function() { return removeSelected; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "tableSearch", function() { return tableSearch; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "coloringResult", function() { return coloringResult; });
/**
 * Convert HTML table td data to matrix
 * @param {NodeListOf<Element>} data
 * @returns {Array}
 */
function toMatrix(data, header) {    
    let result = [], row = [];
    let counter = 0;
    
    if (!data.length) {
        let nullRow = []
        for (let i = 0; i < header.weeks.length; i++) {
            nullRow.push(0)
        }
        result.push(nullRow);
        return result;
    }
    for (let i = 0; i < data.length; i++) {
        let value = data[i].innerHTML
        row.push(value)
        counter++
        if (counter === header.weeks.length) {
            result.push(row)
            row = []
            counter = 0
        }
    }
    return result 
}

/**
 * Compute vertical sum from given matrix
 * @param {Array} matrix
 * @returns {Array} 
 */
function computeSum(matrix) {
    let result = []
    for (let j = 0; j < matrix[0].length; j++) {
        let sum = 0
        for (let i = 0; i < matrix.length; i++) {
            let value = matrix[i][j] != "" ? parseInt(matrix[i][j]) : 0
            sum += value
        }
        result.push(sum)
    }
    return result
}

/**Compute vertical sum of Projects and Opportunities */
function sumOfAll(header) {
    let projectData = document.querySelectorAll(".project-data");
    let opportunityData = document.querySelectorAll(".opportunity-data");
    let matr1, matr2, masterMatrix = [];

    matr1 = toMatrix(projectData, header);
    matr2 = toMatrix(opportunityData, header);
   
    masterMatrix.push(computeSum(matr1))
    masterMatrix.push(computeSum(matr2))

    return computeSum(masterMatrix)
}


/**function remove selected area */
function removeSelected() {
    document.querySelectorAll(".selected").forEach((element) => {
        element.classList.remove("selected"); 
        document.querySelector("#multi-insert").blur()
    });
}

/**
 * use for searching in main tables
 * looking for elements with item-for-search class
 */
function tableSearch() {     
    let input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("search");
    filter = input.value.toUpperCase();
    table = document.getElementById("table");
    tr = table.getElementsByTagName("tr");

    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByClassName("item-for-search")[0];
        if (td) {
          txtValue = td.textContent || td.innerText;
          if (txtValue.toUpperCase().indexOf(filter) > -1) {
              tr[i].style.display = "";
          }
          else {
              tr[i].style.display = "none";
          }
        }
    }
}

/**
 * 
 * @param {String | number} workingHours 
 * @param {String | number} planned 
 * @returns {String} - returns colour class name
 */
function coloringResult(workingHours, planned) {
    if (planned == "")
        return
    
    const wHours = parseInt(workingHours);
    const plan = parseInt(planned);

    if (wHours - plan >= 5)
        return "ultraless"

    else if (wHours === plan)
        return "optimal"
    else if (wHours - plan >= -5)
        return "over"
    
    else if (wHours - plan >= -6)
        return "notultraover"

    else if (wHours - plan >= -10)
        return "ultraover"
    
    else return ""
}

/***/ }),

/***/ "./js/tools/utils.js":
/*!***************************!*\
  !*** ./js/tools/utils.js ***!
  \***************************/
/*! exports provided: get_year, ISO8601_week_number, getDateOfWeek, add_weeks, sub_weeks, dropDwonSearch */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "get_year", function() { return get_year; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ISO8601_week_number", function() { return ISO8601_week_number; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getDateOfWeek", function() { return getDateOfWeek; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "add_weeks", function() { return add_weeks; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sub_weeks", function() { return sub_weeks; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "dropDwonSearch", function() { return dropDwonSearch; });

/**
 * 
 * @param {string} week 
 */
function get_year(week, header) {
    if (header.dateRange.year_start == header.dateRange.year_end || parseInt(week) > parseInt(header.weeks[header.weeks.length - 1])){
        return header.dateRange.year_start;
    } else {
        return header.dateRange.year_end;
    }
}

/**
 * Convert Date to week number
 * @param {Date} dt
 * @returns {Number} returns week number for given date
 */
function ISO8601_week_number(dt) {
    const today = dt
    const firstDayOfYear = new Date(today.getFullYear(), 0, 1);
    const pastDaysOfYear = (today - firstDayOfYear) / 86400000;
    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
}

/**
 * 
 * @param {Number} weekNumber 
 * @param {Number} year 
 * @returns {Date} returns Date based on given week and year
 */
function getDateOfWeek(weekNumber,year){
    // Create a date object starting january first of chosen year, plus
    // the number of days in a week multiplied by the week number to get the right date.
    return new Date(year, 0, 1+((weekNumber-1)*7));
}

/**
 * 
 * @param {Date} dt Base Date
 * @param {Number} n step in weeks
 * @returns {Date} returns dt + n weeks
 */
function add_weeks(dt, n) {
    return new Date(dt.setDate(dt.getDate() + (n * 7)));      
}

/**
 * 
 * @param {Date} dt Base Date
 * @param {Number} n step in weeks
 * @returns {Date} returns dt - n weeks
 */
function sub_weeks(dt, n) {
    return new Date(dt.setDate(dt.getDate() - (n * 7)));      
}


/**
 * 
 */
function dropDwonSearch() {
    let value = $(this).val().toLowerCase();
    $(".dropdown-menu a").filter(function() {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
}

/***/ }),

/***/ "./js/tools/vaidators.js":
/*!*******************************!*\
  !*** ./js/tools/vaidators.js ***!
  \*******************************/
/*! exports provided: emptyFieldsValidation, matchFormatValidation */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "emptyFieldsValidation", function() { return emptyFieldsValidation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "matchFormatValidation", function() { return matchFormatValidation; });

/**
 * @param  {...HTMLElement} fields
 * @returns {Boolean}
 */
function emptyFieldsValidation(...fields) {
    for (let field of fields) {
        if (field.value !== "") {
            return true
        }
    }
    return false
}


/**
 * @param {Array<String>} value 
 * @param {RegExp} format
 * @returns {Boolean} Return true if each value of values match the format RegEx othervise return false
 */
function matchFormatValidation(values, format) {
    for (let value of values) {
        if (!format.test(value)) {
            return false
        }
    }
    return true
}


/***/ })

/******/ });
//# sourceMappingURL=project_edit.js.map