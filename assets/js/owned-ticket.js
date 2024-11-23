function getOwnedTickets() {
    document.getElementById("ticket-tbody").innerHTML = `
  <tr>
    <td colspan="5">
      <div class="card border-0" aria-hidden="true">
        <div class="row g-0">
          <div class="col-4">
            <div class="bg-secondary-subtle border rounded-1" style="width: 100%; height: 100%;"></div>
          </div>
          <div class="col-8">
            <div class="card-body py-2">
              <h5 class="card-title">
                <span class="placeholder col-11" style="background-color: #D4D4D4;"></span>
              </h5>
              <p class="card-text">
                <span class="placeholder col-10" style="background-color: #D4D4D4;"></span>
                <span class="placeholder col-12" style="background-color: #D4D4D4;"></span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </td>
  </tr>
  <tr>
    <td colspan="5">
      <div class="card border-0" aria-hidden="true">
        <div class="row g-0">
          <div class="col-4">
            <div class="bg-secondary-subtle border rounded-1" style="width: 100%; height: 100%;"></div>
          </div>
          <div class="col-8">
            <div class="card-body py-2">
              <h5 class="card-title">
                <span class="placeholder col-11" style="background-color: #D4D4D4;"></span>
              </h5>
              <p class="card-text">
                <span class="placeholder col-10" style="background-color: #D4D4D4;"></span>
                <span class="placeholder col-12" style="background-color: #D4D4D4;"></span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </td>
  </tr>
  <tr>
    <td colspan="5">
      <div class="card border-0" aria-hidden="true">
        <div class="row g-0">
          <div class="col-4">
            <div class="bg-secondary-subtle border rounded-1" style="width: 100%; height: 100%;"></div>
          </div>
          <div class="col-8">
            <div class="card-body py-2">
              <h5 class="card-title">
                <span class="placeholder col-11" style="background-color: #D4D4D4;"></span>
              </h5>
              <p class="card-text">
                <span class="placeholder col-10" style="background-color: #D4D4D4;"></span>
                <span class="placeholder col-12" style="background-color: #D4D4D4;"></span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </td>
  </tr>
  `;
  fetch(`${API_URL}/api/profile/tickets`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("authToken")}`,
    },
  })
    .then((res) => res.json())
    .then((json) => {
      console.log(json.data);
      let rowsHtml = "";

      if(json.data.length <= 0){
        document.getElementById("ticket-tbody").innerHTML = `<tr><td colspan="5"><div class="text-center w-100 my-4">
              <img src="../../assets/img/noFound.png" alt="..." height="220px;">
              <h4 class="text-center text-brand mt-2">No Owned Ticket to Display...</h4>
            </div></td></tr>`;
          return;;
      }

      //   let categories = "";

      json.data.forEach(async (ele) => {
        let checkedIn =
          ele.is_checked_in == 1
            ? `<span class=" rounded-pill text-warning"><i class="fa-solid fa-hourglass-half me-1"></i>Not Check In Yet</span>`
            : `<span class=" rounded-pill text-success"><i class="fa-solid fa-circle-check me-1"></i>Checked In</span>`;

        rowsHtml += `<tr
                                            class="border-bottom position-relative">
                                            <td class>
                                                
                                                    <div
                                                        class="d-flex align-items-center">
                                                        <div class="me-3">
                                                            <div
                                                                class="text-center text-brand fw-bold">
                                                                <div>${formatDateStringMonth(
                                                                  ele.event
                                                                    .start_date
                                                                )}</div>
                                                                <div>${formatDateStringDay(
                                                                  ele.event
                                                                    .start_date
                                                                )}</div>
                                                            </div>
                                                        </div>
                                                        <img
                                                            src="${
                                                              ele.event
                                                                .thumbnail
                                                            }"
                                                            alt="Event Image"
                                                            class="rounded object-fit-cover"
                                                            width="150" height="85">
                                                        <div class="ms-3">
                                                            <h5
                                                                class="mb-0">${
                                                                  ele.event.name
                                                                }</h5>
                                                            <p
                                                                class="text-muted mb-0 w-75">${
                                                                  ele.event
                                                                    .location
                                                                }</p>
                                                            <p
                                                                class="text-muted mb-0 small">${formatCustomDateWithYear(
                                                                    ele.event.start_date
                                                                  )} - ${formatCustomDateWithYear(
                                                                    ele.event.end_date
                                                        )}, ${formatToHour(ele.event.start_date)} - ${formatToHour(
                                                            ele.event.end_date
                                                        )}</p>
                                                        </div>
                                                    </div>
                                                
                                            </td>
                                            <td class="text-nowrap">
                                                ${checkedIn}
                                            </td>
                                            <td class="text-nowrap">
                                                ${parseFloat(ele.ticket_price) > 0 ? '$'+ele.ticket_price.toFixed(2) : "Free"}
                                            </td>
                                            <td class="text-nowrap">
                                                ${formatDate(ele.expired_at)}
                                            </td>
                                            <td class="text-nowrap">
                                                <div class>

                                                    <button
                                                                      class="btn btn-outline-brand position-relative z-3 btn-display-ticket" data-id="${
                                                                        ele
                                                                          .event
                                                                          .creator
                                                                          .id
                                                                      }"  data-event-name="${
          ele.event.name
        }" data-token="${ele.token}" data-location="${
          ele.event.location
        }" data-price="${ele.event.ticket_price}" data-start="${
          ele.event.start_date
        }" data-end="${ele.event.end_date}"
                                                                      data-bs-target="#exampleModalToggle-1"
                                                                      data-bs-toggle="modal">Display
                                                                      Ticket</button>
                                                </div>
                                            </td>
                                        </tr>`;
      });

      document.getElementById("ticket-tbody").innerHTML = rowsHtml;
      document.querySelectorAll("tr").forEach((tr) => {
        tr.addEventListener("mouseenter", () => {
          tr.style.backgroundColor = "transparent";
        });
      });

      document.querySelectorAll(".btn-display-ticket").forEach((btn) => {
        btn.onclick = (e) => {
          displayTicket(e.target);
        };
      });
    });
}

getOwnedTickets();

function displayTicket(button) {
  const creatorId = button.dataset.id;
  const eventName = button.dataset.eventName;
  const token = button.dataset.token;
  const location = button.dataset.location;
  const price = button.dataset.price;
  const startDate = button.dataset.start;
  const endDate = button.dataset.end;

  document.querySelector("#exampleModalToggle-1 .ticket-modal").innerHTML = "";

      // console.log(json);
      let rowsHTML = `<div class="col-12">
                                    <div class="row g-0">
                                        <div class="col-8">
                                            <div class="card border h-100">
                                                <div
                                                    class="card-header text-center border-0 bg-brand-light">
                                                    <h6 class="mb-0">${eventName}</h6>
                                                </div>
                                                <div class="card-body">
                                                    <div
                                                        class="row justify-content-between">
                                                        <div class="col-5">
                                                            <div class>
                                                                <img
                                                                    style="width: 100px;height: 35px;"
                                                                    src="../../assets/img/Pruttikar_Text_Logo2.png"
                                                                    alt>
                                                            </div>
                                                            <div class="mt-3">
                                                                <h5
                                                                    class="text-brand">Event:</h5>
                                                                <h6
                                                                    class>${eventName}</h6>
                                                                
                                                            </div>
                                                        </div>
                                                        <div
                                                            class="col-2 mt-5 d-flex justify-content-center">
                                                            <img class="me-2"
                                                                width="80"
                                                                src="../../assets/img/ticket .png"
                                                                alt>
                                                        </div>
                                                        <div class="col-5">
                                                            <div class="mt-2">
                                                                <h6
                                                                    class="text-brand">Price
                                                                    : <span
                                                                        class>${parseFloat(price) > 0 ?'$'+ parseFloat(price).toFixed(2) : 'Free'}</span>
                                                                </h6>
                                                            </div>
                                                            <div class="mt-4">
                                                                <h5
                                                                    class="text-brand">Location:</h5>
                                                                <h6>${location}</h6>
                                                               

                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div
                                                    class="card-footer border-top bg-transparent">
                                                    <div class="row">
                                                        <div
                                                            class="col-4">
                                                            <h6
                                                                class="text-brand">Start</h6>
                                                            <h6>${formatCustomDateWithYear(startDate)}</h6>
                                                        </div>
                                                        <div
                                                            class="col-4 ">
                                                            <h6
                                                                class="text-brand">End
                                                            </h6>
                                                            <h6>${formatCustomDateWithYear(endDate)}</h6>
                                                        </div>
                                                        <div
                                                            class="col-4">
                                                            <h6
                                                                class="text-brand">Time: </h6>
                                                            <h6>
                                                              ${formatToHour(startDate)} - ${formatToHour(endDate)}
                                                            </h6>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-4">
                                            <div class="card h-100">
                                                <div
                                                    class="card-header text-center border-0 bg-brand-light">
                                                    <h6 class="mb-0">${eventName}</h6>
                                                </div>
                                                <div
                                                    class="card-body d-flex align-items-center justify-content-center">
                                                    <div class="row w-100">
                                                        <div
                                                            class="text-center">
                                                            <img class="w-50"
                                                                style
                                                                src="../../assets/img/QR_Ticket-removebg-preview.png"
                                                                alt="img">
                                                        </div>
                                                        <small
                                                            class="text-center">${token}</small>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>`;
      // console.log(rowsHTML);

      document.querySelector("#exampleModalToggle-1 .ticket-modal").innerHTML =
        rowsHTML;
    
}
