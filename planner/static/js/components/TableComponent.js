import { coloringResult } from "../tools/tableFunctions.js"

/**
 * This function genereate main table body
 * @param {any} header JSON from TableModel
 * @param {Array} list - left list of names
 * @param {JSON} values - values JSON
 * @param {Element} target - target element
 */
export default function TableComponent(header, list, values, target) {
    // html skeleton
    for (let j = 0; j < list.length; j++) {
        let tr = document.createElement("tr");
        let nameTd = document.createElement("td");
        nameTd.innerHTML = `<button data-id='${list[j].id}' type='button' class='btn btn-link text-left'>${list[j].fullName} (${list[j].department})</button>`
        nameTd.classList.add("item-for-search")
        tr.appendChild(nameTd)
        for (let i = 0; i < header.weeks.length; i++) {
            let td = document.createElement("td");
            let week = parseInt(header.weeks[i])
            td.innerHTML = values[list[j].id][week]

            td.classList.add("text-center")
            let colorClass = coloringResult(header.workingHours[i],values[list[j].id][week])
            if (colourClass) {
                td.classList.add(colorClass)
            }
            tr.appendChild(td)
        }
        target.appendChild(tr)
    }

    // DOM queries
    const nameBtns = document.querySelectorAll(".btn-link");



    // Event listeners
    nameBtns.forEach((button) => {
        button.addEventListener("click", (e) => {
            let workerId = e.srcElement.dataset.id;
            let y_start = header.dateRange.year_start;
            let y_end = header.dateRange.year_end;
            let w_start = header.dateRange.week_start;
            let w_end = header.dateRange.week_end;
            let url = `edit/${workerId}?year_start=${y_start}&year_end=${y_end}&week_start=${w_start}&week_end=${w_end}`;
            localStorage.setItem('header', JSON.stringify(header));
            localStorage.setItem("list", JSON.stringify(list))
            localStorage.setItem("values", JSON.stringify(values)) 
            window.location = url;
        });
    });
}
