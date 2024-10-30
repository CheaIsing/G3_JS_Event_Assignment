import { showToast } from "../ultilities.js";
const apiUrl = "https://mps2.chandalen.dev";
const token = localStorage.getItem("authToken");

document.getElementById("btn-checked-in").onclick = () => {
  let ticketToken = document.getElementById("check-in-input").value;

  console.log(ticketToken);

  if (ticketToken) {
    fetch(`${apiUrl}/api/events/check-in/6`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        ticket_token: ticketToken,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        showToast(json.message, json.result);
      });
  }
};
