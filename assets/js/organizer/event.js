// import { showToast } from "../ultilities.js";
const apiUrl = "https://mps2.chandalen.dev";
const token = localStorage.getItem("authToken");

function getMe(searchE = "", searchV = "all") {
  // Show placeholder cards while loading
  document.getElementById("event-tobody").innerHTML = `
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
              
              <span class="placeholder col-12 mb-1" style="background-color: #D4D4D4;"></span>
              <span class="placeholder col-11 mb-1" style="background-color: #D4D4D4;"></span>
              
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
              
              <span class="placeholder col-12 mb-1" style="background-color: #D4D4D4;"></span>
              <span class="placeholder col-11 mb-1" style="background-color: #D4D4D4;"></span>
              
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
              
              <span class="placeholder col-12 mb-1" style="background-color: #D4D4D4;"></span>
              <span class="placeholder col-11 mb-1" style="background-color: #D4D4D4;"></span>
              
            </div>
          </div>
        </div>
      </div>
    </td>
  </tr>
  
  `;
  fetch(`${apiUrl}/api/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .then((json) => {
      getAllEventCard(apiUrl, json.data.id, searchE, searchV);
    });
}

function getAllEventCard(apiUrl, id, searchE = "", searchV = "all") {
  let path = `${apiUrl}/api/events?creator=${id}`;
  if (searchE !== "") {
    path += `&search=${searchE}`;
  }

  fetch(`${path}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .then((json) => {
      const { data } = json;


      let rowsHTML = "";
      if (data.length <= 0) {
        document.getElementById("event-tobody").innerHTML = `
          <tr><td colspan=5><div class="text-center">
            <img src="../../assets/img/noFound.png" alt="" height="220px;">
            <h4 class="text-center text-brand mt-2">No Event to Display...</h4>
          </div></td></tr>`;
        return;
      }

      let filterData = data;

      // Apply filter based on searchV (the dropdown value)
      const currentDate = new Date();
      switch (searchV) {
        case "all":
          filterData = data;
          break;
        case "upcoming":
          filterData = data.filter(
            (ele) => new Date(ele.start_date.replace(" ", "T")) > currentDate
          );
          break;
        case "showing":
          filterData = data.filter((ele) => {
            const startDate = new Date(ele.start_date.replace(" ", "T"));
            const endDate = new Date(ele.end_date.replace(" ", "T"));
            return currentDate >= startDate && currentDate <= endDate;
          });
          break;
        case "past":
          filterData = data.filter(
            (ele) => new Date(ele.end_date.replace(" ", "T")) < currentDate
          );
          break;
        default:
          filterData = data;
          break;
      }

      // Function to render filtered data
      function renderCard() {
        rowsHTML = ``;

        if (filterData.length === 0) {
          document.getElementById("event-tobody").innerHTML = `
            <tr><td colspan=5><div class="text-center">
              <img src="../../assets/img/noFound.png" alt="" height="220px;">
              <h4 class="text-center text-brand mt-2">No Event Found...</h4>
            </div></td></tr>`;
          return;
        }

        filterData.forEach((ele) => {
          fetch(`${apiUrl}/api/events/summary-data/${ele.id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
            .then((res) => res.json())
            .then((json2) => {
              let status = "";

              const startDate = new Date(ele.start_date.replace(" ", "T"));
              const endDate = new Date(ele.end_date.replace(" ", "T"));

              if (startDate > currentDate) {
                status = `<span class="rounded-pill text-brand"><i class="fa-solid fa-hourglass-half me-1"></i>Upcoming</span>`;
              } else if (currentDate >= startDate && currentDate <= endDate) {
                status = `<span class="rounded-pill text-success"><i class="fa-solid fa-hourglass-half me-1"></i>Showing</span>`;
              } else {
                status = `<span class="rounded-pill text-danger"><i class="fa-solid fa-hourglass-half me-1"></i>Past</span>`;
              }
              
              fetch(
                `${apiUrl}/api/tickets?page=1&per_page=10000&event=${ele.id}`,
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              ).then((res) => res.json())
              .then((json3)=>{
                const checkedInAll = json3.data.filter(element=>element.event.id == ele.id)

                
                const participatedCount =checkedInAll.filter(element=>element.is_checked_in == 2).length
                rowsHTML += `<tr class="border-bottom position-relative" data-participated="${participatedCount}">
                <td>
                  <a href="javascript:void(0)" class="stretched-link text-decoration-none bg-transparent link-event-details"
                     style="color: inherit;" data-event-detail-id="${ele.id}">
                    <div class="d-flex align-items-center">
                      <div class="me-3">
                        <div class="text-center text-brand fw-bold">${formatDateStringMonth(
                          ele.start_date
                        )}</div>
                        <div class="text-center text-brand fw-bold">${formatDateStringDay(
                          ele.start_date
                        )}</div>
                      </div>
                      <img src="${
                        ele.thumbnail
                      }" alt="Event Image" class="rounded object-fit-cover" width="150" height="85">
                      <div class="ms-3">
                        <h5 class="mb-0">${ele.name}</h5>
                        <p class="text-muted mb-0 w-75">${ele.location}</p>
                        <p class="text-muted mb-0 small">${formatCustomDateWithYear(
                          ele.start_date
                        )} - ${formatCustomDateWithYear(
                ele.end_date
              )}, ${formatToHour(ele.start_date)} - ${formatToHour(
                ele.end_date
              )}</p>
                      </div>
                    </div>
                  </a>
                </td>
                <td class="text-nowrap">${status}</td>
                <td class="text-nowrap">${json2.data.total_ticket} ticket${
                json2.data.total_ticket > 1 ? "s" : ""
              }</td>
                <td class="text-nowrap">$${json2.data.total_income.toFixed(2)}</td>
                <td class="text-nowrap" >${participatedCount} participated</td>
                <td>
                  <div class="dropstart position-relative z-3">
                    <button class="btn btn-brand" type="button" id="dropdownMenu1" data-bs-toggle="dropdown" aria-expanded="false">
                      <i class="bi bi-three-dots"></i>
                    </button>
                    <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenu1">
                      <li><a class="dropdown-item edit-event-btn" href="javascript:void(0);" data-event-detail-id="${
                        ele.id
                      }">Edit</a></li>
                      <li><a class="dropdown-item delete-event-btn" href="javascript:void(0);" data-event-detail-id="${
                        ele.id
                      }">Delete</a></li>
                      <li><a class="dropdown-item views-event-detail" data-id="${
                        ele.id
                      }">View</a></li>
                      <li><a class="dropdown-item" onclick="copyEventUrlToClipboard(${
                        ele.id
                      })">Copy Link</a></li>
                    </ul>
                  </div>
                </td>
              </tr>`;

                document.getElementById("event-tobody").innerHTML = rowsHTML;

              // Event detail and actions
              document
                .querySelectorAll(".link-event-details")
                .forEach((link) => {
                  link.onclick = (e) => {
                    let eventId = link.dataset.eventDetailId;
                    sessionStorage.setItem("eventId", eventId);
                    sessionStorage.setItem("participated", link.closest('[data-participated]').dataset.participated)
                    location.href = "event-details.html";
                  };
                });

              document.querySelectorAll(".delete-event-btn").forEach((link) => {
                link.onclick = (e) => {
                  let eventId = link.dataset.eventDetailId;
                  deleteEventPost(eventId);
                };
              });

              document.querySelectorAll(".edit-event-btn").forEach((btn) => {
                btn.onclick = () => {
                  let id = btn.dataset.eventDetailId;
                  sessionStorage.setItem("editEventId", id);
                  location.href = "edit-event.html";
                };
              });

              document
                .querySelectorAll(".views-event-detail")
                .forEach((detail) => {
                  detail.onclick = () => {
                    let id = detail.dataset.id;

                    sessionStorage.setItem("itemID", id);
                    
                    location.href = "../browse/event-detail.html";
                  };
                });
              })              
            });
        });
      }

      renderCard(); // Initial render
    });
}

function deleteEventPost(id) {


  fetch(`${apiUrl}/api/events/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .then((json) => {
      showToast(json.message, json.result);
      getMe();

    });
}

// Event listeners for filters
document.getElementById("searchEventInput").onkeyup = () => {
  const searchE = document.getElementById("searchEventInput").value;
  const searchV = document.getElementById("event-filter").value;
  getMe(searchE, searchV);
};

document.getElementById("event-filter").addEventListener("change", () => {
  const searchE = document.getElementById("searchEventInput").value;
  const searchV = document.getElementById("event-filter").value;
  getMe(searchE, searchV);
});

// Initial call

getMe();
