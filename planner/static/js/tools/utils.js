
/**
 * 
 * @param {string} week 
 */
export function get_year(week, header) {
    if (header.dateRange.year_start == header.dateRange.year_end || parseInt(week) > parseInt(header.weeks[header.weeks.length - 1])){
        return header.dateRange.year_start;
    } else {
        return header.dateRange.year_end;
    }
}