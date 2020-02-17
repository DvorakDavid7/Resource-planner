
function coloring_table(table){
    fetch(window.location.origin + '/color_setting/send_data', {
        method:"POST",
    })
    .then(function(response){
        response.json().then(function(receive_values) {            
            console.log();
            let legend = receive_values.data.legend
            let values = receive_values.data.values
            let data = document.getElementsByClassName("data-coloring");
            for (let i = 0; i < data.length; i++) {
                let q = 0
                for (let j = i * table.header.weeks.length; j < (table.header.weeks.length)* (i + 1); j++) {
                    let working_hours = table.header.working_hours[table.header.weeks[q]];
                    q++;
                    if (data[j].innerHTML === "")
                        continue;
                    let delta_hours = Number(data[j].innerHTML) - Number(working_hours);
                    for (let d = 0; d < values.length; d++){
                        if (delta_hours >=  Number(values[d])){
                            data[j].style.background = legend[values[d]]
                            break;
                        }
                    }
                }
            }
        });
    })
}

/*  let delts = {"1": "red", "0": "green", "-10": "blue", "-1000": "orange"} */