// const apiUrl = "https://mps2.chandalen.dev";
const token2 = localStorage.getItem("authToken");

let id = localStorage.getItem("vendorId");

let placeHolderCard = `<div class="col-md-3">
<div class="card border-0 px-0 w-100">
                                    <div class="card-content border-0">
                                        <div class="bg-secondary-subtle border rounded-1 placeholder" style="width: 100%; height: 180px;"></div>
                                        <div class="card-body px-0">
                                        <span class="placeholder col-7 px-0" style="background-color: #D4D4D4;"></span> 
                                        <span class="placeholder col-4" style="background-color: #D4D4D4;"></span> 
                                        <span class="placeholder col-4" style="background-color: #D4D4D4;"></span> 
                                        <span class="placeholder col-6" style="background-color: #D4D4D4;"></span> 
                                        <span class="placeholder col-8" style="background-color: #D4D4D4;"></span> 
                                        <span class="placeholder col-11 px-0" style="background-color: #D4D4D4;"></span> 
                                                
                                            
                                        </div>
                                        
                                    </div>
                                </div></div>`;
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
  document.getElementById("event-card-wrapper").innerHTML = placeHolderCard;
  fetch(`${apiUrl}/api/events?page=1&per_page=100&search`, {
    headers: {
      Authorization: `Bearer ${token2}`,
    },
  })
    .then((res) => res.json())
    .then((json) => {
      let { data } = json;
      data = data.filter(
        (element) => new Date(element.start_date) > new Date()
      );
      allEventData = data;

      //hide placeHolder card
      document.getElementById("event-card-wrapper").innerHTML = "";

      loadEventCards();
    });
}

function getAllRecruitCard() {
  document.getElementById("recruit-card-wrapper").innerHTML = placeHolderCard;
  fetch(`${apiUrl}/api/vendors?page=1&per_page=50&search`, {
    headers: {
      Authorization: `Bearer ${token2}`,
    },
  })
    .then((res) => res.json())
    .then((json) => {
      let { data } = json;
      data = data.filter(
        (element) => new Date(element.start_date) > new Date()
      );
      allRecruitData = data;

      //hide placeHolder card
      document.getElementById("recruit-card-wrapper").innerHTML = "";
      loadRecruitCards();
    });
}

function getAllVendorCard() {
  document.getElementById("vendor-card-wrapper").innerHTML = placeHolderCard;
  fetch(`${apiUrl}/api/businesses?page=1&per_page=50&search`, {
    headers: {
      Authorization: `Bearer ${token2}`,
    },
  })
    .then((res) => res.json())
    .then((json) => {
      const { data } = json;
      allVendorData = data;

      //hide placeHolder card
      document.getElementById("vendor-card-wrapper").innerHTML = "";
      loadVendorCards();
    });
}

// see more button configuration
function showMoreEvent() {
  document.getElementById("btn-seemore-event").style.display = "none";
  document.getElementById("eventPageSpinner").style.display = "block";
  loadEventCards();
}

function showMoreRecruit() {
  document.getElementById("btn-seemore-recruit").style.display = "none";
  document.getElementById("recruitPageSpinner").style.display = "block";
  loadRecruitCards();
}

function showMoreVendor() {
  document.getElementById("btn-seemore-vendor").style.display = "none";
  document.getElementById("vendorPageSpinner").style.display = "block";
  loadVendorCards();
}

function loadEventCards() {
  const cardContainer = document.getElementById("event-card-wrapper");

  // Check if there's more data to load
  for (
    let i = 0;
    i < incrementCount && currentIndex < allEventData.length;
    i++
  ) {
    const element = allEventData[currentIndex];

    if (
      element.thumbnail ==
        "http://mps2.chandalen.dev/storage/events/no_photo.jpg" ||
      element.thumbnail == null
    ) {
      thumbnail = "../assets/img/party/party1.png";
    } else {
      thumbnail = element.thumbnail;
    }

    const newCard = document.createElement("div");
    newCard.className = "col-md-3 d-flex";
    newCard.innerHTML = `       <div class="card shadow-sm rounded w-100"> 
                                            <img class="card-img-top rounded-top" src="${thumbnail}" alt="Title" />
                                        <div class="card-body" onclick="showEventDetail(${element.id})">
                                            <div class="d-flex event-pill-wrapper mb-2"></div>
                                            <h5 class="card-title">${
                                              element.name
                                            }</h5>
                        <p class="text-muted "><i class="fa-regular fa-calendar me-1 text-brand"></i> ${moment(
                          element.start_date
                        ).format("ddd, D MMMM • h:mm A")}</p>
                        <p class="text-muted text-loca "><i class="fa-solid fa-location-dot me-1 text-brand"></i> ${
                          element.location
                        }</p>
                                            <h6 class="text-brand">${
                                              parseFloat(element.ticket_price) >
                                              0
                                                ? `$${element.ticket_price.toFixed(
                                                    2
                                                  )} per ticket`
                                                : "Free"
                                            }</h6>
                                           
                                        </div>
                                        
                                        <div class="card-footer d-flex align-items-center">
                                        <img src="${element.creator.avatar}" alt="Organizer" class="rounded-circle me-2 pf-img" style="width: 32px; height: 32px;">
                                        <span>${element.creator.full_name}</span>
                                      </div>
                                      
                                        <div class="card-btn-wrapper">
                                            <button type="button" class="btn-rounded add-wish" data-id="${
                                              element.id
                                            }" onclick="addWishlist(${
      element.id
    })"><i
                                                      class="fa-regular fa-heart"></i></button>
                                              <button type="button" class="btn-rounded" onclick="copyEventUrlToClipboard(${
                                                element.id
                                              })"><i
                                                      class="fa-solid fa-arrow-up-right-from-square"></i></button>
                                          </div>
                                        </div>
                                        
                                    </div>`;
    checkEventInWishlist(element.id);
    cardContainer.appendChild(newCard);
    let eventPillWrapper = document.querySelectorAll(".event-pill-wrapper")[
      currentIndex
    ];

    //Create event category pills
    let colorId = 1;
    element.event_categories.slice(0, 3).forEach((categoryElement) => {
      let spanTag = document.createElement("span");
      spanTag.className = `pill${colorId} me-1`;
      spanTag.innerHTML = categoryElement.name;
      eventPillWrapper.appendChild(spanTag);
      colorId++;
    });

    currentIndex++;
  }

  setUpWishBtn();

  if (currentIndex >= allEventData.length) {
    document.getElementById("btn-seemore-event").style.display = "none";
    document.getElementById("eventPageSpinner").style.display = "none";
  } else {
    document.getElementById("eventPageSpinner").style.display = "none";
    document.getElementById("btn-seemore-event").style.display = "block";
  }
}

function loadRecruitCards() {
  const cardContainer = document.getElementById("recruit-card-wrapper");

  // Check if there's more data to load
  for (
    let i = 0;
    i < incrementCount && currentRecruitIndex < allRecruitData.length;
    i++
  ) {
    const element = allRecruitData[currentRecruitIndex];
    const newCard = document.createElement("div");
    newCard.className = "card";
    newCard.innerHTML = `<div class="card-content px-3" onclick="showRecruitDetail(${
      element.id
    })">
                                    <div class="card-body">
                                        <div class="profile d-flex align-items-center justify-content-between mb-3">
                                            <div class="d-flex align-items-center">
                                                <div class="pf-img me-2">
                                                    <img src="${
                                                      element.creator.avatar
                                                    }" alt="">
                                                </div>
                                                <p>${
                                                  element.creator.full_name
                                                }</p>
                                            </div>
                                            <div class="d-flex recruit-pill-wrapper"></div>
                                        </div>
                                        <h5 class="card-title mt-2 mb-0 fw-bold">${
                                          element.name
                                        }</h5>
                                        <div class="card-text py-3">${
                                          element.description
                                        }</div>
                                        <div class="duration">
                                            <span class="text-secondary fs-6"><i class="bi bi-calendar fs-6 text-brand"></i> Start Date: ${moment(
                                              element.start_date
                                            ).format(
                                              "ddd, D MMMM • h:mm A"
                                            )} </span><br>
                                            <span class="location fs-6"><i class="bi bi-geo-alt fs-6 text-brand"></i>
                                                ${element.location}</span>
                                        </div>

                                    </div>
                                </div>`;

    cardContainer.appendChild(newCard);

    let recruitPillWrapper = document.querySelectorAll(".recruit-pill-wrapper")[
      currentRecruitIndex
    ];

    //Create event category pills
    let colorId = 1;
    element.categories.slice(0, 3).forEach((categoryElement) => {
      let spanTag = document.createElement("span");
      spanTag.className = `pill${colorId} me-1`;
      spanTag.innerHTML = categoryElement.name;
      recruitPillWrapper.appendChild(spanTag);
      colorId++;
    });
    currentRecruitIndex++;
  }

  // Hide the button if all data is loaded

  if (currentRecruitIndex >= allRecruitData.length) {
    document.getElementById("btn-seemore-recruit").style.display = "none";
    document.getElementById("recruitPageSpinner").style.display = "none";
  } else {
    document.getElementById("recruitPageSpinner").style.display = "none";
    document.getElementById("btn-seemore-recruit").style.display = "block";
  }
}

function loadVendorCards() {
  const cardContainer = document.getElementById("vendor-card-wrapper");

  // Check if there's more data to load
  for (
    let i = 0;
    i < incrementCount && currentVendorIndex < allVendorData.length;
    i++
  ) {
    const element = allVendorData[currentVendorIndex];
    let thumbnail =
      element.thumbnail && !element.thumbnail.includes("no_photo")
        ? element.thumbnail
        : "/assets/img/party/party1.png";
    const newCard = document.createElement("div");
    newCard.className = "card";
    newCard.innerHTML = `<div class="card-content" onclick="showServiceDetail(${element.id})">
                    <div class="card-body d-flex">
                        <div class="thumbnail">
                            <img src="${thumbnail}" alt="..." width='250' height='270'>
                        </div>
                        <div class="detail">
                            <h5 class="card-title mb-0 fw-bold">${element.name}</h5>

                            <div class="card-text card-desc1">${element.description}</div>

                            <p class="location"><i class="bi bi-geo-alt fs-6"></i> ${element.location}</p>
                            <div class="d-flex vendor-pill-wrapper"></div>
                            <div class="contact">
                                <span class="text-secondary">Phone: ${element.phone} </span><br>
                                <span class="text-secondary">Email: ${element.email}</span>
                            </div>
                            <div class="profile d-flex align-items-center mt-3">
                                <div class="pf-img me-2">
                                    <img src="${element.creator.avatar}" alt="avatar">
                                </div>
                                <p>${element.creator.full_name}</p>
                            </div>
                        </div>

                    </div>
                </div>`;

    cardContainer.appendChild(newCard);

    let vendorPillWrapper = document.querySelectorAll(".vendor-pill-wrapper")[
      currentVendorIndex
    ];

    //Create event category pills
    let colorId = 1;
    element.categories.slice(0, 3).forEach((categoryElement) => {
      let spanTag = document.createElement("span");
      spanTag.className = `pill${colorId} me-1`;
      spanTag.innerHTML = categoryElement.name;
      vendorPillWrapper.appendChild(spanTag);
      colorId++;
    });
    currentVendorIndex++;
  }

  // Hide the button if all data is loaded

  if (currentVendorIndex >= allVendorData.length) {
    document.getElementById("btn-seemore-vendor").style.display = "none";
    document.getElementById("vendorPageSpinner").style.display = "none";
  } else {
    document.getElementById("vendorPageSpinner").style.display = "none";
    document.getElementById("btn-seemore-vendor").style.display = "block";
  }
}

function showEventDetail(id) {
  sessionStorage.setItem("itemID", id);
  location.href = "/pages/browse/event-detail.html";
}

function showRecruitDetail(id) {
  sessionStorage.setItem("recruitDetailId", id);
  location.href = "/pages/browse/recruitment-detail.html";
}

function showServiceDetail(id) {
  sessionStorage.setItem("businessDetailId", id);
  location.href = "/pages/browse/business-detail.html";
}
