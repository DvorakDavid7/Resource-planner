/**
 *
 * @param {*} header
 * @param {*} list
 * @param {*} values
 * @param {String} typeZPID
 * @param targetForTable
 * @param targetForSum
 */
export default function EditComponent(header, list, values, typeZPID, targetForTable, targetForSum) {
    // TABLE
    for (let j = 0; j < list.length; j++) {
        let tr = document.createElement("tr");
        let tdAutocompleteButton = document.createElement("td");
        let tdDeleteRowButton = document.createElement("td");
        tdAutocompleteButton.innerHTML = `
            <button type="button" class="btn btn-success autocomplete" 
                data-toggle="popover" 
                data-trigger="hover"
                data-placement="top"
                data-content="Doplní maximální možný (nenaplánovaný) počet hodin do každého týdne za vybrané období."
            >
            A
            </button>
        `;

        tdDeleteRowButton.innerHTML = `
            <button type="button" class="btn btn-danger delete" 
                data-toggle="popover" 
                data-trigger="hover"
                data-placement="top"
                data-content="Smaže všechny vyplněné hodiny v daném řádku za vybrané období."
            >
            X
            </button>
        `;

        let projectNameTd = document.createElement("td");
        if (typeZPID === "1") {
            projectNameTd.innerHTML = `<a href=/project_edit/${list[j].cid}${window.location.search}>
                    <b>${list[j].fullName}</b>
                </a>`
            if (list[j]["status"] === "Uzavřeno") {
                projectNameTd.style.color = "red";
            }
        }
        else if (typeZPID === "0") {
            projectNameTd.innerHTML = `<a href=/project_edit/${list[j].cid}${window.location.search}>
                    <i>${list[j].fullName}</i>
                </a>`
            if (list[j]["status"] === 2) {
                projectNameTd.style.color = "red";
            }
        }
        tr.appendChild(projectNameTd);

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
        tr.appendChild(tdAutocompleteButton);
        tr.appendChild(tdDeleteRowButton);
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
