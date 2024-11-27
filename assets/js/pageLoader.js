document.addEventListener("DOMContentLoaded", function () {
    const loader = document.getElementById("loader-overlay");

    // Hide the loader once the page is fully loaded
    window.addEventListener("load", function () {
        setTimeout(() => {
            loader.classList.add("hidden"); // Add hidden class to fade out
        }, 800); // Matches the animation duration
    });

    // Show loader when navigating to another page
    const links = document.querySelectorAll("a.transition-link");
    links.forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault();
            const targetUrl = this.href;

            loader.classList.remove("hidden"); // Show the loader
            setTimeout(() => {
                window.location.href = targetUrl; // Navigate after animation
            }, 800); // Matches the animation duration
        });
    });
});
