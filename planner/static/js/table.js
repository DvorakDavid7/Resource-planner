import * as Generators from "./tools/generators.js";
import { tableSearch } from "./tools/tableFunctions.js";
import TableComponent from "./components/TableComponent.js"



// data parsers
let header = JSON.parse(document.querySelector("#dataholder").dataset.header);
let tableModel = JSON.parse(document.querySelector("#dataholder").dataset.tablemodel);


// def variables
let workerList = tableModel.workerList;
let values = tableModel.values;
 

// DOM queries
const theader = document.querySelector("#header");
const tbody = document.querySelector("#body");
const searchInput = document.querySelector("#search");


// Generators
Generators.headerGenerator(header, theader);
TableComponent(header, workerList, values, tbody);


const rangeForm = document.querySelector("#range-form");
const dateForm = document.querySelector("#date-form");

// Event listeners
searchInput.addEventListener("keyup", () => {   
    tableSearch();
});


rangeForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let [weekFrom, yearFrom] = document.querySelector("#data-range-from").value.split("/");
    let [weekTo, yearTo] = document.querySelector("#data-range-to").value.split("/");
    let data = {
        "dateRange": {
            "year_start": yearFrom,
            "year_end": yearTo,
            "week_start": weekFrom,
            "week_end": weekTo
        },
        "nameList": workerList
    }
    fetch('/table/navigation/set_range', {
        method: 'POST',
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
        let tableModel = data.tableModel;
        let workerList = tableModel.workerList;
        let values = tableModel.values;
        let header = data.header;
        theader.innerHTML = "";
        tbody.innerHTML = "";
        Generators.headerGenerator(header, theader);
        TableComponent(header, workerList, values, tbody);
    })
});

dateForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let week = document.querySelector("#data-week").value;
    let date = document.querySelector("#data-date").value;
    console.log(week);
    console.log(date);
    
    console.log(e.submitter.name);
});