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
const opportunities = document.querySelector("#opportunities")
const input = document.querySelector("#multi-insert");

// generator functions call
headerGenerator(header, theader);
projectsGenerator(projectList, projectValues, projects, "1");
projectsGenerator(opportunityList, opportunityValues, opportunities, "0");

// Event listenners
input.addEventListener("keyup", (e) => {
    console.log(e);
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
})

document.body.addEventListener('dblclick', function (e) {
    removeSelected()
});

let matr1 = toMatrix(document.querySelectorAll(".project-data"))
let matr2 = toMatrix(document.querySelectorAll(".opportunity-data"))