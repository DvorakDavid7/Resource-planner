function addRow(row_index) {
    var table = document.getElementById("colorTable");
    var row = table.insertRow(row_index);
    row.insertCell(0).innerHTML = document.getElementById("value").value
    row.insertCell(1).innerHTML = document.getElementById("sign").value
    row.insertCell(2).innerHTML = document.getElementById("color").value
    row.insertCell(3).innerHTML = "<button class='delete-row'>X</button>";
    document.getElementsByClassName("delete-row")[row_index - 1].onclick = () => {delete_row(row_index);}
}


function delete_row(row_index) {    
    document.getElementById("colorTable").deleteRow(row_index);
    
}



function save_settings(){
    let val = document.getElementsByTagName("td");
    let results = [];
    let data = {}
    for (let i = 0; i < document.getElementById('colorTable').rows.length - 1; i++){
        let q = (i + 1) * 4;
        results.push({
            "value": val[q].innerHTML,
            "sign": val[q + 1].innerHTML,
            "color": val[q + 2].innerHTML 
        });
    }
    data["data"] = results
    fetch(window.location.origin + '/color_setting/save', {
        method:"POST",
        credentials: "include",
        body:JSON.stringify({data}),
        cache:"no-cache",
        headers:new Headers({"content-type":"application/json"})
    })
    .then(function(response){
        console.log(response);
        location.reload();
    });
}