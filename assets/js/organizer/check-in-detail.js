const apiUrl = "https://mps2.chandalen.dev";
// const token = localStorage.getItem("authToken");

document.getElementById("btn-checked-in").onclick = () => {
  let ticketToken = document.getElementById("check-in-input").value;

  console.log(ticketToken);
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
