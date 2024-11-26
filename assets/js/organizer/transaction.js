

document.addEventListener("DOMContentLoaded", () => {
  fetch(
    `${apiUrl}/api/tickets/request-buy?event=${sessionStorage.getItem(
      "requestDetailId"
    )}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  )
    .then((res) => res.json())
    .then((json) => {
      let transaction;
      for (let ele of json.data) {
        if (ele.id == sessionStorage.getItem("transactionId")) {
          transaction = ele;
          break;
        }
      }

      fetch(`${apiUrl}/api/profile/detail/${transaction.requester.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((json) => {

          let status = "";
          switch (transaction.status) {
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

         

          document.querySelector(".transaction-row").innerHTML = `
            <div class="col-12">
                                    <div
                                        class="mt-4 d-flex w-100 align-items-center justify-content-between">
                                        <div
                                            class="d-flex align-content-center">
                                            <div class="me-3">
                                                <img
                                                    src="${
                                                      transaction.requester
                                                        .avatar
                                                    }"
                                                    alt
                                                    class="object-fit-cover rounded-circle"
                                                    width="75" height="75" id="requester-avarta">
                                            </div>
                                            <div
                                                class>
                                                <h5 class="mb-0" id="requester">${
                                                  transaction.requester
                                                    .full_name
                                                }</h5>
                                                <div
                                                    class>
                                                    <small id="request-date">${formatDateFull(transaction.created_at)
                                                      
                                                    }</small>
                                                </div>
                                                <div><small>
                                                        <a
                                                            href="mailto:${
                                                              json.data.email
                                                            }"
                                                            class="text-decoration-none"
                                                            style="color: inherit;" id="request-email">${
                                                              json.data.email
                                                            }</a>
                                                    </small></div>
    
                                            </div>
                                        </div>
                                        <div>
                                            <button type="button"
                                                class="btn btn-brand me-2" data-id="" onclick="approveRequest(${
                                                  transaction.id
                                                })">Approve</button>
                                            <!-- Button trigger modal -->
                                            <button type="button"
                                                class="btn btn-danger"
                                                data-bs-toggle="modal"
                                                data-bs-target="#exampleModal">
                                                Disapprove
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-12">
                                    <p>Status: ${status}</p>
                                    <p>Ticket Request Quantity : <span id="amount">${
                                      transaction.amount
                                    } ticket${
            transaction.amount > 1 ? "s" : ""
          }</span></p>
                                    <p>Price per ticket: <span id="price-unit">${parseFloat(transaction.event.ticket_price) > 0 ?
                                      '$'+(transaction.event.ticket_price *
                                        transaction.amount).toFixed(2) : 'Free'
                                    }</span></p>
                                    <p>Total: <span id="total">${parseFloat(transaction.event.ticket_price) > 0 ?
                                      '$'+(transaction.event.ticket_price *
                                        transaction.amount).toFixed(2) : 'Free'
                                    }</span></p>
                                    ${parseFloat(transaction.event.ticket_price) > 0 ? `<p id="label-Reject" class="w-25 ${transaction.reject_reason != null ? '' : 'd-none'} ${transaction.status != 3 ? 'd-none':'d-block'}">Reject Reason: ${transaction.reject_reason != null ? transaction.reject_reason : ''} </p>
                                    <h5>Transaction File:</h5>
                                    <img
                                        src="${
                                          transaction.transaction_file
                                            ? transaction.transaction_file
                                            : "../../assets/img/no-image.png"
                                        }"
                                        class="border border-2" alt="transaction-img" id="transaction-img" width="400">` : ''}
                                    
                                </div>`;

          document.querySelector(".btn-disapprove").onclick = () => {
            let reason = document.getElementById("reason-disapprove").value;

            if (reason) {
              document
                .getElementById("reason-disapprove")
                .classList.remove("is-invalid");
              document.getElementById("textarea-err").style.display = "none";
              disapproveRequest(transaction.id, reason);
            } else {
              document
                .getElementById("reason-disapprove")
                .classList.add("is-invalid");
              document.getElementById("textarea-err").style.display = "block";
            }
          };
          document.getElementById("reason-disapprove").oninput = () => {
            document
              .getElementById("reason-disapprove")
              .classList.remove("is-invalid");
            document.getElementById("textarea-err").style.display = "none";
          };
        });
    });
});

function approveRequest(id) {
  fetch(`${apiUrl}/api/tickets/request-buy-approve/${id}`, {
    method: "PUT",
    headers: { Authorization: `Bearer ${token}` },
  })
    .then((res) => res.json())
    .then((json) => {
      showToast(json.message, json.result);
      if(json.result){
        setTimeout(() => {
          location.href = 'request-ticket-detail.html'
        }, 1400);
      }
    });
}

function disapproveRequest(id, reason) {
  fetch(`${apiUrl}/api/tickets/request-buy-reject/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      reject_reason: reason,
    }),
  })
    .then((res) => res.json())
    .then((json) => {

      showToast(json.message, json.result);
      // Close the modal after sending the request
      const disapproveModal = bootstrap.Modal.getInstance(
        document.getElementById("exampleModal")
      );
      disapproveModal.hide();
      if(json.result){
        setTimeout(() => {
          location.href = 'request-ticket-detail.html'
        }, 1400);
      }
    });
}
