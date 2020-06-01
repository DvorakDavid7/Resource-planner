import * as Generators from "./tools/generators.js";
import * as TableFunctions from "./tools/tableFunctions.js"
import * as Utils from "./tools/utils.js"
import ProjectEditComponent from "./components/ProjectEditComponent.js"
import HeaderComponent from "./components/HeaderComponent.js"
import { ISO8601_week_number, getDateOfWeek, add_weeks, sub_weeks } from "./tools/utils.js"


// data parsers
let header = JSON.parse(document.querySelector("#dataholder").dataset.header);
let model = JSON.parse(document.querySelector("#dataholder").dataset.model);

// def variables
let nameList = model.nameList;
let values = model.values;

// DOM Querries
const theader = document.querySelector("#header");
const tbody = document.querySelector("#body");
const dropbtn = document.querySelector(".dropdown-toggle");
const dropDown = document.querySelector(".dropdown-menu");
const submitBtn = document.querySelector("#submit-changes");
const rangeForm = document.querySelector("#range-form");
const dateForm = document.querySelector("#date-form");
const moveBtnGroup = document.querySelector("#move");


// custome functions
function send_changes(changes) {
    fetch('/project_edit/save_changes', {
            method: 'POST',
            body:JSON.stringify(changes),
        }
    )
    .then(response => response.json())
    .then(data => {
        console.log("succes", data);
        location.reload();
    })
}


// generator functions call
HeaderComponent(header, theader);
ProjectEditComponent(header, nameList, values, tbody);



let data = document.querySelectorAll(".data");
let default_values = TableFunctions.toMatrix(data, header);


// event listeners
dropbtn.addEventListener("click", () => {
    Generators.nameListGenerator(dropDown, header);
})

submitBtn.addEventListener("click", () => {
    let data = document.querySelectorAll(".data");
    let current_values = TableFunctions.toMatrix(data, header);
    let changes = [];
    let cid = window.location.pathname.split("/").pop();
    for (let i = 0; i < current_values.length; i++) {
        for (let j = 0; j < current_values[i].length; j++) {
            if (current_values[i][j] !== default_values[i][j]) {
                let new_value = current_values[i][j];
                let worker_id = nameList[i].id;
                let week = header.weeks[j];
                let year = Utils.get_year(week, header);
                changes.push({"cid": cid, "workerId": worker_id, "week": week, "value": new_value, "year": year});         
            }
        }
    }
    console.log(changes);
    send_changes(changes);
});


// search
$(document).ready(function(){
    $("#myInput").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $(".dropdown-menu a").filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });
});



// NAVIGATION

rangeForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let [weekFrom, yearFrom] = document.querySelector("#data-range-from").value.split("/");
    let [weekTo, yearTo] = document.querySelector("#data-range-to").value.split("/");

    let search = `?year_start=${yearFrom}&year_end=${yearTo}&week_start=${weekFrom}&week_end=${weekTo}`
    window.location = window.location.pathname + search
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
        }
    };
    
    fetch('/navigation/set_week', {
        method: 'POST',
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
        let {year_start, year_end, week_start, week_end} = data.dateRange;
        let search = `?year_start=${year_start}&year_end=${year_end}&week_start=${week_start}&week_end=${week_end}`;
        window.location = window.location.pathname + search;
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
    let year_start = dateStartPlus.getFullYear().toString();
    let year_end =  dateEndPlus.getFullYear().toString();
    let week_start = ISO8601_week_number(dateStartPlus).toString();
    let week_end = ISO8601_week_number(dateEndPlus).toString();

    let search = `?year_start=${year_start}&year_end=${year_end}&week_start=${week_start}&week_end=${week_end}`;
    window.location = window.location.pathname + search;
});