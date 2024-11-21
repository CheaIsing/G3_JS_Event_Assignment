
//get info event
let ticketPrice = 0;
let evCatagoryId;
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.has("e")
  ? urlParams.get("e")
  : sessionStorage.getItem("itemID");

document.getElementById("btn-copylink-event").onclick = () => {
  copyEventUrlToClipboard(id);
};

fetch(apiUrl + "/api/events/" + id)
  .then((res) => res.json())
  .then((json) => {
    let data = json.data;
    

    let thumbnail =
      data.thumbnail && !data.thumbnail.includes("no_photo")
        ? data.thumbnail
        : "../../assets/img/party/party1.png";
    let tRemain = data.ticket_opacity - data.ticket_bought;
    let price =
      data.ticket_price == 0 ? "Free" : `$${data.ticket_price.toFixed(2)}`;
    let catagory = data.event_categories
      .map((cata) => cata.name)
      .join(",&nbsp; ");
    let status = checkDateTimeRange(data.start_date, data.end_date);
    document.getElementById("ev-date").innerHTML = moment(
      data.start_date
    ).format('"ddd, D MMMM, YYYY"');
    document.getElementById("ev-img").src = thumbnail;
    document.getElementById(
      "hero-img"
    ).style.backgroundImage = `url(${thumbnail})`;
    document.getElementById("ev-title").innerHTML = data.name;
    document.getElementById("ev-description").innerHTML = data.description;
    document.getElementById("ev-startDate").innerHTML = moment(
      data.start_date
    ).format("ddd, D MMMM, YYYY");
    document.getElementById("ev-endDate").innerHTML = moment(
      data.end_date
    ).format("ddd, D MMMM, YYYY");
    document.getElementById("ev-time").innerHTML =
      moment(data.start_date).format("LT") +
      " - " +
      moment(data.end_date).format("LT");
    document.getElementById("wish-ev").setAttribute("data-id",data.id);
    console.log(document.getElementById("wish-ev"));
    document.getElementById("ev-status").innerHTML = status;
    document.getElementById("ev-location").innerHTML = data.location;
    document.getElementById("ev-catagory").innerHTML = catagory;
    document.getElementById("ev-price").innerHTML = price;
    document.getElementById("ev-ticket-op").innerHTML = data.ticket_opacity;
    document.getElementById("ev-ticket-remain").innerHTML = tRemain;
    document.getElementById("ev-org-pf").src = data.creator.avatar;
    document.getElementById("ev-org-name").innerHTML = data.creator.full_name;
    document
      .getElementById("ev-org-name")
      .setAttribute("data-id", data.creator.id);
    document.getElementById("ev-price1").innerHTML = price;
    evCatagoryId = data.event_categories[0].id;
    ticketPrice = data.ticket_price;
    if(parseInt(data.ticket_opacity) == 0){
      document.getElementById("btn-purchase").disabled = true;
      document.getElementById("btn-purchase").innerHTML = "Sold Out";
    }
    displayRelatedItems(evCatagoryId,data.id);
    if (data.ticket_price === 0) {
      fetch(
        `${API_URL}/api/profile/requested-tickets?sort_col=created_at&sort_dir=desc`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
        .then((res) => res.json())
        .then((json4) => {
          for (let ele of json4.data) {
            if (ele.event.id == id) {
              console.log(ele);
              document.getElementById("btn-purchase").disabled = true;
              document.getElementById("btn-purchase").innerHTML =
                "Redeemed Ticket";
            }
          }
        });

      document.getElementById("btn-purchase").removeAttribute("data-bs-target");
      document.getElementById("btn-purchase").removeAttribute("data-bs-toggle");
      document.getElementById("btn-purchase").innerHTML = "Redeem Ticket";
      document.getElementById("btn-purchase").onclick = () => {
        if(!localStorage.getItem("authToken")){
          location.href = "/pages/authentication/login.html"
          return;
        }
        fetch(`${apiUrl}/api/tickets/request-buy`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            event_id: parseInt(id),
            amount: 1,
          }),
        })
          .then((res) => res.json())
          .then((json1) => {
            if (json1.result === true) {
              showToast("Redeem Ticket Sucessfully", json1.result);
              document.getElementById("btn-purchase").disabled = true;
            } else {
              showToast(json1, json1.result);
            }
          })
          .catch((err) => {
            showToast(err, false);
          });
      };
    }

    document.getElementById("btn-purchase").onclick = () => {
      if(!localStorage.getItem("authToken")){
        location.href = "/pages/authentication/login.html"
        return;
      }
      sessionStorage.setItem("eventPaidId", id);
      location.href = "qr-payment.html";
    };
  });

function displayRelatedItems(evCatagoryId,detailId) {
  let url = apiUrl + `/api/events?category=${evCatagoryId}&page=1&per_page=10`;
  fetch(url)
    .then((res) => res.json())
    .then((json) => {
      let data = json.data;
      // get status
      data.forEach((element) => {
        element.status = checkDateTimeRange(
          element.start_date,
          element.end_date
        );
      });
      data.sort((a, b) => {
        const statusOrder = { Showing: 0, Upcoming: 1, Past: 2 };
        return statusOrder[a.status] - statusOrder[b.status];
      });
      let listE = "";
      data.forEach((element) => {
        if(element.id!=detailId){
          let price =
          element.ticket_price == 0
            ? "Free"
            : `$${element.ticket_price.toFixed(2)} per ticket`;
        let catas = "";
        element.event_categories.forEach((cata) => {
          catas += `<div class="pill${cata.id} me-1">${cata.name}</div>`;
        });
        let thumbnail =
          element.thumbnail && !element.thumbnail.includes("no_photo")
            ? element.thumbnail
            : "../../assets/img/party/party1.png";
            listE+=`<div class="col-md-4  d-flex  swiper-slide"> 
                    <div class="card shadow-sm rounded w-100"> 
                      <img src="${thumbnail}" alt="Event Image" class="card-img-top rounded-top">
                      <div class="card-body w-100">
                        <div class="d-flex mb-2 event-pill-wrapper">
                        ${catas}
                        </div>
                        <h5 class="card-title">${element.name}</h5>
                        <p class="text-muted mb-1"><i class="fa-regular fa-calendar me-1"></i> ${moment(
                                                        element.start_date
                                                      ).format("ddd, D MMMM • h:mm A")}</p>
                        <p class="text-muted text-loca"><i class="fa-solid fa-location-dot me-1"></i> ${
                                                        element.location
                                                      }</p>
                        <h6 class="text-brand">${price}</h6>
                      </div>
                      <div class="card-footer d-flex align-items-center">
                        <img src="${element.creator.avatar}" alt="Organizer" class="rounded-circle me-2 pf-img" style="width: 40px; height: 40px;">
                        <span>${element.creator.full_name}</span>
                      </div>
                      <div class="card-btn-wrapper">
                                    <button type="button" class="btn-rounded border-0 add-wish" data-id="${element.id}" ><i
                                            class="fa-regular fa-heart"></i></button>
                                    <button type="button" class="btn-rounded border-0" onclick="copyEventUrlToClipboard(${
                                      element.id
                                    })"><i
                                            class="fa-solid fa-arrow-up-right-from-square"></i></button>
                                </div>
                    </div>
                  </div>`;
        // listE += `
        //                 <div class="card swiper-slide mx-1 ">
        //                     <div class="card-content">
        //                         <img class="card-img-top" src="${thumbnail}" alt="Title" />
        //                         <div class="card-body">
        //                             <div class="d-flex event-pill-wrapper">${catas}</div>
        //                             <h5 class="card-title mt-2 mb-0">${
        //                               element.name
        //                             }</h5>
        //                             <p class="card-text text-secondary"><i class="fa-regular fa-calendar pe-2"></i>${moment(
        //                               element.start_date
        //                             ).format("ddd, D MMMM • h:mm A")}</p>
        //                             <p class="text-secondary"><i class="fa-solid fa-location-dot pe-2"></i>${
        //                               element.location
        //                             }</p>
        //                             <p class="text-brand">${price}</p>
        //                             <div class="card-footer profile d-flex align-items-center mt-2">
        //                                 <div class="pf-img me-2">
        //                                     <img src="${
        //                                       element.creator.avatar
        //                                     }" alt="" >
        //                                 </div>
        //                                 <p>${element.creator.full_name}</p>
        //                             </div>
        //                         </div>
        //                         <div class="card-btn-wrapper">
        //                             <button type="button" class="btn-rounded border-0 add-wish" data-id="${element.id}" ><i
        //                                     class="fa-regular fa-heart"></i></button>
        //                             <button type="button" class="btn-rounded border-0" onclick="copyEventUrlToClipboard(${
        //                               element.id
        //                             })"><i
        //                                     class="fa-solid fa-arrow-up-right-from-square"></i></button>
        //                         </div>
        //                     </div>
        //                 </div>
        //               `;
        }
        
        checkEventInWishlist(element.id);
      });
      document.getElementById("related-events").innerHTML = listE;
      setUpWishBtn();
    });
}
function viewOrgDetail(org) {
  let id = org.dataset.id;
  sessionStorage.setItem("orgID", id);
  location.href = "/pages/authentication/view-profile.html";
}
