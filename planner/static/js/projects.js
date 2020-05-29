import {tableSearch} from "./tools/tableFunctions.js";
import ProjectsComponent from "./components/ProjectsComponent.js"
import HeaderComponent from "./components/HeaderComponent.js"


// Data Parsers
let header = JSON.parse(document.querySelector("#dataholder").dataset.header);
let tableModel = JSON.parse(document.querySelector("#dataholder").dataset.projecttablemodel);


// def variables
let projectList = tableModel.projectList
let values = tableModel.values


// DOM queries
const theader = document.querySelector("#header");
const tbody = document.querySelector("#body")

// generators
HeaderComponent(header, theader)
ProjectsComponent(header, projectList, values, tbody)

// DOM queries
const searchInput = document.querySelector("#search");


// Event listeners
searchInput.addEventListener("keyup", () => {   
    tableSearch()
});

