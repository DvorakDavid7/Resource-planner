/**
 * This function genereate Project Overview
 * @param {any} header JSON from TableModel
 * @param {Array} list - left list of names
 * @param {JSON} values - values JSON
 * @param {Element} target - target element
 */
export default function ProjectsComponent(header, list, values, target) {
    for (let j = 0; j < list.length; j++) {
        let tr = document.createElement("tr");
        let nameTd = document.createElement("td");
        nameTd.innerHTML = `<button data-cid='${list[j].cid}' type='button' class='btn btn-link text-left'>${list[j].fullName}</button>`
        nameTd.classList.add("item-for-search")
        tr.append(nameTd)
        for (let i = 0; i < header.weeks.length; i++) {
            let td = document.createElement("td");
            let week = parseInt(header.weeks[i])
            td.innerHTML = values[list[j].cid][week]
            td.classList.add("text-center")
            tr.append(td)
        }
        target.append(tr)
    }

    // DOM Queries
    const nameBtns = document.querySelectorAll(".item-for-search")

    // Event Listeners
    nameBtns.forEach((button) => {
        button.addEventListener("click", (e) => {
            let cid = e.srcElement.dataset.cid
            let y_start = header.dateRange.year_start
            let y_end = header.dateRange.year_end
            let w_start = header.dateRange.week_start
            let w_end = header.dateRange.week_end
            let url = `project_edit/${cid}?year_start=${y_start}&year_end=${y_end}&week_start=${w_start}&week_end=${w_end}`
            window.location = url
        })
    })    
}