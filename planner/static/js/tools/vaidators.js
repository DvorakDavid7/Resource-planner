
/**
 * @param  {...HTMLElement} fields
 * @returns {Boolean}
 */
export function emptyFieldsValidation(...fields) {
    for (let field of fields) {
        if (field.value !== "") {
            return true
        }
    }
    return false
}


/**
 * @param {Array<String>} value 
 * @param {RegExp} format
 * @returns {Boolean} Return true if each value of values match the format RegEx othervise return false
 */
export function matchFormatValidation(values, format) {
    for (let value of values) {
        if (!format.test(value)) {
            return false
        }
    }
    return true
}
