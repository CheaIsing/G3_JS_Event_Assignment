// const apiUrl = "https://mps2.chandalen.dev";
// const token = localStorage.getItem("authToken");

let id = sessionStorage.getItem("eventId");

getEventDetail(apiUrl, id);

function getEventDetail(apiUrl, id) {
  fetch(`${apiUrl}/api/events/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .then((json) => {
      // console.log(json);

      fetch(`${apiUrl}/api/events/summary-data/${json.data.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((json2) => {
          document.getElementById("event-name").innerHTML = json.data.name;
          document.getElementById("event-date").innerHTML = moment(
            json.data.start_date
          ).format("ddd, D MMMM, YYYY");
          +" - " + moment(json.data.end_date).format("ddd, D MMMM, YYYY");
          document.getElementById("total-ticket").innerHTML =
            `${json2.data.total_ticket} tickets`;
          document.getElementById("total-income").innerHTML =
            `$${json2.data.total_income.toFixed(2)}`;
          document.getElementById("total-attendant").innerHTML =
            `${json2.data.total_attendant} attendant`;
          document.getElementById("not-attending").innerHTML =
            `${json2.data.total_ticket - json2.data.total_attendant}`;

          document.getElementById("btn-copylink").onclick = () => {
            copyEventUrlToClipboard(json.data.id);
          };

          document.getElementById(
            "eventLink"
          ).value = `${window.location.protocol}//${window.location.host}/pages/browse/event-detail.html?e=${json.data.id}`;
        });
    });
}
