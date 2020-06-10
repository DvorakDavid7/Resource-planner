import {tableSearch} from "./tools/tableFunctions.js";
import ProjectsComponent from "./components/ProjectsComponent.js"
import HeaderComponent from "./components/HeaderComponent.js"
import { setRange, setDate, navigationMove } from "./tools/navigationFunctions.js"

// Data Parsers
let header = JSON.parse(document.querySelector("#dataholder").dataset.header);
let tableModel = JSON.parse(document.querySelector("#dataholder").dataset.projecttablemodel);
// def variables
let projectList = tableModel.projectList
let values = tableModel.values


// DOM queries
const theader = document.querySelector("#header");
const tbody = document.querySelector("#body")
const rangeForm = document.querySelector("#range-form");
const dateForm = document.querySelector("#date-form");
const moveBtnGroup = document.querySelector("#move");
const searchInput = document.querySelector("#search");
const navbar = document.querySelector(".navbar");


// Event listeners

window.addEventListener('load', generateTable(tableModel, header));
searchInput.addEventListener("keyup", tableSearch);
// NAVIGATION
rangeForm.addEventListener("submit", e => setRange(e, projectList, '/projects/navigation/set_range'));
dateForm.addEventListener("submit", e => setDate(e, projectList, '/projects/navigation/set_week'));
moveBtnGroup.addEventListener("click", e => navigationMove(e, projectList, header, '/projects/navigation/set_range'));

navbar.addEventListener("formEvent", e => generateTable(e.detail.tableModel, e.detail.header));

// Functions

function generateTable(tableModel, newheader) {
    projectList = tableModel.projectList;
    values = tableModel.values;
    header = newheader

    theader.innerHTML = "";
    tbody.innerHTML = "";
    HeaderComponent(header, theader)
    ProjectsComponent(header, projectList, values, tbody)
}
