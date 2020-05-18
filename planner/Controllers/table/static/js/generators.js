
const header = JSON.parse(document.querySelector("#dataholder").dataset.header);

const tableModel = JSON.parse(document.querySelector("#dataholder").dataset.tablemodel);
const workerList = tableModel.workerList
const values = tableModel.values
 

const theader = document.querySelector("#header");
const tbody = document.querySelector("#body");

function headerGenerator() {
    let weeksTr = document.createElement("tr");
    let datesTr = document.createElement("tr");
    weeksTr.append(document.createElement("td"))
    datesTr.append(document.createElement("td"))
    for (let i = 0; i < header.weeks.length; i++) {
        let td = document.createElement("td");
        td.innerHTML = `${header.weeks[i]} (${header.workingHours[i]})`
        weeksTr.append(td)
    }    
    for (let i = 0; i < header.weeks.length; i++) {
        let td = document.createElement("td");
        td.innerHTML = header.dates[i]
        datesTr.append(td)
    } 
    theader.append(weeksTr);
    theader.append(datesTr);
}

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

headerGenerator()
bodyGenerator()

document.querySelectorAll(".btn-link").forEach((button) => {
    button.addEventListener("click", (e) => {
        let workerId = e.srcElement.dataset.id
        let url = `edit/${workerId}?year_start=${'x'}&year_end=${'x'}&week_start=${'x'}&week_end=${'x'}`
        console.log(url);
        
        // window.location = url
    })
})