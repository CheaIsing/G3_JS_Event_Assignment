const apiUrl = "https://mps2.chandalen.dev";
const token = localStorage.getItem("authToken");
function checkDateTimeRange(startDateTimeStr, endDateTimeStr) {
    // Create Date objects from the input strings  
    const startDateTime = new Date(startDateTimeStr);
    const endDateTime = new Date(endDateTimeStr);
    const now = new Date(); // Current date and time  

    if (now >= startDateTime && now <= endDateTime) {
        return "Showing";
    } else if (now < startDateTime) {
        return "Upcoming";
    } else {
        return "Past";
    }
}
//get info event
let id = sessionStorage.getItem('itemID');
fetch(apiUrl + '/api/events/' + id)
    .then(res => res.json())
    .then(json => {
        let data = json.data;
        let tRemain = data.ticket_opacity - data.ticket_bought;
        let price = data.ticket_price == 0 ? 'Free' : `$${data.ticket_price}`;
        let catagory = data.event_categories.map(cata => cata.name).join(',&nbsp; ');
        let status = checkDateTimeRange(data.start_date, data.end_date)
        document.getElementById("ev-date").innerHTML = data.start_date.split(" ")[0];
        document.getElementById("ev-title").innerHTML = data.name;
        document.getElementById("ev-description").innerHTML = data.description;
        document.getElementById("ev-startDate").innerHTML = data.start_date;
        document.getElementById("ev-endDate").innerHTML = data.end_date;
        document.getElementById("ev-status").innerHTML = status;
        document.getElementById("ev-location").innerHTML = data.location;
        document.getElementById("ev-catagory").innerHTML = catagory;
        document.getElementById("ev-price").innerHTML = price;
        document.getElementById("ev-ticket-op").innerHTML = data.ticket_opacity;
        document.getElementById("ev-ticket-remain").innerHTML = tRemain;
        document.getElementById("ev-org-pf").src = data.creator.avatar;
        document.getElementById("ev-org-name").innerHTML = data.creator.full_name;
        document.getElementById("ev-org-name").setAttribute('data-id' , data.creator.id ); 
        document.getElementById("ev-price1").innerHTML = price;
    })
displayRelatedItems();
function displayRelatedItems() {
    let url = apiUrl + `/api/events?page=1&per_page=4&search`;
    fetch(url)
        .then(res => res.json())
        .then(json => {
            let data = json.data;
            // get status
            data.forEach(element => {
                element.status = checkDateTimeRange(element.start_date, element.end_date);
            });
            data.sort((a, b) => {
                const statusOrder = { "Showing": 0, "Upcoming": 1, "Past": 2 };
                return statusOrder[a.status] - statusOrder[b.status];
            });
            let listE = '';
            data.forEach(element => {
                let price = element.ticket_price == 0 ? 'Free' : `$${element.ticket_price}`;
                let catas='';
                element.event_categories.forEach(cata=>{
                    catas+=`<div class="pill${cata.id} me-1">${cata.name}</div>`;
                })
                listE+=`<div class="card">
                        <div class="card-content">
                            <img class="card-img-top" src="../../assets/img/party/party1.png" alt="Title" />
                            <div class="card-body">
                                <div class="d-flex event-pill-wrapper">${catas}</div>
                                <h5 class="card-title mt-2 mb-0">${element.name}</h5>
                                <p class="card-text"><i class="bi bi-calendar-week text-brand"></i> Start-Date: ${element.start_date}</p>
                                <p class="text-secondary"><i class="bi bi-geo-alt text-brand"></i> ${element.location}</p>
                                <p><i class="bi bi-ticket-perforated text-brand"></i> Ticket price: ${price}</p>
                                <div class="profile d-flex align-items-center">
                                    <div class="pf-img me-2">
                                        <img src="${element.creator.avatar}" alt="">
                                    </div>
                                    <p>${element.creator.full_name}</p>
                                </div>
                            </div>
                            <div class="card-btn-wrapper">
                                <button type="button" class="btn-rounded border-0 add-wish" onclick="addRecuitWishlist(this)"><i
                                        class="fa-regular fa-heart"></i></button>
                                <button type="button" class="btn-rounded border-0" onclick="shareRecruit(this)"><i
                                        class="fa-solid fa-arrow-up-right-from-square"></i></button>
                            </div>
                        </div>
                    </div>`;
            });
            document.getElementById('related-events').innerHTML = listE;
            const wishButtons = document.querySelectorAll('.add-wish'); // Select all buttons with the class i-wish
            console.log(wishButtons);
            wishButtons.forEach(button => {
                button.addEventListener('click', () => {
                    button.classList.toggle('clicked'); // Toggle the clicked class for each button
                });
            });
        })
}
function viewOrgDetail(org){
    id = org.dataset.id;
    sessionStorage.setItem('orgID', id);
    location.href = '/pages/authentication/view-profile.html';
}