/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./js/groups.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./js/groups.js":
/*!**********************!*\
  !*** ./js/groups.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {


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

/***/ })

/******/ });
//# sourceMappingURL=groups.js.map