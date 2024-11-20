function getMe(searhB = "") {
  document.getElementById("business-tbody").innerHTML = `
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
      console.log(json);

      getAllBusinessCard(apiUrl, json.data.id, searhB);
    });
}

function getAllBusinessCard(apiUrl, id, searhB = "") {
  let url = `${apiUrl}/api/businesses?creator=${id}`
  if(searhB != ""){
    url += `&search=${searhB}`
  }
  fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .then((json) => {
      console.log(json.data);
      if (json.data.length <= 0) {
        document.getElementById(
          "business-tbody"
        ).innerHTML = `<tr><td colspan=5><div class="text-center">
            <img src="../../assets/img/noFound.png" alt="" height="220px;">
            <h4 class="text-center text-brand mt-2">No Business to Display...</h4>
          </div></td></tr>`;
      }
      let rowsHTML = "";
      json.data.forEach((ele) => {
        let thumbnail =
          ele.thumbnail && !ele.thumbnail.includes("no_photo")
            ? ele.thumbnail
            : "../../assets/img/party/party1.png";
        rowsHTML += ` <tr
                                        class="border-bottom position-relative">
                                        <td class>
                                            
                                                <div
                                                    class="d-flex align-items-center">
                                                    
                                                    <img
                                                        src="${thumbnail}"
                                                        alt="Event Image"
                                                        class="rounded"
                                                        width="150">
                                                    <div class="ms-3">
                                                        <h5
                                                            class="mb-0">${ele.name}</h5>

                                                        <p
                                                            class="text-muted mb-0">${ele.location}</p>
                                                        <p
                                                            class="text-muted mb-0">${ele.description}</p>
                                                        
                                                    </div>
                                                </div>
                                        
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
                                                    class="dropdown-menu dropdown-menu-end" data-id="${ele.id}"
                                                    aria-labelledby="dropdownMenu1">
                                                    <li><a onclick="editBusiness(${ele.id})"
                                                            class="dropdown-item"
                                                            >Edit</a></li>
                                                    <li><a href="javascript:void(0);"
                                                            class="dropdown-item delete-btn"
                                                            href="#">Delete</a></li>
                                                    <li><a
                                                            class="dropdown-item"
                                                            onclick="viewBusinessDetail(${ele.id})">View</a></li>
                                                    
                                                </ul>
                                            </div>
                                        </td>
                                    </tr>`;

        document.getElementById("business-tbody").innerHTML = rowsHTML;

        document.querySelectorAll(".delete-btn").forEach((btn) => {
          btn.onclick = () => {
            let id = btn.closest("[data-id]").dataset.id;
            console.log(id);
            fetch(`${apiUrl}/api/businesses/${id}`, {
              method: "DELETE",
              headers: { Authorization: `Bearer ${token}` },
            })
              .then((res) => res.json())
              .then((json) => {
                showToast(json.message, json.result);
                if (json.result === true) {
                  setTimeout(() => {
                    getMe();
                  }, 1000);
                }
              });
          };
        });
      });
    });
}
function viewBusinessDetail(id) {
  sessionStorage.setItem("businessDetailId", id);
  location.href = "../../pages/browse/business-detail.html";
}

function editBusiness(id) {
  sessionStorage.setItem("editBusinessid", id);
  location.href = "edit-vendor-business.html";
}

document.getElementById("searchInput").addEventListener("keypress", (e) => {
  console.log(e.target.value);
  
  if (e.code == "Enter") {
    getMe(e.target.value);
  }
});
getMe();
