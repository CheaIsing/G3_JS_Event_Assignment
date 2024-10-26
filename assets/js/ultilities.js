export function showToast(msg, condition) {
    
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