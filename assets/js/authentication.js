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