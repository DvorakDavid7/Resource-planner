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


// DOM queries
const theader = document.querySelector("#header");
const tbody = document.querySelector("#body")
const rangeForm = document.querySelector("#range-form");
const dateForm = document.querySelector("#date-form");
const moveBtnGroup = document.querySelector("#move");
const searchInput = document.querySelector("#search");


// Event listeners

window.addEventListener('load', generateTable(tableModel, header));
searchInput.addEventListener("keyup", tableSearch);
// NAVIGATION
rangeForm.addEventListener("submit", setRange);
dateForm.addEventListener("submit", setDate);
moveBtnGroup.addEventListener("click", navigationMove)


// Functions

function generateTable(tableModel, header) {
    projectList = tableModel.projectList;
    values = tableModel.values;
    theader.innerHTML = "";
    tbody.innerHTML = "";
    HeaderComponent(header, theader)
    ProjectsComponent(header, projectList, values, tbody)
}


async function setRange(event) {
    event.preventDefault();
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
    const response = await fetch('/projects/navigation/set_range', {
        method: 'POST',
        body: JSON.stringify(data),
    });
    const responseData = await response.json();
    generateTable(responseData.tableModel, responseData.header);
}


async function setDate(event) {
    event.preventDefault();
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
    const response = await fetch('/projects/navigation/set_week', {
        method: 'POST',
        body: JSON.stringify(data),
    });
    const responseData = await response.json();
    generateTable(responseData.tableModel, responseData.header);
}


async function navigationMove(event) {
    const step = 10;
    let dateStart = getDateOfWeek(header.dateRange.week_start, header.dateRange.year_start);
    let dateEnd = getDateOfWeek(header.dateRange.week_end, header.dateRange.year_end);
    let dateStartPlus = new Date();
    let dateEndPlus = new Date();

    if (event.srcElement.name === "right") {
        dateStartPlus = add_weeks(dateStart, step);
        dateEndPlus = add_weeks(dateEnd, step);
    }
    else if (event.srcElement.name === "left") {
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
    const response = await fetch('/projects/navigation/set_range', {
        method: 'POST',
        body: JSON.stringify(data),
    });
    const responseData = await response.json();
    generateTable(responseData.tableModel, responseData.header);
}
