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

/***/ "./js/components/EditComponent.js":
/*!****************************************!*\
  !*** ./js/components/EditComponent.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return EditComponent; });
/**
 * 
 * @param {*} header 
 * @param {*} list 
 * @param {*} values 
 * @param {String} typeZPID 
 * @param {Element} target 
 */
function EditComponent(header, list, values, typeZPID, targetForTable, targetForSum) {
    // TABLE
    for (let j = 0; j < list.length; j++) {
        let tr = document.createElement("tr");
        let projectNameTd = document.createElement("td");
        if (typeZPID === "1") {
            projectNameTd.innerHTML = `<b>${list[j].fullName}</b>`
        }
        else if (typeZPID === "0") {
            projectNameTd.innerHTML = `<i>${list[j].fullName}</i>`
        }
        tr.append(projectNameTd);

        for (let i = 0; i < header.weeks.length; i++) {
            let td = document.createElement("td");
            let cid = list[j].cid;
            let week = String(Number(header.weeks[i]));
            td.innerHTML = values[cid][week];
            if (typeZPID === "1") {
                td.classList.add("project-data")
            }
            else if (typeZPID === "0") {
                td.classList.add("opportunity-data")
            }
            td.classList.add("selectable")
            td.classList.add("text-center")
            tr.append(td);
        }
        targetForTable.append(tr);
    }
    if (typeZPID === "1") return; // Generate sum after opprortunities

    // SUM
    let sumTr = document.createElement("tr");
    let td = document.createElement("td");
    // let verticalSum = sumOfAll();
    sumTr.append(td)
    for (let i = 0; i < header.weeks.length; i++) {
        let td = document.createElement("td");
        // td.innerHTML = verticalSum[i]
        td.classList.add("sum-value")
        td.classList.add("text-center")
        sumTr.append(td)
    }
    targetForSum.append(sumTr)
}


/***/ }),

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

/***/ "./js/edit.js":
/*!********************!*\
  !*** ./js/edit.js ***!
  \********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _tools_generators_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tools/generators.js */ "./js/tools/generators.js");
/* harmony import */ var _tools_tableFunctions_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./tools/tableFunctions.js */ "./js/tools/tableFunctions.js");
/* harmony import */ var _tools_utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./tools/utils.js */ "./js/tools/utils.js");
/* harmony import */ var _components_EditComponent_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/EditComponent.js */ "./js/components/EditComponent.js");
/* harmony import */ var _components_HeaderComponent_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/HeaderComponent.js */ "./js/components/HeaderComponent.js");
/* harmony import */ var _tools_navigationFunctions_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./tools/navigationFunctions.js */ "./js/tools/navigationFunctions.js");
/* harmony import */ var _tools_selection_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./tools/selection.js */ "./js/tools/selection.js");










// dataholder JSON parser
let header = JSON.parse(document.querySelector("#dataholder").dataset.header);
let tableModel = JSON.parse(document.querySelector("#dataholder").dataset.body);

// def variables and consts
let projectList = tableModel.projects.projectList;
let projectValues = tableModel.projects.values;
let opportunityList = tableModel.opportunities.opportunityList;
let opportunityValues = tableModel.opportunities.values;

let defaultProjectValues = [];
let defaultOpportunitysValues = [];

// DOM Querries
const input = document.querySelector("#multi-insert");
const dropDown = document.querySelector(".dropdown-menu");
const dropbtn = document.querySelector(".dropdown-toggle");
const savebtn = document.querySelector("#save");
const rangeForm = document.querySelector("#range-form");
const dateForm = document.querySelector("#date-form");
const moveBtnGroup = document.querySelector("#move");
const theader = document.querySelector("#header");
const projects = document.querySelector("#projects");
const opportunities = document.querySelector("#opportunities");
const sum = document.querySelector("#sum");
const inputSearch = document.querySelector("#myInput");
const backForm = document.querySelector("#back-form");


// Event listenners
window.addEventListener('load', () => generateTable(tableModel, header));
dropbtn.addEventListener("click",() => Object(_tools_generators_js__WEBPACK_IMPORTED_MODULE_0__["projectListGenerator"])(header, dropDown));
input.addEventListener("keyup", insertValues);
document.body.addEventListener('dblclick', _tools_tableFunctions_js__WEBPACK_IMPORTED_MODULE_1__["removeSelected"]);
savebtn.addEventListener("click", saveChanges);
inputSearch.addEventListener("keyup", _tools_utils_js__WEBPACK_IMPORTED_MODULE_2__["dropDwonSearch"]);
backForm.addEventListener("click", backBtnHandler);
// NAVIGATION
rangeForm.addEventListener("submit", _tools_navigationFunctions_js__WEBPACK_IMPORTED_MODULE_5__["setRangeUrl"]);
dateForm.addEventListener("submit", e => Object(_tools_navigationFunctions_js__WEBPACK_IMPORTED_MODULE_5__["setDateUrl"])(e, '/navigation/set_week'));
moveBtnGroup.addEventListener("click", e => Object(_tools_navigationFunctions_js__WEBPACK_IMPORTED_MODULE_5__["navigationMoveUrl"])(e, header));

// Functions

function backBtnHandler() {    
    const form = document.createElement('form');
    const headerInput = document.createElement('input');
    const listInput = document.createElement('input');
    const valuesInput = document.createElement('input');
    form.method = "POST";
    form.action = "/table";
  
    headerInput.type = "hidden";
    listInput.type = "hidden";
    valuesInput.type = "hidden";

    headerInput.name = "header";
    headerInput.value = JSON.stringify(localStorage.getItem("header"));   
    valuesInput.name = "values"
    valuesInput.value = JSON.stringify(localStorage.getItem("values"));
    listInput.name = "list"
    listInput.value = JSON.stringify(localStorage.getItem("list"));
  
    form.appendChild(headerInput);
    form.appendChild(valuesInput);
    form.appendChild(listInput);

    document.body.appendChild(form);
    form.submit();
}


async function send_changes(changes) {
    const response = await fetch('/edit/save_changes/', {
        method: 'POST',
        body: JSON.stringify(changes),
    });
    const responseData = await response.json();
    window.location.reload();
    console.log("succes", responseData);
}


function computeSum() {
    let colourClass = ""
    let horizontalSum = _tools_tableFunctions_js__WEBPACK_IMPORTED_MODULE_1__["sumOfAll"](header)
    document.querySelectorAll(".sum-value").forEach((element, index) => {
        element.innerHTML = horizontalSum[index];
        element.classList.remove("optimal", "over", "ultraover", "notultraover"); 
        colourClass = _tools_tableFunctions_js__WEBPACK_IMPORTED_MODULE_1__["coloringResult"](header.workingHours[index], horizontalSum[index]);
        if (colourClass) {
            element.classList.add(colourClass);
        }
    })
}


function generateTable(tableModel, header) {
    projectList = tableModel.projects.projectList;
    projectValues = tableModel.projects.values;
    opportunityList = tableModel.opportunities.opportunityList;
    opportunityValues = tableModel.opportunities.values;
    Object(_components_HeaderComponent_js__WEBPACK_IMPORTED_MODULE_4__["default"])(header, theader);
    Object(_components_EditComponent_js__WEBPACK_IMPORTED_MODULE_3__["default"])(header, projectList, projectValues, "1", projects, sum)
    Object(_components_EditComponent_js__WEBPACK_IMPORTED_MODULE_3__["default"])(header, opportunityList, opportunityValues, "0", opportunities, sum)
    computeSum();
    defaultProjectValues = _tools_tableFunctions_js__WEBPACK_IMPORTED_MODULE_1__["toMatrix"](document.querySelectorAll(".project-data"), header)
    defaultOpportunitysValues = _tools_tableFunctions_js__WEBPACK_IMPORTED_MODULE_1__["toMatrix"](document.querySelectorAll(".opportunity-data"), header)
}


function insertValues(event) {
    if (event.key === "ArrowRight") {
        let sel = document.querySelector(".selected");
        let next = sel.nextSibling.classList.add("selected");
        sel.classList.remove("selected"); 
        input.value = ""
    }
    else if (event.key === "ArrowLeft") {
        let sel = document.querySelector(".selected");
        let next = sel.previousSibling.classList.add("selected");
        sel.classList.remove("selected");    
        input.value = ""
    }
    else if (event.key != "Control") {
        document.querySelectorAll(".selected").forEach((element) => {
            element.innerHTML = input.value;
        });
    }
    // sum upgrade
    computeSum();
}


function saveChanges() {
    let changes = []
    let validationReg = /^[0-9]{0,2}$/
    let currentProjectValues = _tools_tableFunctions_js__WEBPACK_IMPORTED_MODULE_1__["toMatrix"](document.querySelectorAll(".project-data"), header)
    let currentOpportunityValues = _tools_tableFunctions_js__WEBPACK_IMPORTED_MODULE_1__["toMatrix"](document.querySelectorAll(".opportunity-data"), header)
    let workerId = window.location.pathname.split("/").pop()
    for (let i = 0; i < currentProjectValues.length; i++) {
        for (let j = 0; j < currentProjectValues[i].length; j++) {
            if (currentProjectValues[i][j] !== defaultProjectValues[i][j]) {
                let value = currentProjectValues[i][j];
                if (!validationReg.test(value)) {
                    alert("Some fields contain invalid content");
                    return;
                }
                let week = header.weeks[j];
                let year = _tools_utils_js__WEBPACK_IMPORTED_MODULE_2__["get_year"](week, header);
                changes.push({"workerId": workerId, "cid": projectList[i].cid, "typeZpid": "1", "year": year, "week": week, "value": value});
            }
        }
    }
    for (let i = 0; i < currentOpportunityValues.length; i++) {
        for (let j = 0; j < currentOpportunityValues[i].length; j++) {
            if (currentOpportunityValues[i][j] !== defaultOpportunitysValues[i][j]) {
                let value = currentOpportunityValues[i][j];
                if (!validationReg.test(value)) {
                    alert("Some fields contain invalid content");
                    return;
                }
                let week = header.weeks[j];
                let year = _tools_utils_js__WEBPACK_IMPORTED_MODULE_2__["get_year"](week, header);
                changes.push({"workerId": workerId, "cid": opportunityList[i].cid, "typeZpid": "0", "year": year, "week": week, "value": value});
            }
        }
    }
    send_changes(changes)
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

    let dateInputFrom = document.querySelector("#date-from");
    let dateInputTo = document.querySelector("#date-to");
    
    let weekFrom, yearFrom, weekTo, yearTo;

    // validation
    if (!Object(_vaidators_js__WEBPACK_IMPORTED_MODULE_1__["emptyFieldsValidation"])(inputFrom, inputTo, dateInputFrom, dateInputTo)) {
        alert("Field(s) are empty");
        return;
    }

    if (inputFrom.value !== "" && dateInputFrom.value === "") {
        if (!Object(_vaidators_js__WEBPACK_IMPORTED_MODULE_1__["matchFormatValidation"])([inputFrom.value, inputTo.value], /^[0-9]{0,1}[0-9]\/[0-9]{4}$/)) {
            alert("Bad format please be sure that data are in week/year format")
            return
        }
        [weekFrom, yearFrom] = document.querySelector("#data-range-from").value.split("/");
        [weekTo, yearTo] = document.querySelector("#data-range-to").value.split("/");
    }
    else if (dateInputFrom.value !== "" && inputFrom.value === "") {
        let dateFrom = new Date(dateInputFrom.value);
        let dateTo = new Date(dateInputTo.value);

        weekFrom = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["ISO8601_week_number"])(dateFrom);
        yearFrom = dateFrom.getFullYear();
        weekTo = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["ISO8601_week_number"])(dateTo);
        yearTo = dateTo.getFullYear();
    }
    else {
        alert("Enter either week range or date range, not both")
        return
    }

    let data = {
        "dateRange": {
            "year_start": yearFrom.toString(),
            "year_end": yearTo.toString(),
            "week_start": weekFrom.toString(),
            "week_end": weekTo.toString()
        },
        "list": list
    }
    console.log(data);
    
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

    let dateInputFrom = document.querySelector("#date-from");
    let dateInputTo = document.querySelector("#date-to");
    
    let weekFrom, yearFrom, weekTo, yearTo;

    // validation
    if (!Object(_vaidators_js__WEBPACK_IMPORTED_MODULE_1__["emptyFieldsValidation"])(inputFrom, inputTo, dateInputFrom, dateInputTo)) {
        alert("Field(s) are empty");
        return;
    }

    if (inputFrom.value !== "" && dateInputFrom.value === "") {
        if (!Object(_vaidators_js__WEBPACK_IMPORTED_MODULE_1__["matchFormatValidation"])([inputFrom.value, inputTo.value], /^[0-9]{0,1}[0-9]\/[0-9]{4}$/)) {
            alert("Bad format please be sure that data are in week/year format")
            return
        }
        [weekFrom, yearFrom] = document.querySelector("#data-range-from").value.split("/");
        [weekTo, yearTo] = document.querySelector("#data-range-to").value.split("/");
    }
    else if (dateInputFrom.value !== "" && inputFrom.value === "") {
        let dateFrom = new Date(dateInputFrom.value);
        let dateTo = new Date(dateInputTo.value);

        weekFrom = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["ISO8601_week_number"])(dateFrom);
        yearFrom = dateFrom.getFullYear();
        weekTo = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["ISO8601_week_number"])(dateTo);
        yearTo = dateTo.getFullYear();
    }
    else {
        alert("Enter either week range or date range, not both")
        return
    }
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

/***/ "./js/tools/selection.js":
/*!*******************************!*\
  !*** ./js/tools/selection.js ***!
  \*******************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _simonwep_selection_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @simonwep/selection-js */ "./node_modules/@simonwep/selection-js/dist/selection.min.js");
/* harmony import */ var _simonwep_selection_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_simonwep_selection_js__WEBPACK_IMPORTED_MODULE_0__);


// Initialize selectionjs

/**
 * this is library from https://github.com/Simonwep/selection
 * doc https://simonwep.github.io/selection/
 */
const selection = _simonwep_selection_js__WEBPACK_IMPORTED_MODULE_0___default.a.create({

    // Class for the selection-area
    class: 'selection',

    // All elements in this container can be selected
    selectables: ['.selectable'],

    // The container is also the boundary in this case
    boundaries: ['table'],

}).on('beforestart', evt => {
    // removeSelected()
    document.querySelector("#multi-insert").value = ""
    return true

}).on('start', ({inst, selected, oe}) => {

    // Remove class if the user isn't pressing the control key or ⌘ key
    if (!oe.ctrlKey && !oe.metaKey) {

        // Unselect all elements
        for (const el of selected) {
            el.classList.remove('selected');
            inst.removeFromSelection(el);
        }

        // Clear previous selection
        inst.clearSelection();
    }

}).on('move', ({changed: {removed, added}}) => {
    
    // Add a custom class to the elements that where selected.
    for (const el of added) {
        el.classList.add('selected');
    }

    // Remove the class from elements that where removed
    // since the last selection
    for (const el of removed) {
        el.classList.remove('selected');
    }

}).on('stop', ({inst}) => {
    inst.keepSelection();
    document.querySelector("#multi-insert").focus();
});


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


/***/ }),

/***/ "./node_modules/@simonwep/selection-js/dist/selection.min.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@simonwep/selection-js/dist/selection.min.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*! Selectionjs 1.7.0 MIT | https://github.com/Simonwep/selection */
!function(e,t){ true?module.exports=t():undefined}(window,(function(){return function(e){var t={};function n(o){if(t[o])return t[o].exports;var r=t[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}return n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"u",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.u)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(o,r,function(t){return e[t]}.bind(null,r));return o},n.n=function(e){var t=e&&e.u?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="dist/",n(n.s=1)}([function(e){e.exports=JSON.parse('{"a":"1.7.0"}')},function(e,t,n){"use strict";function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function r(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){c(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function c(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function l(e,t,n,o,c={}){t instanceof HTMLCollection||t instanceof NodeList?t=Array.from(t):Array.isArray(t)||(t=[t]),Array.isArray(n)||(n=[n]);for(const l of t)for(const t of n)l[e](t,o,r({capture:!1},c));return Array.prototype.slice.call(arguments,1)}n.r(t);const s=l.bind(null,"addEventListener"),i=l.bind(null,"removeEventListener"),a=(e,t="px")=>"number"==typeof e?e+t:e;function u(e,t,n){const o=e&&e.style;if(o)if("object"==typeof t)for(const[e,n]of Object.entries(t))o[e]=a(n);else n&&"string"==typeof t&&(o[t]=a(n))}function f(e,t,n){switch(n||"touch"){case"center":{const n=t.left+t.width/2,o=t.top+t.height/2;return n>=e.left&&n<=e.right&&o>=e.top&&o<=e.bottom}case"cover":return t.left>=e.left&&t.top>=e.top&&t.right<=e.right&&t.bottom<=e.bottom;case"touch":return e.right>=t.left&&e.left<=t.right&&e.bottom>=t.top&&e.top<=t.bottom;default:throw new Error("Unkown intersection mode: ".concat(n))}}function d(e,t=document){Array.isArray(e)||(e=[e]);const n=[];for(let o=0,r=e.length;o<r;o++){const r=e[o];"string"==typeof r?n.push(...t.querySelectorAll(r)):r instanceof t.defaultView.HTMLElement&&n.push(r)}return n}function m(e){let t=e.path||e.composedPath&&e.composedPath();if(t&&t.length>0)return t;let n=e.target;for(t=[n];n=n.parentElement;)t.push(n);return t.push(document,window),t}function p(e,t){const n=e.indexOf(t);~n&&e.splice(n,1)}function v(e){const t=e.touches&&e.touches[0]||e;return{tap:t,x:t.clientX,y:t.clientY,target:t.target}}var b=n(0);const{abs:h,max:y,min:_,round:g,ceil:w}=Math,j=e=>e.preventDefault();function x(e={}){const t={options:Object.assign({class:"selection-area",frame:document,mode:"touch",tapMode:"native",startThreshold:10,singleClick:!0,disableTouch:!1,selectables:[],scrollSpeedDivider:10,manualScrollSpeed:750,startareas:["html"],boundaries:["html"],selectionAreaContainer:"body"},e),v:[],h:[],_:[],g:{added:[],removed:[]},j:{beforestart:[],start:[],move:[],stop:[]},O:null,S:null,T:null,A:!0,M:{x:null,y:null},L(){const{frame:e}=t.options;t.O=e.createElement("div"),t.T=e.createElement("div"),t.T.appendChild(t.O),t.O.classList.add(t.options.class),u(t.O,{willChange:"top, left, bottom, right, width, height",top:0,left:0,position:"fixed"}),u(t.T,{overflow:"hidden",position:"fixed",transform:"translate3d(0, 0, 0)",pointerEvents:"none",zIndex:"1"}),t.enable()},k(e){const{frame:n}=t.options,o="on"===e?s:i;o(n,"mousedown",t.C),t.options.disableTouch||o(n,"touchstart",t.C,{passive:!1})},C(e,n=!1){const{x:o,y:r,target:c}=v(e),{startareas:l,boundaries:i,frame:a}=t.options,u=c.getBoundingClientRect(),p=d(l,a);t.D=d(i,a),t.R=t.D.find(e=>f(e.getBoundingClientRect(),u));const b=m(e);t.R&&p.find(e=>b.includes(e))&&t.D.find(e=>b.includes(e))&&(n||!1!==t.F("beforestart",e))&&(t.H=o,t.q=r,t.N=0,t.U=0,t.W=!0,t.clearSelection(!1),s(a,"selectstart",j),s(a,["touchmove","mousemove"],t.I,{passive:!1}),s(a,["mouseup","touchcancel","touchend"],t.J),e.preventDefault())},P(e){const{tapMode:n}=t.options,o=v(e);let r=null;if("native"===n)r=o.target;else{if("touch"!==n)throw new Error("Unknown tapMode option: ".concat(n));{t.resolveSelectables();const{x:e,y:n}=o;r=t.h.find(t=>{const{right:o,left:r,top:c,bottom:l}=t.getBoundingClientRect();return e<o&&e>r&&n<l&&n>c})}}if(!r)return!1;for(t.resolveSelectables();!t.h.includes(r);){if(!r.parentElement)return;r=r.parentElement}t.F("start",e);const c=t.v;if(e.shiftKey&&c.length){const n=c[c.length-1],[o,l]=4&n.compareDocumentPosition(r)?[r,n]:[n,r],s=[...t.h.filter(e=>4&e.compareDocumentPosition(o)&&2&e.compareDocumentPosition(l)),r];t.select(s),t.F("move",e),t.F("stop",e)}else t.v.includes(r)?t.removeFromSelection(r):t.select(r),t.F("move",e),t.F("stop",e)},I(e){const{x:n,y:o}=v(e),{startThreshold:r,frame:c}=t.options,{H:l,q:a}=t,f=typeof r;if("number"===f&&h(n+o-(l+a))>=r||"object"===f&&h(n-l)>=r.x||h(o-a)>=r.y){i(c,["mousemove","touchmove"],t.I,{passive:!1}),s(c,["mousemove","touchmove"],t.B,{passive:!1}),u(t.O,"display","block"),d(t.options.selectionAreaContainer,c)[0].appendChild(t.T),t.resolveSelectables(),t.W=!1;const n=t.G=t.R.getBoundingClientRect();g(t.R.scrollHeight)!==g(n.height)||g(t.R.scrollWidth)!==g(n.width)?(t.A=!0,s(window,"wheel",t.K,{passive:!1}),t.h=t.h.filter(e=>t.R.contains(e)),u(t.T,{top:n.top,left:n.left,width:n.width,height:n.height}),u(t.O,{marginTop:-n.top,marginLeft:-n.left})):(t.A=!1,u(t.T,{top:0,left:0,width:"100%",height:"100%"}),u(t.O,{marginTop:0,marginLeft:0})),t.B(e),t.F("start",e)}e.preventDefault()},B(e){const{x:n,y:o}=v(e),{scrollSpeedDivider:r}=t.options,c=t.R;let l=t.M;t.N=n,t.U=o,!t.A||null===l.y&&null===l.x?(t.V(),t.X(),t.F("move",e),t.Y()):requestAnimationFrame((function n(){l=t.M;const o=null!==l.y,s=null!==l.x;if(!o&&!s)return;const{scrollTop:i,scrollLeft:a}=c;o&&(c.scrollTop+=w(l.y/r),t.q-=c.scrollTop-i),s&&(c.scrollLeft+=w(l.x/r),t.H-=c.scrollLeft-a),t.V(),t.X(),t.F("move",e),t.Y(),requestAnimationFrame(n)})),e.preventDefault()},K(e){const{manualScrollSpeed:n}=t.options,o=e.deltaY?e.deltaY>0?1:-1:0,r=e.deltaX?e.deltaX>0?1:-1:0;t.M.y+=o*n,t.M.x+=r*n,t.B(e),e.preventDefault()},V(){const{scrollTop:e,scrollHeight:n,clientHeight:o,scrollLeft:r,scrollWidth:c,clientWidth:l}=t.R,s=t.G,i=t.M;let a=t.N,u=t.U;a<s.left?(i.x=r?-h(s.left-a):null,a=s.left):a>s.left+s.width?(i.x=c-r-l?h(s.left+s.width-a):null,a=s.left+s.width):i.x=null,u<s.top?(i.y=e?-h(s.top-u):null,u=s.top):u>s.top+s.height?(i.y=n-e-o?h(s.top+s.height-u):null,u=s.top+s.height):i.y=null;const f=_(t.H,a),d=_(t.q,u),m=y(t.H,a),p=y(t.q,u);t.S=new DOMRect(f,d,m-f,p-d)},Y(){const{x:e,y:n,width:o,height:r}=t.S,c=t.O.style;c.transform="translate3d("+e+"px,"+n+"px, 0)",c.width=o+"px",c.height=r+"px"},J(e,n){const{frame:o,singleClick:r}=t.options;i(o,["mousemove","touchmove"],t.I),i(o,["touchmove","mousemove"],t.B),i(o,["mouseup","touchcancel","touchend"],t.J),e&&t.W&&r?t.P(e):t.W||n||(t.X(),t.F("stop",e)),t.M={x:null,y:null},i(window,"wheel",t.K),t.T.remove(),i(o,"selectstart",j),u(t.O,"display","none")},X(){const{_:e,h:n,options:o,S:r}=t,{mode:c}=o,l=[],s=[],i=[];for(let t=0;t<n.length;t++){const o=n[t];f(r,o.getBoundingClientRect(),c)&&(e.includes(o)||s.push(o),l.push(o))}for(let t=0;t<e.length;t++){const n=e[t];l.includes(n)||i.push(n)}t._=l,t.g={added:s,removed:i}},F(e,n){let o=!0;for(const r of t.j[e])o=r.call(t,{inst:t,area:t.O,selected:t._.concat(t.v),changed:t.g,oe:n})&&o;return o},trigger(e,n=!0){t.C(e,n)},on:(e,n)=>(t.j[e].push(n),t),off(e,n){const o=t.j[e];if(o){const e=o.indexOf(n);~e&&o.splice(e,1)}return t},resolveSelectables(){t.h=d(t.options.selectables,t.options.frame)},keepSelection(){const{_:e,v:n}=t;for(let t=0;t<e.length;t++){const o=e[t];n.includes(o)||n.push(o)}},clearSelection(e=!0){e&&(t.v=[]),t._=[],t.g.added=[],t.g.removed=[]},removeFromSelection(e){t.g.removed.push(e),p(t.v,e),p(t._,e)},getSelection:()=>t.v,cancel(e=!1){t.J(null,!e)},option(e,n){const{options:o}=t;return void 0===n?o[e]:o[e]=n},disable(){t.k("off")},destroy(){t.disable(),t.T.remove()},enable(){t.k("on")},select(e){const{_:n,v:o,options:r}=t,c=d(e,r.frame).filter(e=>!n.includes(e)&&!o.includes(e));return t._.push(...c),t.g.added.push(...c),c}};return t.L(),t}x.utils={on:s,off:i,css:u,intersects:f,selectAll:d,eventPath:m,removeElement:p},x.create=e=>x(e),x.version=b.a;t.default=x}]).default}));
//# sourceMappingURL=selection.min.js.map

/***/ })

/******/ });
//# sourceMappingURL=edit.js.map