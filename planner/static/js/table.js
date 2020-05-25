import * as Generators from "./tools/generators.js";
import {tableSearch} from "./tools/tableFunctions.js";



// data parsers
let header = JSON.parse(document.querySelector("#dataholder").dataset.header);
let tableModel = JSON.parse(document.querySelector("#dataholder").dataset.tablemodel);


// def variables
let workerList = tableModel.workerList;
let values = tableModel.values;
 

// DOM queries
const theader = document.querySelector("#header");
const tbody = document.querySelector("#body");

// Generators
Generators.headerGenerator(header, theader);
Generators.mainTableGenerator(header, workerList, values, tbody);

// DOM queries
const nameBtns = document.querySelectorAll(".btn-link");
const searchInput = document.querySelector("#search");


// Event listeners
nameBtns.forEach((button) => {
    button.addEventListener("click", (e) => {
        let workerId = e.srcElement.dataset.id;
        let y_start = header.dateRange.year_start;
        let y_end = header.dateRange.year_end;
        let w_start = header.dateRange.week_start;
        let w_end = header.dateRange.week_end;
        let url = `edit/${workerId}?year_start=${y_start}&year_end=${y_end}&week_start=${w_start}&week_end=${w_end}`;
        window.location = url;
    });
});

searchInput.addEventListener("keyup", () => {   
    tableSearch();
});
