const apiUrl = "https://mps2.chandalen.dev";
const token = localStorage.getItem("authToken");

let id = localStorage.getItem("vendorId");

getAllEventCard();
function getAllEventCard() {
    let eventCard = "";
    fetch(`${apiUrl}/api/events?page=1&per_page=50&search`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
        .then(res => res.json())
        .then(json => {
            const { data } = json;
            data.forEach(element => {
                eventCard += `<div class="card">
                                    <div class="card-content">
                                        <img class="card-img-top" src="./assets/img/party/party1.png" alt="Title" />
                                        <div class="card-body">
                                            <span class="pill">${element.event_categories[0].name}</span>
                                            <h5 class="card-title mt-2 mb-0">${element.name}</h5>
                                            <p class="card-text">Start-Date: ${element.start_date}</p>
                                            <p>Ticket price: $${element.ticket_price}</p>
                                            <div class="profile d-flex align-items-center">
                                                <div class="pf-img me-2">
                                                    <img src="${element.creator.avatar}" alt="">
                                                </div>
                                                <p>${element.creator.full_name}</p>
                                            </div>
                                        </div>
                                        <div class="card-btn-wrapper">
                                            <button type="button" class="btn-rounded" onclick="addWishlist(this)"><i
                                                    class="fa-regular fa-heart"></i></button>
                                            <button type="button" class="btn-rounded" onclick="share(this)"><i
                                                    class="fa-solid fa-arrow-up-right-from-square"></i></button>
                                        </div>
                                    </div>
                                </div>`;
            });

            document.getElementById('event-card-wrapper').innerHTML = eventCard;
        })
}