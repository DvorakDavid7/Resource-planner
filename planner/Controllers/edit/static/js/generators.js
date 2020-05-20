/**
 * Function generate Table Body 
 * @param {*} list projectList or OpportunityList 
 * @param {*} values JSON of cid: vals
 * @param {Element} target Element for enbeding result
 * @param {String} typeZPID "1" - for projects "0" - for opportunities 
 */
function projectsGenerator(list, values, target, typeZPID) {
    for (let j = 0; j < list.length; j++) {
        let tr = document.createElement("tr");
        let projectNameTd = document.createElement("td");
        if (typeZPID === "1") {
            projectNameTd.innerHTML = `<b>${list[j].fullName}</b>`
        }
        else if (typeZPID === "0") {
            projectNameTd.innerHTML = `<i>${list[j].fullName}</i>`
        }
        tr.append(projectNameTd);

        for (let i = 0; i < header.weeks.length; i++) {
            let td = document.createElement("td");
            let cid = list[j].cid;
            let week = header.weeks[i];
            td.innerHTML = values[cid][week];
            if (typeZPID === "1") {
                td.classList.add("project-data")
            }
            else if (typeZPID === "0") {
                td.classList.add("opportunity-data")
            }
            td.classList.add("selectable")
            td.classList.add("text-center")
            tr.append(td);
        }
        target.append(tr);
    }
}
