const API_URL = "https://mps2.chandalen.dev";
// const token = localStorage.getItem('authToken');

document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("authToken")) {
    
    if (location.pathname.includes('index.html')) {
      location.href = 'homepage.html';
    }
  } else {
    
    if (location.pathname.includes('homepage.html')) {
      location.href = 'index.html';
    }
  }
});

if(document.getElementById('btn-log-in')){
  document.getElementById('btn-log-in').onclick = () => {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    if(email && password){
        fetch(API_URL+"/api/login", {
            headers: {"Content-Type": "application/json"},
            method: "POST",
            body: JSON.stringify({email, password})
        })
        .then(res=>res.json())
        .then(json=>{
            console.log(json);
            let token = json.data.token;
            localStorage.setItem('authToken', token);
            location.href = "homepage.html";
        })
    }    
}
}

function logout() {
    localStorage.removeItem('authToken');
    location.href = "index.html";
}

// document.getElementById('btn-sign-up').onclick = () => {
//     const full_name = document.getElementById('register-full-name');
//     const email = document.getElementById('register-email');
//     const password = document.getElementById('register-password');
//     const password_confirmation = document.getElementById('register-confirm-password');

//     console.log(full_name, email, password, password_confirmation);
    
// }

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
