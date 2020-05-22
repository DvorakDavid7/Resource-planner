
// data parsers
let header = JSON.parse(document.querySelector("#dataholder").dataset.header);

let tableModel = JSON.parse(document.querySelector("#dataholder").dataset.tablemodel);
let workerList = tableModel.workerList
let values = tableModel.values
 
// DOM queries
const theader = document.querySelector("#header");
const tbody = document.querySelector("#body")


// Generators
headerGenerator(header, theader)
mainTableGenerator(header, workerList, values, tbody)

document.querySelectorAll(".btn-link").forEach((button) => {
    button.addEventListener("click", (e) => {
        let workerId = e.srcElement.dataset.id
        let url = `edit/${workerId}?year_start=${'x'}&year_end=${'x'}&week_start=${'x'}&week_end=${'x'}`
        console.log(url);
        
        // window.location = url
    })
})