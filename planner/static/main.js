function set_department(){
    let data = document.getElementById("department").value;
    fetch(window.location.origin + '/table_test/set_department', {
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