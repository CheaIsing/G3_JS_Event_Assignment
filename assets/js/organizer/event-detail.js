
const apiUrl = "https://mps2.chandalen.dev";
// const token = localStorage.getItem("authToken");

let id = sessionStorage.getItem("eventId");

getEventDetail(apiUrl, id);


function getEventDetail(apiUrl, id) {
    fetch(`${apiUrl}/api/events/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })
    .then(res=>res.json())
    .then(json=>{
        // console.log(json);

        fetch(`${apiUrl}/api/events/summary-data/${json.data.id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
        .then(res=>res.json())
        .then(json2=>{
            console.log(json, json2);

            document.getElementById('event-name').innerHTML = json.data.name
            document.getElementById('event-date').innerHTML = json.data.start_date + " - " + json.data.end_date
            document.getElementById('total-ticket').innerHTML = json2.data.total_ticket
            document.getElementById('total-income').innerHTML = json2.data.total_income
            document.getElementById('total-attendant').innerHTML = json2.data.total_attendant
            document.getElementById('not-attending').innerHTML = json2.data.total_ticket - json2.data.total_attendant

            console.log();
            
            
        })
        
    })
    
}

