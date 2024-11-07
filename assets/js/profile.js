const API_URL = "https://mps2.chandalen.dev";
const token = localStorage.getItem('authToken');

document.addEventListener('DOMContentLoaded', () => {
    Getme();
});

function Getme() {
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
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
}

function profileData(data) {
    document.getElementById('profile-pic').src = data.avatar || " ";
    document.getElementById('username').value = data.username || " ";
    document.getElementById('fullname').value = data.full_name || " ";
    document.getElementById('login-email').value = data.email || " ";
    document.getElementById('phonenumber').value = data.phone || " ";
    document.getElementById('datepicker').value = data.dob;
}

function profilePic() {
    document.getElementById('profilePicture').click();
}

function uploadProfileImage(event) {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = function () {
            document.getElementById('profile-pic').src = reader.result;
        };
        reader.readAsDataURL(file);

        const formData = new FormData();
        formData.append('avatar', file);

        fetch(`${API_URL}/api/profile/avatar`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.result) {
                document.getElementById('profile-pic').src = data.data.avatar;
                console.log("Profile avatar updated successfully.");
            } else {
                console.error("Error updating profile avatar:", data.message);
                alert("Failed to update profile avatar.");
            }
        })
        .catch(error => {
            console.error("Error uploading profile avatar:", error);
            alert("An error occurred while uploading the image.");
        });
    } else {
        alert("Please upload a valid image file.");
    }
}

function DeleteProfile() {
    fetch(`${API_URL}/api/profile/avatar`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.result && data.code === 1) {
            document.getElementById('profile-pic').src = data.data.avatar;
            const fileInput = document.getElementById('profilePicture');
            fileInput.value = '';
            const clonedFileInput = fileInput.cloneNode();
            fileInput.replaceWith(clonedFileInput);
            clonedFileInput.addEventListener('change', uploadProfileImage);
            console.log(data.message);
        } else {
            console.error("Failed to delete profile image:", data.message);
        }
    })
    .catch(error => console.error("Error:", error));
}

document.addEventListener('DOMContentLoaded', () => {
    UserInfo();
});

// Function to fetch user information
function UserInfo() {
    fetch(`${API_URL}/api/profile/info`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    })
    .then(res => {
        if (!res.ok) {
            return res.json().then(errData => {
                throw new Error("Network response was not ok: " + JSON.stringify(errData));
            });
        }
        return res.json(); 
    })
    .then(data => {
        console.log('Fetched user info:', data); 
        updateUserInfo(data); // Assuming you have a function to handle the data
    })
    .catch(error => {
        console.error('Error fetching user info:', error.message); // Log the error message
    });
}

// Function to update the user information on the UI
function updateUserInfo(data) {
    // Populate your form or UI elements with the fetched data
    document.getElementById('username').value = data.username || ''; // Assuming data has a username property
    document.getElementById('fullname').value = data.full_name || ''; 
    document.getElementById('login-email').value = data.email || ''; 
    document.getElementById('phonenumber').value = data.phone || ''; 
    document.getElementById('datepicker').value = data.dob || ''; 
}

// Function to update user information
function updateinfo() {
    let username = document.getElementById('username').value;
    let fullname = document.getElementById('fullname').value;
    let phonenumber = document.getElementById('phonenumber').value;
    let email = document.getElementById('login-email').value;
    let date = document.getElementById('datepicker').value;

    let formData = {
        username: username,
        full_name: fullname,
        phone: phonenumber,
        email: email,
        dob: date
    };

    fetch(`${API_URL}/api/profile/info`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(formData)
    })
    .then(res => {
        if (!res.ok) {
            return res.json().then(errData => {
                throw new Error("Network response was not ok: " + JSON.stringify(errData));
            });
        }
        return res.json();
    })
    .then(json => {
        console.log('Updated successfully:', json.data);
        GetUpdateInfo(json.data);
    })
    .catch(error => {
        console.error('Error updating info:', error.message, error);
    });
}


function updatePassword() {
    const currentPassword = document.getElementById('currentPassword').value;
    const newPassword = document.getElementById('newPassword').value;
    const confirmNewPassword = document.getElementById('confirmNewPassword').value;

    if (newPassword !== confirmNewPassword) {
        alert("New password and confirm password do not match.");
        return;
    }

    const data = {
        currentPassword: currentPassword,
        newPassword: newPassword,
        confirmNewPassword: confirmNewPassword
    };

    fetch(`${API_URL}/api/profile/pass`, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Bearer ${token}`
        }
    })
    .then(response => {
        if (!response.ok) {
            return response.json().then(errData => {
                throw new Error(`Error ${response.status}: ${errData.message}`);
            });
        }
        return response.json();
    })
    .then(data => {
        if (data.success) {
            alert("Password updated successfully");
        } else {
            alert("Failed to update password: " + data.message);
        }
    })
    .catch(error => {
        console.error("Error updating password", error);
        alert("An error occurred while updating the password: " + error.message);
    });


document.addEventListener('DOMContentLoaded', () => {
    const deleteButton = document.querySelector('#v-pills-deleteAccount .btn-brand');
    console.log(deleteButton);  // Check if the button is selected
    if (deleteButton) {
        deleteButton.addEventListener('click', deleteAccount);
    } else {
        console.error('Delete button not found');
    }
});

function deleteAccount() {
    console.log('Delete account function triggered');  // Check if function is called
    const password = document.getElementById('d-password').value;

    fetch(`${API_URL}/api/profile/delete-acc`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ password })
    })
    .then(res => {
        if (!res.ok) {
            return res.json().then(errData => {
                throw new Error("Error: " + JSON.stringify(errData));
            });
        }
        return res.json(); 
    })
    .then(() => {
        alert('Your account has been successfully deleted.');
        window.location.href = '/login.html';
    })
    .catch(error => {
        console.error('Error deleting account:', error);
        alert('Error deleting account: ' + error.message); 
    });
}
}
