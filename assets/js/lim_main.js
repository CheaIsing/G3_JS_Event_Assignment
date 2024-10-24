// Select all form elements
const forms = document.querySelectorAll('.sub-form-wrapper');

// Add click event listener to each form
forms.forEach(form => {
    form.addEventListener('click', () => {
        // Hide the form-display and show the form-wrapper
        let formDisplay = form.querySelector('.form-display');
        let formWrapper = form.querySelector('.main-form');

        formDisplay.style.display = 'none'; // Hide form-display
        formWrapper.style.display = 'block'; // Show form-wrapper
        form.style.outline = "2px solid #ff1694";
    });
});



//header
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
    document.getElementById("header").style.boxShadow = "1px 1px 8px #e1159325";
  } else {
    document.getElementById("header").style.boxShadow = "none";
  }
}

