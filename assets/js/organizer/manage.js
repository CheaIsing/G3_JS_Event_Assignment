import { showToast } from "../ultilities.js";
const apiUrl = "https://mps2.chandalen.dev";
const token =  localStorage.getItem("authToken");

function getMeEvents(searchE = '') {
  fetch(`${apiUrl}/api/me`, {
    headers: {
      Authorization: `Bearer ${token()}`,
    },
  })
    .then((res) => res.json())
    .then((json) => {
      const userId = json.data.id;
      getAllEventCard(apiUrl, userId, searchE);
    });
}

function getMeVendors(searchV = '') {
  fetch(`${apiUrl}/api/me`, {
    headers: {
      Authorization: `Bearer ${token()}`,
    },
  })
    .then((res) => res.json())
    .then((json) => {
      const userId = json.data.id;
      getAllVendorRecruitment(apiUrl, userId, searchV);
    });
}

function getAllEventCard(apiUrl, id, searchStr = '') {
  let path = `${apiUrl}/api/events?creator=${id}`;
  if (searchStr) {
    path += `&search=${searchStr}`;
  }
  fetch(path, {
    headers: {
      Authorization: `Bearer ${token()}`,
    },
  })
    .then((res) => res.json())
    .then((json) => {
      const { data } = json;
      let rowsHTML = "";

      data.forEach((ele) => {
        fetch(`${apiUrl}/api/events/summary-data/${ele.id}`, {
          headers: {
            Authorization: `Bearer ${token()}`,
          },
        })
          .then((res) => res.json())
          .then((json2) => {
            let categories = ele.event_categories.map(cat => cat.name).join(", ") || "No Categories";
            rowsHTML += `
              <tr class="border-bottom position-relative">
                <td>
                  <a href="javascript:void(0)" class="stretched-link text-decoration-none bg-transparent link-event-details" style="color: inherit;" data-event-detail-id="${ele.id}">
                    <div class="d-flex align-items-center">
                      <div class="me-3">
                        <div class="text-center text-brand fw-bold">${ele.start_date}</div>
                      </div>
                      <img src="${ele.thumbnail}" alt="Event Image" class="rounded" width="150">
                      <div class="ms-3">
                        <h5 class="mb-0">${ele.name}</h5>
                        <p class="text-muted mb-0">${categories}</p>
                        <p class="text-muted mb-0 small">${ele.start_date} - ${ele.end_date}</p>
                      </div>
                    </div>
                  </a>
                </td>
                <td>${json2.data.total_ticket}<div class="progress" style="height: 5px;"><div class="progress-bar" role="progressbar" style="width: 0%;" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div></div></td>
                <td>$${json2.data.total_income}</td>
                <td>${json2.data.total_attendant} people</td>
                <td>
                  <div class="dropstart position-relative z-3">
                    <button class="btn btn-light" type="button" data-bs-toggle="dropdown" aria-expanded="false"><i class="bi bi-three-dots"></i></button>
                    <ul class="dropdown-menu dropdown-menu-end">
                      <li><a class="dropdown-item" href="#">Edit</a></li>
                      <li><a class="dropdown-item delete-event-btn" href="javascript:void(0);" data-event-detail-id="${ele.id}">Delete</a></li>
                      <li><a class="dropdown-item" href="#">View</a></li>
                      <li><a class="dropdown-item" href="#">Copy Link</a></li>
                    </ul>
                  </div>
                </td>
              </tr>`;
          document.getElementById("event-tobody").innerHTML = rowsHTML;
        });
      });
    });
}

function getAllVendorRecruitment(apiUrl, id) {
  fetch(`${apiUrl}/api/vendors?creator=${id}`, {
    headers: {
      Authorization: `Bearer ${token()}`,
    },
  })
    .then((res) => res.json())
    .then((json) => {
      const { data } = json;
      let rowsHTML = "";

      data.forEach((ele) => {
        let categories = ele.categories.map(cat => cat.name).join(", ") || "No Categories";
        rowsHTML += `
          <tr class="border-bottom position-relative">
            <td>
              <div class="d-flex align-items-center">
                <div class="me-3"><div class="text-center text-brand fw-bold">${ele.start_date}</div></div>
                <img src="${ele.thumbnail}" alt="Event Image" class="rounded" width="150">
                <div class="ms-3">
                  <h5 class="mb-0"><a href="javascript:void(0)" class="stretched-link text-decoration-none bg-transparent link-details" style="color: inherit;" data-id="${ele.id}">${ele.name}</a></h5>
                  <p class="text-muted mb-0">${categories}</p>
                  <p class="text-muted mb-0 small">${ele.start_date} - ${ele.end_date}</p>
                </div>
              </div>
            </td>
            <td>5 people</td>
            <td>
              <div class="dropstart position-relative z-3">
                <button class="btn btn-light" type="button" data-bs-toggle="dropdown" aria-expanded="false"><i class="bi bi-three-dots"></i></button>
                <ul class="dropdown-menu dropdown-menu-end">
                  <li><a class="dropdown-item" href="#">Edit</a></li>
                  <li><a class="dropdown-item delete-vendor-recruitment-post" data-vendor-recruitment-id="${ele.id}" href="javascript:void(0);">Delete</a></li>
                  <li><a class="dropdown-item" href="#">View</a></li>
                  <li><a class="dropdown-item" href="#">Copy Link</a></li>
                </ul>
              </div>
            </td>
          </tr>`;
      });
      document.getElementById("vendor-recruitment-tbody").innerHTML = rowsHTML;
    });
}

function deleteEventPost(id) {
  fetch(`${apiUrl}/api/events/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token()}`,
    },
  })
    .then((res) => res.json())
    .then((json) => {
      showToast(json.message, json.result);
      getMeEvents();
    });
}

function deleteVendorRecruitmentPost(id) {
  fetch(`${apiUrl}/api/vendors/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token()}`,
    },
  })
    .then((res) => res.json())
    .then((json) => {
      showToast(json.message, json.result);
      getMeVendors();
    });
}

// Event listeners
document.getElementById('searchEventInput').onkeyup = () => getMeEvents(document.getElementById('searchEventInput').value);
document.getElementById('searchVendorInput').onkeyup = () => getMeEvents(document.getElementById('searchVendorInput').value);
// window.saveToStorage = manageAsOrganizer.saveToStorage;

// Initial calls
getMeEvents();
getMeVendors();
