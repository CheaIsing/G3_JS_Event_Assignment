const apiUrl = "https://mps2.chandalen.dev";
// const token = localStorage.getItem("authToken");
console.log(token);

let agendaCount;
let agendaWrapper = document.getElementById('agenda-wrapper');

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
      
      fetch(
        `${apiUrl}/api/event-categories?page=1&per_page=50&sort_col=name&sort_dir=asc&search`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
        .then((res) => res.json())
        .then((json2) => {
          const { data: datas } = json2;
          console.log(datas);
          
          let eventCatSelect = document.getElementById("categorySelect");
          eventCatSelect.innerHTML = "";
          datas.forEach((element) => {
            let opt = document.createElement("option");
            opt.value = element.id;
            opt.innerHTML = element.name;
            json.data.event_categories.forEach((element2) => {
              console.log(`Dropdown ID: ${element.id}, Event Category ID: ${element2.id}`);
              if (String(element2.id) === String(element.id)) {
                opt.setAttribute('selected', '') // Set selected if they match
            }
            console.log(opt);
            
            })
            eventCatSelect.appendChild(opt);
          });
        });
      // console.log(json.data);
      const { data } = json;
      const { agendas} = extractEventDetails(data.description);
      
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

      descQuill.root.innerHTML = descQuillContent; 


      let agencount = agendas.length
      console.log(agencount);
      
      if(agencount > 0) {
        if(agencount > 1){
          for(let i = 2; i <= agencount; i++){
            let agendaWrapper = document.getElementById('agenda-wrapper');
            let agendaDiv = document.createElement('div');
            agendaDiv.className = "form-floating agenda mt-3";
            // create a label 
            let agendaLabel = document.createElement('label');
            agendaLabel.setAttribute("for", `floatingInput`);
            agendaLabel.textContent = `Agenda ${i}`;
        
            // create an input 
            let agendaInput = document.createElement('input');
            agendaInput.type = 'text';
            agendaInput.className = "form-control customized-form";
            agendaInput.id = `agendaTitle${i}`;
        
        
            // Create a start time input
            let agendaStDiv = document.createElement('div');
            agendaStDiv.className = "form-floating agenda mt-3 w-25 me-5";
        
            let agendaStLabel = document.createElement('label');
            agendaStLabel.setAttribute("for", `floatingInput`);
            agendaStLabel.textContent = `Start Time`;
        
            let agendaStInput = document.createElement('input');
            agendaStInput.type = 'time';
            agendaStInput.className = "form-control customized-form me-5";
            agendaStInput.id = `agendaStarttime${i}`;
        
            agendaStDiv.appendChild(agendaStInput);
            agendaStDiv.appendChild(agendaStLabel);
        
            // Create a End time input
            let agendaEtDiv = document.createElement('div');
            agendaEtDiv.className = "form-floating agenda mt-3 w-25";
        
            let agendaEtLabel = document.createElement('label');
            agendaEtLabel.setAttribute("for", `floatingInput`);
            agendaEtLabel.textContent = `End Time`;
        
            let agendaEtInput = document.createElement('input');
            agendaEtInput.type = 'time';
            agendaEtInput.className = "form-control customized-form ";
            agendaEtInput.id = `agendaEndtime${i}`;
        
            agendaEtDiv.appendChild(agendaEtInput);
            agendaEtDiv.appendChild(agendaEtLabel);
        
            let dateDiv = document.createElement('div');
            dateDiv.className = 'datetime d-flex mb-4';
            dateDiv.appendChild(agendaStDiv);
            dateDiv.appendChild(agendaEtDiv);
        
            agendaDiv.appendChild(agendaInput);
            agendaDiv.appendChild(agendaLabel);
        
            let labelCount = document.createElement('h5');
            labelCount.className = "text-brand fw-bold mb-3 mt-4";
            labelCount.innerText = `+ Agenda ${i}`;
        
            // Create a Desc for agenda
            let agendaDescDiv = document.createElement('div');
            agendaDescDiv.className = "form-floating agenda mt-3";
        
            let agendaDescLabel = document.createElement('label');
            agendaDescLabel.setAttribute("for", `floatingInput`);
            agendaDescLabel.textContent = `Agenda Description`;
        
            let agendaDescInput = document.createElement('textarea');
            agendaDescInput.placeholder = '';
            agendaDescInput.className = "form-control customized-form";
            agendaDescInput.id = `agendaDesc${i}`;
        
            agendaDescDiv.appendChild(agendaDescInput);
            agendaDescDiv.appendChild(agendaDescLabel);
        
        
            agendaWrapper.appendChild(labelCount);
            agendaWrapper.appendChild(agendaDiv);
            agendaWrapper.appendChild(agendaDescDiv);
            agendaWrapper.appendChild(dateDiv);
          }
        }
        for(let i = 1; i <= agencount; i++) {
          document.getElementById(`agendaStarttime${i}`).value = agendas[i-1].startTime
          document.getElementById(`agendaEndtime${i}`).value = agendas[i-1].endTime
          document.getElementById(`agendaTitle${i}`).value = agendas[i-1].title
          document.getElementById(`agendaDesc${i}`).value = agendas[i-1].description
        }
      }

      agendaCount = agencount



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
      console.log(data);
      

      document.getElementById('imageDisplay').src = data.thumbnail
      document.getElementById('imageDisplay').style.display = 'block'

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

      // document.getElementById('fileUpload').files[0] = data.thumbnail
      // console.log(document.getElementById('fileUpload').files[0]);
      
      
      // document.getElementById('photoUpload').files[0] = data.thumbnail;
    });
}

function createNewAgenda() {
  agendaCount++;
  let agendaDiv = document.createElement('div');
  agendaDiv.className = "form-floating agenda mt-3";
  // create a label 
  let agendaLabel = document.createElement('label');
  agendaLabel.setAttribute("for", `floatingInput`);
  agendaLabel.textContent = `Agenda ${agendaCount}`;

  // create an input 
  let agendaInput = document.createElement('input');
  agendaInput.type = 'text';
  agendaInput.className = "form-control customized-form";
  agendaInput.id = `agendaTitle${agendaCount}`;


  // Create a start time input
  let agendaStDiv = document.createElement('div');
  agendaStDiv.className = "form-floating agenda mt-3 w-25 me-5";

  let agendaStLabel = document.createElement('label');
  agendaStLabel.setAttribute("for", `floatingInput`);
  agendaStLabel.textContent = `Start Time`;

  let agendaStInput = document.createElement('input');
  agendaStInput.type = 'time';
  agendaStInput.className = "form-control customized-form me-5";
  agendaStInput.id = `agendaStarttime${agendaCount}`;

  agendaStDiv.appendChild(agendaStInput);
  agendaStDiv.appendChild(agendaStLabel);

  // Create a End time input
  let agendaEtDiv = document.createElement('div');
  agendaEtDiv.className = "form-floating agenda mt-3 w-25";

  let agendaEtLabel = document.createElement('label');
  agendaEtLabel.setAttribute("for", `floatingInput`);
  agendaEtLabel.textContent = `End Time`;

  let agendaEtInput = document.createElement('input');
  agendaEtInput.type = 'time';
  agendaEtInput.className = "form-control customized-form ";
  agendaEtInput.id = `agendaEndtime${agendaCount}`;

  agendaEtDiv.appendChild(agendaEtInput);
  agendaEtDiv.appendChild(agendaEtLabel);

  let dateDiv = document.createElement('div');
  dateDiv.className = 'datetime d-flex mb-4';
  dateDiv.appendChild(agendaStDiv);
  dateDiv.appendChild(agendaEtDiv);

  agendaDiv.appendChild(agendaInput);
  agendaDiv.appendChild(agendaLabel);

  let labelCount = document.createElement('h5');
  labelCount.className = "text-brand fw-bold mb-3 mt-4";
  labelCount.innerText = `+ Agenda ${agendaCount}`;

  // Create a Desc for agenda
  let agendaDescDiv = document.createElement('div');
  agendaDescDiv.className = "form-floating agenda mt-3";

  let agendaDescLabel = document.createElement('label');
  agendaDescLabel.setAttribute("for", `floatingInput`);
  agendaDescLabel.textContent = `Agenda Description`;

  let agendaDescInput = document.createElement('textarea');
  agendaDescInput.placeholder = '';
  agendaDescInput.className = "form-control customized-form";
  agendaDescInput.id = `agendaDesc${agendaCount}`;

  agendaDescDiv.appendChild(agendaDescInput);
  agendaDescDiv.appendChild(agendaDescLabel);


  agendaWrapper.appendChild(labelCount);
  agendaWrapper.appendChild(agendaDiv);
  agendaWrapper.appendChild(agendaDescDiv);
  agendaWrapper.appendChild(dateDiv);
}


function updateEvent() {

  // Create event form variables
  let thumbnailFile = document.getElementById('fileUpload').files[0];
  let eventName = document.getElementById('postTitle').value;
  let startDate = document.getElementById('startDate').value;
  let startTime = document.getElementById('startTime').value;
  let endDate = document.getElementById('endDate').value;
  let endTime = document.getElementById('endTime').value;
  let fullStartDate = `${startDate} ${startTime}:00`;
  let fullEndDate = `${endDate} ${endTime}:00`;
  let address1 = document.getElementById('address1').value;
  let address2 = document.getElementById('address2').value;
  let city = document.getElementById('city').value;
  let province = document.getElementById('province').value;
  let country = document.getElementById('country').value;
  let fullAddress = `${address1}, ${address2}, ${province}, ${city}, ${country}`;
  let descPhoto = document.getElementById('photoUpload').files[0];
  let categoriesSelect = document.getElementById('categorySelect');
  let categoriesList = []
  // console.log('Thumbnail File:', thumbnailFile);
console.log('Event Name:', eventName);
console.log('Start Date:', startDate);
console.log('Start Time:', startTime);
console.log('End Date:', endDate);
console.log('End Time:', endTime);
console.log('Full Start Date:', fullStartDate);
console.log('Full End Date:', fullEndDate);
console.log('Address Line 1:', address1);
console.log('Address Line 2:', address2);
console.log('City:', city);
console.log('Province:', province);
console.log('Country:', country);
console.log('Full Address:', fullAddress);
  for (let catOption of categoriesSelect.options) {
      if (catOption.selected) {
          categoriesList.push(catOption.value);
      }
  }

  //get text from Qill form
  let descQuillContent = descQuill.root.innerHTML;  // or use quill.getText() for plain text
  
  let description = `<div class="descQill">${descQuillContent}`;
  if (document.getElementById(`agendaStarttime1`).value || document.getElementById(`agenda1`).value) {
      description += `<h2 class="text-brand">Agenda</h2>`;
      for (let i = 1; i <= agendaCount; i++) {
          if ((document.getElementById(`agendaStarttime${i}`).value && document.getElementById(`agendaEndtime${i}`).value) ||
              document.getElementById(`agendaTitle${i}`).value || document.getElementById(`agendaDesc${i}`).value) {
              description += `<br>
              <div class="agenda-card mb-3 border rounded-4 py-3 px-4">
                                              <div class="agenda-content ps-4">
                                                  <p class="text-secondary pb-2" id="agenda-time">
                                                      ${document.getElementById(`agendaStarttime${i}`).value} -
                                                      ${document.getElementById(`agendaEndtime${i}`).value}</p>
                                                  <h4 id="agenda-title">${document.getElementById(`agendaTitle${i}`).value}</h4>
                                                  <p id="agenda-desc" class="mb-0 ps-4">${document.getElementById(`agendaDesc${i}`).value}</p>
                                              </div>
                                          </div>`;

          }
      }
  }
  else {
      description = `<div class="descQill">${descQuillContent}</div>`;
  }
  // console.log(description);
  // document.getElementById('test').innerHTML = description;

  // add ticket form variables
  let ticketQty = document.getElementById('ticketQuantity').value;
  let ticketPrice = document.getElementById('price').value;
  // let khqrImg = document.getElementById('khqrImg').value;

  let eventData = new FormData();
  eventData.append('name', eventName);
  // eventData.append('thumbnail', thumbnailFile);
  eventData.append('start_date', fullStartDate);
  eventData.append('end_date', fullEndDate);
  eventData.append('location', fullAddress);
  eventData.append('description', description);
  eventData.append('ticket_opacity', ticketQty);
  eventData.append('ticket_price', ticketPrice);
  eventData.append('event_category_ids', JSON.stringify(categoriesList));

  eventData.forEach((element, key) => {
      console.log(element, key);

  })

  fetch(`${apiUrl}/api/events/info/${sessionStorage.getItem("editEventId")}`, {
      method: 'PUT',
      headers: {
          Authorization: `Bearer ${token}`,
          "Accept": "application/json",
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: eventName,
        description: description,
        event_category_ids: JSON.stringify(categoriesList),
        ticket_opacity: ticketQty,
        ticket_price: ticketPrice,
        location: fullAddress,
        start_date: fullStartDate,
        end_date: fullEndDate
      })
  })
      .then(res => res.json())
      .then(json => {
        console.log(json);
        
          const { data } = json;
          let imgFIle = new FormData();
          imgFIle.append("thumbnail", thumbnailFile);

          fetch(`${apiUrl}/api/events/thumbnail/${data.id}`, {
              method: 'POST',
              headers: {
                  Authorization: `Bearer ${token}`,
                  "Accept": "application/json"
              },
              body: imgFIle
          })
              .then(res => res.json())
              .then(json => {
                console.log(json);
                
                showToast(json.result == true ? 'Event Updated Sucessfully.': json.message, json.result)
                // if(json.result == true){
                //   setTimeout(() => {
                //     location.href = 'event.html'
                //   }, 1500)
                // }
              })

      })
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

  function extractEventDetails(savedDescription) {
    // Create a temporary DOM element to parse the HTML content
    let tempDiv = document.createElement("div");
    tempDiv.innerHTML = savedDescription;
  
    // Extract the main event description
    let eventDescription = tempDiv.querySelector(".descQill")?.innerHTML || "";
  
    // Extract agenda items
    let agendaCards = tempDiv.querySelectorAll(".agenda-card");
    let agendas = [];
  
    agendaCards.forEach((card) => {
      let time = card.querySelector("#agenda-time")?.innerText.trim() || "";
      // Step 1: Remove unnecessary whitespace and newline characters
      const cleanedTime = time.replace(/\s+/g, " ").trim(); // Replaces multiple spaces/newlines with a single space
  
      // Step 2: Split the cleaned string into start and end times
      const [startTime, endTime] = cleanedTime
        .split(" - ")
        .map((time) => time.trim());
  
      let title = card.querySelector("#agenda-title")?.innerText.trim() || "";
      let description =
        card.querySelector("#agenda-desc")?.innerText.trim() || "";
  
        agendas.push({
          startTime: startTime.trim(), // Start time
          endTime: endTime.trim(),     // End time
          title: title,
          description: description
      });
    });
  
    // Return the extracted details
    return {
      eventDescription,
      agendas,
    };
  }