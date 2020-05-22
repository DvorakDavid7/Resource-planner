let header = JSON.parse(document.querySelector("#dataholder").dataset.header);
let tableModel = JSON.parse(document.querySelector("#dataholder").dataset.projecttablemodel);
let projectList = tableModel.projectList
let values = tableModel.values
 
// DOM queries
const theader = document.querySelector("#header");
const tbody = document.querySelector("#body")


headerGenerator(header, theader)
projectsTableGenerator(header, projectList, values, tbody)



function tableSearch() {  
    let input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("search");
    filter = input.value.toUpperCase();
    table = document.getElementById("table");
    tr = table.getElementsByTagName("tr");

    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByClassName("item-for-search")[0];
        if (td) {
          txtValue = td.textContent || td.innerText;
          if (txtValue.toUpperCase().indexOf(filter) > -1) {
              tr[i].style.display = "";
          }
          else {
              tr[i].style.display = "none";
          }
        }
    }
}


document.querySelector("#search").addEventListener("keyup", () => {   
    tableSearch()
});

document.querySelectorAll(".item-for-search").forEach((button) => {
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