// HEADER


/**
 * This function Display table Header from TableHeader Model
 * @param {Element} target target parent element
 * @param {any} header JSON from TableModel
 */
export default function HeaderComponent(header, target) {
    const weeksTr = document.createElement("tr");
    const datesTr = document.createElement("tr");

    weeksTr.appendChild(document.createElement("td"))
    datesTr.appendChild(document.createElement("td"))
    for (let i = 0; i < header["weeks"].length; i++) {
        let td = document.createElement("td");
        if (header["weeks"][i] === header["currentWeek"]) {
            td.style.backgroundColor = "rgb(255, 0, 255, 0.5)";
        }
        td.innerHTML = `${header["weeks"][i]} (${header["workingHours"][i]})`
        weeksTr.appendChild(td)
    }    
    for (let i = 0; i < header["weeks"].length; i++) {
        let td = document.createElement("td");
        td.innerHTML = header["dates"][i]
        datesTr.appendChild(td)
    } 
    target.appendChild(weeksTr);
    target.appendChild(datesTr);
}
