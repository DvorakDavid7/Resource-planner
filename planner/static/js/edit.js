import { projectListGenerator }from "./tools/generators.js";
import * as TableFunctions from "./tools/tableFunctions.js"
import * as Utils from "./tools/utils.js"
import Selection from "@simonwep/selection-js"
import EditComponent from "./components/EditComponent.js"
import HeaderComponent from "./components/HeaderComponent.js"
import { ISO8601_week_number, getDateOfWeek, add_weeks, sub_weeks, dropDwonSearch } from "./tools/utils.js"


// dataholder JSON parser
let header = JSON.parse(document.querySelector("#dataholder").dataset.header);
let tableModel = JSON.parse(document.querySelector("#dataholder").dataset.body);

// def variables and consts
let projectList = tableModel.projects.projectList;
let projectValues = tableModel.projects.values;
let opportunityList = tableModel.opportunities.opportunityList;
let opportunityValues = tableModel.opportunities.values;

let defaultProjectValues = [];
let defaultOpportunitysValues = [];

// DOM Querries
const input = document.querySelector("#multi-insert");
const dropDown = document.querySelector(".dropdown-menu");
const dropbtn = document.querySelector(".dropdown-toggle");
const savebtn = document.querySelector("#save");
const rangeForm = document.querySelector("#range-form");
const dateForm = document.querySelector("#date-form");
const moveBtnGroup = document.querySelector("#move");
const theader = document.querySelector("#header");
const projects = document.querySelector("#projects");
const opportunities = document.querySelector("#opportunities");
const sum = document.querySelector("#sum");
const inputSearch = document.querySelector("#myInput");
const backForm = document.querySelector("#back-form");


// Event listenners
window.addEventListener('load', generateTable(tableModel, header));
dropbtn.addEventListener("click", projectListGenerator(header, dropDown));
input.addEventListener("keyup", insertValues);
document.body.addEventListener('dblclick', TableFunctions.removeSelected);
savebtn.addEventListener("click", saveChanges);
inputSearch.addEventListener("keyup", dropDwonSearch);
// NAVIGATION
rangeForm.addEventListener("submit", setRange);
dateForm.addEventListener("submit", setDate);
moveBtnGroup.addEventListener("click", navigationMove);
backForm.addEventListener("click", backBtnHandler);

// Functions

function backBtnHandler() {    
    const form = document.createElement('form');
    const headerInput = document.createElement('input');
    const listInput = document.createElement('input');
    const valuesInput = document.createElement('input');
    form.method = "POST";
    form.action = "/table";
  
    headerInput.type = "hidden";
    listInput.type = "hidden";
    valuesInput.type = "hidden";

    headerInput.name = "header";
    headerInput.value = JSON.stringify(localStorage.getItem("header"));   
    valuesInput.name = "values"
    valuesInput.value = JSON.stringify(localStorage.getItem("values"));
    listInput.name = "list"
    listInput.value = JSON.stringify(localStorage.getItem("list"));
  
    form.appendChild(headerInput);
    form.appendChild(valuesInput);
    form.appendChild(listInput);

    document.body.appendChild(form);
    form.submit();
}


async function send_changes(changes) {
    const response = await fetch('/edit/save_changes/', {
        method: 'POST',
        body: JSON.stringify(changes),
    });
    const responseData = await response.json();
    window.location.reload();
    console.log("succes", responseData);
}


function computeSum() {
    let colourClass = ""
    let horizontalSum = TableFunctions.sumOfAll(header)
    document.querySelectorAll(".sum-value").forEach((element, index) => {
        element.innerHTML = horizontalSum[index];
        element.classList.remove("optimal", "over", "ultraover", "notultraover"); 
        colourClass = TableFunctions.coloringResult(header.workingHours[index], horizontalSum[index]);
        if (colourClass) {
            element.classList.add(colourClass);
        }
    })
}


function generateTable(tableModel, header) {
    projectList = tableModel.projects.projectList;
    projectValues = tableModel.projects.values;
    opportunityList = tableModel.opportunities.opportunityList;
    opportunityValues = tableModel.opportunities.values;
    HeaderComponent(header, theader);
    EditComponent(header, projectList, projectValues, "1", projects, sum)
    EditComponent(header, opportunityList, opportunityValues, "0", opportunities, sum)
    computeSum();
    defaultProjectValues = TableFunctions.toMatrix(document.querySelectorAll(".project-data"), header)
    defaultOpportunitysValues = TableFunctions.toMatrix(document.querySelectorAll(".opportunity-data"), header)
}


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
    // sum upgrade
    computeSum();
}


function saveChanges() {
    let changes = []
    let currentProjectValues = TableFunctions.toMatrix(document.querySelectorAll(".project-data"), header)
    let currentOpportunityValues = TableFunctions.toMatrix(document.querySelectorAll(".opportunity-data"), header)
    let workerId = window.location.pathname.split("/").pop()
    for (let i = 0; i < currentProjectValues.length; i++) {
        for (let j = 0; j < currentProjectValues[i].length; j++) {
            if (currentProjectValues[i][j] !== defaultProjectValues[i][j]) {
                let value = currentProjectValues[i][j];
                let week = header.weeks[j];
                let year = Utils.get_year(week, header);
                changes.push({"workerId": workerId, "cid": projectList[i].cid, "typeZpid": "1", "year": year, "week": week, "value": value});
            }
        }
    }
    for (let i = 0; i < currentOpportunityValues.length; i++) {
        for (let j = 0; j < currentOpportunityValues[i].length; j++) {
            if (currentOpportunityValues[i][j] !== defaultOpportunitysValues[i][j]) {
                let value = currentOpportunityValues[i][j];
                let week = header.weeks[j];
                let year = Utils.get_year(week, header);
                changes.push({"workerId": workerId, "cid": opportunityList[i].cid, "typeZpid": "0", "year": year, "week": week, "value": value});
            }
        }
    }
    send_changes(changes)
}


function setRange(event) {
    event.preventDefault();
    let [weekFrom, yearFrom] = document.querySelector("#data-range-from").value.split("/");
    let [weekTo, yearTo] = document.querySelector("#data-range-to").value.split("/");
    let search = `?year_start=${yearFrom}&year_end=${yearTo}&week_start=${weekFrom}&week_end=${weekTo}`
    window.location = window.location.pathname + search
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
        }
    };
    const response = await fetch('/navigation/set_week', {
        method: 'POST',
        body: JSON.stringify(data),
    });
    const responseData = await response.json();
    let {year_start, year_end, week_start, week_end} = responseData.dateRange;
    let search = `?year_start=${year_start}&year_end=${year_end}&week_start=${week_start}&week_end=${week_end}`;
    window.location = window.location.pathname + search;
}


function navigationMove(event) {
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
    let year_start = dateStartPlus.getFullYear().toString();
    let year_end =  dateEndPlus.getFullYear().toString();
    let week_start = ISO8601_week_number(dateStartPlus).toString();
    let week_end = ISO8601_week_number(dateEndPlus).toString();

    let search = `?year_start=${year_start}&year_end=${year_end}&week_start=${week_start}&week_end=${week_end}`;
    window.location = window.location.pathname + search;
}

// Initialize selectionjs

/**
 * this is library from https://github.com/Simonwep/selection
 * doc https://simonwep.github.io/selection/
 */
const selection = Selection.create({

    // Class for the selection-area
    class: 'selection',

    // All elements in this container can be selected
    selectables: ['.selectable'],

    // The container is also the boundary in this case
    boundaries: ['table']
}).on('beforestart', evt => {
    // removeSelected()
    input.value = ""
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
    input.focus();
});
