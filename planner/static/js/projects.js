import {tableSearch} from "./tools/tableFunctions.js";
import { ISO8601_week_number, getDateOfWeek, add_weeks, sub_weeks } from "./tools/utils.js"
import ProjectsComponent from "./components/ProjectsComponent.js"
import HeaderComponent from "./components/HeaderComponent.js"


// Data Parsers
let header = JSON.parse(document.querySelector("#dataholder").dataset.header);
let tableModel = JSON.parse(document.querySelector("#dataholder").dataset.projecttablemodel);


// def variables
let projectList = tableModel.projectList
let values = tableModel.values


function regenerateTable(data) {
    let tableModel = data.tableModel;
    projectList = tableModel.projectList;
    values = tableModel.values;
    header = data.header;
    theader.innerHTML = "";
    tbody.innerHTML = "";
    HeaderComponent(header, theader)
    ProjectsComponent(header, projectList, values, tbody)
}


// DOM queries
const theader = document.querySelector("#header");
const tbody = document.querySelector("#body")
const rangeForm = document.querySelector("#range-form");
const dateForm = document.querySelector("#date-form");
const moveBtnGroup = document.querySelector("#move");
const searchInput = document.querySelector("#search");

// generators
HeaderComponent(header, theader)
ProjectsComponent(header, projectList, values, tbody)



// Event listeners
searchInput.addEventListener("keyup", () => {   
    tableSearch()
});


// NAVIGATION

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
        "nameList": projectList
    }
    fetch('/projects/navigation/set_range', {
        method: 'POST',
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
        regenerateTable(data);
    });
});


dateForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let weekAndYear = document.querySelector("#data-week").value;
    let dateString = document.querySelector("#data-date").value;
    let year, weekNumber = ""

    if (weekAndYear != "") {
        [weekNumber, year] = weekAndYear.split("/")
    }
    else if (dateString != "") {
        let [month, day, y] = dateString.split("/");
        year = y;       
        let date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));  // the month is 0-indexed        
        weekNumber = ISO8601_week_number(date).toString();
    }
    let data = {
        "date": {
            "weekNumber": weekNumber,
            "year": year
        },
        "nameList": projectList
    };
    
    fetch('/projects/navigation/set_week', {
        method: 'POST',
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
        regenerateTable(data);
    });   
});

moveBtnGroup.addEventListener("click", (e) => {
    const step = 10;

    let dateStart = getDateOfWeek(header.dateRange.week_start, header.dateRange.year_start);
    let dateEnd = getDateOfWeek(header.dateRange.week_end, header.dateRange.year_end);

    let dateStartPlus = new Date();
    let dateEndPlus = new Date();

    if (e.srcElement.name === "right") {
        dateStartPlus = add_weeks(dateStart, step);
        dateEndPlus = add_weeks(dateEnd, step);
    }
    else if (e.srcElement.name === "left") {
        dateStartPlus = sub_weeks(dateStart, step);
        dateEndPlus = sub_weeks(dateEnd, step);
    }
    let data = {
        "dateRange": {
            "year_start": dateStartPlus.getFullYear().toString(),
            "year_end":  dateEndPlus.getFullYear().toString(),
            "week_start": ISO8601_week_number(dateStartPlus).toString(),
            "week_end": ISO8601_week_number(dateEndPlus).toString(),
        },
        "nameList": projectList
    }
    fetch('/projects/navigation/set_range', {
        method: 'POST',
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
        regenerateTable(data);
    });
})