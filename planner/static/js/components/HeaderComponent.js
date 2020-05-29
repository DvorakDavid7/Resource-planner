// HEADER

/**
 * This function Display table Header from TableHeader Model
 * @param {Element} target target parent element
 * @param {any} header JSON from TableModel
 */
export default function HeaderComponent(header, target) {
    let weeksTr = document.createElement("tr");
    let datesTr = document.createElement("tr");

    weeksTr.append(document.createElement("td"))
    datesTr.append(document.createElement("td"))
    for (let i = 0; i < header.weeks.length; i++) {
        let td = document.createElement("td");
        td.innerHTML = `${header.weeks[i]} (${header.workingHours[i]})`
        weeksTr.append(td)
    }    
    for (let i = 0; i < header.weeks.length; i++) {
        let td = document.createElement("td");
        td.innerHTML = header.dates[i]
        datesTr.append(td)
    } 
    target.append(weeksTr);
    target.append(datesTr);
}
