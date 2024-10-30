const apiUrl = "https://mps2.chandalen.dev";
const token = localStorage.getItem("authToken");

// Create event form variables
let thumbnailFile = document.getElementById('fileUpload').files[0];
let eventName = document.getElementById('eventTitle').value;
let startDate = document.getElementById('startDate').value;
let startTime = document.getElementById('startTime').value;
let endDate = document.getElementById('endDate').value;
let endTime = document.getElementById('endTime').value;
let fullStartDate = `${startDate} ${startTime}`;
let fullEndDate = `${endDate} ${endTime}`;
let address1 = document.getElementById('address1').value;
let address2 = document.getElementById('address2').value;
let city = document.getElementById('city').value;
let province = document.getElementById('province').value;
let country = document.getElementById('country').value;
let fullAddress = `${address1}, ${address1}, ${city}, 
                    ${province}, ${country}`;
let description = document.getElementById('description').value;                    
let descPhoto = document.getElementById('photoUpload').files[0];
let categoriesSelect = document.getElementById('categorySelect');
let categoriesList = []
for(let catOption of categoriesSelect.options){
    if(catOption.selected){
        categoriesList.push(catOption.value);
    }
}


// add ticket form variables
let ticketQty = document.getElementById('ticketQuantity').value;
let ticketPrice = document.getElementById('price').value;
let khqrImg = document.getElementById('khqrImg').value;

function createEvent() {
    let eventData = new FormData();
    eventData.append('name', eventName);
    eventData.append('name', eventName);
    eventData.append('start_date', fullStartDate);
    eventData.append('end_date', fullEndDate);
    eventData.append('description', description);
    eventData.append('ticket_opacity', ticketQty);
    eventData.append('ticket_price', ticketPrice);
    eventData.append('event_categories', categoriesList);

    console.log(eventData);
    
    // fetch('apiUrl', {
    //     method: 'POST',
    //     headers: {
    //         "Accept": "application/json; charset=UTF-8",
    //         Authorization: `Bearer ${token}`
    //     },
    //     body : eventData
    // })
    // .then(res => res.json())
    // .then(json=>{
    //     alert('Success created');
        
    // })
}