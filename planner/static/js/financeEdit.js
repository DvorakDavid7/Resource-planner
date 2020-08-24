import "./tools/selection.js"
import { removeSelected } from "./tools/tableFunctions.js"


// Variables
const projectId = location.pathname.split("/")[3]
let defaultValues;
let defaultValuesFiance = [];
let phaseList;
let workerList;
let data;
let currentTable = "finance";
let project

// DOM queries
const table = document.querySelector("#table");
// const headerRow = document.querySelector("#header-row");
// const tbody = document.querySelector(".wrapper tbody");
const spinner = document.querySelector("#spinner");
const input = document.querySelector("#multi-insert");
const saveBtn = document.querySelector("#save-btn");

const trCid = document.querySelector("#cid");
const trProjectId = document.querySelector("#projectId");
const trProjectManager = document.querySelector("#projectManager");
const trDeliveryManager = document.querySelector("#deliveryManager");
const trEstimate = document.querySelector("#estimate");
const trAmount = document.querySelector("#amount");
const projectName = document.querySelector("#projectName");
const sumField = document.querySelector("#sum")
const initialPlanSwitch = document.querySelector("#initial-plan")
const resourcePlanSwitch = document.querySelector("#resource-plan");

// Events
window.addEventListener('load', async () => {
    initialPlanSwitch.disabled = true
    getProjectInfo()
    data = await getData();
    spinner.remove();
    generatePhaseTable(data);
    sumField.innerHTML = computeSum();
    defaultValues = toMatrix();
    initialPlanSwitch.disabled = false
});

input.addEventListener("keyup", insertValues);
document.body.addEventListener('dblclick', removeSelected);
saveBtn.addEventListener("click", getChangesList);
initialPlanSwitch.addEventListener("click", () => generateInatialPlanTable(data));
resourcePlanSwitch.addEventListener("click", () => window.location.reload());
// Functions


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
    sumField.innerHTML = computeSum();
}



async function getData() {
    let response, responseData;
    try {
        response = await fetch(`/finance/data/${projectId}/`);
        responseData = await response.json();
        return responseData
    } catch (error) {
        return null
    }
}


function generatePhaseTable(data) {
    currentTable = "resources";
    table.innerHTML = `<thead><tr id="header-row"></tr></thead><tbody></tbody>`;
    const headerRow = document.querySelector("#header-row");
    const tbody = document.querySelector(".wrapper tbody");
    phaseList = data.phaseList;
    workerList = data.workerList;
    const values = data.values;

    for (let phase of phaseList) {
        let tr = document.createElement("tr");
        let th = document.createElement("th");
        th.scope = "row";
        th.innerText = phase.phaseName;
        if (phase.status != "active") {
            th.style.backgroundColor = "red"
        }
        tr.appendChild(th);
        for (let worker of workerList) {
            const phaseId = phase.phaseId.toString();
            const workerId = worker.id;
            const value = values[workerId][phaseId];
            let td = document.createElement("td");
            td.innerText = value;
            td.classList.add("text-center");
            td.classList.add("selectable");
            td.classList.add("data");
            tr.appendChild(td);
        }
        tbody.appendChild(tr);
    }

    let thSum = document.createElement("th");
    thSum.scope = "row";
    thSum.innerText = "Sum";
    // tbody.appendChild(thSum);

    let thFirst = document.createElement("th");
    thFirst.scope = "col";
    
    headerRow.appendChild(thFirst);
    for (let worker of workerList) {
        const workerName = worker.fullName != null ? worker.fullName : worker.id;
        let th = document.createElement("th");
        th.scope = "col";
        th.innerText = `${workerName} (${worker.role})`;
        th.classList.add("header-data");
        if (!worker.isWorkerActive) {
            th.style.backgroundColor = "red";
        };
        headerRow.appendChild(th);
    }
}

async function generateInatialPlanTable(data) {
    currentTable = "finance";
    table.innerHTML = `<thead><tr id="header-row"></tr></thead><tbody></tbody>`;
    const headerRow = document.querySelector("#header-row");
    const tbody = document.querySelector(".wrapper tbody");
    phaseList = data.phaseList;
    workerList = data.workerList;

    const response = await fetch(`${window.origin}/finance/initial_planning/get_values/${projectId}`)
    const responseData = await response.json()
    console.log(responseData);
    

    for (let phase of phaseList) {
        let tr = document.createElement("tr");
        let th = document.createElement("th");
        let td = document.createElement("td");
        th.scope = "row";
        th.innerText = phase.phaseName;
        if (responseData[phase.phaseId]) {
            td.innerText = parseInt(responseData[phase.phaseId]).toFixed(2);
        }
        else {
            td.innerText = ""
        }
        if (phase.status != "active") {
            th.style.backgroundColor = "red"
        }
        td.classList.add("selectable");
        td.classList.add("text-center");
        td.classList.add("finance-data")
        tr.appendChild(th);
        tr.appendChild(td);
        tbody.appendChild(tr);
    }
    for (let element of document.querySelectorAll(".finance-data")) {
        defaultValuesFiance.push(element.innerHTML)
    }
}



function toMatrix() {
    const data = document.querySelectorAll(".data");
    const headerLength = document.querySelectorAll(".header-data").length;
    let matrix = [];
    let values = []

    for (let element of data) {
        let value = element.innerHTML;
        values.push(value);
    }

    let counter = 0;
    let row = [];
    for (let index = 0; index < values.length; index++) {
        row.push(values[index]);
        counter++;
        if (counter === headerLength) {
            matrix.push(row);
            row = [];
            counter = 0;
        }
    }
    return matrix
}


function getChangesList() {
    let changeList = [];

    if (currentTable === "finance") {
        let values = document.querySelectorAll(".finance-data");
        for (let i = 0; i < values.length; i++) {
            if(values[i].innerHTML != defaultValuesFiance[i]) {
                let newValue = values[i].innerHTML;
                let change = {
                    "amount": newValue,
                    "phaseId": phaseList[i].phaseId,
                    "projectId": projectId,
                    "cid": project.cid
                }
                changeList.push(change);
            }
        }
        sendChanges(changeList, '/finance/initial_planning/save_changes');
    }
    else if (currentTable === "resources") {       
        const currentValues = toMatrix();
        for (let i = 0; i < defaultValues.length; i++) {
            for (let j = 0; j < defaultValues[i].length; j++) {
                if (defaultValues[i][j] != currentValues[i][j]) {
                    let newValue = currentValues[i][j];
                    let change = {
                        "planned": newValue,
                        "phaseId": phaseList[i].phaseId,
                        "projectId": projectId,
                        "workerId": workerList[j].id
                    }
                    changeList.push(change);
                }
            }
        }
        sendChanges(changeList, '/finance/save_changes');
    }
    console.log(changeList);
}


async function sendChanges(changeList, url) {
    const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(changeList),
    });
    const responseData = await response.json();
    if (response.status !== 200) {
        alert(responseData.err)
    }
    
    window.location.reload();
    console.log("succes", responseData);

}



async function getProjectInfo() {
    const response = await fetch(`${window.origin}/finance/projects/info/${projectId}`);
    const responseData = await response.json();
    project = responseData;

    projectName.innerHTML = project.fullName;
    trCid.innerHTML = project.cid;
    // trProjectId.innerHTML = project.projectID;
    trProjectManager.innerHTML = project.projectManager;
    trDeliveryManager.innerHTML = project.deliveryManager;
    trEstimate.innerHTML = project.estimate + "h | " + (parseInt(project.estimate) / 8).toFixed(1) + "md"; 
    trAmount.innerHTML = project.amountTotal != "None" ? parseInt(project.amountTotal).toFixed(2) + " Kč" : "";
}


function computeSum() {
    let values = toMatrix();
    let sum = 0;
    for (let i = 0; i < values.length; i++) {
        for (let j = 0; j < values[i].length; j++) {
            let value = parseInt(values[i][j]) ? parseInt(values[i][j]) : 0
            sum += value;
        }
    }
    return sum + "h | " + (parseInt(sum) / 8).toFixed(1) + "md";;
}