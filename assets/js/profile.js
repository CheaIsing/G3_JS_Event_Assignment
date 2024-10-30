
const API_URL = "https://mps2.chandalen.dev";
const token = localStorage.getItem('authToken');


document.addEventListener('DOMContentLoaded', () => {
    Getme();
});

function Getme(){
    fetch(`${API_URL}/api/me`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    })
    .then(res => {
        if (!res.ok) {
            throw new Error("Network response was not ok");
        }
        return res.json();
    })
    .then(json => {
        console.log(json.data);
        profileData(json.data);
        // Call showToast or another function to process the data if needed
        showToast("Data fetched successfully!");
    })
    .catch(error => {
         console.error('Error fetching data:', error);
        showToast("Failed to fetch data", "error");
    });
}
function profileData(data){
    document.getElementById('username').value = data.username || " ";
    document.getElementById('fullname').value = data.full_name || " ";
    document.getElementById('login-email').value = data.email || " ";
    document.getElementById('phonenumber').value = data.phone || " ";
    document.getElementById('datepicker').value = data.dob || " ";
 
}




