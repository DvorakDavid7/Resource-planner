/**
 * Function generate Project Edit
 * @param {*} header table header
 * @param {*} list name List
 * @param {*} values JSON of userIds: vals
 * @param {Element} target Element for enbeding result
 */
export default function projectEditGenerator(header, list, values, target) {
    for (let j = 0; j < list.length; j++) {
        let tr = document.createElement("tr");
        let workerName = document.createElement("td");
        workerName.innerHTML = `<a href=/edit/${list[j].id}${window.location.search}>
                <b>${list[j].fullName} (${list[j].department})</b>
            </a>`
        tr.appendChild(workerName);

        for (let i = 0; i < header.weeks.length; i++) {
            // main td - everything is in it
            let td = document.createElement("td")
            td.classList.add("selectable");

            // cell table with two rows
            let cell = document.createElement("table");
            cell.style = "margin: auto;";
            let plannedTr = document.createElement("tr")
            let alocatedTr = document.createElement("tr")

            let plannedTd = document.createElement("td");
            let alocatedTd = document.createElement("td");
            let workerId = list[j].id;
            let week = String(Number(header.weeks[i]))

            // planned styling
            plannedTd.innerHTML = values[workerId][week].planned;
            plannedTd.classList.add("text-center");
            plannedTd.classList.add("data");
            
            // plannedTd.contentEditable = true;
            // plannedTd.style = "width:40px";
            plannedTr.appendChild(plannedTd);
            
            // alocated styling
            alocatedTd.innerHTML = values[workerId][week].alocated;
            alocatedTd.classList.add("text-center");
            alocatedTd.style = "font-size:65%";
            alocatedTr.appendChild(alocatedTd);

            cell.appendChild(plannedTr);
            cell.appendChild(alocatedTr);
            td.appendChild(cell);
            tr.appendChild(td);
        }
        target.appendChild(tr);
    }
}