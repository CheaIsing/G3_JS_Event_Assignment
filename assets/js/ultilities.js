function showToast(msg, condition) {
  let toastContainer = document.querySelector(".toast-container");
  if (!toastContainer) {
    toastContainer = document.createElement("div");
    toastContainer.className =
      "toast-container position-fixed bottom-0 end-0 p-3";
    toastContainer.style.zIndex = "1100";
    document.body.appendChild(toastContainer);
  }

  // Create the toast element
  const toast = document.createElement("div");
  toast.className = `toast align-items-center text-white ${
    condition === true ? "bg-brand" : "bg-danger"
  } border-0`;
  toast.role = "alert";
  toast.setAttribute("aria-live", "assertive");
  toast.setAttribute("aria-atomic", "true");

  // Inner content of the toast
  toast.innerHTML = `
      <div class="d-flex">
        <div class="toast-body">
          ${
            msg ||
            (condition === "success" ? "Action successful!" : "Action failed!")
          }
        </div>
        <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
      </div>
    `;

  // Append the toast to the container
  toastContainer.appendChild(toast);

  // Initialize and show the toast using Bootstrap's toast API
  const bsToast = new bootstrap.Toast(toast);
  bsToast.show();

  // Automatically remove the toast after it hides
  toast.addEventListener("hidden.bs.toast", () => {
    toast.remove();
  });
}

function formatDate (dateStr) {
  const date = new Date(dateStr);

  const options = {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };

  return date.toLocaleString("en-US", options).replace(",", " •");
}

function formatDateStringMonth(dateString) {
  const date = new Date(dateString); // Convert the string to a Date object
  
  // Define options for formatting
  const options = { month: 'short' };

  // Use toLocaleString to format the date
  const formattedDate = date.toLocaleString('en-US', options).toUpperCase(); // Convert to uppercase

  return formattedDate.replace(',', ''); // Remove comma if present
}

function formatDateStringDay(dateString) {
  const date = new Date(dateString); // Convert the string to a Date object
  
  // Define options for formatting
  const options = {  day: '2-digit' };

  // Use toLocaleString to format the date
  const formattedDate = date.toLocaleString('en-US', options).toUpperCase(); // Convert to uppercase

  return formattedDate.replace(',', ''); // Remove comma if present
}

function formatCustomDateWithYear(dateString) {
  // Parse the initial date string
  const date = new Date(dateString);


  // Format the date to "Fri • Nov 1, 2004"
  const options = { month: 'short', day: 'numeric', year: 'numeric' };
  return date.toLocaleDateString('en-US', options).replace(',', ' •');
}

function formatToHour(dateString) {
  // Parse the initial date string
  const date = new Date(dateString);
  const options = { hour: 'numeric', minute: '2-digit', hour12: true };
  return date.toLocaleTimeString('en-US', options);
}