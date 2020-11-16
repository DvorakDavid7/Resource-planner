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
/******/ 	return __webpack_require__(__webpack_require__.s = "./js/finance.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./js/finance.js":
/*!***********************!*\
  !*** ./js/finance.js ***!
  \***********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _tools_tableFunctions_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tools/tableFunctions.js */ "./js/tools/tableFunctions.js");



// DOM queries
const table = document.querySelector("#table");
const spinner = document.querySelector("#spinner");
const trCid = document.querySelector("#cid");
const trPlanner = document.querySelector("#planner");
const trProjectManager = document.querySelector("#projectManager");
const trDeliveryManager = document.querySelector("#deliveryManager");
const trEstimate = document.querySelector("#estimate");
const trAmount = document.querySelector("#amount");
const projectName = document.querySelector("#projectName");
const searchInput = document.querySelector("#search");

// Events
window.addEventListener('load', async () => {
    const projectList = await getData();
    spinner.classList.add("invisible")
    generateFinance(projectList);
});
searchInput.addEventListener("keyup", _tools_tableFunctions_js__WEBPACK_IMPORTED_MODULE_0__["tableSearch"]);


// Functions

async function getData() {
    let response, responseData;
    try {
        response = await fetch("/finance/projects");
        responseData = await response.json();
        return responseData
    } catch (error) {
        return null
    }
}


function generateFinance(projectList) {
    for (let project of projectList) {
        let cid = project.projectID;
        let fullProject = project;
        let fullName = project.fullName;
        let tr = document.createElement("tr");
        let tdInfoBtn = document.createElement("td");
        let tdEditBtn = document.createElement("td");
        let td = document.createElement("td");
        let infoBtn = document.createElement("button");
        let editBtn = document.createElement("button");

        infoBtn.innerText = "Info";
        infoBtn.classList.add("btn");
        infoBtn.classList.add("btn-info");
        infoBtn.addEventListener("click", () => displayInfo(fullProject));

        editBtn.innerText = "Edit";
        editBtn.classList.add("btn");
        editBtn.classList.add("btn-success");
        editBtn.addEventListener("click", () => goToEdit(cid));

        tdInfoBtn.appendChild(infoBtn);
        tdEditBtn.appendChild(editBtn);

        td.innerHTML = fullName;
        td.classList.add("item-for-search");
        td.classList.add("spacing");

        tr.appendChild(td);
        tr.appendChild(tdInfoBtn);
        tr.appendChild(tdEditBtn);
        table.appendChild(tr);       
    }
}

async function displayInfo(project) {
    const response = await fetch(`/finance/projects/sum/${project.projectID}`);
    const responseData = await response.json();
    trPlanner.innerHTML = responseData.sum ? responseData.sum + "h | " + (parseInt(responseData.sum) / 8).toFixed(1) + "md" : "0h | 0md";
    projectName.innerHTML = project.fullName
    trCid.innerHTML = project.cid
    // trProjectId.innerHTML = project.projectID
    trProjectManager.innerHTML = project.projectManager != "None" ? project.projectManager : "";
    trDeliveryManager.innerHTML = project.deliveryManager != "None" ?  project.deliveryManager : "";
    trEstimate.innerHTML = project.estimate + "h | " + (parseInt(project.estimate) / 8).toFixed(1) + "md"; 
    trAmount.innerHTML = project.amountTotal != "None" ? parseInt(project.amountTotal).toFixed(2) + " Kč" : "";
}

function goToEdit(projectId) {
    const url = `/finance/edit/${projectId}/`
    window.location = url;
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
        return ""
    
    const wHours = parseInt(workingHours);
    const plan = parseInt(planned);

    const alpha = 0.5

    if (wHours - plan === 0)
        return `rgb(0, 255, 127, ${alpha})`

    else if (wHours - plan > 0)
        return `rgb(135, 206, 235, ${alpha})`

    else if (wHours - plan < 0)
        return `rgb(255, 160, 122, ${alpha})`

    return ""
}

/***/ })

/******/ });
//# sourceMappingURL=finance.js.map