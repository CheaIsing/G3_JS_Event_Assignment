// const API_URL = "https://mps2.chandalen.dev";
// const token = localStorage.getItem('authToken');
const fullnameInput = document.getElementById("fullname");
const emailInput = document.getElementById("login-email");
const phoneInput = document.getElementById("phonenumber");
const dobInput = document.getElementById("datepicker");
const currentPassword = document.getElementById("currentPassword");
const newPassword = document.getElementById("newPassword");
const confirmNewPassword = document.getElementById("confirmNewPassword");

const toggleCurrentPass = document.getElementById("toggleCurrentPassword");
const toggleNewPass = document.getElementById("toggleNewPassword");
const toggleConfirmNewPass = document.getElementById(
  "toggleConfirmNewPassword"
);

const dPassword = document.getElementById("d-password");
const toggleDPassword = document.getElementById("toggleDPassword");

document.addEventListener("DOMContentLoaded", () => {
  Getme();
  const deleteButton = document.querySelector(
    "#v-pills-deleteAccount .btn-brand"
  );
  if (deleteButton) {
    deleteButton.addEventListener("click", deleteAccount);
  } else {
    console.error("Delete button not found");
  }

  toggleCurrentPass.addEventListener("click", () => {
    if (currentPassword.type === "password") {
      currentPassword.type = "text";
      toggleCurrentPass.classList.toggle("bi-eye");
      toggleCurrentPass.classList.toggle("bi-eye-slash");
    } else {
      currentPassword.type = "password";
      toggleCurrentPass.classList.toggle("bi-eye");
      toggleCurrentPass.classList.toggle("bi-eye-slash");
    }
  });

  toggleNewPass.addEventListener("click", () => {
    if (newPassword.type === "password") {
      newPassword.type = "text";
      toggleNewPass.classList.toggle("bi-eye");
      toggleNewPass.classList.toggle("bi-eye-slash");
    } else {
      newPassword.type = "password";
      toggleNewPass.classList.toggle("bi-eye");
      toggleNewPass.classList.toggle("bi-eye-slash");
    }
  });
  toggleConfirmNewPass.addEventListener("click", () => {
    if (confirmNewPassword.type === "password") {
      confirmNewPassword.type = "text";
      toggleConfirmNewPass.classList.toggle("bi-eye");
      toggleConfirmNewPass.classList.toggle("bi-eye-slash");
    } else {
      confirmNewPassword.type = "password";
      toggleConfirmNewPass.classList.toggle("bi-eye");
      toggleConfirmNewPass.classList.toggle("bi-eye-slash");
    }
  });

  toggleDPassword.addEventListener("click", () => {
    if (dPassword.type === "password") {
      dPassword.type = "text";
      toggleDPassword.classList.toggle("bi-eye");
      toggleDPassword.classList.toggle("bi-eye-slash");
    } else {
      dPassword.type = "password";
      toggleDPassword.classList.toggle("bi-eye");
      toggleDPassword.classList.toggle("bi-eye-slash");
    }
  });
});

function Getme() {
  fetch(`${API_URL}/api/me`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .then((json) => {
      console.log(json.data);
      populateUserData(json.data);
    });
}

function populateUserData(data) {
  document.getElementById("profile-pic").src = data.avatar || "";
  // document.getElementById('username').value = data.username || "";
  document.getElementById("fullname").value = data.full_name || "";
  document.getElementById("login-email").value = data.email || "";
  document.getElementById("phonenumber").value = data.phone || "";
  document.getElementById("datepicker").value = data.dob || "";

  document.getElementById("btn-update-info").disabled = true;

  if (document.getElementById("profile-pic").src.includes("no_photo")) {
    document.getElementById("btn-delete-profile").style.display = "none";
  } else {
    document.getElementById("btn-delete-profile").style.display =
      "inline-block";
  }

  // Get references to input fields and update button
  const updateButton = document.getElementById("btn-update-info");

  // Track initial field values
  let initialFullname = fullnameInput.value;
  let initialEmail = emailInput.value;
  let initialPhone = phoneInput.value;
  let initialDob = dobInput.value;

  // Function to check for changes and enable the update button
  const updateButtonCheck = () => {
    const hasChanged =
      fullnameInput.value !== initialFullname ||
      emailInput.value !== initialEmail ||
      phoneInput.value !== initialPhone ||
      dobInput.value !== initialDob;
    updateButton.disabled = !hasChanged;
  };

  // Add event listeners for input changes
  fullnameInput.addEventListener("input", updateButtonCheck);
  emailInput.addEventListener("input", updateButtonCheck);
  phoneInput.addEventListener("input", updateButtonCheck);
  dobInput.addEventListener("input", updateButtonCheck);
}

function profilePic() {
  document.getElementById("profilePicture").click();
}
function uploadProfileImage(event) {
  const file = event.target.files[0];
  if (file && file.type.startsWith("image/")) {
    const reader = new FileReader();
    const formData = new FormData();
    formData.append("avatar", file);
    document.body.style.cursor = "wait";
    document.querySelector(".lblPfp").innerHTML = "Updating...";

    fetch(`${API_URL}/api/profile/avatar`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        document.querySelector(".lblPfp").innerHTML = "Update Profile";
        if (data.result === true) {
          document.body.style.cursor = "default";
          document.getElementById("profile-pic").src = reader.result;

          //   reader.readAsDataURL(file);
          document.getElementById("profile-pic").src = data.data.avatar;

          // Show Toast after both updates are done
          showToast("Profile avatar updated successfully.", true);

          if (document.getElementById("profile-pic").src.includes("no_photo")) {
            document.getElementById("btn-delete-profile").style.display =
              "none";
          } else {
            document.getElementById("btn-delete-profile").style.display =
              "inline-block";
          }
        }
      });
  }
}
function DeleteProfile(btn) {
  btn.disabled = true;
  document.body.style.cursor = "wait";

  fetch(`${API_URL}/api/profile/avatar`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      btn.disabled = false;
      document.body.style.cursor = "default";
      if (data.result == true && data.code === 1) {
        document.getElementById("profile-pic").src = data.data.avatar;
        const fileInput = document.getElementById("profilePicture");
        fileInput.value = "";
        const clonedFileInput = fileInput.cloneNode();
        fileInput.replaceWith(clonedFileInput);
        // clonedFileInput.addEventListener("change", uploadProfileImage);
        if (document.getElementById("profile-pic").src.includes("no_photo")) {
          document.getElementById("btn-delete-profile").style.display = "none";
        } else {
          document.getElementById("btn-delete-profile").style.display =
            "inline-block";
        }
        showToast("Profile avatar deleted successfully.", data.result);
        // showToast(json.message, json.result)
      }
    });
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function isValidFullName(name) {
  const nameRegex = /^[a-zA-Z\s]+$/;
  return nameRegex.test(name);
}
function isValidPhoneNumber(phoneNumber) {
  // Implement your phone number validation logic here, e.g., checking for digits and specific formats
  // You might need to consider country-specific formats and validation rules.
  const phoneNumberRegex = /^\d{9,10}$/; // Example for 10-15 digits
  return phoneNumberRegex.test(phoneNumber);
}

function isValidateDOB(dob) {
  const currentYear = new Date().getFullYear();
  const dobRegex = /^(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;

  if (!dobRegex.test(dob)) return false;

  const dobYear = parseInt(dob.split("-")[0], 10);
  if (dobYear < 1900 || dobYear > currentYear || new Date(dob) > new Date()) {
    return false;
  }

  return true;
}

function checkEmailValid(emailInput) {
  if (!isValidEmail(emailInput.value)) {
    document.getElementById("email-info-err").style.display = "block";
    emailInput.classList.add("is-invalid");
    isValid = false;
  } else {
    document.getElementById("email-info-err").style.display = "none";
    emailInput.classList.remove("is-invalid");
    isValid = true;
  }
}
function checkFullNameValid(fullnameInput) {
  if (!isValidFullName(fullnameInput.value)) {
    document.getElementById("fullname-info-err").style.display = "block";
    fullnameInput.classList.add("is-invalid");
    isValid = false;
  } else {
    document.getElementById("fullname-info-err").style.display = "none";
    fullnameInput.classList.remove("is-invalid");
    isValid = true;
  }
}
function checkPhoneValid(phoneInput) {
  if (!isValidPhoneNumber(phoneInput.value)) {
    document.getElementById("phone-info-err").style.display = "block";
    phoneInput.classList.add("is-invalid");
    isValid = false;
  } else {
    document.getElementById("phone-info-err").style.display = "none";
    phoneInput.classList.remove("is-invalid");
    isValid = true;
  }
}
function checkDobValid(dobInput) {
  if (!isValidateDOB(dobInput.value)) {
    document.getElementById("dob-info-err").style.display = "block";
    dobInput.classList.add("border", "border-danger");
    isValid = false;
  } else {
    document.getElementById("dob-info-err").style.display = "none";
    dobInput.classList.remove("border", "border-danger");
    isValid = true;
  }
}

// function updateinfo(event) {
//     event.preventDefault();
//       event.stopPropagation();

//   let isValid = true;

//   checkEmailValid(emailInput);
//   checkFullNameValid(fullnameInput);
//   checkPhoneValid(phoneInput);
//   checkDobValid(dobInput);

//   emailInput.addEventListener("input", () => {
//     if (isValidEmail(emailInput.value)) {
//       document.getElementById("email-info-err").style.display = "none";
//       emailInput.classList.remove("is-invalid");
//       emailInput.classList.add("is-valid");
//       isValid = true;
//     } else {
//       document.getElementById("email-info-err").style.display = "block";
//       emailInput.classList.add("is-invalid");
//       emailInput.classList.remove("is-valid");
//       isValid = false;
//     }
//   });
//   fullnameInput.addEventListener("input", () => {
//     if (isValidFullName(fullnameInput.value)) {
//       document.getElementById("fullname-info-err").style.display = "none";
//       fullnameInput.classList.remove("is-invalid");
//       fullnameInput.classList.add("is-valid");
//       isValid = true;
//     } else {
//       document.getElementById("fullname-info-err").style.display = "block";
//       fullnameInput.classList.add("is-invalid");
//       fullnameInput.classList.remove("is-valid");
//       isValid = false;
//     }
//   });
//   phoneInput.addEventListener("input", () => {
//     if (isValidPhoneNumber(phoneInput.value)) {
//       document.getElementById("phone-info-err").style.display = "none";
//       phoneInput.classList.remove("is-invalid");
//       phoneInput.classList.add("is-valid");
//       isValid = true;
//     } else {
//       document.getElementById("phone-info-err").style.display = "block";
//       phoneInput.classList.add("is-invalid");
//       phoneInput.classList.remove("is-valid");
//       isValid = false;
//     }
//   });
//   dobInput.addEventListener("input", () => {
//     if (isValidateDOB(dobInput.value)) {
//       document.getElementById("dob-info-err").style.display = "none";
//       dobInput.classList.remove("border", "border-danger");
//       dobInput.classList.add("border", "border-success");
//       isValid = true;
//     } else {
//       document.getElementById("dob-info-err").style.display = "block";
//       dobInput.classList.add("border", "border-danger");
//       dobInput.classList.remove("border", "border-success");
//       isValid = false;
//     }
//   });

//   if (isValid === true) {
//     const formData = {
//       // username: document.getElementById('username').value,
//       full_name: document.getElementById("fullname").value,
//       phone: document.getElementById("phonenumber").value,
//       email: document.getElementById("login-email").value,
//       dob: document.getElementById("datepicker").value,
//     };
//     fetch(`${API_URL}/api/profile/info`, {
//       method: "PUT",
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify(formData),
//     })
//       .then((res) => res.json())
//       .then((json) => {
//         showToast(json.message, json.result);
//         populateUserData(json.data);
//         dobInput.classList.remove("border", "border-success");
//         phoneInput.classList.remove("is-valid");
//         fullnameInput.classList.remove("is-valid");
//         emailInput.classList.remove("is-valid");
//       });
//   }
// }

function validateField(field, validationFunction, errorMessageId, callback) {
  const isValid = validationFunction(field.value);
  const errorMessageElement = document.getElementById(errorMessageId);

  if (isValid) {
    errorMessageElement.style.display = "none";
    field.classList.remove("is-invalid"); // Assuming Bootstrap class
    field.classList.add("is-valid"); // Assuming Bootstrap class
  } else {
    errorMessageElement.style.display = "block";
    field.classList.add("is-invalid");
    field.classList.remove("is-valid");
  }

  if (callback != undefined) {
    callback();
  }

  return isValid;
}

function updateinfo(event) {
  event.preventDefault();
  // Attach event listeners to input fields for validation on change
  emailInput.addEventListener("input", () =>
    validateField(emailInput, isValidEmail, "email-info-err")
  );
  fullnameInput.addEventListener("input", () =>
    validateField(fullnameInput, isValidFullName, "fullname-info-err")
  );
  phoneInput.addEventListener("input", () =>
    validateField(phoneInput, isValidPhoneNumber, "phone-info-err")
  );
  dobInput.addEventListener("input", () =>
    validateField(dobInput, isValidateDOB, "dob-info-err")
  );

  let isValid = true;

  isValid =
    validateField(emailInput, isValidEmail, "email-info-err") && isValid;
  isValid =
    validateField(fullnameInput, isValidFullName, "fullname-info-err") &&
    isValid;
  isValid =
    validateField(phoneInput, isValidPhoneNumber, "phone-info-err") && isValid;
  isValid = validateField(dobInput, isValidateDOB, "dob-info-err") && isValid;

  if (isValid) {
    document.getElementById("btn-update-info").disabled = true;
    document.body.style.cursor = "wait";
    // Submit update request using formData
    // ... your update logic here
    const formData = {
      // username: document.getElementById('username').value,
      full_name: document.getElementById("fullname").value,
      phone: document.getElementById("phonenumber").value,
      email: document.getElementById("login-email").value,
      dob: document.getElementById("datepicker").value,
    };
    fetch(`${API_URL}/api/profile/info`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((json) => {
        document.getElementById("btn-update-info").disabled = false;
        document.body.style.cursor = "default";
        showToast(json.message, json.result);
        //   populateUserData(json.data);
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      });
  }
}

function validatePassword(password) {
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d!@#$%^&*()_+[\]{};':"\\|,.<>\/?~-]{8,}$/;
  return passwordRegex.test(password);
}

function moveEye() {
  if (document.getElementById("currentPassErr").style.display === "block") {
    document.getElementById("toggleCurrentPassword").style.top = "36%";
  } else {
    document.getElementById("toggleCurrentPassword").style.top = "50%";
  }

  if (document.getElementById("newPassErr").style.display === "block") {
    document.getElementById("toggleNewPassword").style.top = "36%";
  } else {
    document.getElementById("toggleNewPassword").style.top = "50%";
  }
  if (document.getElementById("confirmNewPassErr").style.display === "block") {
    document.getElementById("toggleConfirmNewPassword").style.top = "36%";
  } else {
    document.getElementById("toggleConfirmNewPassword").style.top = "50%";
  }

  if (document.getElementById("dPassErr").style.display === "block") {
    document.getElementById("toggleDPassword").style.top = "36%";
  } else {
    document.getElementById("toggleDPassword").style.top = "50%";
  }
}

function updatePassword() {
  currentPassword.addEventListener("input", () => {
    validateField(currentPassword, validatePassword, "currentPassErr", moveEye);
  });
  newPassword.addEventListener("input", () => {
    validateField(newPassword, validatePassword, "newPassErr", moveEye);
  });
  confirmNewPassword.addEventListener("input", () => {
    validateField(
      confirmNewPassword,
      validatePassword,
      "confirmNewPassErr",
      moveEye
    );
  });
  let isValid = true;

  isValid =
    validateField(
      currentPassword,
      validatePassword,
      "currentPassErr",
      moveEye
    ) && isValid;

  isValid =
    validateField(newPassword, validatePassword, "newPassErr") && isValid;
  isValid =
    validateField(confirmNewPassword, validatePassword, "confirmNewPassErr") &&
    isValid;

  moveEye();

  if (isValid) {
    if (newPassword.value !== confirmNewPassword.value) {
      showToast("New password and confirm password do not match.", false);
      return;
    }
    document.body.style.cursor = "wait";
    document.getElementById("btn-change-pass").disabled = true;
    const data = {
      current_pass: currentPassword.value,
      new_pass: newPassword.value,
      new_pass_confirmation: confirmNewPassword.value,
    };
    fetch(`${API_URL}/api/profile/pass`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        document.body.style.cursor = "default";
        showToast(data.message, data.result);
        document.getElementById("btn-change-pass").disabled = false;
        if (data.result) {
          // document.getElementById("btn-change-pass").disabled = false;

          setTimeout(() => {
            location.reload();
          }, 1500);
        }
      });
  }
}
function deleteAccount() {
  dPassword.addEventListener("input", () => {
    validateField(dPassword, validatePassword, "dPassErr", moveEye);
  });
  const password = document.getElementById("d-password").value;

  let isValid = true;

  isValid =
    validateField(dPassword, validatePassword, "dPassErr", moveEye) && isValid;
  moveEye();
  if (isValid) {
    fetch(`${API_URL}/api/profile/delete-acc`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        current_pass: document.getElementById("d-password").value,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        showToast(json.message, json.result);
        console.log(json);

        if (json.result) {
          localStorage.removeItem("authToken");
          setTimeout(() => {
            window.location.href = "../../index.html";
          }, 1500);
        }
      });
  }
}
