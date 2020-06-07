
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

/**
 * Convert Date to week number
 * @param {Date} dt
 * @returns {Number} returns week number for given date
 */
export function ISO8601_week_number(dt) {
    const today = dt
    const firstDayOfYear = new Date(today.getFullYear(), 0, 1);
    const pastDaysOfYear = (today - firstDayOfYear) / 86400000;
    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
}

/**
 * 
 * @param {Number} weekNumber 
 * @param {Number} year 
 * @returns {Date} returns Date based on given week and year
 */
export function getDateOfWeek(weekNumber,year){
    // Create a date object starting january first of chosen year, plus
    // the number of days in a week multiplied by the week number to get the right date.
    return new Date(year, 0, 1+((weekNumber-1)*7));
}

/**
 * 
 * @param {Date} dt Base Date
 * @param {Number} n step in weeks
 * @returns {Date} returns dt + n weeks
 */
export function add_weeks(dt, n) {
    return new Date(dt.setDate(dt.getDate() + (n * 7)));      
}

/**
 * 
 * @param {Date} dt Base Date
 * @param {Number} n step in weeks
 * @returns {Date} returns dt - n weeks
 */
export function sub_weeks(dt, n) {
    return new Date(dt.setDate(dt.getDate() - (n * 7)));      
}


/**
 * 
 */
export function dropDwonSearch() {
    let value = $(this).val().toLowerCase();
    $(".dropdown-menu a").filter(function() {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
}