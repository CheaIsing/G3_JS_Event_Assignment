const API_URL = "https://mps2.chandalen.dev";
const apiUrl = "https://mps2.chandalen.dev";
const token = localStorage.getItem("authToken");

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
    

    if (location.pathname.includes("homepage.html")) {
      location.href = "/index.html";
    }

    if (!location.pathname.includes("index.html")) {
      document.querySelector(
        "#header .logo"
      ).innerHTML = `<a href="/pages/homepage.html">
                              <img
                                  src="../../assets/lim_img/logo/Prutika_Logo_text(2).png"
                                  alt>
                          </a>`;

      document.querySelector(
        "#header nav div:last-child"
      ).innerHTML = `<a href="../../pages/authentication/login.html"
                              class="btn btn-brand me-2">Log In</a>
                          <a href="../../pages/authentication/Signup.html"
                              class="btn btn-outline-brand text-dark">Register</a>`;
    }
  }
});

if (document.getElementById("btn-logout")) {
  document.getElementById("btn-logout").addEventListener("click", () => {
    logout();
  });
}

function logout() {
  fetch(`${API_URL}/api/logout`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("authToken")}`,
    },
  })
    .then((res) => res.json())
    .then((json) => {
      showToast(json.message, json.result);

      if (json.result == true) {
        localStorage.removeItem("authToken");
        setTimeout(() => {
          location.href = "/index.html";
        }, 1500);
      }
    });
}

function loginLink() {
  location.href = "/pages/authentication/login.html";
}

if (document.getElementById("profileForm")) {
  document
    .getElementById("profileForm")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      event.stopPropagation();

      const form = this;
      const firstName = document.getElementById("firstname");
      const lastName = document.getElementById("lastname");
      const email = document.getElementById("login-email");
      const phoneNumber = document.getElementById("phonenumber");
      const dateOfBirth = document.getElementById("datepicker");

      let isValid = true;

      // First name validation (letters only)
      const namePattern = /^[A-Za-z]+$/;
      if (!namePattern.test(firstName.value)) {
        firstName.classList.add("is-invalid");
        isValid = false;
      } else {
        firstName.classList.remove("is-invalid");
      }

      // Last name validation (letters only)
      if (!namePattern.test(lastName.value)) {
        lastName.classList.add("is-invalid");
        isValid = false;
      } else {
        lastName.classList.remove("is-invalid");
      }

      // Email validation
      if (!email.checkValidity()) {
        email.classList.add("is-invalid");
        isValid = false;
      } else {
        email.classList.remove("is-invalid");
      }

      // Phone number validation (10-15 digits)
      const phonePattern = /^\d{10,15}$/;
      if (!phonePattern.test(phoneNumber.value)) {
        phoneNumber.classList.add("is-invalid");
        isValid = false;
      } else {
        phoneNumber.classList.remove("is-invalid");
      }

      // Date of Birth validation
      if (!dateOfBirth.value) {
        dateOfBirth.classList.add("is-invalid");
        isValid = false;
      } else {
        dateOfBirth.classList.remove("is-invalid");
      }

      // If form is valid, submit the form
      if (isValid) {
        form.classList.add("was-validated");
        form.submit();
      }
    });
}
