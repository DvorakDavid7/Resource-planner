//dataholder JSON parser
let header = JSON.parse(document.querySelector("#dataholder").dataset.header);
let body = JSON.parse(document.querySelector("#dataholder").dataset.body);

//projects init from body
let projectList = body.projects.projectList;
let projectValues = body.projects.values;

//opportunities init from body
let opportunityList = body.opportunities.opportunityList;
let opportunityValues = body.opportunities.values;

//DOM Querries
const theader = document.querySelector("#header");
const projects = document.querySelector("#projects");
const sum = document.querySelector("#sum");
const opportunities = document.querySelector("#opportunities");
const input = document.querySelector("#multi-insert");
const dropDown = document.querySelector(".dropdown-menu");
const dropbtn = document.querySelector(".dropdown-toggle");
const savebtn = document.querySelector("#save");

// generator functions call
headerGenerator(header, theader);
editProjectsGenerator(projectList, projectValues, "1", projects);
editProjectsGenerator(opportunityList, opportunityValues, "0", opportunities);
sumGenerator(header, sum)

// save defualt values

const defaultProjectValues = toMatrix(document.querySelectorAll(".project-data"))
const defaultOpportunitysValues = toMatrix(document.querySelectorAll(".opportunity-data"))


// Event listenners
dropbtn.addEventListener("click", () => {
    projectListGenerator(dropDown)
})

input.addEventListener("keyup", (e) => {
    if (e.key === "ArrowRight") {
        let sel = document.querySelector(".selected");
        let next = sel.nextSibling.classList.add("selected");
        sel.classList.remove("selected"); 
        input.value = ""
    }
    else if (e.key === "ArrowLeft") {
        let sel = document.querySelector(".selected");
        let next = sel.previousSibling.classList.add("selected");
        sel.classList.remove("selected");    
        input.value = ""
    }
    else if (e.key != "Control") {
        document.querySelectorAll(".selected").forEach((element) => {
            element.innerHTML = input.value;
        });
    }
    // sum upgrade
    let horizontalSum = sumOfAll()
    document.querySelectorAll(".sum-value").forEach((element, index) => {
        element.innerHTML = horizontalSum[index]
    })
})

document.body.addEventListener('dblclick', function (e) {
    removeSelected()
});

// make and save changes
savebtn.addEventListener("click", () => {
    let changes = []
    let currentProjectValues = toMatrix(document.querySelectorAll(".project-data"))
    let currentOpportunityValues = toMatrix(document.querySelectorAll(".opportunity-data"))
    let workerId = window.location.pathname.split("/").pop()
    for (let i = 0; i < currentProjectValues.length; i++) {
        for (let j = 0; j < currentProjectValues[i].length; j++) {
            if (currentProjectValues[i][j] !== defaultProjectValues[i][j]) {
                let value = currentProjectValues[i][j]
                let week = header.weeks[j]
                let year = get_year(week)
                changes.push({"workerId": workerId, "cid": projectList[i].cid, "typeZpid": "1", "year": year, "week": week, "value": value});
            }
        }
    }
    for (let i = 0; i < currentOpportunityValues.length; i++) {
        for (let j = 0; j < currentOpportunityValues[i].length; j++) {
            if (currentOpportunityValues[i][j] !== defaultOpportunitysValues[i][j]) {
                let value = currentOpportunityValues[i][j]
                let week = header.weeks[j]
                let year = get_year(week)
                changes.push({"workerId": workerId, "cid": opportunityList[i].cid, "typeZpid": "0", "year": year, "week": week, "value": value});
            }
        }
    }
    saveChanges(changes)
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
