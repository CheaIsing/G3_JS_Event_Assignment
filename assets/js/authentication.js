const API_URL = "https://mps2.chandalen.dev";


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