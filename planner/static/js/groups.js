
// Data Parsers
let groupModel = JSON.parse(document.querySelector(".dataholder").dataset.groupmodel);

// DOM Queries
const tableControll = document.querySelector("#groups-controll");
const membersControll = document.querySelector("#members-controll");
const myList = document.querySelector("#myList");

// Event Listenery
window.addEventListener('load', TableControllGenereator(groupModel));


// Functions

function TableControllGenereator(groupModel) {
    for (groupName of Object.keys(groupModel)) {
        let tr = document.createElement("tr");
        let groupNameCell = document.createElement("td");
        let deleteButton = document.createElement("button");
        let showMembersButton = document.createElement("button");

        groupNameCell.innerHTML = groupName;

        deleteButton.innerHTML = "X";
        deleteButton.dataset.groupName = groupName;
        deleteButton.addEventListener("click", deleteGroup);

        showMembersButton.innerHTML = "Show Members";
        showMembersButton.dataset.groupName = groupName;
        showMembersButton.addEventListener("click", showMembers);

        tr.appendChild(groupNameCell);
        tr.appendChild(deleteButton);
        tr.appendChild(showMembersButton);
        tableControll.appendChild(tr)
    }
}


async function deleteGroup(e){
    let groupName = e.srcElement.dataset.groupName;

    const response = await fetch('/groups/delete_group', {
        method: "POST",
        body: JSON.stringify({"data": groupName}),
    });
    console.log(response);
    location.reload();
}


async function showMembers(e){
    let groupName = e.srcElement.dataset.groupName;
    const myNode = document.querySelector("#myList");
    const group_name = document.querySelector("#group-name");

    const response = await fetch('/groups/group_members', {
        method: "POST",
        body:JSON.stringify({"data": groupName})
    });
    const data = await response.json();

    let names = data.data;
    
    myNode.innerHTML = '';
    group_name.innerHTML = groupName;
    for (let i = 0; i < names.length; i++){
        let tr = document.createElement("tr");
        let groupNameCell = document.createElement("td");
        let deleteButton = document.createElement("button");
        
        groupNameCell.innerHTML = names[i][0] + " (" + names[i][1] + ")";
        
        deleteButton.innerHTML = "X";
        deleteButton.dataset.workerId = names[i][2];
        deleteButton.addEventListener("click", deleteMember);
        
        tr.appendChild(groupNameCell);
        tr.appendChild(deleteButton);
        myList.appendChild(tr)
    }

    let input = document.createElement("input");
    let submitBtn = document.createElement("button");
    input.type = "text";
    input.id = "input-value";
    submitBtn.type = "submit";
    submitBtn.innerHTML = "Add New Member";
    membersControll.innerHTML = "";
    membersControll.appendChild(input);
    membersControll.appendChild(submitBtn);
    membersControll.addEventListener("submit", addMember);
}


async function addMember(e) {
    e.preventDefault();
    const input = document.querySelector("#input-value");
    const groupId = document.querySelector("#group-name").innerText;
    const workerId = input.value;

    const response = await fetch('/groups/add_member', {
        method: "POST",
        body: JSON.stringify({
            "data": workerId,
            "group_Id": groupId
        })
    });
    const responseData = await response.json();

    if (response.status !== 200) {
        alert(responseData.err);
        return
    }

    let tr = document.createElement("tr");
    let groupNameCell = document.createElement("td");
    let deleteButton = document.createElement("button");
    groupNameCell.innerHTML = `${responseData.fullName} (${responseData.department})`;

    deleteButton.innerHTML = "X";
    deleteButton.dataset.workerId = responseData.workerId;
    deleteButton.addEventListener("click", deleteMember);
    
    tr.appendChild(groupNameCell);
    tr.appendChild(deleteButton);
    myList.appendChild(tr)
    input.value = ""
}


async function deleteMember(e) {
    let workerId = e.srcElement.dataset.workerId;
    const groupId = document.querySelector("#group-name").innerText;

    const response = await fetch('/groups/delete_member', {
        method: "POST",
        body: JSON.stringify({
            "data": workerId,
            "group_Id": groupId
        })
    });
    const data = await response.json();

    for (let i = 0; i < myList.childNodes.length; i++) {
        if (myList.childNodes[i].childNodes[1].dataset.workerId === workerId) {
            myList.removeChild(myList.childNodes[i]);
        }
    }
    
}