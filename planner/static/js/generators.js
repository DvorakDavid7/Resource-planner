// HEADER

/**
 * This function Display table Header from TableHeader Model
 * @param {Element} target target parent element
 * @param {any} header JSON from TableModel
 */
function headerGenerator(header, target) {
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
    target.append(weeksTr);
    target.append(datesTr);
}

// MAIN TABLE

/**
 * This function genereate main table body
 * @param {any} header JSON from TableModel
 * @param {Array} list - left list of names
 * @param {JSON} values - values JSON
 * @param {Element} target - target element
 */
function mainTableGenerator(header, list, values, target) {
    for (let j = 0; j < list.length; j++) {
        let tr = document.createElement("tr");
        let nameTd = document.createElement("td");
        nameTd.innerHTML = `<button data-id='${list[j].id}' type='button' class='btn btn-link text-left'>${list[j].fullName} (${workerList[j].department})</button>`
        tr.append(nameTd)
        for (let i = 0; i < header.weeks.length; i++) {
            let td = document.createElement("td");
            let week = parseInt(header.weeks[i])
            td.innerHTML = values[list[j].id][week]
            td.classList.add("text-center")
            tr.append(td)
        }
        target.append(tr)
    }
}

// EDIT

/**
 * Function generate Edit Table Body 
 * @param {*} list projectList or OpportunityList 
 * @param {*} values JSON of cid: vals
 * @param {Element} target Element for enbeding result
 * @param {String} typeZPID "1" - for projects "0" - for opportunities 
 */
function editProjectsGenerator(list, values, typeZPID, target) {
    for (let j = 0; j < list.length; j++) {
        let tr = document.createElement("tr");
        let projectNameTd = document.createElement("td");
        if (typeZPID === "1") {
            projectNameTd.innerHTML = `<b>${list[j].fullName}</b>`
        }
        else if (typeZPID === "0") {
            projectNameTd.innerHTML = `<i>${list[j].fullName}</i>`
        }
        tr.append(projectNameTd);

        for (let i = 0; i < header.weeks.length; i++) {
            let td = document.createElement("td");
            let cid = list[j].cid;
            let week = header.weeks[i];
            td.innerHTML = values[cid][week];
            if (typeZPID === "1") {
                td.classList.add("project-data")
            }
            else if (typeZPID === "0") {
                td.classList.add("opportunity-data")
            }
            td.classList.add("selectable")
            td.classList.add("text-center")
            tr.append(td);
        }
        target.append(tr);
    }
}

/**
 * This function generate empty row for with sum elements
 * @param {any} header JSON from TableModel
 * @param {Element} target 
 */
function sumGenerator(header, target) {
    let sumTr = document.createElement("tr");
    let td = document.createElement("td");
    let verticalSum = sumOfAll();
    sumTr.append(td)
    for (let i = 0; i < header.weeks.length; i++) {
        let td = document.createElement("td");
        td.innerHTML = verticalSum[i]
        td.classList.add("sum-value")
        td.classList.add("text-center")
        sumTr.append(td)
    }
    target.append(sumTr)
}

/**
 * This function send GET request to server and then generate DropDown menu with projects and opportunities
 * @param {Element} target 
 */
function projectListGenerator(target) {
    if (dropDown.childElementCount !== 1) return;
    fetch("/edit/project_list")
    .then(response => response.json())
    .then(data => {
        data.projects.forEach((project) => {
            let dropDownItem = document.createElement("a");
            dropDownItem.innerHTML = `p: ${project.fullName}`;
            dropDownItem.classList.add("dropdown-item");
            dropDownItem.href = "javascript:;";
            dropDownItem.addEventListener("click", () => addProject(project.cid, "1"))
            target.append(dropDownItem)
        })
        data.opportunities.forEach((opportunity) => {
            let dropDownItem = document.createElement("a");
            dropDownItem.innerHTML = `o: ${opportunity.fullName}`;
            dropDownItem.classList.add("dropdown-item");
            dropDownItem.href = "javascript:;";
            dropDownItem.addEventListener("click", () => addProject(opportunity.cid, "0"))
            target.append(dropDownItem)
        })
    });
}

// PROJECT PAGES

/**
 * This function genereate Project Overview
 * @param {any} header JSON from TableModel
 * @param {Array} list - left list of names
 * @param {JSON} values - values JSON
 * @param {Element} target - target element
 */
function projectsTableGenerator(header, list, values, target) {
    for (let j = 0; j < list.length; j++) {
        let tr = document.createElement("tr");
        let nameTd = document.createElement("td");
        nameTd.innerHTML = `<button data-cid='${list[j].cid}' type='button' class='btn btn-link text-left'>${list[j].fullName}</button>`
        nameTd.classList.add("item-for-search")
        tr.append(nameTd)
        for (let i = 0; i < header.weeks.length; i++) {
            let td = document.createElement("td");
            let week = parseInt(header.weeks[i])
            td.innerHTML = values[list[j].cid][week]
            td.classList.add("text-center")
            tr.append(td)
        }
        target.append(tr)
    }
}

/**
 * Function generate Project Edit
 * @param {*} list name List
 * @param {*} values JSON of userIds: vals
 * @param {Element} target Element for enbeding result
 */
function projectEditGenerator(list, values, target) {
    for (let j = 0; j < list.length; j++) {
        let tr = document.createElement("tr");
        let workerName = document.createElement("td");
        workerName.innerHTML = `<b>${list[j].fullName} (${list[j].department})</b>`
        tr.append(workerName);

        for (let i = 0; i < header.weeks.length; i++) {
            // main td - everything is in it
            let td = document.createElement("td")

            // cell table with two rows
            let cell = document.createElement("table");
            cell.style = "margin: auto;"
            let plannedTr = document.createElement("tr")
            let alocatedTr = document.createElement("tr")

            let plannedTd = document.createElement("td");
            let alocatedTd = document.createElement("td");
            let workerId = list[j].id;
            let week = header.weeks[i];

            // planned styling
            plannedTd.innerHTML = values[workerId][week].planned;
            plannedTd.classList.add("text-center")
            plannedTd.classList.add("data")
            plannedTd.contentEditable = true
            plannedTd.style = "width:40px"
            plannedTr.append(plannedTd)
            
            // alocated styling
            alocatedTd.innerHTML = values[workerId][week].alocated;
            alocatedTd.classList.add("text-center")
            alocatedTd.style = "font-size:65%"
            alocatedTr.append(alocatedTd)
            
            cell.append(plannedTr)
            cell.append(alocatedTr)
            td.append(cell)
            tr.append(td);
        }
        target.append(tr);
    }
}


/**
 * This function send GET request to server and then generate DropDown menu with names
 * @param {Element} target 
 */
function nameListGenerator(target) {
    if (dropDown.childElementCount !== 1) return;
    fetch("/project_edit/get_names")
    .then(response => response.json())
    .then(data => {
        data.workers.forEach((worker) => {
            let dropDownItem = document.createElement("a");
            dropDownItem.innerHTML = `${worker.fullName} (${worker.department})`;
            dropDownItem.classList.add("dropdown-item");
            dropDownItem.href = "javascript:;";
            dropDownItem.addEventListener("click", () => add_worker(worker.id))
            target.append(dropDownItem)
        })
    });
}