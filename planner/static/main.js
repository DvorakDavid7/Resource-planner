
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
    console.log(changes);
    
    return changes;
}


function send_changes_from_edit(table){
    let data = send_data(table)
    let current_position = {"year_start": table.header.year_start, "year_end": table.header.year_end,
                            "week_start": table.header.weeks[0], "week_end": table.header.weeks.pop()}      
    document.open();
    document.write("saving changes...")
    document.close();  
    fetch(`${window.location.href}`, {
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

function set_range(){
    let data_from = document.getElementById("data_from").value;
    let data_to = document.getElementById("data_to").value;
    let data = {};
    let week_start = "", week_end = "", year_start = "", year_end = "";
    week_start = data_from.split("/")[0];
    year_start = data_from.split("/")[1];
    week_end = data_to.split("/")[0];
    year_end = data_to.split("/")[1];
    data = {"week_start": week_start, "week_end": week_end, "year_start": year_start, "year_end": year_end}
    fetch(`${window.location.href}`, {
        method:"POST",
        credentials: "include",
        body:JSON.stringify({"request_type": "set_range", "data": data}),
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

function set_date(){
    let input_week = document.getElementById("week").value;
    let input_date = document.getElementById("date").value;    
    if (input_week != ""){
        var data = {"input_type": "", "week": "", "year": ""};
        data.week = input_week.split("/")[0];
        data.year = input_week.split("/")[1];
        data.input_type = "set_week";
    }
    else {
        var data = {"input_type": "", "day": "", "month": "", "year": ""};
        data.month = input_date.split("/")[0];
        data.day = input_date.split("/")[1];
        data.year = input_date.split("/")[2];
        data.input_type = "set_date";
    }
    fetch(`${window.location.href}`, {
        method:"POST",
        credentials: "include",
        body:JSON.stringify({"request_type": "set_date", "data": data}),
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

function move(direction, table_header) {
    let weeks = table_header.weeks;
    var data = {};
    data.week_start = table_header.weeks[0];
    data.week_end = table_header.weeks[weeks.length - 1];
    data.year_start = table_header.year_start;
    data.year_end = table_header.year_end
    data.direction = direction    
    fetch(`${window.location.href}`, {
        method:"POST",
        credentials: "include",
        body:JSON.stringify({"request_type": "move", "data": data}),
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

function set_department(){
    let data = document.getElementById("department").value;
    fetch(`${window.location.href}`, {
        method:"POST",
        credentials: "include",
        body:JSON.stringify({"request_type": "set_department", "data": data}),
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

function tableSearch() {
    console.log("Dasdas");
    
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("search");
    filter = input.value.toUpperCase();
    table = document.getElementById("table");
    tr = table.getElementsByTagName("tr");

    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByClassName("item_for_search")[0];
        if (td) {
          txtValue = td.textContent || td.innerText;
          if (txtValue.toUpperCase().indexOf(filter) > -1) {
              tr[i].style.display = "";
          }
          else {
              tr[i].style.display = "none";
          }
        }
    }
}

function filterFunction() {
    var input, filter, ul, li, a, i;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    div = document.getElementById("myDropdown");
    a = div.getElementsByTagName("a");
    for (i = 0; i < a.length; i++) {
      txtValue = a[i].textContent || a[i].innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        a[i].style.display = "";
      } else {
        a[i].style.display = "none";
      }
    }
  }

function set_user_id(){
    let user_id = document.getElementById("user_id").value;
    let current_user = window.location.pathname.split("/")[2];
    let new_url = window.location.href.replace(current_user, user_id)
    window.location = new_url;
}


function dropdown_toggle() {
    document.getElementById("myDropdown").classList.toggle("show");
}

function show_data_list(table){
    // console.log(document.getElementById("dropdown").children.length);
    fetch(`${window.location.href}`, {
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
    fetch(`${window.location.href}`, {
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

function show_groups(){
    fetch(`${window.location.href}`, {
        method:"POST",
        credentials: "include",
        body:JSON.stringify({"request_type": "show_groups", "data": ""}),
        cache:"no-cache",
        headers:new Headers({"content-type":"application/json"})
    })
    .then(function(response){
        response.json().then(function(data) {
            if (document.getElementById("dropdown").children.length == 0){        
                for (let i = 0; i < data.data.length; i++){                    
                    let node = document.createElement("a");
                    node.appendChild(document.createTextNode(data.data[i]));
                    document.getElementById("dropdown").appendChild(node).onclick = () => {choose_group(data.data[i])}
                }
            }  
        });
    })
}


function choose_group(group){
    dropdown_toggle()
    fetch(`${window.location.href}`, {
        method:"POST",
        credentials: "include",
        body:JSON.stringify({"request_type": "load_groups", "data": group}),
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