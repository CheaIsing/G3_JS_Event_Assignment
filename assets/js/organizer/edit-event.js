const apiUrl = "https://mps2.chandalen.dev";
// const token = localStorage.getItem("authToken");
console.log(token);

renderEditEventHTML();
function renderEditEventHTML() {
  fetch(`${apiUrl}/api/events/${sessionStorage.getItem("editEventId")}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json;",
    },
  })
    .then((res) => res.json())
    .then((json) => {
      console.log(json.data);
      const { data } = json;
      // let thumbnailFile = document.getElementById('fileUpload').files[0];
      document.getElementById("postTitle").value = data.name;
      console.log(data.description);
      const description = `${data.description}`;

      // Extract descQuillContent including nested tags
      const descQuillContentMatch = description.match(
        /<div class="descQill">([\s\S]*?)<\/div>/
      );
      const descQuillContent = descQuillContentMatch
        ? descQuillContentMatch[1]
        : null;

      // Extract agendaQuillContent including nested tags
      const agendaQuillContentMatch = description.match(
        /<div class="agendaQill">[\s\S]*?<h2.*?>.*?<\/h2>([\s\S]*?)<\/div>/
      );
      const agendaQuillContent = agendaQuillContentMatch
        ? agendaQuillContentMatch[1]
        : null;

      console.log("descQuillContent:", descQuillContent);
      console.log("agendaQuillContent:", agendaQuillContent);
      //get text from Qill form

      descQuill.root.innerHTML = descQuillContent; // or use quill.getText() for plain text
      // console.log("Editor Content:", descQuillContent);
      agendaQuill.root.innerHTML = agendaQuillContent; // or use quill.getText() for plain text
      // console.log("Editor Content:", agendaQuillContent);

      let fullAddress = `${data.location}`;

      // Split the address into parts and trim each part
      const addressParts = fullAddress.split(",").map((part) => part.trim());
      console.log(addressParts);

      const [address1, address2, province, city, country] = addressParts;

      console.log("address1:", address1);
      console.log("address2:", address2);
      console.log("province:", province);
      console.log("city:", city);
      console.log("country:", country);

      const [startDate, startTime] = data.start_date.split(" ");
      const [hour, minute] = startTime.split(":");
      const shortTime = `${hour}:${minute}`;

      const [endDate, endTime] = data.end_date.split(" ")
      const [h, m] = endTime.split(":");
      const shortEndTime = `${h}:${m}`;

      document.getElementById('startDate').value = startDate
      document.getElementById('startTime').value = shortTime
      document.getElementById('endDate').value = endDate
      document.getElementById('endTime').value = shortEndTime
      
      document.getElementById("address1").value = address1;
      document.getElementById("address2").value = address2;
      document.getElementById("city").value = city;
      document.getElementById("province").value = province;
      document.getElementById("country").value = country;

      document.getElementById("ticketQuantity").value = data.ticket_opacity;
      document.getElementById("price").value = data.ticket_price;
      
      // let descPhoto = document.getElementById('photoUpload').files[0];
    });
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
  let fullAddress = `${address1}, ${address2}, ${province}, ${city}, ${country}`;
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
  // console.log("Editor Content:", descQuillContent);
  let agendaQuillContent = agendaQuill.root.innerHTML; // or use quill.getText() for plain text
  // console.log("Editor Content:", agendaQuillContent);

  let description = `<div class="descQill">${descQuillContent}</div><div class="agendaQill"><h2 class="fw-bold text-brand"><i class="fa-solid fa-calendar-days"></i> Agenda</h2>${agendaQuillContent}</div>`;

  // add ticket form variables
  let ticketQty = document.getElementById("ticketQuantity").value;
  let ticketPrice = document.getElementById("price").value;
  let khqrImg = document.getElementById("khqrImg").value;

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

  // eventData.forEach((element, key) => {
  //     console.log(element, key);

  // })

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
      showToast(json.message, json.result);

            if(json.result == true){
                setTimeout(()=>{
                    location.href = 'event.html'
                }, 1500)
            }
    });
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
