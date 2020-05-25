import * as Generators from "./tools/generators.js";
import * as TableFunctions from "./tools/tableFunctions.js"
import * as Utils from "./tools/utils.js"



// data parsers
let header = JSON.parse(document.querySelector("#dataholder").dataset.header);
let model = JSON.parse(document.querySelector("#dataholder").dataset.model);


// def variables
let nameList = model.nameList;
let values = model.values;


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

// DOM Querries
const theader = document.querySelector("#header");
const tbody = document.querySelector("#body");

// generator functions call
Generators.headerGenerator(header, theader);
Generators.projectEditGenerator(header, nameList, values, tbody);

// DOM Querries
const dropbtn = document.querySelector(".dropdown-toggle");
const dropDown = document.querySelector(".dropdown-menu");
const submitBtn = document.querySelector("#submit-changes");


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
