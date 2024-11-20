const apiUrl = "https://mps2.chandalen.dev";
// const token = localStorage.getItem("authToken");

function getMe(searhB = "") {
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
  fetch(`${apiUrl}/api/businesses?creator=${id}`, {
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
        rowsHTML += ` <tr
                                        class="border-bottom position-relative">
                                        <td class>
                                            
                                                <div
                                                    class="d-flex align-items-center">
                                                    
                                                    <img
                                                        src="https://d2j6dbq0eux0bg.cloudfront.net/images/66610504/2636936256.jpg"
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
getMe();
