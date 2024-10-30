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

