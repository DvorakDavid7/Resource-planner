// HEADER

/**
 * This function Display table Header from TableHeader Model
 * @param {Element} target target parent element
 * @param {any} header JSON from TableModel
 */
export default function HeaderComponent(header, target) {
    let weeksTr = document.createElement("tr");
    let datesTr = document.createElement("tr");

    weeksTr.appendChild(document.createElement("td"))
    datesTr.appendChild(document.createElement("td"))
    for (let i = 0; i < header.weeks.length; i++) {
        let td = document.createElement("td");
        td.innerHTML = `${header.weeks[i]} (${header.workingHours[i]})`
        weeksTr.appendChild(td)
    }    
    for (let i = 0; i < header.weeks.length; i++) {
        let td = document.createElement("td");
        td.innerHTML = header.dates[i]
        datesTr.appendChild(td)
    } 
    target.appendChild(weeksTr);
    target.appendChild(datesTr);
}
