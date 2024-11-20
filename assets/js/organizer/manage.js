// import { showToast } from "../ultilities.js";
const apiUrl = "https://mps2.chandalen.dev";
const token = localStorage.getItem("authToken");

function getMe(searhE = "", searchV = "") {
  fetch(`${apiUrl}/api/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .then((json) => {
      console.log(json.data.id);
      manageAsOrganizer.getAllEventCard(apiUrl, json.data.id, searhE);
      manageAsOrganizer.getAllVendorRecruitment(apiUrl, json.data.id, searchV);
    });
}

function getAllEventCard(apiUrl, id, searchStr = "") {
  let path = `${apiUrl}/api/events?creator=${id}`;
  if (searchStr !== "") {
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
      console.log(data);

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

      // Filtering logic
      document
        .getElementById("event-filter")
        .addEventListener("change", (e) => {
          const currentDate = new Date();
          console.log(e.target.value);

          switch (e.target.value) {
            case "all":
              filterData = data;
              break;
            case "upcoming":
              filterData = data.filter(
                (ele) =>
                  new Date(ele.start_date.replace(" ", "T")) > currentDate
              );
              break;
            case "showing": {
              filterData = data.filter((ele) => {
                const startDate = new Date(ele.start_date.replace(" ", "T"));
                const endDate = new Date(ele.end_date.replace(" ", "T"));
                return currentDate >= startDate && currentDate <= endDate;
              });
              break;
            }
            case "past":
              filterData = data.filter(
                (ele) => new Date(ele.end_date.replace(" ", "T")) < currentDate
              );
              break;

            default:
              filterData = data;
              break;
          }

          renderCard(); // Re-render after filtering
        });

      // Function to render filtered data
      function renderCard() {
        rowsHTML = "";
        // for placeholder card
        document.getElementById("event-tobody").innerHTML = `
        <tr>
                                                <td colspan="5">
                                                    <div
                                                        class="card border-0"
                                                        aria-hidden="true">
                                                        <div class="row g-0">
                                                            <div class="col-4">
                                                                <div
                                                                    class="bg-secondary-subtle border rounded-1"
                                                                    style="width: 100%; height: 100%;">

                                                                </div>
                                                            </div>
                                                            <div class="col-8">
                                                                <div
                                                                    class="card-body py-2">
                                                                    <h5
                                                                        class="card-title ">
                                                                        <span
                                                                            class="placeholder col-11 "
                                                                            style="background-color: #D4D4D4;"></span>
                                                                    </h5>
                                                                    <p
                                                                        class="card-text ">
                                                                        <span
                                                                            class="placeholder col-10"
                                                                            style="background-color: #D4D4D4;"></span>
                                                                        <span
                                                                            class="placeholder col-12"
                                                                            style="background-color: #D4D4D4;"></span>
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </td>
                                            </tr>
                                            <tr>
                                                <td colspan="5">
                                                    <div
                                                        class="card border-0"
                                                        aria-hidden="true">
                                                        <div class="row g-0">
                                                            <div class="col-4">
                                                                <div
                                                                    class="bg-secondary-subtle border rounded-1"
                                                                    style="width: 100%; height: 100%;">

                                                                </div>
                                                            </div>
                                                            <div class="col-8">
                                                                <div
                                                                    class="card-body py-2">
                                                                    <h5
                                                                        class="card-title ">
                                                                        <span
                                                                            class="placeholder col-11 "
                                                                            style="background-color: #D4D4D4;"></span>
                                                                    </h5>
                                                                    <p
                                                                        class="card-text ">
                                                                        <span
                                                                            class="placeholder col-10"
                                                                            style="background-color: #D4D4D4;"></span>
                                                                        <span
                                                                            class="placeholder col-12"
                                                                            style="background-color: #D4D4D4;"></span>
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </td>
                                            </tr>
                                            <tr>
                                                <td colspan="5">
                                                    <div
                                                        class="card border-0"
                                                        aria-hidden="true">
                                                        <div class="row g-0">
                                                            <div class="col-4">
                                                                <div
                                                                    class="bg-secondary-subtle border rounded-1"
                                                                    style="width: 100%; height: 100%;">

                                                                </div>
                                                            </div>
                                                            <div class="col-8">
                                                                <div
                                                                    class="card-body py-2">
                                                                    <h5
                                                                        class="card-title ">
                                                                        <span
                                                                            class="placeholder col-11 "
                                                                            style="background-color: #D4D4D4;"></span>
                                                                    </h5>
                                                                    <p
                                                                        class="card-text ">
                                                                        <span
                                                                            class="placeholder col-10"
                                                                            style="background-color: #D4D4D4;"></span>
                                                                        <span
                                                                            class="placeholder col-12"
                                                                            style="background-color: #D4D4D4;"></span>
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </td>
                                            </tr>`;
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

              const currentDate = new Date();
              const startDate = new Date(ele.start_date.replace(" ", "T"));
              const endDate = new Date(ele.end_date.replace(" ", "T"));

              if (startDate > currentDate) {
                status =  `<span class=" rounded-pill text-primary"><i class="fa-solid fa-hourglass-half me-1"></i>Upcoming</span>`
              } else if (currentDate >= startDate && currentDate <= endDate) {
                status =  `<span class=" rounded-pill text-success"><i class="fa-solid fa-hourglass-half me-1"></i>Showing</span>`
              } else {
                status =  `<span class=" rounded-pill text-danger"><i class="fa-solid fa-hourglass-half me-1"></i>Past</span>`; 
              }

              rowsHTML += `<tr class="border-bottom position-relative">
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
                        <p class="text-muted mb-0">${ele.location}</p>
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
                <td>${status}</td>
                <td>${json2.data.total_ticket}</td>
                <td>$${json2.data.total_income}</td>
                <td>${json2.data.total_attendant} people</td>
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
                      <li><a class="dropdown-item" href="#">View</a></li>
                      <li><a class="dropdown-item" href="#">Copy Link</a></li>
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
            });
        });
      }

      renderCard(); // Initial render
    });
}

const manageAsOrganizer = {
  getMe,
  getAllEventCard,
  getAllVendorRecruitment: (url, id) => {
    fetch(`${url}/api/vendors?creator=${id}`)
      .then((res) => res.json())
      .then((json) => {
        const { data } = json;
        console.log(data);

        let rowsHTML = "";

        if (json.data.length <= 0) {
          document.getElementById("vendor-recruitment-tbody").innerHTML = `
         <tr><td colspan=5><div class="text-center">
                                   <img src="../../assets/img/noFound.png" alt="" height="220px;">
                                   <h4 class="text-center text-brand mt-2">No Vendor Recruitment to Display...</h4>
                               </div></td></tr>`;
          return;
        }

        data.forEach((ele) => {
          let categories = "";

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
                                    ${categories ? categories : "No Categories"}
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
                                  <li><a class="dropdown-item delete-vendor-recruitment-post" data-vendor-recruitment-id="${
                                    ele.id
                                  }" href="javascript:void(0);">Delete</a></li>
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

            sessionStorage.set("vendorId", id);

            location.href = "vendor-recruitment-details.html";
          };
        });
        document
          .querySelectorAll(".delete-vendor-recruitment-post")
          .forEach((link) => {
            link.onclick = () => {
              let id = link.dataset.vendorRecruitmentId;
              console.log(id);

              deleteVendorRecruitmentPost(id);
            };
          });
      });
  },
};

function deleteVendorRecruitmentPost(id) {
  fetch(`${apiUrl}/api/vendors/${id}`, {
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

document.getElementById("searchEventInput").onkeyup = () => {
  getMe(document.getElementById("searchEventInput").value);
};

manageAsOrganizer.getMe();
