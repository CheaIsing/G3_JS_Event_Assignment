// import { showToast } from "../ultilities.js";
const apiUrl = "https://mps2.chandalen.dev";
const token =  localStorage.getItem("authToken");

function getMe(searhE='', searchV = '') {
  fetch(`${apiUrl}/api/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  })
    .then((res) => res.json())
    .then((json) => {
      console.log(json.data.id);
      manageAsOrganizer.getAllEventCard(apiUrl, json.data.id, searhE);
      manageAsOrganizer.getAllVendorRecruitment(apiUrl, json.data.id, searchV);
    });
}

const formatDate = (dateStr) => {
  const date = new Date(dateStr);

  const options = {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };

  return date.toLocaleString("en-US", options).replace(",", " •");
};


function getAllEventCard(apiUrl, id, searchStr = '') {
  let path = `${apiUrl}/api/events?creator=${id}`
  if(searchStr != ''){
    path += `&search=${searchStr}`;
  }
  fetch(`${path}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .then((json) => {
      const { data } = json;
      console.log(json);
      let rowsHTML = "";

      data.forEach((ele) => {
        fetch(`${apiUrl}/api/events/summary-data/${ele.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
          .then((res) => res.json())
          .then((json2) => {
            //   console.log(json);
            //   console.log(json2);

            let categories = "";

            if (ele.event_categories.length > 0) {
              for (let value of ele.event_categories) {
                categories += value.name + ", ";
              }

              categories = categories.substring(0, categories.length - 2);
            }

            console.log(ele);
            
            // console.log(json2);
            
            rowsHTML += `<tr class="border-bottom position-relative">
                                                    <td class>
                                                        <a href="javascript:void(0)" 
                                                            class="stretched-link text-decoration-none bg-transparent link-event-details"
                                                            style="color: inherit;" data-event-detail-id="${ele.id}">
                                                            <div
                                                                class="d-flex align-items-center">
                                                                <div class="me-3">
                                                                    <div
                                                                        class="text-center text-brand fw-bold">
                                                                        ${ele.start_date}
                                                                    </div>
                                                                </div>
                                                                <img
                                                                    src="${ele.thumbnail}"
                                                                    alt="Event Image"
                                                                    class="rounded"
                                                                    width="150">
                                                                <div class="ms-3">
                                                                    <h5
                                                                        class="mb-0">${ele.name}</h5>
                                                                    <p
                                                                        class="text-muted mb-0">${categories ? categories : "No Categories"}</p>
                                                                    <p
                                                                        class="text-muted mb-0 small">${formatDate(ele.start_date)} - ${formatDate(ele.end_date)}
                                                                        </p>
                                                                </div>
                                                            </div>
                                                        </a>
                                                    </td>
                                                    <td>
    
                                                        <div>${json2.data.total_ticket}</div>
                                                        <div class="progress"
                                                            style="height: 5px;">
                                                            <div
                                                                class="progress-bar"
                                                                role="progressbar"
                                                                style="width: 0%;"
                                                                aria-valuenow="0"
                                                                aria-valuemin="0"
                                                                aria-valuemax="100">
                                                            </div>
                                                        </div>
    
                                                    </td>
                                                    <td>
                                                        $${json2.data.total_income}
                                                    </td>
                                                    <td>
                                                        ${json2.data.total_attendant} people
                                                    </td>
    
                                                    <td>
                                                        <div
                                                            class="dropstart position-relative z-3">
                                                            <button
                                                                class="btn btn-brand"
                                                                type="button"
                                                                id="dropdownMenu1"
                                                                data-bs-toggle="dropdown"
                                                                aria-expanded="false">
                                                                <i
                                                                    class="bi bi-three-dots"></i>
                                                            </button>
                                                            <ul
                                                                class="dropdown-menu dropdown-menu-end"
                                                                aria-labelledby="dropdownMenu1">
                                                                <li><a
                                                                        class="dropdown-item"
                                                                        href="#">Edit</a></li>
                                                                <li><a
                                                                        class="dropdown-item delete-event-btn"
                                                                        href="javascript:void(0);" data-event-detail-id="${ele.id}">Delete</a></li>
                                                                <li><a
                                                                        class="dropdown-item"
                                                                        href="#">View</a></li>
                                                                <li><a
                                                                        class="dropdown-item"
                                                                        href="#">Copy
                                                                        Link</a></li>
                                                            </ul>
                                                        </div>
                                                    </td>
                                                </tr>`;

            document.getElementById("event-tobody").innerHTML = rowsHTML;

            document.querySelectorAll('.link-event-details').forEach(link=>{
              link.onclick = (e) =>{
                let eventId = link.dataset.eventDetailId
                sessionStorage.setItem('eventId', eventId);
                location.href = "event-details.html";
              }
            })

            document.querySelectorAll('.delete-event-btn').forEach(link=>{
              // console.log(link);
              
              link.onclick = (e) =>{
                let eventId = link.dataset.eventDetailId
                console.log(eventId);
                
                deleteEventPost(eventId)
              }
            })

            
          });
      });
    });
}
const manageAsOrganizer = {
  getMe,
  getAllEventCard,
  saveToStorage: function (str, value) {
    //   console.log(str, value, "helo");
    localStorage.setItem(str, value);
  },
  getAllVendorRecruitment: (url, id) => {
    fetch(`${url}/api/vendors?creator=${id}`)
      .then((res) => res.json())
      .then((json) => {
        const { data } = json;
        console.log(data);

        let rowsHTML = "";

        data.forEach((ele) => {
          let categories = "";

          if (ele.categories.length > 0) {
            for (let value of ele.categories) {
              categories += value.name + ", ";
            }

            categories = categories.substring(0, categories.length - 2);
          }

          rowsHTML += `<tr class="border-bottom position-relative"">
                            <td>
                              <div class="d-flex align-items-center">
                                <div class="me-3">
                                  <div class="text-center text-brand fw-bold">
                                    ${ele.start_date}
                                  </div>
                                </div>
                                <div class="ms-3">
                                  <h5 class="mb-0">
                                    <a href="javascript:void(0)" 
                                        data-id="${ele.id}"
                                       class="stretched-link text-decoration-none bg-transparent link-details"
                                       style="color: inherit;">
                                       ${ele.name}
                                    </a>
                                  </h5>
                                  <p class="text-muted mb-0">
                                    ${
                                      categories ? categories : "No Categories"
                                    }
                                  </p>
                                  <p class="text-muted mb-0 small">
                                    ${ele.start_date} - ${ele.end_date}
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td>
                              <div>5 people</div>
                            </td>
                            <td>
                              <div class="dropstart position-relative z-3">
                                <button class="btn btn-light" type="button" id="dropdownMenu1" data-bs-toggle="dropdown" aria-expanded="false">
                                  <i class="bi bi-three-dots"></i>
                                </button>
                                <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenu1">
                                  <li><a class="dropdown-item" href="#">Edit</a></li>
                                  <li><a class="dropdown-item delete-vendor-recruitment-post" data-vendor-recruitment-id="${ele.id}" href="javascript:void(0);">Delete</a></li>
                                  <li><a class="dropdown-item" href="#">View</a></li>
                                  <li><a class="dropdown-item" href="#">Copy Link</a></li>
                                </ul>
                              </div>
                            </td>
                          </tr>`;
        });

        document.getElementById("vendor-recruitment-tbody").innerHTML =
          rowsHTML;

        document.querySelectorAll(".link-details").forEach((link) => {
          link.onclick = () => {
            let id = link.dataset.id;

            saveToStorage("vendorId", id);

            location.href = "vendor-recruitment-details.html";
          };
        });
        document.querySelectorAll(".delete-vendor-recruitment-post").forEach((link) => {
          link.onclick = () => {
            let id = link.dataset.vendorRecruitmentId;
            console.log(id);
            
            deleteVendorRecruitmentPost(id);
            
          };
        });
      });
  },
};

function deleteEventPost(id){
  console.log(id);
  
  fetch(`${apiUrl}/api/events/${id}`, {
    method: "DELETE",
    headers:{
      Authorization: `Bearer ${token}`
    }
  })
      .then((res) => res.json())
      .then((json) => {
        showToast(json.message, json.result);
        getMe();
        console.log(apiUrl, id, token);
        
      })
}

function deleteVendorRecruitmentPost(id) {
  fetch(`${apiUrl}/api/vendors/${id}`, {
    method: "DELETE",
    headers:{
      Authorization: `Bearer ${token}`
    }
  })
      .then((res) => res.json())
      .then((json) => {
        showToast(json.message, json.result);
        getMe();
        
      })
}

document.getElementById('searchEventInput').onkeyup = () => {
  getMe(document.getElementById('searchEventInput').value)
}


// Optionally attach to window if you want to keep it outside of manageAsOrganizer
window.saveToStorage = manageAsOrganizer.saveToStorage;

manageAsOrganizer.getMe(); 