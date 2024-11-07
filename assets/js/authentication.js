
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

    console.log("helo");
    
    document.getElementById('header').innerHTML = 
    `<div class="container">
                <nav class="d-flex align-items-center justify-content-between">
                    <div class="logo">
                        <a href="homepage.html">
                            <img
                                src="../../assets/lim_img/logo/Prutika_Logo_text(2).png"
                                alt>
                        </a>
                    </div>
                    <div
                        class="d-flex align-items-center w-25 position-relative ">
                        <i
                            class="fa-solid fa-magnifying-glass text-brand fs-6 position-absolute"></i>
                        <input type="text"
                            class="form-control search-bar ps-5 w-100 " name id
                            aria-describedby="helpId"
                            placeholder="Search Event " />
                        <button class="btn-pink text-white"><i
                                class="fa-solid fa-magnifying-glass text-brand fs-6"></i></button>
                    </div>
                    <div class="action-btn d-flex">
                        <button onclick="loginLink()" class="btn-outline-pink ms-3"><i
                                class="fa-solid fa-plus text-brand"></i> Create
                            a
                            post</button>
                        <a href="javascript:void(0);" class=" btn-outline-pink ms-3" role="button"
                            id="browseDropdown"
                            data-bs-toggle="dropdown" aria-expanded="false">
                            Browse <i
                                class="fa-solid fa-caret-down text-brand"></i>
                            <!-- User Icon -->
                        </a>
                        <a href="../../pages/authentication/login.html"
                            class="btn-outline-pink ms-3 d-flex align-items-center"><i
                                class="fa-solid fa-ticket pe-1 text-brand"></i>My
                            Ticket</a>

                        <ul class="dropdown-menu dropdown-menu-end"
                            aria-labelledby="browseDropdown">
                            <li><a class="dropdown-item" href="../../pages/browse/browse-event.html">Browse Events</a></li>
                            <li><a class="dropdown-item" href="../../pages/browse/browse-recruitment.html">Browse Vendor Recruitments</a></li>
                            <li><a class="dropdown-item"
                                    href="../../pages/browse/browse-vendor.html">Browse Business</a></li>
                            
                            
                        </ul>
                    </div>
                    <div>
                        <a href="../../pages/authentication/login.html"
                            class="btn btn-brand me-2">Log In</a>
                        <a href="../../pages/authentication/Signup.html"
                            class="btn btn-outline-brand text-dark">Register</a>
                    </div>
                </nav>
            </div>`
            
  }
});



console.log(document.getElementById('btn-logout'));

  if(document.getElementById('btn-logout')){
    document.getElementById('btn-logout').addEventListener('click', ()=>{
      logout();
    })
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

function loginLink() {
  location.href = "/pages/authentication/login.html"
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