import { ISO8601_week_number, getDateOfWeek, add_weeks, sub_weeks } from "./utils"
import { emptyFieldsValidation, matchFormatValidation } from "./vaidators.js"


export async function setRange(event, list, apiEndpoint) {
    event.preventDefault();
    let inputFrom = document.querySelector("#data-range-from");
    let inputTo = document.querySelector("#data-range-to");

    // validation
    if (!emptyFieldsValidation(inputFrom, inputTo)) {
        alert("Field(s) are empty");
        return;
    }

    if (!matchFormatValidation([inputFrom.value, inputTo.value], /^[0-9]{0,1}[0-9]\/[0-9]{4}$/)) {
        alert("Bad format please be sure that data are in week/year format")
        return
    }

    let [weekFrom, yearFrom] = document.querySelector("#data-range-from").value.split("/");
    let [weekTo, yearTo] = document.querySelector("#data-range-to").value.split("/");

    let data = {
        "dateRange": {
            "year_start": yearFrom,
            "year_end": yearTo,
            "week_start": weekFrom,
            "week_end": weekTo
        },
        "list": list
    }

    const response = await fetch(apiEndpoint, {
        method: 'POST',
        body: JSON.stringify(data),
    });
    const responseData = await response.json();
    if (response.status !== 200) {
        alert(responseData.err)
        return
    }
    const formEvent = new CustomEvent("formEvent", {
        detail: {
            tableModel: responseData.tableModel,
            header: responseData.header
        }
    }); 
    document.querySelector(".navbar").dispatchEvent(formEvent);
}


export async function setDate(event, list, apiEndpoint) {
    event.preventDefault();
    let weekAndYear = document.querySelector("#data-week");
    let dateString = document.querySelector("#data-date");
    let year, weekNumber = ""

    // validation
    if (!emptyFieldsValidation(weekAndYear, dateString)) {
        alert("Field(s) are empty");
        return;
    }

    if (weekAndYear.value != "" && dateString.value === "") {
        if (!matchFormatValidation([weekAndYear.value], /^[0-9]{0,1}[0-9]\/[0-9]{4}$/)) {
            alert("the week/year field has incorrect format")
            return
        }
        [weekNumber, year] = weekAndYear.value.split("/")
    }
    else if (weekAndYear.value === "" && dateString.value != "") {
        if (!matchFormatValidation([dateString.value], /^[0-9]{1,2}\/[0-1]{0,1}[0-9]\/[0-9]{4}$/)) {
            alert("the date field has incorrect format")
            return
        }
        let [day, month, y] = dateString.value.split("/");
        year = y;       
        let date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));  // the month is 0-indexed        
        weekNumber = ISO8601_week_number(date).toString();
    }
    else {
        alert("Enter either week/year or date, not both")
        return
    }

    let data = {
        "date": {
            "weekNumber": weekNumber,
            "year": year
        },
        "list": list
    };
    const response = await fetch(apiEndpoint, {
        method: 'POST',
        body: JSON.stringify(data),
    });
    if (response.status !== 200) {
        alert(responseData.err);
        return;
    }
    const responseData = await response.json();
    const formEvent = new CustomEvent("formEvent", {
        detail: {
            tableModel: responseData.tableModel,
            header: responseData.header
        }
    });
    document.querySelector(".navbar").dispatchEvent(formEvent);
}


export async function navigationMove(event, list, header, apiEndpoint) {
    const step = 10;
    let dateStart = getDateOfWeek(header.dateRange.week_start, header.dateRange.year_start);
    let dateEnd = getDateOfWeek(header.dateRange.week_end, header.dateRange.year_end);
    let dateStartPlus = new Date();
    let dateEndPlus = new Date();

    if (event.srcElement.name === "right") {
        dateStartPlus = add_weeks(dateStart, step);
        dateEndPlus = add_weeks(dateEnd, step);
    }
    else if (event.srcElement.name === "left") {
        dateStartPlus = sub_weeks(dateStart, step);
        dateEndPlus = sub_weeks(dateEnd, step);
    }
    let data = {
        "dateRange": {
            "year_start": dateStartPlus.getFullYear().toString(),
            "year_end":  dateEndPlus.getFullYear().toString(),
            "week_start": ISO8601_week_number(dateStartPlus).toString(),
            "week_end": ISO8601_week_number(dateEndPlus).toString(),
        },
        "list": list
    }
    const response = await fetch(apiEndpoint, {
        method: 'POST',
        body: JSON.stringify(data),
    });
    const responseData = await response.json();
    const formEvent = new CustomEvent("formEvent", {
        detail: {
            tableModel: responseData.tableModel,
            header: responseData.header
        }
    });
    document.querySelector(".navbar").dispatchEvent(formEvent);
}

// Navigation based on URL

export function setRangeUrl(event) {
    event.preventDefault();
    let inputFrom = document.querySelector("#data-range-from");
    let inputTo = document.querySelector("#data-range-to");

    // validation
    if (!emptyFieldsValidation(inputFrom, inputTo)) {
        alert("Field(s) are empty");
        return;
    }

    if (!matchFormatValidation([inputFrom.value, inputTo.value], /^[0-9]{0,1}[0-9]\/[0-9]{4}$/)) {
        alert("Bad format please be sure that data are in week/year format")
        return
    }

    let [weekFrom, yearFrom] = inputFrom.value.split("/");
    let [weekTo, yearTo] = inputTo.value.split("/");
    let search = `?year_start=${yearFrom}&year_end=${yearTo}&week_start=${weekFrom}&week_end=${weekTo}`
    window.location = window.location.pathname + search
}


export async function setDateUrl(event, apiEndpoint) {
    event.preventDefault();
    let weekAndYear = document.querySelector("#data-week");
    let dateString = document.querySelector("#data-date");
    let year, weekNumber = ""

    // validation
    if (!emptyFieldsValidation(weekAndYear, dateString)) {
        alert("Field(s) are empty");
        return;
    }

    if (weekAndYear.value != "" && dateString.value === "") {
        if (!matchFormatValidation([weekAndYear.value], /^[0-9]{0,1}[0-9]\/[0-9]{4}$/)) {
            alert("the week/year field has incorrect format")
            return
        }
        [weekNumber, year] = weekAndYear.value.split("/")
    }
    else if (weekAndYear.value === "" && dateString.value != "") {
        if (!matchFormatValidation([dateString.value], /^[0-9]{1,2}\/[0-1]{0,1}[0-9]\/[0-9]{4}$/)) {
            alert("the date field has incorrect format")
            return
        }
        let [day, month, y] = dateString.value.split("/");
        year = y;       
        let date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));  // the month is 0-indexed        
        weekNumber = ISO8601_week_number(date).toString();
    }
    else {
        alert("Enter either week/year or date, not both")
        return
    }

    let data = {
        "date": {
            "weekNumber": weekNumber,
            "year": year
        }
    };
    const response = await fetch(apiEndpoint, {
        method: 'POST',
        body: JSON.stringify(data),
    });
    const responseData = await response.json();
    if (response.status !== 200) {
        alert(responseData.err);
        return;
    }
    let {year_start, year_end, week_start, week_end} = responseData.dateRange;
    let search = `?year_start=${year_start}&year_end=${year_end}&week_start=${week_start}&week_end=${week_end}`;
    window.location = window.location.pathname + search;
}

export function navigationMoveUrl(event, header) {
    const step = 10;
    let dateStart = getDateOfWeek(header.dateRange.week_start, header.dateRange.year_start);
    let dateEnd = getDateOfWeek(header.dateRange.week_end, header.dateRange.year_end);
    let dateStartPlus = new Date();
    let dateEndPlus = new Date();

    if (event.srcElement.name === "right") {
        dateStartPlus = add_weeks(dateStart, step);
        dateEndPlus = add_weeks(dateEnd, step);
    }
    else if (event.srcElement.name === "left") {
        dateStartPlus = sub_weeks(dateStart, step);
        dateEndPlus = sub_weeks(dateEnd, step);
    }            
    let year_start = dateStartPlus.getFullYear().toString();
    let year_end =  dateEndPlus.getFullYear().toString();
    let week_start = ISO8601_week_number(dateStartPlus).toString();
    let week_end = ISO8601_week_number(dateEndPlus).toString();

    let search = `?year_start=${year_start}&year_end=${year_end}&week_start=${week_start}&week_end=${week_end}`;
    window.location = window.location.pathname + search;
}