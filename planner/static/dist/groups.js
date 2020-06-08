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

eval("// Data Parsers\nlet groupModel = JSON.parse(document.querySelector(\".dataholder\").dataset.groupmodel); // DOM Queries\n\nconst tableControll = document.querySelector(\"#groups-controll\");\nconst membersControll = document.querySelector(\"#members-controll\");\nconst myList = document.querySelector(\"#myList\"); // Event Listenery\n\nwindow.addEventListener('load', TableControllGenereator(groupModel)); // Functions\n\nfunction TableControllGenereator(groupModel) {\n  for (groupName of Object.keys(groupModel)) {\n    let tr = document.createElement(\"tr\");\n    let groupNameCell = document.createElement(\"td\");\n    let deleteButton = document.createElement(\"button\");\n    let showMembersButton = document.createElement(\"button\");\n    groupNameCell.innerHTML = groupName;\n    deleteButton.innerHTML = \"X\";\n    deleteButton.dataset.groupName = groupName;\n    deleteButton.addEventListener(\"click\", deleteGroup);\n    showMembersButton.innerHTML = \"Show Members\";\n    showMembersButton.dataset.groupName = groupName;\n    showMembersButton.addEventListener(\"click\", showMembers);\n    tr.appendChild(groupNameCell);\n    tr.appendChild(deleteButton);\n    tr.appendChild(showMembersButton);\n    tableControll.appendChild(tr);\n  }\n}\n\nasync function deleteGroup(e) {\n  let groupName = e.srcElement.dataset.groupName;\n  const response = await fetch('/groups/delete_group', {\n    method: \"POST\",\n    body: JSON.stringify({\n      \"data\": groupName\n    })\n  });\n  console.log(response);\n  location.reload();\n}\n\nasync function showMembers(e) {\n  let groupName = e.srcElement.dataset.groupName;\n  const myNode = document.querySelector(\"#myList\");\n  const group_name = document.querySelector(\"#group-name\");\n  const response = await fetch('/groups/group_members', {\n    method: \"POST\",\n    body: JSON.stringify({\n      \"data\": groupName\n    })\n  });\n  const data = await response.json();\n  let names = data.data;\n  myNode.innerHTML = '';\n  group_name.innerHTML = groupName;\n\n  for (let i = 0; i < names.length; i++) {\n    let tr = document.createElement(\"tr\");\n    let groupNameCell = document.createElement(\"td\");\n    let deleteButton = document.createElement(\"button\");\n    groupNameCell.innerHTML = names[i][0] + \" (\" + names[i][1] + \")\";\n    deleteButton.innerHTML = \"X\";\n    deleteButton.dataset.workerId = names[i][2];\n    deleteButton.addEventListener(\"click\", deleteMember);\n    tr.appendChild(groupNameCell);\n    tr.appendChild(deleteButton);\n    myList.appendChild(tr);\n  }\n\n  let input = document.createElement(\"input\");\n  let submitBtn = document.createElement(\"button\");\n  input.type = \"text\";\n  input.id = \"input-value\";\n  submitBtn.type = \"submit\";\n  submitBtn.innerHTML = \"Add New Member\";\n  membersControll.innerHTML = \"\";\n  membersControll.appendChild(input);\n  membersControll.appendChild(submitBtn);\n  membersControll.addEventListener(\"submit\", addMember);\n}\n\nasync function addMember(e) {\n  e.preventDefault();\n  const input = document.querySelector(\"#input-value\");\n  const groupId = document.querySelector(\"#group-name\").innerText;\n  const workerId = input.value;\n  const response = await fetch('/groups/add_member', {\n    method: \"POST\",\n    body: JSON.stringify({\n      \"data\": workerId,\n      \"group_Id\": groupId\n    })\n  });\n  const responseData = await response.json();\n\n  if (response.status !== 200) {\n    alert(responseData.err);\n    return;\n  }\n\n  let tr = document.createElement(\"tr\");\n  let groupNameCell = document.createElement(\"td\");\n  let deleteButton = document.createElement(\"button\");\n  groupNameCell.innerHTML = `${responseData.fullName} (${responseData.department})`;\n  deleteButton.innerHTML = \"X\";\n  deleteButton.dataset.workerId = responseData.workerId;\n  deleteButton.addEventListener(\"click\", deleteMember);\n  tr.appendChild(groupNameCell);\n  tr.appendChild(deleteButton);\n  myList.appendChild(tr);\n  input.value = \"\";\n}\n\nasync function deleteMember(e) {\n  let workerId = e.srcElement.dataset.workerId;\n  const groupId = document.querySelector(\"#group-name\").innerText;\n  const response = await fetch('/groups/delete_member', {\n    method: \"POST\",\n    body: JSON.stringify({\n      \"data\": workerId,\n      \"group_Id\": groupId\n    })\n  });\n  const data = await response.json();\n\n  for (let i = 0; i < myList.childNodes.length; i++) {\n    if (myList.childNodes[i].childNodes[1].dataset.workerId === workerId) {\n      myList.removeChild(myList.childNodes[i]);\n    }\n  }\n}\n\n//# sourceURL=webpack:///./js/groups.js?");

/***/ })

/******/ });