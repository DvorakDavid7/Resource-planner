import { tableSearch } from "./tools/tableFunctions.js";
import { dropDwonSearch } from "./tools/utils.js"
import TableComponent from "./components/TableComponent.js"
import HeaderComponent from "./components/HeaderComponent.js"
import { setRange, setDate, navigationMove } from "./tools/navigationFunctions.js"


// data parsers
let header = JSON.parse(document.querySelector("#dataholder").dataset.header);
let tableModel = JSON.parse(document.querySelector("#dataholder").dataset.tablemodel);
let workerList = tableModel.workerList;
let values = tableModel.values;

// DOM queries
const theader = document.querySelector("#header");
const tbody = document.querySelector("#body");
const searchInput = document.querySelector("#search");
const departmentForm = document.querySelector("#form-department");
const rangeForm = document.querySelector("#range-form");
const dateForm = document.querySelector("#date-form");
const moveBtnGroup = document.querySelector("#move");
const deepSearchForm = document.querySelector("#form-deep-search")
const inputSearch = document.querySelector("#myInput");
const dropbtn = document.querySelector(".dropdown-toggle");
const navbar = document.querySelector(".navbar");

// Event listeners

window.addEventListener('load', () => generateTable(tableModel, header));
searchInput.addEventListener("keyup", tableSearch);
departmentForm.addEventListener("submit", setDepartment);
deepSearchForm.addEventListener("submit", deepSearch);
inputSearch.addEventListener("keyup", dropDwonSearch);
dropbtn.addEventListener("click", groupListGenerator);
// NAVIGATION
rangeForm.addEventListener("submit", e => setRange(e, workerList, '/table/navigation/set_range'));
dateForm.addEventListener("submit", e => setDate(e, workerList, '/table/navigation/set_week'));
moveBtnGroup.addEventListener("click", e => navigationMove(e, workerList, header, '/table/navigation/set_range'));

navbar.addEventListener("formEvent", e => generateTable(e.detail.tableModel, e.detail.header));



// Functions

function generateTable(tableModel, newheader) {
    workerList = tableModel.workerList;
    values = tableModel.values;
    header = newheader;
    
    theader.innerHTML = "";
    tbody.innerHTML = "";
    HeaderComponent(header, theader);
    TableComponent(header, workerList, values, tbody);
}


async function groupListGenerator() {
    const dropDown = document.querySelector(".dropdown-menu");
    if (dropDown.childElementCount !== 1) return;
    const response = await fetch("/groups/show_groups");
    const responseData = await response.json()
    for (let group of responseData.data) {
        let dropDownItem = document.createElement("a");
        dropDownItem.innerHTML = `${group}`;
        dropDownItem.classList.add("dropdown-item");
        dropDownItem.href = "javascript:;";
        dropDownItem.dataset.groupName = `${group}`;
        dropDownItem.addEventListener("click", chooseGroup);
        dropDown.append(dropDownItem);
    }
}


async function chooseGroup(e) {
    const groupName = e.srcElement.dataset.groupName;
    const response = await fetch('/table/set_group', {
        method: 'POST',
        body: JSON.stringify(groupName),
    });
    const responseData = await response.json();
    generateTable(responseData.tableModel, responseData.header);
    
}


async function setDepartment(event) {
    event.preventDefault();
    let department = document.querySelector("#department-value").value;
    if (department.length === 0) {
        alert("Invalid department");
        return;
    }
    let data = {
        "department": department,
        "header": header
    };
    const response = await fetch('/table/set_department', {
        method: 'POST',
        body: JSON.stringify(data),
    });
    const responseData = await response.json();
    generateTable(responseData.tableModel, responseData.header);
}


async function deepSearch(event) {
    event.preventDefault();
    let searchString = document.querySelector("#search").value;
    if (searchString.length === 0) {
        alert("Invalid input for deep search");
        return;
    }
    let data = {
        "search": searchString,
        "header": header
    }
    const response = await fetch('/table/deepsearch', {
        method: 'POST',
        body: JSON.stringify(data),
    });
    const responseData = await response.json();
    generateTable(responseData.tableModel, responseData.header);
}