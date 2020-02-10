
function send_data(table){
    let weeks = table.header.weeks;
    let table_values = document.getElementsByClassName("data")    
    let origin_value = 0, current_value = 0;
    let start = 0, end = weeks.length;
    let type = "", id = "", year = null, changes = [];
    
    for (let x = 0; x < table.body.projects.length + table.body.opportunity.length; x++){
        for (let i = start; i < end; i++) {
            let week = Number(weeks[i - start]);
            current_value = table_values[i].innerHTML;
            if (x < table.body.projects.length) {
                origin_value = table.body.projects[x].values[week];                
                id = table.body.projects[x].id;
                type = "project";
            } else {
                origin_value = table.body.opportunity[x - table.body.projects.length].values[week];
                id = table.body.opportunity[x - table.body.projects.length].id;       
                type = "opportuniy";
            }                     
            if (current_value !== origin_value) {
                if (table.header.year_start == table.header.year_end || week > weeks[weeks.length - 1]){
                    year = table.header.year_start;
                } else {
                    year = table.header.year_end;
                }
               changes.push({"id": id, "week": week, "value": current_value, "year": year, "type": type});
            }
        }
        start += weeks.length;
        end += weeks.length;
    }    
    return changes;
}


function send_changes_from_edit(table){
    let data = send_data(table)
    let user_id = document.getElementById("user_id_value").innerHTML
    let current_position = {"year_start": table.header.year_start, "year_end": table.header.year_end,
                            "week_start": table.header.weeks[0], "week_end": table.header.weeks.pop()}      
    document.open();
    document.write("saving changes...")
    document.close();                            
    fetch(window.location.origin + '/edit/save_changes/' + user_id + window.location.search, {
        method:"POST",
        credentials: "include",
        body:JSON.stringify({"request_type": "edit_changes", "data": data, "position": current_position}),
        cache:"no-cache",
        headers:new Headers({"content-type":"application/json"})
    })
    .then(function(response){
        response.json().then(function(data) {            
            document.open();
            document.write(data.new_table)
            document.close();
        });
    })
}


function compute_sum(table){
    let weeks = table.header.weeks;
    let element = document.getElementsByClassName("sum");
    let rows = document.getElementsByClassName("data");
    let q = 0;
    for (let i = 0; i < weeks.length; i++) {
        let sum = 0;
        for (let j = q; j < (table.body.projects.length + table.body.opportunity.length) * weeks.length; j = j + weeks.length) {
            sum = sum + Number(rows[j].innerHTML);
        }
        element[i].innerHTML = sum;
        working_hours = table.header.working_hours[weeks[q]]
        q++;
    }
}


// Buttons
function delete_row(id, table_header){
    let weeks = table_header.weeks;
    let elements = document.getElementsByClassName("data")
    for (let i = id * weeks.length; i < (id * weeks.length + weeks.length); i++) {
        elements[i].innerHTML = ""
    }   
}

function multiple_insert(id, table_header){
    let weeks = table_header.weeks;
    let elements = document.getElementsByClassName("data");
    let value = document.getElementsByClassName("multiple_insert");
    for (let i = id * weeks.length; i < (id * weeks.length + weeks.length); i++) {
        if (value != ""){
            elements[i].innerHTML = value[id].value;
        } 
    }  
}

function auto_insert(id, table){
    let sum = document.getElementsByClassName("sum");
    let weeks = table.header.weeks;
    let elements = document.getElementsByClassName("data");
    let j = 0;
    let new_value = 0;

    for (let i = id * weeks.length; i < (id * weeks.length + weeks.length); i++) {
        new_value = Number(table.header.working_hours[table.header.weeks[j]]) - Number(sum[j].innerHTML) + Number(elements[i].innerHTML);
        if (new_value > 0){
            elements[i].innerHTML = new_value;
        }
        j++
    }   
}



function add_new_project(data_list, table){
    dropdown_toggle()
    let current_position = {"year_start": table.header.year_start, "year_end": table.header.year_end,
                            "week_start": table.header.weeks[0], "week_end": table.header.weeks.pop()}                             
    let project_id = data_list[0];
    let opportunity_id = data_list[1];
    var data = {};
    if (project_id != null){
        data.task_type = "project";
        data.identifier = project_id;
    } 
    else {
        data.task_type = "opportunity";
        data.identifier = opportunity_id;
    }
    fetch(window.location.origin + '/edit/add_new_project/' + document.getElementById("user_id_value").innerHTML + window.location.search, {
        method:"POST",
        credentials: "include",
        body:JSON.stringify({"request_type": "add_new_project", "data": data, "position": current_position}),
        cache:"no-cache",
        headers:new Headers({"content-type":"application/json"})
    })
    .then(function(response){
        response.json().then(function(data) {            
            document.open();
            document.write(data.new_table)
            document.close();
        });
    })
}


function show_data_list(table){
    // console.log(document.getElementById("dropdown").children.length);
    fetch(window.location.origin + '/edit/show_project_list/' + document.getElementById("user_id_value").innerHTML + window.location.search, {
        method:"POST",
        credentials: "include",
        body:JSON.stringify({"request_type": "show_project_list", "data": ""}),
        cache:"no-cache",
        headers:new Headers({"content-type":"application/json"})
    })
    .then(function(response){
        response.json().then(function(data) {
            if (document.getElementById("dropdown").children.length == 0){              
                for (let i = 0; i < data.data.projects.length; i++){                    
                    if (String(data.data.projects[i][2]) == "null"){continue}
                    let node = document.createElement("a");
                    node.appendChild(document.createTextNode("p: " + data.data.projects[i][2]));
                    document.getElementById("dropdown").appendChild(node).onclick = () => {add_new_project(data.data.projects[i], table)}
                }  
                for (let i = 0; i < data.data.opportunities.length; i++){
                    if (String(data.data.opportunities[i][2]) == "null"){continue}
                    let node = document.createElement("a");
                    node.appendChild(document.createTextNode("o: " + data.data.opportunities[i][2]));
                    document.getElementById("dropdown").appendChild(node).onclick = () => {add_new_project(data.data.opportunities[i], table)}
                }          
            }
        });
    })
}
