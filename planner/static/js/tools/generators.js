/**
 * This function send GET request to server and then generate DropDown menu with projects and opportunities
 * @param {Element} target 
 */
export function projectListGenerator(header, target) {
    if (target.childElementCount !== 1) return;
    fetch("/edit/project_list")
    .then(response => response.json())
    .then(data => {
        data.projects.forEach((project) => {
            let dropDownItem = document.createElement("a");
            dropDownItem.innerHTML = `p: ${project.fullName}`;
            dropDownItem.classList.add("dropdown-item");
            if (project["status"] === "Uzavřeno") {
                dropDownItem.style.color = "red"
            }
            dropDownItem.href = "javascript:;";
            dropDownItem.addEventListener("click", () => addProject(header, project.cid, "1"))
            target.append(dropDownItem)
        })
        data.opportunities.forEach((opportunity) => {
            let dropDownItem = document.createElement("a");
            dropDownItem.innerHTML = `o: ${opportunity.fullName}`;
            dropDownItem.classList.add("dropdown-item");
            if (opportunity["status"] === 2) {
                dropDownItem.style.color = "red"
            }
            dropDownItem.href = "javascript:;";
            dropDownItem.addEventListener("click", () => addProject(header, opportunity.cid, "0"))
            target.append(dropDownItem)
        })
    });
}

/**
 * This function send GET request to server and then generate DropDown menu with names
 * @param {Element} target 
 */
export function nameListGenerator(target, header) {
    if (target.childElementCount !== 1) return;
    fetch("/project_edit/get_names")
    .then(response => response.json())
    .then(data => {
        data.workers.forEach((worker) => {
            let dropDownItem = document.createElement("a");
            dropDownItem.innerHTML = `${worker.fullName} (${worker.department})`;
            dropDownItem.classList.add("dropdown-item");
            dropDownItem.href = "javascript:;";
            dropDownItem.addEventListener("click", () => add_worker(worker.id, header))
            target.append(dropDownItem)
        })
    });
}

function add_worker(worker_id, header) {
    let record = {
        "cid": window.location.pathname.split("/").pop(),
        "workerId": worker_id,
        "week": header.weeks[0],
        "plannedHours": "0",
        "year": header.dateRange.year_start
    }
    fetch('/project_edit/add_worker', {
            method: 'POST',
            body:JSON.stringify(record),
        }
    )
    .then(response => response.json())
    .then(data => {
        console.log("succes", data);
        location.reload();
    })
}


function addProject(header, cid, typeZpid) {
    let workerId = window.location.pathname.split("/").pop()
    let year = header.dateRange.year_start
    let week = header.weeks[0]
    let plannedHours = "0"
    let record = {"workerId": workerId, "cid": cid, "typeZpid": typeZpid, "year": year, "week": week, "plannedHours": plannedHours}
    fetch('/edit/add_new_project/', {
        method: 'POST',
        body: JSON.stringify(record),
    })
    .then(response => response.json())
    .then(data => {
        console.log("succes", data);
        window.location.reload();
    })
}
