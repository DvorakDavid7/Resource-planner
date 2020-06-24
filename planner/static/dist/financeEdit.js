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
/******/ 	return __webpack_require__(__webpack_require__.s = "./js/financeEdit.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./js/financeEdit.js":
/*!***************************!*\
  !*** ./js/financeEdit.js ***!
  \***************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _tools_selection_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tools/selection.js */ "./js/tools/selection.js");
/* harmony import */ var _tools_tableFunctions_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./tools/tableFunctions.js */ "./js/tools/tableFunctions.js");




// Variables
const projectId = location.pathname.split("/")[3]
let defaultValues;
let phaseList;
let workerList;

// DOM queries
const table = document.querySelector("#table");
const headerRow = document.querySelector("#header-row");
const tbody = document.querySelector(".wrapper tbody");
const spinner = document.querySelector("#spinner");
const input = document.querySelector("#multi-insert");
const saveBtn = document.querySelector("#save-btn");

const trCid = document.querySelector("#cid");
const trProjectId = document.querySelector("#projectId");
const trProjectManager = document.querySelector("#projectManager");
const trDeliveryManager = document.querySelector("#deliveryManager");
const trEstimate = document.querySelector("#estimate");
const trAmount = document.querySelector("#amount");
const projectName = document.querySelector("#projectName");
const resPlannerSum = document.querySelector("#res-planner");
const sumField = document.querySelector("#sum")

// Events
window.addEventListener('load', async () => {
    getProjectInfo()
    const data = await getData();
    spinner.remove()
    generatePhaseTable(data);
    sumField.innerHTML = computeSum();
    defaultValues = toMatrix();
});

input.addEventListener("keyup", insertValues);
document.body.addEventListener('dblclick', _tools_tableFunctions_js__WEBPACK_IMPORTED_MODULE_1__["removeSelected"]);
saveBtn.addEventListener("click", getChangesList)


// Functions


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
    sumField.innerHTML = computeSum();
}



async function getData() {
    let response, responseData;
    try {
        response = await fetch(`/finance/data/${projectId}/`);
        responseData = await response.json();
        return responseData
    } catch (error) {
        return null
    }
}


function generatePhaseTable(data) {
    phaseList = data.phaseList;
    workerList = data.workerList;
    const values = data.values;

    for (let phase of phaseList) {
        let tr = document.createElement("tr");
        let th = document.createElement("th");
        th.scope = "row";
        th.innerText = phase.phaseName;
        tr.appendChild(th);

        for (let worker of workerList) {
            const phaseId = phase.phaseId.toString();
            const workerId = worker.id;
            const value = values[workerId][phaseId];
            let td = document.createElement("td");
            td.innerText = value;
            td.classList.add("text-center");
            td.classList.add("selectable");
            td.classList.add("data");
            tr.appendChild(td);
        }
        tbody.appendChild(tr);
    }

    let thSum = document.createElement("th");
    thSum.scope = "row";
    thSum.innerText = "Sum";
    // tbody.appendChild(thSum);

    let thFirst = document.createElement("th");
    thFirst.scope = "col";   
    headerRow.appendChild(thFirst);

    for (let worker of workerList) {
        const workerName = worker.fullName != null ? worker.fullName : worker.id;
        let th = document.createElement("th");
        th.scope = "col";
        th.innerText = `${workerName} (${worker.role})`;
        th.classList.add("header-data");
        headerRow.appendChild(th);
    }
}


function toMatrix() {
    const data = document.querySelectorAll(".data");
    const headerLength = document.querySelectorAll(".header-data").length;
    let matrix = [];
    let values = []

    for (let element of data) {
        let value = element.innerHTML;
        values.push(value);
    }

    let counter = 0;
    let row = [];
    for (let index = 0; index < values.length; index++) {
        row.push(values[index]);
        counter++;
        if (counter === headerLength) {
            matrix.push(row);
            row = [];
            counter = 0;
        }
    }
    return matrix
}


function getChangesList() {
    let changeList = [];
    const currentValues = toMatrix();
    for (let i = 0; i < defaultValues.length; i++) {
        for (let j = 0; j < defaultValues[i].length; j++) {
            if (defaultValues[i][j] != currentValues[i][j]) {
                let newValue = currentValues[i][j];
                let change = {
                    "planned": newValue,
                    "phaseId": phaseList[i].phaseId,
                    "projectId": projectId,
                    "workerId": workerList[j].id
                }
                changeList.push(change);
            }
        }
    }
    console.log(changeList);
    sendChanges(changeList);
}


async function sendChanges(changeList) {
    const response = await fetch('/finance/save_changes', {
        method: 'POST',
        body: JSON.stringify(changeList),
    });
    const responseData = await response.json();
    if (response.status !== 200) {
        alert(responseData.err)
    }
    
    window.location.reload();
    console.log("succes", responseData);

}


async function getProjectInfo() {
    const response = await fetch(`${window.origin}/finance/projects/info/${projectId}`);
    const responseData = await response.json();
    const project = responseData;

    projectName.innerHTML = project.fullName;
    trCid.innerHTML = project.cid;
    trProjectId.innerHTML = project.projectID;
    trProjectManager.innerHTML = project.projectManager;
    trDeliveryManager.innerHTML = project.deliveryManager;
    trEstimate.innerHTML = project.estimate;
    trAmount.innerHTML = project.amountTotal;
    resPlannerSum.innerHTML = project.resourcePlannerSum;
}


function computeSum() {
    let values = toMatrix();
    let sum = 0;
    for (let i = 0; i < values.length; i++) {
        for (let j = 0; j < values[i].length; j++) {
            let value = parseInt(values[i][j]) ? parseInt(values[i][j]) : 0
            sum += value;
        }
    }
    return sum.toString();
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
    boundaries: ['.selectable-table'],

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
//# sourceMappingURL=financeEdit.js.map