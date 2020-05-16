let default_values = generate_matrix()
document.getElementById("submit-changes").addEventListener("click", () => {
    let current_values = generate_matrix()
    let changes = []
    let project_id = window.location.pathname.split("/").pop()
    for (let i = 0; i < current_values.length; i++) {
        for (let j = 0; j < current_values[i].length; j++) {
            if (current_values[i][j] !== default_values[i][j]) {
                let new_value = current_values[i][j]
                let worker_id = name_list[i]
                let week = parseInt(table_header.weeks[j])
                if (table_header.year_start == table_header.year_end || week > table_header.weeks[table_header.weeks.length - 1]){
                    year = table_header.year_start;
                } else {
                    year = table_header.year_end;
                }
                changes.push({"project_id": project_id, "worker_id": worker_id, "week": week, "value": new_value, "year": year});         
            }
        }
    }
    send_changes(changes)
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


// Dropdown

function get_names() {
    let menu = document.getElementById("menu")
    if (document.getElementsByClassName("dropdown-item").length != 0) return
    fetch("/project_edit/get_names")
    .then(response => response.json())
    .then(data => {
        let names = data.data
        names.forEach(row => {
            let item = document.createElement("A");
            item.innerText = row[2]
            item.classList.add("dropdown-item")
            item.href = "javascript:;"
            item.addEventListener("click", () => add_worker(row[0]))
            menu.appendChild(item)
        });
    });
}

function add_worker(worker_id) {
    let record = {
        "project_id": window.location.pathname.split("/").pop(),
        "worker_id": worker_id,
        "week": table_header.weeks[0],
        "value": "0",
        "year": table_header.year_start
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


function generate_matrix() {
    let data = document.getElementsByClassName("data")      
    let weeksLen = table_header.weeks.length
    let result = [], row = [];
    let counter = 0;   
    for (let i = 0; i < data.length; i++) {
        let value = data[i].innerHTML
        row.push(value)
        counter++
        if (counter === weeksLen) {
            result.push(row)
            row = []
            counter = 0
        }
    }
    return result   
}