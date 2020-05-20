
let header = JSON.parse(document.querySelector("#dataholder").dataset.header);

let tableModel = JSON.parse(document.querySelector("#dataholder").dataset.tablemodel);
let workerList = tableModel.workerList
let values = tableModel.values
 
const theader = document.querySelector("#header");
const tbody = document.querySelector("#body")

function bodyGenerator() {
    for (let j = 0; j < workerList.length; j++) {
        let tr = document.createElement("tr");
        let nameTd = document.createElement("td");
        nameTd.innerHTML = `<button data-id='${workerList[j].id}' type='button' class='btn btn-link text-left'>${workerList[j].fullName} (${workerList[j].department})</button>`
        tr.append(nameTd)
        for (let i = 0; i < header.weeks.length; i++) {
            let td = document.createElement("td");
            let week = parseInt(header.weeks[i])
            td.innerHTML = values[workerList[j].id][week]
            td.classList.add("text-center")
            tr.append(td)
        }
        tbody.append(tr)
    }
}

headerGenerator(header, theader)
bodyGenerator()

document.querySelectorAll(".btn-link").forEach((button) => {
    button.addEventListener("click", (e) => {
        let workerId = e.srcElement.dataset.id
        let url = `edit/${workerId}?year_start=${'x'}&year_end=${'x'}&week_start=${'x'}&week_end=${'x'}`
        console.log(url);
        
        // window.location = url
    })
})