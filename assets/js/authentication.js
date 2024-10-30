import { showToast } from "./ultilities.js";
const API_URL = "https://mps2.chandalen.dev";
// const token = localStorage.getItem('authToken');

document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("authToken")) {
    if (
      location.pathname.includes("index.html") ||
      location.pathname.includes("login.html") ||
      location.pathname.includes("Signup.html")
    ) {
      location.href = "homepage.html";
    }
  } else {
    if (
      !location.pathname.includes("index.html") &&
      !location.pathname.includes("login.html") &&
      !location.pathname.includes("Signup.html")
    ) {
      console.log(location.pathname);

      let count = 0;

      // Loop through each character in the string
      for (let i = 0; i < location.pathname.length; i++) {
        if (location.pathname[i] === "/") {
          count++; // Increment the count if '/' is found
        }
      }

      let path = "";
      for (let i = 1; i <= count; i++) {
        path += "../";
      }
      location.href = `${path}index.html`;

      console.log(count);

      // location.href = "index.html";
    }
  }
});

if (document.getElementById("btn-log-in")) {
  document.getElementById("btn-log-in").onclick = () => {
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

    if (email && password) {
      fetch(API_URL + "/api/login", {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify({ email, password }),
      })
        .then((res) => res.json())
        .then((json) => {

          console.log(json);
          if(json.result == true){

            let token = json.data.token;
            localStorage.setItem("authToken", token);
            location.href = "homepage.html";
            showToast(json.message, json.result);
          }
          // else{
          //   showToast(json.message, 'fail');
          //   return;
          // }
        });
    }
  };
}

if (document.getElementById("btn-forgot-pass")) {
  document.getElementById("btn-forgot-pass").onclick = () => {
    document.getElementById("btn-send-email-forgot-pass").onclick = () => {
      const email = document.getElementById("forgot-pass-email").value;
      document.body.style.cursor = "wait"; // Set the cursor to loading

      fetch(`${API_URL}/api/forgot/pass`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })
        .then((res) => res.json())
        .then((json) => {
          document.body.style.cursor = "default"; // Reset the cursor
          console.log(json);

          // Check if the response was successful
          if (json.result === true) {
            // Close the Forgot Password modal

            const forgotPassModal =
              document.getElementById("exampleModalToggle");
            const bootstrapForgotPassModal =
              bootstrap.Modal.getInstance(forgotPassModal);
            bootstrapForgotPassModal.hide(); // Close the modal

            // Open the OTP modal
            const otpModal = new bootstrap.Modal(
              document.getElementById("exampleModalToggle2")
            );
            otpModal.show();

            // OTP inputs handling logic here
            setupOtpInputFields();
          } else {
            showToast("Failed to send reset email. Please try again.", false);
            // alert('Failed to send reset email. Please try again.');
          }
        })
        .catch((error) => {
          document.body.style.cursor = "default"; // Reset the cursor
          console.error("Error:", error);
          // alert('An error occurred. Please try again.');
          showToast("An error occurred. Please try again.", false);
        });
    };
  };
}

let otpCode = "";

function setupOtpInputFields() {
  // Select all OTP input fields
  const otpInputs = document.querySelectorAll(".otp-inputs input");

  // Add event listener to each input field
  otpInputs.forEach((input, index) => {
    input.addEventListener("keydown", function (event) {
      if (event.key.match(/^[a-zA-Z0-9]$/)) {
        otpInputs[index].value = ""; // Clear the current value for a new entry
        // Move to the next input field after entering a character
        if (index < otpInputs.length - 1) {
          setTimeout(() => otpInputs[index + 1].focus(), 10); // Move to next input after a small delay
        }
      } else if (event.key === "Backspace") {
        // If backspace is pressed, move to the previous input field
        if (index > 0) {
          setTimeout(() => otpInputs[index - 1].focus(), 10); // Move to previous input
        }
      }
    });
  });

  // Function to get the OTP value from all input fields
  function getOtpValue() {
    const otpInputs = document.querySelectorAll(".otp-inputs input");
    let otpCode = "";
    otpInputs.forEach((input) => {
      otpCode += input.value; 
    });
    return otpCode;
  }

  
  if (document.getElementById("otpVerifyBtn")) {
    document.getElementById("otpVerifyBtn").onclick = function () {
      otpCode = getOtpValue(); 

      fetch(`${API_URL}/api/forgot/verify-otp`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          otp: otpCode,
          email: document.getElementById("forgot-pass-email").value,
        }),
      })
        .then((res) => res.json())
        .then((json) => {
          if (json.result === true) {
            // Close the OTP modal
            const otpModalInstance = bootstrap.Modal.getInstance(
              document.getElementById("exampleModalToggle2")
            );
            otpModalInstance.hide(); // Close OTP modal

            // Open the Change Password modal
            const changePassModal = new bootstrap.Modal(
              document.getElementById("changePasswordModal")
            );
            changePassModal.show();
          } else {
            // alert('OTP verification failed. Please try again.');
            showToast("OTP verification failed. Please try again.", false);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          // alert('An error occurred during OTP verification.');
          showToast(
            "An error occurred during OTP verification. Please try again.",
            false
          );
        });
    };
  }
}

// Handle password change process
if (document.getElementById("changePasswordSubmitBtn")) {
  document.getElementById("changePasswordSubmitBtn").onclick = () => {
    const newPass = document.getElementById("newPassword").value;
    const confirmPass = document.getElementById("confirmPassword").value;
    const email = document.getElementById("forgot-pass-email").value;

    fetch(`${API_URL}/api/reset/pass`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        otp: otpCode,
        email: email,
        new_pass: newPass,
        new_pass_confirmation: confirmPass,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.result === true) {
          // Close the Change Password modal
          const changePassModalInstance = bootstrap.Modal.getInstance(
            document.getElementById("changePasswordModal")
          );
          changePassModalInstance.hide();
          // alert('Password changed successfully!');
          showToast(json.message, json.result);
        } else {
          // alert('Password change failed. Please try again.');
          showToast("Password change failed. Please try again.", false);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        showToast("An error occurred while changing the password.", false);
      });
  };
}

function logout() {
  localStorage.removeItem("authToken");
  location.href = "index.html";
  showToast("Log out sucessfully", true);
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
showToast("Failed to send your request!", "fail"); // Fail toast
    
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

