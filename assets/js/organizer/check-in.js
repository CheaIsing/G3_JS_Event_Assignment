
const apiUrl = "https://mps2.chandalen.dev";
const token = localStorage.getItem("authToken");


function getMe(searhE='') {
  fetch(`${apiUrl}/api/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  })
    .then((res) => res.json())
    .then((json) => {
      console.log(json);
      getAllEventCard(apiUrl, json.data.id, searhE);
    });
}

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
        
            //   console.log(json);
            //   console.log(json2);

            let categories = "";

            if (ele.event_categories.length > 0) {
              for (let value of ele.event_categories) {
                categories += value.name + ", ";
              }

              categories = categories.substring(0, categories.length - 2);
            }

            // console.log(json2);
            
            rowsHTML += `<tr class="border-bottom position-relative">
                                                    <td class>
                                                        <a href="javascript:void(0)" 
                                                            class="stretched-link text-decoration-none bg-transparent link-checkin-details"
                                                            style="color: inherit;" data-checkin-detail-id="${ele.id}">
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
                                                                        class="text-muted mb-0 small">${ele.start_date} - ${ele.end_date}
                                                                        </p>
                                                                </div>
                                                            </div>
                                                        </a>
                                                    </td>
                                                    <td>
    
                                                    </td>
                                                    
                                                </tr>`;

            document.getElementById("event-tobody").innerHTML = rowsHTML;

            document.querySelectorAll('.link-checkin-details').forEach(link=>{
              link.onclick = () =>{
                let id = link.dataset.checkinDetailId;
                console.log(id);
                
                sessionStorage.setItem('checkinDetailId', id);
                location.href = "/pages/organizer/check-in-ticket-detail.html"
              }
            })
            
          
      });
    });
}

getMe()