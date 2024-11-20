let eventCheckinId = sessionStorage.getItem("checkinDetailId");

fetch(
  `${apiUrl}/api/tickets?page=1&per_page=10&status=&event=${eventCheckinId}`,
  {
    headers: { Authorization: "Bearer " + token, Accept: "application/json" },
  }
)
  .then((response) => response.json())
  .then((json) => {
    console.log(json);
    if (json.data.length == 0) {
      document.getElementById("tbody").innerHTML = `No Check-in Data Available`;
      return;
    }
    let html = "";
    json.data.forEach((element, i) => {
      html += `<tr>
      <td>${i + 1}</td>
      <td>${element.buyer.full_name}</td>
      <td>${parseFloat(element.price) > 0 ? `$${element.price}` : "Free"}</td>
      <td>${element.is_checked_in == 1 ? "Not Checked-in Yet" : "Checked-in"}</td>
      <td>${element.checked_in_at ? element.checked_in_at : "Pending"}</td>
  </tr>`;
    });

    document.getElementById("tbody").innerHTML = html;
  });

document.getElementById("btn-checked-in").onclick = () => {
  let ticketToken = document.getElementById("check-in-input").value;

  if (!ticketToken) return;

  // console.log(sessionStorage.getItem('checkinDetailId'));

  fetch(`${apiUrl}/api/events/check-in`, {
    method: "PUT",
    headers: {
      // Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ticket_token: ticketToken,
    }),
  })
    .then((res) => res.json())
    .then((json) => {
      showToast(json.message, json.result);
      if (json.result == true) {
        bootstrap.Modal.getInstance(
          document.getElementById("exampleModal")
        ).hide();
      }
    });
};
