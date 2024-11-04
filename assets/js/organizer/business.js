const apiUrl = "https://mps2.chandalen.dev";
const token = localStorage.getItem("authToken");


function getMe(searhB='') {
    fetch(`${apiUrl}/api/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json.data.id);
        getAllBusinessCard(apiUrl, json.data.id, searhB)
      });
  }

function getAllBusinessCard(apiUrl, id, searhB="") {
    fetch(`${apiUrl}/api/businesses?creator=${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
        .then((res) => res.json())
        .then((json) => {
          console.log(json.data);
          let rowsHTML = '';
          json.data.forEach(ele=>{
            rowsHTML+=`
             <tr
                                        class="border-bottom position-relative">
                                        <td class>
                                            
                                                <div
                                                    class="d-flex align-items-center">
                                                    <div class="me-3">
                                                        <div
                                                            class="text-center text-brand fw-bold">
                                                            <div>NOV</div>
                                                            <div>23</div>
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
                                                            class="text-muted mb-0 small">Saturday,
                                                            November 23,
                                                            2024
                                                            at 10:00 AM
                                                            EET</p>
                                                    </div>
                                                </div>
                                        
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
                                                            href="#">Promote
                                                            to
                                                            website</a>
                                                    </li>
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
                                    </tr>`
          })
        });
}
getMe()