const apiUrl = "https://mps2.chandalen.dev";
const token = localStorage.getItem("authToken");

const manageAsOrganizer = {
  getAllEvent: (apiUrl) => {
    fetch(`${apiUrl}/api/events`,{
        method: "GET",
        'Authorization': `Bearer ${token}`
    })
      .then((res) => res.json())
      .then((json) => {
        const { data } = json;

        let rowsHTML = "";

        data.forEach((ele) => {
            rowsHTML += `<tr class="border-bottom position-relative">
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

                                                    <div>${ele.ticket_bought} / ${ele.ticket_opacity}</div>
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
                                                    $${ele.ticket_bought * ele.ticket_price}
                                                </td>
                                                <td>
                                                    10 people
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

        document.getElementById('event-tobody').innerHTML = rowsHTML;
      });
  },
  getAllVendorRecruitment: (url) => {
    fetch(`${url}/api/vendors`)
    .then((res) => res.json())
    .then(json=>{
        const {data} = json;
        console.log(data);
        
        let rowsHTML = "";

        data.forEach((ele) => {
            rowsHTML += 
            `<tr class="border-bottom position-relative">
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

        document.getElementById('vendor-recruitment-tbody').innerHTML = rowsHTML;

    })
  }
};

manageAsOrganizer.getAllEvent(apiUrl);

manageAsOrganizer.getAllVendorRecruitment(apiUrl);
