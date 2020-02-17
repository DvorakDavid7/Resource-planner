
function move(direction, table) {
    let weeks = table.header.weeks;
    var data = {};
    let target_url = window.location.pathname === "/table" ? window.location.origin + "/table/navigation_request_handler" : window.location.origin + '/edit/navigation_request_handler/' + document.getElementById("user_id_value").innerHTML + window.location.search
    data.week_start = table.header.weeks[0];
    data.week_end = table.header.weeks[weeks.length - 1];
    data.year_start = table.header.year_start;
    data.year_end = table.header.year_end
    data.direction = direction
    fetch(target_url, {
        method:"POST",
        credentials: "include",
        body:JSON.stringify({"request_type": "move", "data": data, "name_list": get_name_list(table)}),
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


function set_date(table){
    let input_week = document.getElementById("week").value;
    let input_date = document.getElementById("date").value;
    let target_url = window.location.pathname === "/table" ? window.location.origin + "/table/navigation_request_handler" : window.location.origin + '/edit/navigation_request_handler/' + document.getElementById("user_id_value").innerHTML + window.location.search
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
    fetch(target_url, {
        method:"POST",
        credentials: "include",
        body:JSON.stringify({"request_type": "set_date", "data": data, "name_list": get_name_list(table)}),
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


function set_range(table){
    let data_from = document.getElementById("data_from").value;
    let data_to = document.getElementById("data_to").value;
    let data = {};
    let week_start = "", week_end = "", year_start = "", year_end = "";
    let target_url = window.location.pathname === "/table" ? window.location.origin + "/table/navigation_request_handler" : window.location.origin + '/edit/navigation_request_handler/' + document.getElementById("user_id_value").innerHTML + window.location.search
    week_start = data_from.split("/")[0];
    year_start = data_from.split("/")[1];
    week_end = data_to.split("/")[0];
    year_end = data_to.split("/")[1];
    data = {"week_start": week_start, "week_end": week_end, "year_start": year_start, "year_end": year_end}
    fetch(target_url, {
        method:"POST",
        credentials: "include",
        body:JSON.stringify({"request_type": "set_range", "data": data, "name_list": get_name_list(table)}),
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

function get_name_list(table){
    let name_list = []
    if (window.location.pathname !== "/table")
        return []
    for (let row of table.body){
        name_list.push([row["user_id"], row["department"], row["name"]])
    }
    window.name_list = name_list
    return name_list;
}