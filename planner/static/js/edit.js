import { projectListGenerator }from "./tools/generators.js";
import * as TableFunctions from "./tools/tableFunctions.js"
import * as Utils from "./tools/utils.js";
import EditComponent from "./components/EditComponent.js";
import HeaderComponent from "./components/HeaderComponent.js";
import { dropDwonSearch } from "./tools/utils.js";
import { setRangeUrl, setDateUrl, navigationMoveUrl } from "./tools/navigationFunctions.js";
import "./tools/selection.js"


// dataholder JSON parser
let header = JSON.parse(document.querySelector("#dataholder").dataset.header);
let tableModel = JSON.parse(document.querySelector("#dataholder").dataset.body);
let userInfo = JSON.parse(document.querySelector("#dataholder").dataset.fullname)


// def variables and consts
let projectList = tableModel.projects.projectList;
let projectValues = tableModel.projects.values;
let opportunityList = tableModel.opportunities.opportunityList;
let opportunityValues = tableModel.opportunities.values;

let defaultProjectValues = [];
let defaultOpportunitiesValues = [];

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
window.addEventListener('load', () => generateTable(tableModel, header));
dropbtn.addEventListener("click",() => projectListGenerator(header, dropDown));
input.addEventListener("keyup", insertValues);
document.body.addEventListener('dblclick', TableFunctions.removeSelected);
savebtn.addEventListener("click", saveChanges);
inputSearch.addEventListener("keyup", dropDwonSearch);
backForm.addEventListener("click", backBtnHandler);
// NAVIGATION
rangeForm.addEventListener("submit", setRangeUrl);
dateForm.addEventListener("submit", e => setDateUrl(e, '/navigation/set_week'));
moveBtnGroup.addEventListener("click", e => navigationMoveUrl(e, header));

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
    console.log("success", responseData);
}


function computeSum() {
    let colourClass = ""
    let horizontalSum = TableFunctions.sumOfAll(header)
    document.querySelectorAll(".sum-value").forEach((element, index) => {
        element.innerHTML = horizontalSum[index];
        element.style.backgroundColor = ""
        let color = TableFunctions.coloringResult(header.workingHours[index], horizontalSum[index]);
        if (color) {
            element.style.backgroundColor = color
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
    defaultOpportunitiesValues = TableFunctions.toMatrix(document.querySelectorAll(".opportunity-data"), header)
    
    let row = 0;
    document.querySelectorAll(".delete").forEach((button) => {
        button.row = row;
        button.addEventListener("click", (e) => {
            deleteRowHandler(e.currentTarget.row);
        });
        row++;
    });
    
    row = 0;
    document.querySelectorAll(".autocomplete").forEach((button) => {
        button.row = row;
        button.header = header;
        button.addEventListener("click", (e) => {
            autocompleteHandler(e.currentTarget.row, e.currentTarget.header);
        });
        row++;
    });
}


function autocompleteHandler(row, header) 
{
    const tableRows = document.querySelectorAll(".table tr")
    const trs = [...tableRows].slice(2, -1);
    const sum = [...tableRows][tableRows.length - 1];

    for (let i = 1; i < sum.children.length; i++) {
        let sumValue = sum.children[i].innerText;
        let cellValue = trs[row].children[i].innerText;
        let reference = header.workingHours[i - 1]

        let cellValueInt = cellValue ? parseInt(cellValue) : 0;
        let sumValueInt = sumValue ? parseInt(sumValue) : 0;
        let referenceInt = reference ? parseInt(reference) : 0;

        let result = referenceInt - (sumValueInt - cellValueInt);
        if (result > 0)
            trs[row].children[i].innerText = result;
    }
    computeSum();
}


function deleteRowHandler(row)
{
    const trs = [...document.querySelectorAll(".table tr")].slice(2, -1);
    for (let i = 1; i < trs[row].children.length - 2; i++) {
        trs[row].children[i].innerText = "";
    }
    computeSum();
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
    let validationReg = /^[0-9]{0,2}$/
    let currentProjectValues = TableFunctions.toMatrix(document.querySelectorAll(".project-data"), header)
    let currentOpportunityValues = TableFunctions.toMatrix(document.querySelectorAll(".opportunity-data"), header)
    let workerId = window.location.pathname.split("/").pop()
    for (let i = 0; i < currentProjectValues.length; i++) {
        for (let j = 0; j < currentProjectValues[i].length; j++) {
            if (currentProjectValues[i][j] !== defaultProjectValues[i][j]) {
                let value = currentProjectValues[i][j];
                if (!validationReg.test(value)) {
                    alert("Some fields contain invalid content");
                    return;
                }
                let week = header.weeks[j];
                let year = Utils.get_year(week, header);
                changes.push({"workerId": workerId, "cid": projectList[i].cid, "typeZpid": "1", "year": year, "week": week, "value": value});
            }
        }
    }
    for (let i = 0; i < currentOpportunityValues.length; i++) {
        for (let j = 0; j < currentOpportunityValues[i].length; j++) {
            if (currentOpportunityValues[i][j] !== defaultOpportunitiesValues[i][j]) {
                let value = currentOpportunityValues[i][j];
                if (!validationReg.test(value)) {
                    alert("Some fields contain invalid content");
                    return;
                }
                let week = header.weeks[j];
                let year = Utils.get_year(week, header);
                changes.push({"workerId": workerId, "cid": opportunityList[i].cid, "typeZpid": "0", "year": year, "week": week, "value": value});
            }
        }
    }
    send_changes(changes)
}
