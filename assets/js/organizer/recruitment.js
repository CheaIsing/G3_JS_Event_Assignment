

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
              <p class="card-text">
                <span class="placeholder col-10" style="background-color: #D4D4D4;"></span>
                <span class="placeholder col-12" style="background-color: #D4D4D4;"></span>
              </p>
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
              <p class="card-text">
                <span class="placeholder col-10" style="background-color: #D4D4D4;"></span>
                <span class="placeholder col-12" style="background-color: #D4D4D4;"></span>
              </p>
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
              <p class="card-text">
                <span class="placeholder col-10" style="background-color: #D4D4D4;"></span>
                <span class="placeholder col-12" style="background-color: #D4D4D4;"></span>
              </p>
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
      getAllRecruitmentCard(apiUrl, json.data.id, searchE, searchV);
    });
}

function getAllRecruitmentCard(apiUrl, id, searchE = "", searchV = "all") {
  let path = `${apiUrl}/api/vendors?creator=${id}`;
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
            <h4 class="text-center text-brand mt-2">No Vendor Recruitment to Display...</h4>
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

          fetch(`${apiUrl}/api/vendors/candidates/${ele.id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then(response => response.json())
          .then(json => {
            const { data } = json;
            const candidateCount = data.length;
            rowsHTML += `<tr class="border-bottom position-relative"">
                              <td>
                                <div class="d-flex align-items-center">
                                  <div class="me-3">
                                    <div class="text-center text-brand fw-bold">${formatDateStringMonth(
                                      ele.start_date
                                    )}</div>
                          <div class="text-center text-brand fw-bold">${formatDateStringDay(
                            ele.start_date
                          )}</div>
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
                                      ${ele.location}
                                    </p>
                                    <p class="text-muted mb-0 small">
                                    ${formatCustomDateWithYear(
                                      ele.start_date
                                    )} - ${formatCustomDateWithYear(
              ele.end_date
            )}, ${formatToHour(ele.start_date)} - ${formatToHour(ele.end_date)}
                                    </p>
                                  </div>
                                </div>
                              </td>
                              <td class="text-nowrap">
                                ${status}
                              </td>
                              <td class="text-nowrap">
                                <div>${candidateCount} apply</div>
                              </td>
                              <td>
                                <div class="dropstart position-relative z-3">
                                  <button class="btn btn-brand" type="button" id="dropdownMenu1" data-bs-toggle="dropdown" aria-expanded="false">
                                    <i class="bi bi-three-dots"></i>
                                  </button>
                                  <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenu1">
                                    <li><a class="dropdown-item" onclick="editRecruit(${ele.id})">Edit</a></li>
                                    <li><a class="dropdown-item delete-vendor-recruitment-post" data-vendor-recruitment-id="${
                                      ele.id
                                    }" href="javascript:void(0);">Delete</a></li>
                                    <li><a class="dropdown-item" onclick="viewRecruitDetail(${ele.id})">View</a></li>
                                  </ul>
                                </div>
                              </td>
                            </tr>`;
                            document.getElementById("event-tobody").innerHTML = rowsHTML;

        document.querySelectorAll(".link-details").forEach((link) => {
          link.onclick = () => {
            let id = link.dataset.id;

            sessionStorage.setItem("vendorId", id);

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
          })

        });

        
      }

      renderCard(); // Initial render
    });
}

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

function editRecruit(id){
  sessionStorage.setItem("editRecruitId", id);
  location.href = "edit-recruitment.html";
}

function viewRecruitDetail(id){
  sessionStorage.setItem("recruitDetailId", id)
  location.href = '../../pages/browse/recruitment-detail.html'
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
