import { tableSearch } from "./tools/tableFunctions.js";


// DOM queries
const table = document.querySelector("#table");
const spinner = document.querySelector("#spinner");
const trCid = document.querySelector("#cid");
const trProjectId = document.querySelector("#projectId");
const trProjectManager = document.querySelector("#projectManager");
const trDeliveryManager = document.querySelector("#deliveryManager");
const trEstimate = document.querySelector("#estimate");
const trAmount = document.querySelector("#amount");
const projectName = document.querySelector("#projectName");
const searchInput = document.querySelector("#search");

// Events
window.addEventListener('load', async () => {
    const projectList = await getData();
    spinner.classList.add("invisible")
    generateFinance(projectList);
});
searchInput.addEventListener("keyup", tableSearch);


// Functions

async function getData() {
    let response, responseData;
    try {
        response = await fetch("/finance/projects");
        responseData = await response.json();
        return responseData
    } catch (error) {
        return null
    }
}


function generateFinance(projectList) {
    for (let project of projectList) {
        let cid = project.projectID;
        let fullProject = project;
        let fullName = project.fullName;
        let tr = document.createElement("tr");
        let tdInfoBtn = document.createElement("td");
        let tdEditBtn = document.createElement("td");
        let td = document.createElement("td");
        let infoBtn = document.createElement("button");
        let editBtn = document.createElement("button");

        infoBtn.innerText = "Info";
        infoBtn.classList.add("btn");
        infoBtn.classList.add("btn-info");
        infoBtn.addEventListener("click", () => displayInfo(fullProject));

        editBtn.innerText = "Edit";
        editBtn.classList.add("btn");
        editBtn.classList.add("btn-success");
        editBtn.addEventListener("click", () => goToEdit(cid));

        tdInfoBtn.appendChild(infoBtn);
        tdEditBtn.appendChild(editBtn);

        td.innerHTML = fullName;
        td.classList.add("item-for-search");
        td.classList.add("spacing");

        tr.appendChild(td);
        tr.appendChild(tdInfoBtn);
        tr.appendChild(tdEditBtn);
        table.appendChild(tr);       
    }
}

function displayInfo(project) {
    projectName.innerHTML = project.fullName
    trCid.innerHTML = project.cid
    trProjectId.innerHTML = project.projectID
    trProjectManager.innerHTML = project.projectManager
    trDeliveryManager.innerHTML = project.deliveryManager
    trEstimate.innerHTML = project.estimate
    trAmount.innerHTML = project.amountTotal
}

function goToEdit(projectId) {
    const url = `/finance/edit/${projectId}/`
    window.location = url;
}

