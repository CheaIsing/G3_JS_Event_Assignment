console.log(sessionStorage.getItem("eventPaidId"));

let eventId = sessionStorage.getItem("eventPaidId");

fetch(`${API_URL}/api/events/${eventId}`, {
  headers: {
    Authorization: "Bearer " + token,
  },
})
  .then((res) => res.json())
  .then((json) => {
    console.log(json.data, json.data.thumbnail);
    const { data } = json;
    
    document.querySelector(".payment-row").innerHTML = `
    <div class="col-md-6">
                <div class="card" onclick="showEventDetail(${data.id})">
                    <img src="${
                      data.thumbnail.includes("no_photo")
                        ? "../../assets/img/no-image.png"
                        : data.thumbnail
                    }" class="card-img-top object-fit-cover" alt="event image" height="380px">
                    <div class="card-body">
                        <h5 class="card-title">${data.name}</h5>
                        <p><i class="bi bi-calendar-event"></i> ${formatCustomDateWithYear(
                          data.start_date
                        )}</p>
                        <p><i class="bi bi-geo-alt"></i> ${data.location}</p>
                        <p><i class="bi bi-ticket"></i> $${data.ticket_price.toFixed(
                          2
                        )} per ticket</p>
                        <p><i class="bi bi-people"></i> ${
                          data.ticket_opacity - data.ticket_bought
                        } tickets available</p>
                        <p>Join us for an unforgettable day of ${data.name}!</p>
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="card">
                    
                    <div class="card-body">
                        <h5 class="card-title">Order Summary</h5>
                        <div class="mb-3">
                            <label for="ticketQuantity" class="form-label">Number of Tickets:</label>
                            <select class="form-select" id="ticketQuantity">
                                <option selected value='1'>1</option>
                                ${data.ticket_price > 0 ? `<option value='2'>2</option>
                                <option value='3'>3</option>
                                <option value='4'>4</option>
                                <option value='5'>5</option>`: ''}
                            </select>
                        </div>
                        <hr>
                        <p>Subtotal: <span id="subTotal" class="float-end">$${(
                          data.ticket_price * 1
                        ).toFixed(2)}</span></p>
                        <p>Dicount Fee: <span class="float-end">$0.00</span></p>
                        <h5>Total: <span id="total" class="float-end fw-bold">$${(
                          data.ticket_price * 1
                        ).toFixed(2)}</span></h5>
                        <hr>
                        ${data.ticket_price > 0 ? `<div class="mb-3">
                        <label class="form-label">Payment QR Code</label>
                        <button class="btn btn-outline-brand w-100" onclick="toggleQRCode()"><i class="bi bi-qr-code"></i> Show QR Code</button>
                        <img src="${data.qr_img}" width="200" alt="QR Code" id="qrCodeImage" class="img-fluid mt-3 d-none">
                    </div>

                    
                    <div class="mb-3">
                        <label for="paymentProof" class="form-label">Upload Payment Proof</label>
                        <input type="file" class="form-control" id="paymentProof" accept=".jpeg, .jpg, .pdf">
                        <small class="text-muted">Please upload your payment transaction in .jepg, .jpg or PDF</small>
                    </div>`: ''}
                    
                        
    
                        
                        <button class="btn btn-brand w-100" ${data.ticket_price > 0 ? 'disabled':''} id="submitButton" data-price="${data.ticket_price}">Submit Purchase</button>
                    </div>
                </div>
            </div>
    `;
    
    if(data.ticket_price == 0){
      fetch(`${API_URL}/api/profile/requested-tickets?page=1&per_page=10000`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
       .then((res) => res.json())
       .then(json4 => {
         console.log(json4);
        for(let ele of json4.data){
          if(ele.event.id == eventId){
            
            document.getElementById("submitButton").disabled = true
            document.getElementById("submitButton").innerHTML = "Already Redeemed"
            return;;
          }
        }
        
       })
       
    }

    document.getElementById("ticketQuantity").onchange = (e) => {
      document.getElementById("subTotal").innerHTML = `$${parseInt(
        e.target.value * data.ticket_price
      ).toFixed(2)}`;
      document.getElementById("total").innerHTML = `$${parseInt(
        e.target.value * data.ticket_price
      ).toFixed(2)}`;
      // console.log(parseInt(e.target.value * data.ticket_price));
    };
    document.getElementById("submitButton").onclick = (e) => {
      document.getElementById("submitButton").disabled = true;
      document.body.style.cursor = "wait";
      let amount = parseInt(document.getElementById("ticketQuantity").value);
      let price = parseFloat(e.target.dataset.price);
      if(price > 0){
        let tranFile = document.getElementById("paymentProof").files[0];
      const paidFormData = new FormData();
      paidFormData.append("transaction_file", tranFile);

      
      fetch(`${API_URL}/api/tickets/request-buy`, {
        method: "POST",
        headers: {
          Authorization: "Bearer " + token,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          event_id: eventId,
          amount: amount,
        }),
      })
        .then((res) => res.json())
        .then((json1) => {
          fetch(`${API_URL}/api/tickets/transaction-file/${json1.data.id}`, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
              //   "Content-Type": "application/json",
            },
            body: paidFormData,
          })
            .then((res) => res.json())
            .then((json2) => {
              console.log(json2);
              document.getElementById("submitButton").disabled = false;
              document.body.style.cursor = "default";

              if (json1.result === true && json2.result === true) {
                showToast(
                  "Purchased ticket sucessfully. Wait for approving from event organizer.",
                  true
                );
                setTimeout(() => {
                  history.back();
                }, 1600);
              } else {
                showToast("Purchased ticket fail. Please try again.", false);
              }
            });
        });
      }
      else{
        fetch(`${API_URL}/api/tickets/request-buy`, {
          method: "POST",
          headers: {
            Authorization: "Bearer " + token,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            event_id: eventId,
            amount: amount,
          }),
        })
          .then((res) => res.json())
          .then((json1) => {
            document.getElementById("submitButton").disabled = false;
              document.body.style.cursor = "default";
            if (json1.result === true) {
              showToast("Redeem Ticket Sucessfully", json1.result);
              document.getElementById("btn-purchase").disabled = true;
              setTimeout(() => {
                history.back();
              }, 1500);
            } else {
              showToast(json1, json1.result);
            }
          })
      }
      
    };

    // Enable submit button only when file is uploaded
    if (document.getElementById("paymentProof")) {
      document
        .getElementById("paymentProof")
        .addEventListener("change", function () {
          const submitButton = document.getElementById("submitButton");
          if (this.files.length > 0) {
            submitButton.disabled = false;
          } else {
            submitButton.disabled = true;
          }
        });
    }
  });
function toggleQRCode() {
  const qrCodeImage = document.getElementById("qrCodeImage");
  qrCodeImage.classList.toggle("d-none");
}
