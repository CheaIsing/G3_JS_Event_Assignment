const apiUrl = "https://mps2.chandalen.dev";
const token = localStorage.getItem("authToken");

let id = localStorage.getItem("vendorId");


let placeHolderCard = `<div class="card ">
                                    <div class="card-content border">
                                        <div class="card-body">
                                            <p class="card-text placeholder-glow">
                                                <span class="placeholder col-7"></span>
                                                <span class="placeholder col-4"></span>
                                                <span class="placeholder col-4"></span>
                                                <span class="placeholder col-6"></span>
                                                <span class="placeholder col-8"></span>
                                              </p>
                                            
                                        </div>
                                        
                                    </div>
                                </div>`;
for (i = 1; i <= 2; i++) {
    placeHolderCard += placeHolderCard;
}


let allEventData = []; //  Array to hold the fetched Events data from the API
let allRecruitData = []; // Array to hold the fetched Recruitment data from the API
let allVendorData = []; // Array to hold the fetched Vendor Business data from the API

let currentIndex = 0; // Track the index of the Event cards being displayed
let currentRecruitIndex = 0; // Track the index of Recruitment the cards being displayed
let currentVendorIndex = 0; // Track the index of the Vendor cards being displayed

const incrementCount = 8;




getAllEventCard();
getAllRecruitCard();
getAllVendorCard();

function getAllEventCard() {

    document.getElementById('event-card-wrapper').innerHTML = placeHolderCard;
    fetch(`${apiUrl}/api/events?page=1&per_page=50&search`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
        .then(res => res.json())
        .then(json => {
            const { data } = json;
            allEventData = data;
            //hide placeHolder card
            document.getElementById('event-card-wrapper').innerHTML = "";

            loadEventCards();
        })
}


function getAllRecruitCard() {
    document.getElementById('recruit-card-wrapper').innerHTML = placeHolderCard;
    fetch(`${apiUrl}/api/vendors?page=1&per_page=50&search`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
        .then(res => res.json())
        .then(json => {
            const { data } = json;
            allRecruitData = data;

            //hide placeHolder card
            document.getElementById('recruit-card-wrapper').innerHTML ="";
            loadRecruitCards();
        })
}

function getAllVendorCard(){
    document.getElementById('vendor-card-wrapper').innerHTML = placeHolderCard;
    fetch(`${apiUrl}/api/businesses?page=1&per_page=50&search`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
        .then(res => res.json())
        .then(json => {
            const { data } = json;
            allVendorData = data;

            //hide placeHolder card
            document.getElementById('vendor-card-wrapper').innerHTML ="";
            loadVendorCards();
        })
}

// see more button configuration
function showMoreEvent() {
    document.getElementById('btn-seemore-event').style.display = "none";
    document.getElementById('eventPageSpinner').style.display = "block";
    loadEventCards();
}


function showMoreRecruit() {
    document.getElementById('btn-seemore-recruit').style.display = "none";
    document.getElementById('recruitPageSpinner').style.display = "block";
    loadRecruitCards();
}

function showMoreVendor() {
    document.getElementById('btn-seemore-vendor').style.display = "none";
    document.getElementById('vendorPageSpinner').style.display = "block";
    loadVendorCards();
}



function loadEventCards() {
    const cardContainer = document.getElementById('event-card-wrapper');

    // Check if there's more data to load
    for (let i = 0; i < incrementCount && currentIndex < allEventData.length; i++) {
        const element = allEventData[currentIndex];
        const newCard = document.createElement('div');
        newCard.className = "card";
        newCard.innerHTML = `       <div class="card-content">
                                        <img class="card-img-top" src="./assets/img/party/party1.png" alt="Title" />
                                        <div class="card-body">
                                            <div class="d-flex event-pill-wrapper"></div>
                                            <h5 class="card-title mt-2 mb-0">${element.name}</h5>
                                            <p class="card-text"><i class="bi bi-calendar-week"></i> Start-Date: ${element.start_date}</p>
                                            <p class="text-secondary"><i class="bi bi-geo-alt"></i> $${element.location}</p>
                                            <p><i class="bi bi-ticket-perforated"></i> Ticket price: $${element.ticket_price}</p>
                                            <div class="profile d-flex align-items-center">
                                                <div class="pf-img me-2">
                                                    <img src="${element.creator.avatar}" alt="">
                                                </div>
                                                <p>${element.creator.full_name}</p>
                                            </div>
                                        </div>
                                        <div class="card-btn-wrapper">
                                            <button type="button" class="btn-rounded" onclick="addRecuitWishlist(this)"><i
                                                    class="fa-regular fa-heart"></i></button>
                                            <button type="button" class="btn-rounded" onclick="shareRecruit(this)"><i
                                                    class="fa-solid fa-arrow-up-right-from-square"></i></button>
                                        </div>
                                    </div>`;

        cardContainer.appendChild(newCard);
        let eventPillWrapper = document.querySelectorAll('.event-pill-wrapper')[currentIndex];

        //Create event category pills
        let colorId = 1;
        element.event_categories.slice(0, 3).forEach(categoryElement => {
            let spanTag = document.createElement('span');
            spanTag.className = `pill${colorId} me-1`;
            spanTag.innerHTML = categoryElement.name;
            eventPillWrapper.appendChild(spanTag);
            colorId++;

        })
        currentIndex++;



    }


    if (currentIndex >= allEventData.length) {
        document.getElementById('btn-seemore-event').style.display = 'none';
        document.getElementById('eventPageSpinner').style.display = "none";
    }
    else {
        document.getElementById('eventPageSpinner').style.display = "none";
        document.getElementById('btn-seemore-event').style.display = 'block';

    }
}


function loadRecruitCards() {
    const cardContainer = document.getElementById('recruit-card-wrapper');

    // Check if there's more data to load
    for (let i = 0; i < incrementCount && currentRecruitIndex < allRecruitData.length; i++) {
        const element = allRecruitData[currentRecruitIndex];
        const newCard = document.createElement('div');
        newCard.className = "card";
        newCard.innerHTML = `<div class="card-content px-3">
                                        <div class="card-body">

                                            <h5 class="card-title mt-2 mb-0 fw-bold">${element.name}</h5>
                                            <div class="duration">
                                                <span class="text-secondary">Start Date: ${element.start_date} </span><br>
                                                <span class="text-secondary">End Date: ${element.end_date}</span>
                                            </div>
                                            <p class="card-text py-3">${element.description}</p>

                                            <p class="location"><i class="bi bi-geo-alt fs-5"></i>  ${element.location}</p>
                                            <div class="d-flex recruit-pill-wrapper"></div>
                                            <div class="profile d-flex align-items-center mt-3">
                                                <div class="pf-img me-2">
                                                    <img src="${element.creator.avatar}" alt="">
                                                </div>
                                                <p>${element.creator.full_name}</p>
                                            </div>

                                        </div>
                                    </div>`;

        cardContainer.appendChild(newCard);

        let recruitPillWrapper = document.querySelectorAll('.recruit-pill-wrapper')[currentRecruitIndex];

        //Create event category pills
        let colorId = 1;
        element.categories.slice(0, 3).forEach(categoryElement => {
            let spanTag = document.createElement('span');
            spanTag.className = `pill${colorId} me-1`;
            spanTag.innerHTML = categoryElement.name;
            recruitPillWrapper.appendChild(spanTag);
            colorId++;

        })
        currentRecruitIndex++;



    }


    // Hide the button if all data is loaded

    if (currentRecruitIndex >= allRecruitData.length) {
        document.getElementById('btn-seemore-recruit').style.display = 'none';
        document.getElementById('recruitPageSpinner').style.display = "none";
    }
    else {
        document.getElementById('recruitPageSpinner').style.display = "none";
        document.getElementById('btn-seemore-recruit').style.display = 'block';

    }
}

function loadVendorCards() {
    const cardContainer = document.getElementById('vendor-card-wrapper');

    // Check if there's more data to load
    for (let i = 0; i < incrementCount && currentVendorIndex < allVendorData.length; i++) {
        const element = allVendorData[currentVendorIndex];
        const newCard = document.createElement('div');
        newCard.className = "card";
        newCard.innerHTML = `<div class="card-content px-3">
                                        <div class="card-body">

                                            <h5 class="card-title mt-2 mb-0 fw-bold">${element.name}</h5>
                                            
                                            <p class="card-text py-3">${element.description}</p>

                                            <p class="location"><i class="bi bi-geo-alt fs-5"></i>  ${element.location}</p>
                                            <div class="d-flex vendor-pill-wrapper"></div>
                                            <div class="contact">
                                                <span class="text-secondary">Phone: ${element.phone} </span><br>
                                                <span class="text-secondary">Email: ${element.email}</span>
                                            </div>
                                            <div class="profile d-flex align-items-center mt-3">
                                                <div class="pf-img me-2">
                                                    <img src="${element.creator.avatar}" alt="">
                                                </div>
                                                <p>${element.creator.full_name}</p>
                                            </div>

                                        </div>
                                    </div>`;

        cardContainer.appendChild(newCard);

        let vendorPillWrapper = document.querySelectorAll('.vendor-pill-wrapper')[currentVendorIndex];

        //Create event category pills
        let colorId = 1;
        element.categories.slice(0, 3).forEach(categoryElement => {
            let spanTag = document.createElement('span');
            spanTag.className = `pill${colorId} me-1`;
            spanTag.innerHTML = categoryElement.name;
            vendorPillWrapper.appendChild(spanTag);
            colorId++;

        })
        currentVendorIndex++;



    }


    // Hide the button if all data is loaded

    if (currentVendorIndex >= allVendorData.length) {
        document.getElementById('btn-seemore-vendor').style.display = 'none';
        document.getElementById('vendorPageSpinner').style.display = "none";
    }
    else {
        document.getElementById('vendorPageSpinner').style.display = "none";
        document.getElementById('btn-seemore-vendor').style.display = 'block';

    }
}