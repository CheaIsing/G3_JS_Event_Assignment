// const API_URL = "https://mps2.chandalen.dev";
// const token = localStorage.getItem('authToken');
let orgId = sessionStorage.getItem("orgID");

let allEventData = []; //  Array to hold the fetched Events data from the API
let allRecruitData = []; // Array to hold the fetched Recruitment data from the API
let allVendorData = []; // Array to hold the fetched Vendor Business data from the API

function loadEventCards() {
  const cardContainer = document.querySelector(".event-card-wrapper");
  document.querySelector(".event-card-wrapper").innerHTML = `
  <div class="col-md-3">
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
                                </div></div>
  <div class="col-md-3">
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
                                </div></div>
  <div class="col-md-3">
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
                                </div></div>
  <div class="col-md-3">
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
                                </div></div>
                                `;

  if (allEventData.length <= 0) {
    return (document.querySelector(
      ".event-card-wrapper"
    ).innerHTML = `<div class="text-center w-100">
              <img src="../../assets/img/noFound.png" alt="..." height="220px;">
              <h4 class="text-center text-brand mt-2">No Event to Display...</h4>
            </div>`);
  }


  
  document.querySelector(".event-card-wrapper").innerHTML = ``
  allEventData.forEach((element, currentIndex) => {
    let thumbnail = "";
    if (
      element.thumbnail ==
      "http://mps2.chandalen.dev/storage/events/no_photo.jpg"
    ) {
      element.thumbnail = "../../assets/img/party/party1.png";
    } else {
      thumbnail = element.thumbnail;
    }
    console.log(element);

    const newCard = document.createElement("div");
    newCard.className = "col-md-3 d-flex";
    newCard.innerHTML = `       <div class="card shadow-sm rounded w-100"> 
                                            <img class="card-img-top rounded-top cursor-pointer" onclick="showEventDetail(${
                                              element.id
                                            })" src="${thumbnail}" alt="Title" />
                                        <div class="card-body" onclick="showEventDetail(${
                                          element.id
                                        })">
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
                                        
                                        <div class="d-none" onclick="showEventDetail(${
                                          element.id
                                        })" class="card-footer cursor-pointer d-flex align-items-center">
                                        <img src="${""}" alt="Organizer" class="rounded-circle me-2 pf-img" style="width: 32px; height: 32px;">
                                        <span>${""}</span>
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
                                              <div class="date-tag text-center p-2">
                                                <h6>${moment(
                                                  element.start_date
                                                ).format("D")}</h6>
                                                <h6>${moment(
                                                  element.start_date
                                                ).format("MMMM")}</h6>
                                              </div>
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
  });
  setUpWishBtn();
}

function loadRecruitCards() {
  const cardContainer = document.querySelector(".recruit-card-wrapper");
  document.querySelector(".recruit-card-wrapper").innerHTML = ``;

  if (allRecruitData.length <= 0) {
    return (document.querySelector(
      ".recruit-card-wrapper"
    ).innerHTML = `<div class="text-center w-100">
              <img src="../../assets/img/noFound.png" alt="..." height="220px;">
              <h4 class="text-center text-brand mt-2">No Vendor Recruitment to Display...</h4>
            </div>`);
  }

  allRecruitData.forEach((element, currentRecruitIndex) => {
    const newCard = document.createElement("div");
    newCard.className = "card";
    newCard.innerHTML = `<div class="card-content px-3" onclick="showRecruitDetail(${element.id})">
                                    <div class="card-body">
                                        <div class="profile d-flex align-items-center justify-content-between mb-3">
                                            <div class="d-flex recruit-pill-wrapper"></div>
                                        </div>
                                        <h5 class="card-title mt-2 mb-0 fw-bold">${element.name}</h5>
                                        <p class="card-text py-3">${element.description} </p>
                                        <div class="duration">
                                            <span class="text-secondary"><i class="bi bi-calendar fs-6 text-brand"></i> Start Date: ${element.start_date} </span><br>
                                            <span class="location"><i class="bi bi-geo-alt fs-6 text-brand"></i>
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
  });
}

function loadVendorCards() {
  const cardContainer = document.querySelector(".vendor-card-wrapper");
  document.querySelector(".vendor-card-wrapper").innerHTML = ``;

  if (allVendorData.length <= 0) {
    return (document.querySelector(
      ".vendor-card-wrapper"
    ).innerHTML = `<div class="text-center w-100">
              <img src="../../assets/img/noFound.png" alt="..." height="220px;">
              <h4 class="text-center text-brand mt-2">No Vendor Business to Display...</h4>
            </div>`);
  }

  allVendorData.forEach((element, currentVendorIndex) => {
    const newCard = document.createElement("div");
    newCard.className = "card";
    newCard.innerHTML = `<div class="card-content" onclick="showServiceDetail(${
      element.id
    })">
                  <div class="card-body d-flex">
                      <div class="thumbnail">
                          <img src="${
                            element.thumbnail
                              ? element.thumbnail
                              : "../../assets/img/party/party1.png"
                          }" alt="...">
                      </div>
                      <div class="detail">
                          <h5 class="card-title mb-0 fw-bold">${
                            element.name
                          }</h5>

                          <p class="card-text py-3">${element.description}</p>

                          <p class="location"><i class="bi bi-geo-alt fs-5"></i> ${
                            element.location
                          }</p>
                          <div class="d-flex vendor-pill-wrapper"></div>
                          <div class="contact">
                              <span class="text-secondary">Phone: ${
                                element.phone
                              } </span><br>
                              <span class="text-secondary">Email: ${
                                element.email
                              }</span>
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
  });
}



fetch(`${API_URL}/api/profile/detail/${orgId}`, {
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
    Accept: "application/json",
  },
})
  .then((res) => res.json())
  .then((json) => {
    const { events, vendor_recruitments, businesses } = json.data;

    // console.log(events.length, vendor_recruitments.length, businesses.length);

    document.getElementById("event-sum").innerHTML = events.length;
    document.getElementById("vendor-sum").innerHTML =
      vendor_recruitments.length;
    document.getElementById("business-sum").innerHTML = businesses.length;

    document.getElementById("avarta").src = json.data.avatar;
    document.getElementById("fullname").innerHTML = json.data.full_name;
    document.getElementById("email").innerHTML = json.data.email
      ? json.data.email
      : "None";
    document.getElementById("tel").innerHTML = json.data.phone_number
      ? json.data.phone_number
      : "None";

    allEventData = events;
    allRecruitData = vendor_recruitments;
    allVendorData = businesses;
    console.log(allVendorData);

    const currentDate = new Date();
    document.querySelector("#events-filter").onchange = (e) => {
      switch (e.target.value) {
        case "all":
          allEventData = events;
          break;
        case "upcoming":
          allEventData = events.filter(
            (ele) => new Date(ele.start_date.replace(" ", "T")) > currentDate
          );
          break;
        case "showing":
          allEventData = events.filter((ele) => {
            const startDate = new Date(ele.start_date.replace(" ", "T"));
            const endDate = new Date(ele.end_date.replace(" ", "T"));
            return currentDate >= startDate && currentDate <= endDate;
          });
          break;
        case "past":
          allEventData = events.filter(
            (ele) => new Date(ele.end_date.replace(" ", "T")) < currentDate
          );
          break;
        default:
          allEventData = events;
          break;
      }
      loadEventCards();
    };

    document.getElementById("vendors-filter").onchange = (e) => {
      switch (e.target.value) {
        case "all":
          allRecruitData = vendor_recruitments;
          break;
        case "upcoming":
          allRecruitData = vendor_recruitments.filter(
            (ele) => new Date(ele.start_date.replace(" ", "T")) > currentDate
          );
          break;
        case "showing":
          allRecruitData = vendor_recruitments.filter((ele) => {
            const startDate = new Date(ele.start_date.replace(" ", "T"));
            const endDate = new Date(ele.end_date.replace(" ", "T"));
            return currentDate >= startDate && currentDate <= endDate;
          });
          break;
        case "past":
          allRecruitData = vendor_recruitments.filter(
            (ele) => new Date(ele.end_date.replace(" ", "T")) < currentDate
          );
          break;
        default:
          allRecruitData = vendor_recruitments;
          break;
      }
      loadRecruitCards();
    };

    loadEventCards();
    loadRecruitCards();
    loadVendorCards();
  });
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
