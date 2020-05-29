/**
 * 
 * @param {*} header 
 * @param {*} list 
 * @param {*} values 
 * @param {String} typeZPID 
 * @param {Element} target 
 */
export default function EditComponent(header, list, values, typeZPID, targetForTable, targetForSum) {
    // TABLE
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
            let week = String(Number(header.weeks[i]));
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
        targetForTable.append(tr);
    }
    if (typeZPID === "1") return; // Generate sum after opprortunities

    // SUM
    let sumTr = document.createElement("tr");
    let td = document.createElement("td");
    // let verticalSum = sumOfAll();
    sumTr.append(td)
    for (let i = 0; i < header.weeks.length; i++) {
        let td = document.createElement("td");
        // td.innerHTML = verticalSum[i]
        td.classList.add("sum-value")
        td.classList.add("text-center")
        sumTr.append(td)
    }
    targetForSum.append(sumTr)
}
