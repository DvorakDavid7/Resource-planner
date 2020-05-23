/**
 * Convert HTML table td data to matrix
 * @param {NodeListOf<Element>} data
 * @returns {Array}
 */
function toMatrix(data) {    
    let result = [], row = [];
    let counter = 0;   
    for (let i = 0; i < data.length; i++) {
        let value = data[i].innerHTML
        row.push(value)
        counter++
        if (counter === header.weeks.length) {
            result.push(row)
            row = []
            counter = 0
        }
    }
    return result 
}

/**
 * Compute vertical sum from given matrix
 * @param {Array} matrix
 * @returns {Array} 
 */
function computeSum(matrix) {
    let result = []
    for (let j = 0; j < matrix[0].length; j++) {
        let sum = 0
        for (let i = 0; i < matrix.length; i++) {
            let value = matrix[i][j] != "" ? parseInt(matrix[i][j]) : 0
            sum += value
        }
        result.push(sum)
    }
    return result
}

/**Compute vertical sum of Projects and Opportunities */
function sumOfAll() {
    let matr1 = toMatrix(document.querySelectorAll(".project-data"))
    let matr2 = toMatrix(document.querySelectorAll(".opportunity-data"))
    let masterMatrix = []
    if (matr1.length != 0) {
        masterMatrix.push(computeSum(matr1))
    }
    if (matr2.length != 0) {
        masterMatrix.push(computeSum(matr2))
    }
    return computeSum(masterMatrix)
}


/**function remove selected area */
function removeSelected() {
    document.querySelectorAll(".selected").forEach((element) => {
        element.classList.remove("selected"); 
        input.blur()
    });
}


function saveChanges(changes) {
    fetch('/edit/save_changes/', {
        method: 'POST',
        body: JSON.stringify(changes),
    })
    .then(response => response.json())
    .then(data => {
        window.location.reload();
        console.log("succes", data);
    })
}


function addProject(cid, typeZpid) {
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

function add_worker(worker_id) {
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
