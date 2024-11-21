
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
    displayRelatedItems(evCatagoryId);
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
      sessionStorage.setItem("eventPaidId", id);
      location.href = "qr-payment.html";
    };
  });

function displayRelatedItems(evCatagoryId) {
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
        listE += `
                        <div class="card swiper-slide mx-1 ">
                            <div class="card-content">
                                <img class="card-img-top" src="${thumbnail}" alt="Title" />
                                <div class="card-body">
                                    <div class="d-flex event-pill-wrapper">${catas}</div>
                                    <h5 class="card-title mt-2 mb-0">${
                                      element.name
                                    }</h5>
                                    <p class="card-text">${moment(
                                      element.start_date
                                    ).format("ddd, D MMMM • h:mm A")}</p>
                                    <p class="text-secondary"> ${
                                      element.location
                                    }</p>
                                    <p>${price}</p>
                                    <div class="profile d-flex align-items-center mt-2">
                                        <div class="pf-img me-2">
                                            <img src="${
                                              element.creator.avatar
                                            }" alt="">
                                        </div>
                                        <p>${element.creator.full_name}</p>
                                    </div>
                                </div>
                                <div class="card-btn-wrapper">
                                    <button type="button" class="btn-rounded border-0 add-wish" onclick="addWishlist(${
                                      element.id
                                    })"><i
                                            class="fa-regular fa-heart"></i></button>
                                    <button type="button" class="btn-rounded border-0" onclick="copyEventUrlToClipboard(${
                                      element.id
                                    })"><i
                                            class="fa-solid fa-arrow-up-right-from-square"></i></button>
                                </div>
                            </div>
                        </div>
                      `;
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
