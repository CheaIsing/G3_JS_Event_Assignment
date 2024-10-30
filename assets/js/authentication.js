
const API_URL = "https://mps2.chandalen.dev";
const token = localStorage.getItem('authToken');

document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("authToken")) {
    if (
      location.pathname.includes("index.html") ||
      location.pathname.includes("login.html") ||
      location.pathname.includes("Signup.html")
    ) {
      location.href = "/pages/homepage.html";
    }
  } else {
    // if (
    //   !location.pathname.includes("login.html") &&
    //   !location.pathname.includes("Signup.html")
    // ) {

    //   if(location.pathname.includes("index.html")){
    //     return;
    //   }
    //   console.log(location.pathname);

    //   // let count = 0;

    //   // // Loop through each character in the string
    //   // for (let i = 0; i < location.pathname.length; i++) {
    //   //   if (location.pathname[i] === "/") {
    //   //     count++; // Increment the count if '/' is found
    //   //   }
    //   // }

    //   // let path = "";
    //   // for (let i = 1; i <= count; i++) {
    //   //   path += "../";
    //   // }
    //   location.href = `index.html`;

    //   console.log(count);

    //   // location.href = "index.html";
    // }
  }
});



if(document.getElementById('btn-logout')){
  document.getElementById('btn-logout').onclick = logout;
}

function logout() {
  
  console.log(localStorage.getItem('authToken'));
  

  fetch(`${API_URL}/api/logout`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${localStorage.getItem('authToken')}`
    }
  })
  .then(res=>res.json())
  .then(json=>{
    console.log();
    showToast(json.message, json.result);

    if(json.result == true){
      localStorage.removeItem("authToken");
      setTimeout(()=>{
        location.href = "/index.html";
      }, 1500)
    }
    
  })

}

// document.getElementById('btn-sign-up').onclick = () => {
//     const full_name = document.getElementById('register-full-name');
//     const email = document.getElementById('register-email');
//     const password = document.getElementById('register-password');
//     const password_confirmation = document.getElementById('register-confirm-password');

//     console.log(full_name, email, password, password_confirmation);

// }

// Function to show toast notifications using Bootstrap 5

// Example usage
// Success toast
// showToast("Failed to send your request!", "fail"); // Fail toast
    
// }

if(document.getElementById('profileForm')){
  document.getElementById('profileForm').addEventListener('submit', function (event) {
    event.preventDefault();
    event.stopPropagation();
  
    const form = this;
    const firstName = document.getElementById('firstname');
    const lastName = document.getElementById('lastname');
    const email = document.getElementById('login-email');
    const phoneNumber = document.getElementById('phonenumber');
    const dateOfBirth = document.getElementById('datepicker');
  
    let isValid = true;
  
    // First name validation (letters only)
    const namePattern = /^[A-Za-z]+$/;
    if (!namePattern.test(firstName.value)) {
      firstName.classList.add('is-invalid');
      isValid = false;
    } else {
      firstName.classList.remove('is-invalid');
    }
  
    // Last name validation (letters only)
    if (!namePattern.test(lastName.value)) {
      lastName.classList.add('is-invalid');
      isValid = false;
    } else {
      lastName.classList.remove('is-invalid');
    }
  
    // Email validation
    if (!email.checkValidity()) {
      email.classList.add('is-invalid');
      isValid = false;
    } else {
      email.classList.remove('is-invalid');
    }
  
    // Phone number validation (10-15 digits)
    const phonePattern = /^\d{10,15}$/;
    if (!phonePattern.test(phoneNumber.value)) {
      phoneNumber.classList.add('is-invalid');
      isValid = false;
    } else {
      phoneNumber.classList.remove('is-invalid');
    }
  
    // Date of Birth validation
    if (!dateOfBirth.value) {
      dateOfBirth.classList.add('is-invalid');
      isValid = false;
    } else {
      dateOfBirth.classList.remove('is-invalid');
    }
  
    // If form is valid, submit the form
    if (isValid) {
      form.classList.add('was-validated');
      form.submit();
    }
  });
}

document.getElementById('header')