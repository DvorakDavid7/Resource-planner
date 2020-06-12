import * as Generators from "./tools/generators.js";
import * as TableFunctions from "./tools/tableFunctions.js"
import * as Utils from "./tools/utils.js"
import ProjectEditComponent from "./components/ProjectEditComponent.js"
import HeaderComponent from "./components/HeaderComponent.js"
import { setRangeUrl, setDateUrl, navigationMoveUrl } from "./tools/navigationFunctions.js"
import "./tools/selection.js"

// data parsers
let header = JSON.parse(document.querySelector("#dataholder").dataset.header);
let tableModel = JSON.parse(document.querySelector("#dataholder").dataset.model);
// def variables
let nameList = tableModel.nameList;
let values = tableModel.values;
let default_values = []

// DOM Querries
const theader = document.querySelector("#header");
const tbody = document.querySelector("#body");
const dropbtn = document.querySelector(".dropdown-toggle");
const dropDown = document.querySelector(".dropdown-menu");
const submitBtn = document.querySelector("#submit-changes");
const rangeForm = document.querySelector("#range-form");
const dateForm = document.querySelector("#date-form");
const moveBtnGroup = document.querySelector("#move");
const inputSearch = document.querySelector("#myInput");
const input = document.querySelector("#multi-insert");

// event listeners
window.addEventListener('load', () => generateTable(tableModel, header));
dropbtn.addEventListener("click", () => Generators.nameListGenerator(dropDown, header));
submitBtn.addEventListener("click", saveChanges);
inputSearch.addEventListener("keyup", Utils.dropDwonSearch);
input.addEventListener("keyup", insertValues);
document.body.addEventListener('dblclick', TableFunctions.removeSelected);
// NAVIGATION
rangeForm.addEventListener("submit", setRangeUrl);
dateForm.addEventListener("submit", e => setDateUrl(e, '/navigation/set_week'));
moveBtnGroup.addEventListener("click", e => navigationMoveUrl(e, header));


// functions

function generateTable(tableModel, header) {
    HeaderComponent(header, theader);
    ProjectEditComponent(header, tableModel.nameList, tableModel.values, tbody);
    let data = document.querySelectorAll(".data");
    default_values = TableFunctions.toMatrix(data, header);
}


async function send_changes(changes) {
    const response = await fetch('/project_edit/save_changes', {
            method: 'POST',
            body:JSON.stringify(changes),
        });
    const responseData = await response.json()
    console.log("succes", responseData);
    location.reload();
}


function saveChanges() {
    let data = document.querySelectorAll(".data");    
    let current_values = TableFunctions.toMatrix(data, header);
    let changes = [];
    let cid = window.location.pathname.split("/").pop();
    let validationReg = /^[0-9]{0,2}$/
    for (let i = 0; i < current_values.length; i++) {
        for (let j = 0; j < current_values[i].length; j++) {
            if (current_values[i][j] !== default_values[i][j]) {
                let new_value = current_values[i][j];
                if (!validationReg.test(new_value)) {
                    alert("Some fields contain invalid content");
                    return;
                }
                let worker_id = nameList[i].id;
                let week = header.weeks[j];
                let year = Utils.get_year(week, header);
                changes.push({"cid": cid, "workerId": worker_id, "week": week, "value": new_value, "year": year});         
            }
        }
    }
    send_changes(changes);
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
            element.children[0].children[0].children[0].innerHTML = input.value;
        });
    }
}
