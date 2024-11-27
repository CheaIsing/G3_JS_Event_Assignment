let eventCheckinId = sessionStorage.getItem("checkinDetailId");

function fetchCheckedIn(status = '') {
  document.getElementById('tbody').innerHTML = `<tr >
                                    <td colspan="6" class="border-0"><div class="d-flex w-100 justify-content-center border-0 mt-4">
                                        <div class="spinner-border text-secondary" role="status">
                                            <span class="visually-hidden">Loading...</span>
                                          </div>
                                    </div></td>
                                </tr>`
  fetch(
    `${apiUrl}/api/tickets?page=1&per_page=10&status=${status}&event=${eventCheckinId}`,
    {
      headers: { Authorization: "Bearer " + token, Accept: "application/json" },
    }
  )
    .then((response) => response.json())
    .then((json) => {
      document.getElementById('title').innerHTML = sessionStorage.getItem('checkinEventName')
      document.getElementById('ev-date').innerHTML = moment(sessionStorage.getItem('checkinEventDate')).format('ddd, MMM D, YYYY, h:mm A')
      if (json.data.length == 0) {
        document.getElementById("tbody").innerHTML = `<tr class="border-0"><td class="border-0" colspan=6><div class="text-center">
              <img src="../../assets/img/noFound.png" alt="" height="220px;">
              <h4 class="text-center text-brand mt-2">No Checked-in to Display...</h4>
            </div></td></tr>`;
            document.getElementById('loading').style.display = 'none';
            document.getElementById('content').style.display = 'block';
        return;
      }
      let html = "";
      json.data.forEach((element, i) => {
        html += `<tr>
        <td>${i + 1}</td>
        <td>${element.buyer.full_name}</td>
        <td>${parseFloat(element.price) > 0 ? `$${element.price.toFixed(2)}` : "Free"}</td>
        <td>${element.is_checked_in == 1 ? `<span class=" rounded-pill text-warning"><i class="fa-solid fa-hourglass-half me-1"></i>Not Checked-in Yet</span>` : `<span class=" rounded-pill text-success"><i class="fa-solid fa-circle-check me-1"></i>Checked In</span>`}</td>
        <td>${element.checked_in_at ? `${moment(element.check_in_at).format('MMM D, YYYY • h:mm A')}` : `<span class=" rounded-pill text-warning"><i class="fa-solid fa-hourglass-half me-1"></i>Pending</span>`}</td>
    </tr>`;
      });
  

  
      document.getElementById("tbody").innerHTML = html;
      document.getElementById('loading').style.display = 'none';
      document.getElementById('content').style.display = 'block';

    });
}

  document.getElementById("select-status").onchange = (e)=>{
    fetchCheckedIn(e.target.value)
  }

fetchCheckedIn()