const apiUrl = "https://mps2.chandalen.dev";
// const token = localStorage.getItem("authToken");

// function getPendingTicket() {
//   fetch(`${API_URL}/api/tickets/request-buy`, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   })
//     .then((res) => res.json())
//     .then((json) => {
//       console.log(json);

//     //   if (json.result === true) {
//     //     const { data } = json;
//     //     console.log(data);

//     //     let rowsHTML = "";

//     //     data.forEach((ele) => {
//     //       const { event } = ele;
//     //       let categories = "";

//     //       if (event.event_categories.length > 0) {
//     //         for (let value of event.event_categories) {
//     //           categories += value.name + ", ";
//     //         }

//     //         categories = categories.substring(0, categories.length - 2);
//     //       }
//     //       rowsHTML += `
//     //              <tr
//     //                                                     class="border-bottom position-relative">
//     //                                                     <td class>
//     //                                                         <a href="javascript:void(0);" data-id="${
//     //                                                           ele.id
//     //                                                         }" class="stretch-link view-details">
//     //                                                         <div
//     //                                                             class="d-flex align-items-center">
//     //                                                             <div class="me-3">
//     //                                                                 <div
//     //                                                                     class="text-center text-brand fw-bold">
//     //                                                                     <div>${
//     //                                                                       event.start_date
//     //                                                                     }</div>
//     //                                                                 </div>
//     //                                                             </div>
//     //                                                             <img
//     //                                                                 src="${
//     //                                                                   event.thumbnail
//     //                                                                 }"
//     //                                                                 alt="Event Image"
//     //                                                                 class="rounded"
//     //                                                                 width="150">
//     //                                                             <div class="ms-3">
//     //                                                                 <h5
//     //                                                                     class="mb-0">${
//     //                                                                       event.name
//     //                                                                     }</h5>
//     //                                                                 <p
//     //                                                                     class="text-muted mb-0">${
//     //                                                                       categories
//     //                                                                         ? categories
//     //                                                                         : "No Categories"
//     //                                                                     }</p>
//     //                                                                 <p
//     //                                                                     class="text-muted mb-0 small">${
//     //                                                                       event.start_date
//     //                                                                     } - ${
//     //         event.end_date
//     //       }</p>
//     //                                                             </div>
//     //                                                         </div></a>
//     //                                                     </td>
//     //                                                     <td>
//     //                                                         ${event.created_at}
//     //                                                     </td>
//     //                                                     <td>
//     //                                                         ${ele.status}
//     //                                                     </td>
//     //                                                     <td>
//     //                                                         ${
//     //                                                           ele.amount
//     //                                                         } ticket${
//     //         ele.amount > 1 ? "s" : ""
//     //       } 
//     //                                                     </td>
//     //                                                     <td>
//     //                                                         ${
//     //                                                           ele.status != 2
//     //                                                             ? ""
//     //                                                             : `<button
//     //                                                                 class="btn btn-brand" onclick="displayTicket(this)" data-name="${event.name}" data-
//     //                                                                 data-bs-target="#exampleModalToggle-1"
//     //                                                                 data-bs-toggle="modal">View
//     //                                                                 Ticket</button>`
//     //                                                         }
    
                                                                
                                                            
//     //                                                     </td>
//     //                                                 </tr>`;
//     //     });

//     //     document.getElementById("pending-tbody").innerHTML = rowsHTML;
//     //     document.querySelectorAll(".view-details").forEach((link) => {
//     //       link.onclick = () => {
//     //         let id = link.dataset.id;
//     //         sessionStorage.setItem('ticket-detail-id', id);
//     //         location.href = "ticket-details.html";
            
//     //       };
//     //     });
//     //   }
//     });
// }

// getPendingTicket()
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
          fetch(`${apiUrl}/api/events/summary-data/${ele.id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
            .then((res) => res.json())
            .then((json2) => {
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
                                                              class="stretched-link text-decoration-none bg-transparent link-request-details"
                                                              style="color: inherit;" data-request-detail-id="${ele.id}">
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
      
                                                          ${json2.data.total_ticket} 
                                                          
      
                                                      </td>
                                                      
                                                  </tr>`;
  
              document.getElementById("event-tobody").innerHTML = rowsHTML;
  
              document.querySelectorAll('.link-request-details').forEach(link=>{
                link.onclick = () =>{
                  let id = link.dataset.requestDetailId;
                  sessionStorage.setItem('requestDetailId', id);
                  location.href = "/pages/organizer/request-ticket-detail.html"
                }
              })
              
            });
        });
      });
  }

  getMe()