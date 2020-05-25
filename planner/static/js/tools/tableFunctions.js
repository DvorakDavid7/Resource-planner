/**
 * Convert HTML table td data to matrix
 * @param {NodeListOf<Element>} data
 * @returns {Array}
 */
export function toMatrix(data, header) {    
    let result = [], row = [];
    let counter = 0;   
    for (let i = 0; i < data.length; i++) {
        let value = data[i].innerHTML
        row.push(value)
        counter++
        if (counter === header.weeks.length) {
            result.push(row)
            row = []
            counter = 0
        }
    }
    return result 
}

/**
 * Compute vertical sum from given matrix
 * @param {Array} matrix
 * @returns {Array} 
 */
export function computeSum(matrix) {
    let result = []
    for (let j = 0; j < matrix[0].length; j++) {
        let sum = 0
        for (let i = 0; i < matrix.length; i++) {
            let value = matrix[i][j] != "" ? parseInt(matrix[i][j]) : 0
            sum += value
        }
        result.push(sum)
    }
    return result
}

/**Compute vertical sum of Projects and Opportunities */
export function sumOfAll(header) {
    let matr1 = toMatrix(document.querySelectorAll(".project-data"), header)
    let matr2 = toMatrix(document.querySelectorAll(".opportunity-data"), header)
    let masterMatrix = []
    if (matr1.length != 0) {
        masterMatrix.push(computeSum(matr1))
    }
    if (matr2.length != 0) {
        masterMatrix.push(computeSum(matr2))
    }
    return computeSum(masterMatrix)
}


/**function remove selected area */
export function removeSelected() {
    document.querySelectorAll(".selected").forEach((element) => {
        element.classList.remove("selected"); 
        document.querySelector("#multi-insert").blur()
    });
}


export function saveChanges(changes) {
    fetch('/edit/save_changes/', {
        method: 'POST',
        body: JSON.stringify(changes),
    })
    .then(response => response.json())
    .then(data => {
        window.location.reload();
        console.log("succes", data);
    })
}

/**
 * use for searching in main tables
 * looking for elements with item-for-search class
 */
export function tableSearch() {     
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
