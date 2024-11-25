let id = sessionStorage.getItem("vendorId");


// getEventDetail(apiUrl, id);
getVendorRecruitmentDetail(apiUrl, id);

function getEventDetail(apiUrl, id) {
  fetch(`${apiUrl}/api/events/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .then((json) => {
      fetch(`${apiUrl}/api/events/summary-data/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.jGITson())
        .then((json2) => {
        });
    });
}

function getVendorRecruitmentDetail(apiUrl, id) {
  fetch(`${apiUrl}/api/vendors/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  })
    .then((res) => res.json())
    .then((json1) => {
      const { data } = json1;
      const { location, start_date, end_date, name, categories } = data;
      const vendorId = data.id;
      document.getElementById("vendor-title").innerHTML = name;
      document.getElementById("start-end-date").innerHTML = `${moment(
        start_date
      ).format("ddd, MMM D, YYYY, h:mm A")}`;

      fetch(`${apiUrl}/api/vendors/candidates/${vendorId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
        .then((res) => res.json())
        .then((json2) => {
          if (json2.data.length <= 0) {
            document.getElementById("vendor-request-tbody").innerHTML = `
            <tr><td colspan='6'><div class="text-center">
              <img src="../../assets/img/noFound.png" alt="" height="220px;">
              <h4 class="text-center text-brand mt-2">No Vendor Request to Display...</h4>
            </div></td></tr>
            `;
            document.getElementById("loading").style.display = "none";
            document.getElementById("content").style.display = "block";
            return;
          }

          let rowsHTML = "";

          json2.data.forEach((ele,i) => {
            fetch(`${apiUrl}/api/profile/detail/${ele.candidate.id}`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
              .then((res) => res.json())
              .then((json3) => {
                rowsHTML += `<tr
                                              class="border-bottom">
                                              <td class>
                                                  
                                                      ${i+1}
                                                  
                                              </td>
                                              
                                              <td>
                                                  <img src="${
                                                    ele.candidate.avatar
                                                  }" alt="pfp" width="40" height="40" class="object-fit-cover rounded-circle border">
                                              </td>
                                              <td>
                                                  ${ele.candidate.full_name}
                                              </td>
                                              <td>
                                                  ${json3.data.email}
                                              </td>
                                              <td>
                                              ${moment(ele.applied_at).format(
                                                "MMM D, YYYY • h:mm A"
                                              )}
                                              </td>
                                              <td>
                                                  <div
                                                      class="dropstart position-relative z-3">
                                                      <button
                                                          class="btn btn-brand"
                                                          type="button" onclick="viewProfile(${
                                                            ele.candidate.id
                                                          })"
                                                          >
                                                          View Profile
                                                      </button>
                                                      
                                                      </ul>
                                                  </div>
                                              </td>
                                          </tr>`;
              })
              .then(() => {
                document.getElementById("vendor-request-tbody").innerHTML =
                  rowsHTML;
                document.getElementById("loading").style.display = "none";
                document.getElementById("content").style.display = "block";
              });
          });
        });

      // vendor-title
      // vendor-categories
      // start-end-date
      // location
    });
}

function getMe() {
  fetch(`${apiUrl}/api/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .then((json) => {
      manageAsOrganizer.getAllEventCard(apiUrl, json.data.id);
    });
}

function getAllEventCard(apiUrl, id) {
  fetch(`${apiUrl}/api/events?creator=${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .then((json) => {
      const { data } = json
      let rowsHTML = "";

      data.forEach((ele) => {
        fetch(`${apiUrl}/api/events/summary-data/${ele.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
          .then((res) => res.json())
          .then((json2) => {
            rowsHTML += `<tr class="border-bottom position-relative" >
                                                    <td class>
                                                        <a href="event-details.html"
                                                            class="stretched-link text-decoration-none bg-transparent"
                                                            style="color: inherit;">
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
                                                                        class="text-muted mb-0">${ele.event_categories[0].name}</p>
                                                                    <p
                                                                        class="text-muted mb-0 small">${ele.start_date} - ${ele.end_date}
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
                                                                class="btn btn-light"
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
                                                                        class="dropdown-item"
                                                                        href="#">Delete</a></li>
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
          });
      });
    });
}

function getAllVendorRecruitment(url, id) {
  fetch(`${url}/api/vendors/`)
    .then((res) => res.json())
    .then((json) => {
      const { data } = json;

      let rowsHTML = "";

      data.forEach((ele) => {
        rowsHTML += `<tr class="border-bottom position-relative">
                                                <td class>
                                                    <a href="vendor-recruitment-details.html"
                                                        class="stretched-link text-decoration-none bg-transparent"
                                                        style="color: inherit;">
                                                        <div
                                                            class="d-flex align-items-center">
                                                            <div class="me-3">
                                                                <div
                                                                    class="text-center text-brand fw-bold">
                                                                    ${ele.start_date}
                                                                </div>
                                                            </div>
                                                            <img
                                                                src="https://d2j6dbq0eux0bg.cloudfront.net/images/66610504/2636936256.jpg"
                                                                alt="Event Image"
                                                                class="rounded"
                                                                width="150">
                                                            <div class="ms-3">
                                                                <h5
                                                                    class="mb-0">Halowin</h5>
                                                                <p
                                                                    class="text-muted mb-0">Online
                                                                    event</p>
                                                                <p
                                                                    class="text-muted mb-0 small">$${ele.start_date} - ${ele.end_date}</p>
                                                            </div>
                                                        </div>
                                                    </a>
                                                </td>
                                                <td>
                                                    <div>5 people</div>
                                                </td>

                                                <td>
                                                    <div
                                                        class="dropstart position-relative z-3">
                                                        <button
                                                            class="btn btn-light"
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
                                                                    class="dropdown-item"
                                                                    href="#">Delete</a></li>
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
      });

      document.getElementById("vendor-recruitment-tbody").innerHTML = rowsHTML;
    });
}

const manageAsOrganizer = {
  getMe,
  getAllEventCard,
  getAllVendorRecruitment,
};

function viewProfile(id) {
  sessionStorage.setItem("orgID", id);
  location.href = "../authentication/view-profile.html";
}
