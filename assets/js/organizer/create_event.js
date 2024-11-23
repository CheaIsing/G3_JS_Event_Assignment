let agendaCount = 1;
let agendaWrapper = document.getElementById("agenda-wrapper");
document.getElementById("price").onkeyup = (e) => {
  if (e.target.value == "0") {
    document.getElementById("payment-container").style.display = "none";
  } else {
    document.getElementById("payment-container").style.display = "block";
  }
};
function createNewAgenda() {
  agendaCount++;
  let agendaDiv = document.createElement("div");
  agendaDiv.className = "form-floating agenda mt-3";
  // create a label
  let agendaLabel = document.createElement("label");
  agendaLabel.setAttribute("for", `floatingInput`);
  agendaLabel.textContent = `Agenda ${agendaCount}`;

  // create an input
  let agendaInput = document.createElement("input");
  agendaInput.type = "text";
  agendaInput.className = "form-control customized-form";
  agendaInput.id = `agendaTitle${agendaCount}`;

  // Create a start time input
  let agendaStDiv = document.createElement("div");
  agendaStDiv.className = "form-floating agenda mt-3 w-25 me-5";

  let agendaStLabel = document.createElement("label");
  agendaStLabel.setAttribute("for", `floatingInput`);
  agendaStLabel.textContent = `Start Time`;

  let agendaStInput = document.createElement("input");
  agendaStInput.type = "time";
  agendaStInput.className = "form-control customized-form me-5";
  agendaStInput.id = `agendaStarttime${agendaCount}`;

  agendaStDiv.appendChild(agendaStInput);
  agendaStDiv.appendChild(agendaStLabel);

  // Create a End time input
  let agendaEtDiv = document.createElement("div");
  agendaEtDiv.className = "form-floating agenda mt-3 w-25";

  let agendaEtLabel = document.createElement("label");
  agendaEtLabel.setAttribute("for", `floatingInput`);
  agendaEtLabel.textContent = `End Time`;

  let agendaEtInput = document.createElement("input");
  agendaEtInput.type = "time";
  agendaEtInput.className = "form-control customized-form ";
  agendaEtInput.id = `agendaEndtime${agendaCount}`;

  agendaEtDiv.appendChild(agendaEtInput);
  agendaEtDiv.appendChild(agendaEtLabel);

  let dateDiv = document.createElement("div");
  dateDiv.className = "datetime d-flex mb-4";
  dateDiv.appendChild(agendaStDiv);
  dateDiv.appendChild(agendaEtDiv);

  agendaDiv.appendChild(agendaInput);
  agendaDiv.appendChild(agendaLabel);

  let labelCount = document.createElement("h5");
  labelCount.className = "text-brand fw-bold mb-3 mt-4";
  labelCount.innerText = `+ Agenda ${agendaCount}`;

  // Create a Desc for agenda
  let agendaDescDiv = document.createElement("div");
  agendaDescDiv.className = "form-floating agenda mt-3";

  let agendaDescLabel = document.createElement("label");
  agendaDescLabel.setAttribute("for", `floatingInput`);
  agendaDescLabel.textContent = `Agenda Description`;

  let agendaDescInput = document.createElement("textarea");
  agendaDescInput.placeholder = "";
  agendaDescInput.className = "form-control customized-form";
  agendaDescInput.id = `agendaDesc${agendaCount}`;

  agendaDescDiv.appendChild(agendaDescInput);
  agendaDescDiv.appendChild(agendaDescLabel);

  agendaWrapper.appendChild(labelCount);
  agendaWrapper.appendChild(agendaDiv);
  agendaWrapper.appendChild(agendaDescDiv);
  agendaWrapper.appendChild(dateDiv);
}
function createNewEvent() {
  // Create event form variables
  let thumbnailFile = document.getElementById("fileUpload").files[0];
  let eventName = document.getElementById("postTitle").value;
  let startDate = document.getElementById("startDate").value;
  let startTime = document.getElementById("startTime").value;
  let endDate = document.getElementById("endDate").value;
  let endTime = document.getElementById("endTime").value;
  let fullStartDate = `${startDate} ${startTime}:00`;
  let fullEndDate = `${endDate} ${endTime}:00`;
  let address1 = document.getElementById("address1").value;
  let address2 = document.getElementById("address2").value;
  let city = document.getElementById("city").value;
  let province = document.getElementById("province").value;
  let country = document.getElementById("country").value;
  let fullAddress = `${address1}, ${address2}, ${province}, ${city} , ${country}`;
  let descPhoto = document.getElementById("photoUpload").files[0];
  let categoriesSelect = document.getElementById("categorySelect");
  let categoriesList = [];
  for (let catOption of categoriesSelect.options) {
    if (catOption.selected) {
      categoriesList.push(catOption.value);
    }
  }

  //get text from Qill form
  let descQuillContent = descQuill.root.innerHTML; // or use quill.getText() for plain text

  let description = `<div class="descQill">${descQuillContent}</div>`;
  if (
    document.getElementById(`agendaStarttime1`).value ||
    document.getElementById(`agendaTitle1`).value
  ) {
    description += `<h2 class="text-brand fw-semibold">Agenda</h2>`;
    for (let i = 1; i <= agendaCount; i++) {
      if (
        (document.getElementById(`agendaStarttime${i}`).value &&
          document.getElementById(`agendaEndtime${i}`).value) ||
        document.getElementById(`agenda${i}`).value ||
        document.getElementById(`agendaDesc${i}`).value
      ) {
        description += `<br>
                <div class="agenda-card mb-3 border rounded-4 py-3 px-4">
                                                <div class="agenda-content ps-4">
                                                    <p class="text-secondary pb-2" id="agenda-time">
                                                        ${
                                                          document.getElementById(
                                                            `agendaStarttime${i}`
                                                          ).value
                                                        } -
                                                        ${
                                                          document.getElementById(
                                                            `agendaEndtime${i}`
                                                          ).value
                                                        }</p>
                                                    <h4 id="agenda-title">${
                                                      document.getElementById(
                                                        `agendaTitle${i}`
                                                      ).value
                                                    }</h4>
                                                    <p id="agenda-desc" class="mb-0 ps-4">${
                                                      document.getElementById(
                                                        `agendaDesc${i}`
                                                      ).value
                                                    }</p>
                                                </div>
                                            </div>`;
      }
    }
  } else {
    description = `<div class="descQill">${descQuillContent}</div>`;
  }
  // console.log(description);
  // document.getElementById('test').innerHTML = description;

  // add ticket form variables
  let ticketQty = document.getElementById("ticketQuantity").value;
  let ticketPrice = document.getElementById("price").value;
  let qr_img = document.getElementById("khqrPhotoUpload").files[0];

  let eventData = new FormData();
  eventData.append("name", eventName);
  // eventData.append('thumbnail', thumbnailFile);
  eventData.append("start_date", fullStartDate);
  eventData.append("end_date", fullEndDate);
  eventData.append("location", fullAddress);
  eventData.append("description", description);
  eventData.append("ticket_opacity", ticketQty);
  eventData.append("ticket_price", ticketPrice);
  eventData.append("event_category_ids", JSON.stringify(categoriesList));
  if (parseFloat(ticketPrice) > 0) {
    eventData.append("qr_img", qr_img); // add this line if you want to upload KHQR image with the event
  }

  // eventData.forEach((element, key) => {
  //     console.log(element, key);

  // })

  if (isValid_Event()) {
    document.getElementById("btn-create-ev").disabled = true;
    document.body.style.cursor = "wait";
    fetch(`${apiUrl}/api/events`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json;",
      },
      body: eventData,
    })
      .then((res) => res.json())
      .then((json) => {
        document.getElementById("btn-create-ev").disabled = false;
        document.body.style.cursor = "default";
        const { data } = json;
        let imgFIle = new FormData();
        imgFIle.append("thumbnail", thumbnailFile);

        fetch(`${apiUrl}/api/events/thumbnail/${data.id}`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json;",
          },
          body: imgFIle,
        })
          .then((res) => res.json())
          .then((json) => {
            showToast(
              json.result ? "Create Event Sucessfully." : json.message,
              json.result
            );
            if (json.result) {
              setTimeout(() => {
                location.href = "event.html";
              }, 1500);
            }
          });
      });
  }
  // .then(response => {
  //     if (!response.ok) {
  //         // Extract the JSON error message from the response
  //         return response.json().then(errorData => {
  //             console.error("Error message:", errorData.message);
  //             console.error("Detailed error:", errorData.data);

  //             throw new Error(`HTTP error! Status: ${response.status}`);
  //         });
  //     }
  //     return response.json();
  // })
  // .catch(error => console.error('Request Failed:', error));
}

// Fetch Event Categories
fetch(
  `${apiUrl}/api/event-categories?page=1&per_page=50&sort_col=name&sort_dir=asc&search`,
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
)
  .then((res) => res.json())
  .then((json) => {
    const { data } = json;
    let eventCatSelect = document.getElementById("categorySelect");
    data.forEach((element) => {
      let opt = document.createElement("option");
      opt.value = element.id;
      opt.innerHTML = element.name;
      eventCatSelect.appendChild(opt);
    });
  });

// console.log("Editor Content:", descQuillContent);
// let agendaQuillContent = agendaQuill.root.innerHTML;  // or use quill.getText() for plain text
// console.log("Editor Content:", agendaQuillContent);
