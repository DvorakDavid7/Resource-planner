/**
 * Convert HTML table td data to matrix
 * @param {NodeListOf<Element>} data 
 */
function toMatrix(data) {    
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
