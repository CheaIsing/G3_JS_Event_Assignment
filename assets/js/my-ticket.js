// const API_URL = "https://mps2.chandalen.dev";
// const token = localStorage.getItem("authToken");

function getAllTicket() {
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
  fetch(
    `${API_URL}/api/profile/requested-tickets?sort_col=created_at&sort_dir=desc&page=1&per_page=10000`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
    .then((res) => res.json())
    .then((json) => {
      // console.log(json);

      if (json.result === true) {
        const { data } = json;

        if (data.length <= 0) {
          document.getElementById(
            "ticket-tbody"
          ).innerHTML = `<tr><td colspan="5"><div class="text-center w-100 my-4">
              <img src="../../assets/img/noFound.png" alt="..." height="220px;">
              <h4 class="text-center text-brand mt-2">No Request Ticket to Display...</h4>
            </div></td></tr>`;
          return;
        }

        let filterData = data;

        document
          .getElementById("select-filter")
          .addEventListener("change", (e) => {
            switch (e.target.value) {
              case "all": {
                filterData = data;
                break;
              }
              case "approved": {
                filterData = data.filter((ele) => ele.status == 2);
                break;
              }
              case "pending": {
                filterData = data.filter((ele) => ele.status == 1);
                break;
              }
              case "rejected": {
                filterData = data.filter((ele) => ele.status == 3);
                break;
              }
              default: {
                filterData = data;
                break;
              }
            }
            renderCard();
          });

        // data.forEach(ele=>{
        //   if(ele.status)
        // })

        function renderCard() {
          let rowsHTML = "";
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

          if (filterData.length == 0) {
            document.getElementById(
              "ticket-tbody"
            ).innerHTML = `<tr><td colspan="6"><div class="text-center w-100 my-4">
                <img src="../../assets/img/noFound.png" alt="..." height="220px;">
                <h4 class="text-center text-brand mt-2">No Request Ticket to Display...</h4>
              </div></td></tr>`;
            return;
          }

          filterData.forEach((ele) => {
            const { event } = ele;

            let status = "";
            switch (ele.status) {
              case 1: {
                status = `<span class=" rounded-pill text-warning"><i class="fa-solid fa-hourglass-half me-1"></i>Pending</span>`;
                break;
              }
              case 2: {
                status = `<span class=" rounded-pill text-success"><i class="fa-solid fa-circle-check me-1"></i>Aproved</span>`;
                break;
              }
              case 3: {
                status = `<span class=" rounded-pill text-danger"><i class="fa-solid fa-circle-xmark me-1"></i>Rejected</span>`;
                break;
              }
            }

            rowsHTML += `
                 <tr
                                                        class="border-bottom position-relative">
                                                        <td class>
                                                            <a href="javascript:void(0);" data-id="${
                                                              ele.id
                                                            }" class="stretched-link view-details">
                                                            <div
                                                                class="d-flex align-items-center">
                                                                <div class="me-3">
                                                                    <div
                                                                        class="text-center text-brand fw-bold">
                                                                        <div>${formatDateStringMonth(
                                                                          ele
                                                                            .event
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
                                                                      event.thumbnail
                                                                    }"
                                                                    alt="Event Image"
                                                                    class="rounded object-fit-cover"
                                                                    width="150" height="85">
                                                                <div class="ms-3">
                                                                    <h5
                                                                        class="mb-0">${
                                                                          event.name
                                                                        }</h5>
                                                                    <p
                                                                        class="text-muted mb-0">${
                                                                          event.location
                                                                        }</p>
                                                                    <p
                                                                        class="text-muted mb-0 small">${formatCustomDateWithYear(
                                                                          event.start_date
                                                                        )} - ${formatCustomDateWithYear(
              event.end_date
            )}, ${formatToHour(event.start_date)} - ${formatToHour(
              event.end_date
            )}</p>
                                                                </div>
                                                            </div></a>
                                                        </td>
                                                        <td>
                                                            ${moment(
                                                              event.created_at
                                                            ).format(
                                                              "MMM D, YYYY • h:mm A"
                                                            )}
                                                        </td>
                                                        <td>
                                                            ${status}
                                                        </td>
                                                        <td>
                                                            ${
                                                              ele.amount
                                                            } ticket${
              ele.amount > 1 ? "s" : ""
            } 
                                                        </td>
                                                        <td>${
                                                          parseFloat(
                                                            ele.ticket_price
                                                          ) > 0
                                                            ? (
                                                                ele.amount *
                                                                ele.event
                                                                  .ticket_price
                                                              ).toFixed(2)
                                                            : "Free"
                                                        }</td>
                                                        <td>
                                                            ${`<button 
                                                                    class="btn btn-brand position-relative z-3 view-details" data-id="${ele.id}" data-bs-target="#exampleModalToggle-1"
                                                                      data-bs-toggle="modal">View
                                                                    Detail</button>`}
    
                                                                
                                                            
                                                        </td>
                                                    </tr>`;
          });

          document.getElementById("ticket-tbody").innerHTML = rowsHTML;
          document.querySelectorAll(".view-details").forEach((link) => {
            link.onclick = () => {
              let id = link.dataset.id;
              console.log(id);

              getTransaction(id);
            };
          });
        }
        renderCard();
      }
    });
}

function getTransaction(id) {
  // console.log(id);

  fetch(`${API_URL}/api/profile/requested-tickets?page=1&per_page=10000`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .then((json) => {
      const { data } = json;
      console.log(data);

      let ticketDetail = {};

      for (let ele of data) {
        if (ele.id == id) {
          ticketDetail = ele;
          break;
        }
      }

      console.log(ticketDetail);

      let status = "";
      switch (ticketDetail.status) {
        case 1: {
          status = "Pending";
          break;
        }
        case 2: {
          status = "Approved";
          break;
        }
        case 3: {
          status = "Rejected";
        }
      }

      console.log(ticketDetail);

      document.getElementById("amount").innerHTML = ticketDetail.amount;
      document.getElementById("status").innerHTML = status;
      document.getElementById("transaction-file").src =
        ticketDetail.transaction_file
          ? ticketDetail.transaction_file
          : "../../assets/img/no-image.png";
      if (parseFloat(ticketDetail.event.ticket_price) == 0) {
        document.getElementById("title-trans").style.display = "none";
        document.getElementById("transaction-file").style.display = "none";
      }

      document.getElementById("price").innerHTML =
        parseFloat(ticketDetail.event.ticket_price) > 0
          ? "$" + ticketDetail.event.ticket_price
          : "Free";
      document.getElementById("total").innerHTML =
        "$" +
        (ticketDetail.event.ticket_price * ticketDetail.amount).toFixed(2);

      if (ticketDetail.rejected_reason != null) {
        document.getElementById("rejected-reason-col").innerHTML = `
          <div class="mb-4"><h4>Reject Reason</h4> <span id="reason-reject">${ticketDetail.reject_reason}</span></div> `;
      }

      // `<div class="mb-3">Reject Reason: <span id="reason-reject"></span></div>`;
    });
}

getAllTicket();
