function delete_group(key){
    console.log(key);
    fetch(window.location.origin + '/groups/delete_group', {
        method:"POST",
        body:JSON.stringify({"data": key}),
        headers:new Headers({"content-type":"application/json"})
    })
    .then(function(response){
       console.log(response);
       location.reload();
    })
}

function show_members(group){
    fetch(window.location.origin + '/groups/group_members', {
        method:"POST",
        body:JSON.stringify({"data": group}),
        headers:new Headers({"content-type":"application/json"})
    })
    .then(function(response){
        response.json().then(function(data) {           
            let names = data.data
            const myNode = document.getElementById("myList");
            myNode.innerHTML = '';
            const group_name = document.getElementById("group-name");
            group_name.innerHTML = group;
            for (let i = 0; i < names.length; i++){
                let node = document.createElement("LI");
                let textnode = document.createTextNode(names[i][0] + " (" + names[i][1] + ")");
                node.appendChild(textnode);
                document.getElementById("myList").appendChild(node);
            }
        });
    })
}