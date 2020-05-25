import * as Generators from "./tools/generators.js";
import * as TableFunctions from "./tools/tableFunctions.js"
import * as Utils from "./tools/utils.js"
import Selection from "@simonwep/selection-js"


// dataholder JSON parser
let header = JSON.parse(document.querySelector("#dataholder").dataset.header);
let body = JSON.parse(document.querySelector("#dataholder").dataset.body);

// def variables and consts
let projectList = body.projects.projectList;
let projectValues = body.projects.values;
let opportunityList = body.opportunities.opportunityList;
let opportunityValues = body.opportunities.values;


// Cunstome functions
function computeSum() {
    let horizontalSum = TableFunctions.sumOfAll(header)
    document.querySelectorAll(".sum-value").forEach((element, index) => {
        element.innerHTML = horizontalSum[index]
    })
}


// DOM Querries
const theader = document.querySelector("#header");
const projects = document.querySelector("#projects");
const opportunities = document.querySelector("#opportunities");
const sum = document.querySelector("#sum");

// generator functions call
Generators.headerGenerator(header, theader);
Generators.editProjectsGenerator(header, projectList, projectValues, "1", projects);
Generators.editProjectsGenerator(header, opportunityList, opportunityValues, "0", opportunities);
Generators.sumGenerator(header, sum);
computeSum();

// DOM Querries
const input = document.querySelector("#multi-insert");
const dropDown = document.querySelector(".dropdown-menu");
const dropbtn = document.querySelector(".dropdown-toggle");
const savebtn = document.querySelector("#save");


const defaultProjectValues = TableFunctions.toMatrix(document.querySelectorAll(".project-data"), header)
const defaultOpportunitysValues = TableFunctions.toMatrix(document.querySelectorAll(".opportunity-data"), header)


// Event listenners
dropbtn.addEventListener("click", () => {
    Generators.projectListGenerator(header, dropDown)
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
    computeSum();
})

document.body.addEventListener('dblclick', function (e) {
    TableFunctions.removeSelected()
});

// make and save changes
savebtn.addEventListener("click", () => {
    let changes = []
    let currentProjectValues = TableFunctions.toMatrix(document.querySelectorAll(".project-data"), header)
    let currentOpportunityValues = TableFunctions.toMatrix(document.querySelectorAll(".opportunity-data"), header)
    let workerId = window.location.pathname.split("/").pop()
    for (let i = 0; i < currentProjectValues.length; i++) {
        for (let j = 0; j < currentProjectValues[i].length; j++) {
            if (currentProjectValues[i][j] !== defaultProjectValues[i][j]) {
                let value = currentProjectValues[i][j]
                let week = header.weeks[j]
                let year = Utils.get_year(week, header)
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
    TableFunctions.saveChanges(changes)
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
