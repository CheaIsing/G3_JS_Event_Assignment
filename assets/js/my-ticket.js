// const API_URL = "https://mps2.chandalen.dev";
// const token = localStorage.getItem("authToken");

function getAllTicket() {
  fetch(
    `${API_URL}/api/profile/requested-tickets?sort_col=created_at&sort_dir=desc`,
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
        console.log(data);

        if(data.length <= 0){
          document.getElementById("ticket-tbody").innerHTML = '<tr><td colspan="5"><h3 class="text-center w-100 mt-5">No Requested Tickets to Display...</h3></td></tr>';
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

          filterData.forEach((ele) => {
            const { event } = ele;
            let categories = "";

            if (event.event_categories.length > 0) {
              for (let value of event.event_categories) {
                categories += value.name + ", ";
              }

              categories = categories.substring(0, categories.length - 2);
            }

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
                                                                          categories
                                                                            ? categories
                                                                            : "No Categories"
                                                                        }</p>
                                                                    <p
                                                                        class="text-muted mb-0 small">${
                                                                          event.start_date
                                                                        } - ${
              event.end_date
            }</p>
                                                                </div>
                                                            </div></a>
                                                        </td>
                                                        <td>
                                                            ${event.created_at}
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
                                                        <td>$${
                                                          ele.amount *
                                                          ele.event.ticket_price
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

  fetch(`${API_URL}/api/profile/requested-tickets`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .then((json) => {
      const { data } = json;
      console.log(data);

      let ticketDetail;

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

      document.getElementById('event-detail-desc').innerHTML = `
      <h4>${ticketDetail.event.name}</h4>
                                    <div class="mb-2">${ticketDetail.event.location}</div>
                                    <div class="mb-2">${formatDate(ticketDetail.event.start_date)} - ${formatDate(ticketDetail.event.end_date)}`

      document.getElementById("amount").innerHTML = ticketDetail.amount;
      document.getElementById("status").innerHTML = status;
      document.getElementById("transaction-file").src =
        ticketDetail.transaction_file
          ? ticketDetail.transaction_file
          : "../../assets/img/no-image.png";

      document.getElementById("price").innerHTML = "$"+
        ticketDetail.event.ticket_price;
      document.getElementById("total").innerHTML ="$"+
        ticketDetail.event.ticket_price * ticketDetail.amount;

        if(ticketDetail.rejected_reason != null){
          document.getElementById('rejected-reason-col').innerHTML = `
          <div class="mb-4"><h4>Reject Reason</h4> <span id="reason-reject">${ticketDetail.reject_reason}</span></div> `
        }

      // `<div class="mb-3">Reject Reason: <span id="reason-reject"></span></div>`;
    });
}

getAllTicket();
