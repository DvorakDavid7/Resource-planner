import * as Generators from "./tools/generators.js";
import {tableSearch} from "./tools/tableFunctions.js";



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
Generators.headerGenerator(header, theader)
Generators.projectsTableGenerator(header, projectList, values, tbody)

// DOM queries
const searchInput = document.querySelector("#search");
const nameBtns = document.querySelectorAll(".item-for-search")


// Event listeners
searchInput.addEventListener("keyup", () => {   
    tableSearch()
});

nameBtns.forEach((button) => {
    button.addEventListener("click", (e) => {
        let cid = e.srcElement.dataset.cid
        let y_start = header.dateRange.year_start
        let y_end = header.dateRange.year_end
        let w_start = header.dateRange.week_start
        let w_end = header.dateRange.week_end
        let url = `project_edit/${cid}?year_start=${y_start}&year_end=${y_end}&week_start=${w_start}&week_end=${w_end}`
        window.location = url
    })
})
