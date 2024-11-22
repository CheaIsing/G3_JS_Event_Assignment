let selectedCategories = [];
function setupPagination(pagination) {
  const paginationContainer = document.getElementById("pagination");
  paginationContainer.innerHTML = ""; // Clear previous pagination buttons

  const totalPages = pagination.last_page; // Total number of pages
  const currentPageNum = pagination.current_page; // Current page
  const maxButtonsToShow = 5; // Maximum visible buttons including ellipsis

  // Helper to create a button
  function createButton(label, disabled, onClick) {
    const button = document.createElement("button");
    button.innerText = label;
    button.disabled = disabled;
    if (onClick) button.onclick = onClick;
    return button;
  }

  // Previous button
  const prevPageButton = createButton("←", currentPageNum === 1, () =>
    updateUrlAndFetch(currentPageNum - 1)
  );
  paginationContainer.appendChild(prevPageButton);

  // Generate page numbers to display
  const pages = [];
  if (totalPages <= maxButtonsToShow) {
    // Show all pages if total pages are less than maxButtonsToShow
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
  } else {
    // Ellipsis logic for large page counts
    if (currentPageNum <= 3) {
      pages.push(1, 2, 3, "...", totalPages);
    } else if (currentPageNum >= totalPages - 2) {
      pages.push(1, "...", totalPages - 2, totalPages - 1, totalPages);
    } else {
      pages.push(
        1,
        "...",
        currentPageNum - 1,
        currentPageNum,
        currentPageNum + 1,
        "...",
        totalPages
      );
    }
  }

  // Add page number buttons
  pages.forEach((page) => {
    if (page === "...") {
      const ellipsis = createButton("...", true);
      paginationContainer.appendChild(ellipsis);
    } else {
      const pageButton = createButton(
        page,
        page === currentPageNum, // Disable if it's the current page
        () => updateUrlAndFetch(page)
      );
      if (page === currentPageNum) pageButton.classList.add("active"); // Highlight current page
      paginationContainer.appendChild(pageButton);
    }
  });

  // Next button
  const nextPageButton = createButton("→", currentPageNum === totalPages, () =>
    updateUrlAndFetch(currentPageNum + 1)
  );
  paginationContainer.appendChild(nextPageButton);
}

// Function to fetch businesses and update the URL
function updateUrlAndFetch(page) {
  getAllBusinesses(page);
  // Scroll to the top of the page (optional)
  window.scrollTo({ top: 200, behavior: "smooth" });
}

// Function to fetch businesses data
function getAllBusinesses(page, selectedCategories = [], searchStr = "") {
  document.querySelector(".business-list").innerHTML = `
    <div class="mb-3">
                                                <div colspan="5">
                                                    <div
                                                        class="card border-0"
                                                        aria-hidden="true">
                                                        <div class="row g-0">
                                                            <div class="col-4">
                                                                <div
                                                                    class="bg-secondary-subtle border rounded-1"
                                                                    style="width: 100%; height: 100%;">

                                                                </div>
                                                            </div>
                                                            <div class="col-8">
                                                                <div
                                                                    class="card-body py-2 ms-3">
                                                                    <h5
                                                                        class="card-title ">
                                                                        <span
                                                                            class="placeholder col-11 "
                                                                            style="background-color: #D4D4D4;"></span>
                                                                    </h5>
                                                                    <p
                                                                        class="card-text ">
                                                                        <span
                                                                            class="placeholder col-10"
                                                                            style="background-color: #D4D4D4;"></span>
                                                                        <span
                                                                            class="placeholder col-12"
                                                                            style="background-color: #D4D4D4;"></span>
                                                                    </p>
                                                                    <p
                                                                        class="card-text ">
                                                                        <span
                                                                            class="placeholder col-10"
                                                                            style="background-color: #D4D4D4;"></span>
                                                                        
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                            <div class="mb-3">
                                                <td colspan="5">
                                                    <div
                                                        class="card border-0"
                                                        aria-hidden="true">
                                                        <div class="row g-0">
                                                            <div class="col-4">
                                                                <div
                                                                    class="bg-secondary-subtle border rounded-1"
                                                                    style="width: 100%; height: 100%;">

                                                                </div>
                                                            </div>
                                                            <div class="col-8">
                                                                <div
                                                                    class="card-body py-2 ms-3">
                                                                    <h5
                                                                        class="card-title ">
                                                                        <span
                                                                            class="placeholder col-11 "
                                                                            style="background-color: #D4D4D4;"></span>
                                                                    </h5>
                                                                    <p
                                                                        class="card-text ">
                                                                        <span
                                                                            class="placeholder col-10"
                                                                            style="background-color: #D4D4D4;"></span>
                                                                        <span
                                                                            class="placeholder col-12"
                                                                            style="background-color: #D4D4D4;"></span>
                                                                    </p>
                                                                    <p
                                                                        class="card-text ">
                                                                        <span
                                                                            class="placeholder col-10"
                                                                            style="background-color: #D4D4D4;"></span>
                                                                        
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </td>
                                            </div>
                                            <div class="mb-3">
                                                <td colspan="5">
                                                    <div
                                                        class="card border-0"
                                                        aria-hidden="true">
                                                        <div class="row g-0">
                                                            <div class="col-4">
                                                                <div
                                                                    class="bg-secondary-subtle border rounded-1"
                                                                    style="width: 100%; height: 100%;">

                                                                </div>
                                                            </div>
                                                            <div class="col-8">
                                                                <div
                                                                    class="card-body py-2 ms-3">
                                                                    <h5
                                                                        class="card-title ">
                                                                        <span
                                                                            class="placeholder col-11 "
                                                                            style="background-color: #D4D4D4;"></span>
                                                                    </h5>
                                                                    <p
                                                                        class="card-text ">
                                                                        <span
                                                                            class="placeholder col-10"
                                                                            style="background-color: #D4D4D4;"></span>
                                                                        <span
                                                                            class="placeholder col-12"
                                                                            style="background-color: #D4D4D4;"></span>
                                                                    </p>
                                                                    <p
                                                                        class="card-text ">
                                                                        <span
                                                                            class="placeholder col-10"
                                                                            style="background-color: #D4D4D4;"></span>
                                                                        
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </td>
                                            </div>
                                            <div class="mb-3">
                                                <td colspan="5">
                                                    <div
                                                        class="card border-0"
                                                        aria-hidden="true">
                                                        <div class="row g-0">
                                                            <div class="col-4">
                                                                <div
                                                                    class="bg-secondary-subtle border rounded-1"
                                                                    style="width: 100%; height: 100%;">

                                                                </div>
                                                            </div>
                                                            <div class="col-8">
                                                                <div
                                                                    class="card-body py-2 ms-3">
                                                                    <h5
                                                                        class="card-title ">
                                                                        <span
                                                                            class="placeholder col-11 "
                                                                            style="background-color: #D4D4D4;"></span>
                                                                    </h5>
                                                                    <p
                                                                        class="card-text ">
                                                                        <span
                                                                            class="placeholder col-10"
                                                                            style="background-color: #D4D4D4;"></span>
                                                                        <span
                                                                            class="placeholder col-12"
                                                                            style="background-color: #D4D4D4;"></span>
                                                                    </p>
                                                                    <p
                                                                        class="card-text ">
                                                                        <span
                                                                            class="placeholder col-10"
                                                                            style="background-color: #D4D4D4;"></span>
                                                                        
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </td>
                                            </div>`;
  // Format the category query to be in the form &category=1&category=2 when multiple categories are selected
  const categoryQuery = selectedCategories.length
    ? selectedCategories.map((category) => `&category=${category}`).join("")
    : "";

  fetch(
    `${API_URL}/api/businesses?page=${page}&per_page=10&search=${searchStr}${categoryQuery}`
  )
    .then((response) => response.json())
    .then((data) => {
      document.getElementById(
        "vendor-result"
      ).innerText = `${data.data.length}`;
      renderBusinesses(data.data); // Function to render businesses
      setupPagination(data.paginate); // Pass pagination object
    })
    .catch((error) => console.error("Error fetching businesses:", error));
}

// Function to render businesses
function renderBusinesses(businesses) {
  const businessList = document.querySelector(".business-list");
  businessList.innerHTML = ""; // Clear previous businesses

  if (businesses.length == 0) {
    return (businessList.innerHTML = `<div class="text-center w-100 my-4">
              <img src="../../assets/img/noFound.png" alt="..." height="220px;">
              <h4 class="text-center text-brand mt-2">No Business to Display...</h4>
            </div>`);
  }

  businesses.forEach((business) => {
    // Create a new card for each business
    let thumbnail =
    business.thumbnail && !business.thumbnail.includes("no_photo")
      ? business.thumbnail
      : "../../assets/img/party/party1.png";
    const newCard = document.createElement("div");
    newCard.className = "col-12 ";
    newCard.innerHTML = `
    <div class="card d-flex  w-100 recruitmentCard" onclick="viewBusinessDetail(${business.id})">
          <div class="card-body w-100 d-flex">
            <div class="col-4  thumbnail">
              <img src="${thumbnail}" class="object-fit-cover"  alt="Thumbnail">
            </div>
            <div class="col-8 detail">
              <h4 class="card-title fw-bold text-brand mb-0 fs-3">${business.name}</h4>
              <div class=" card-desc1 my-3">${business.description}</div>
              <p class="location"><i class="fa-solid fa-location-dot fs-5 me-1 text-brand"></i> ${
                business.location || "Unknown location"
              }</p>
              
              <div class="contact">
                <span class="text-secondary"><i class="fa-solid fa-phone me-1 text-brand"></i> ${
                  business.phone || "N/A"
                }</span><br>
                <span class="text-secondary"><i class="fa-solid fa-envelope me-1 text-brand"></i> ${
                  business.email || "N/A"
                }</span>
              </div>
              <div class="profile d-flex align-items-center mt-3 justify-content-between w-100">
                              <div class="d-flex align-items-center" >
                                  <div class="pf-img me-2">
                                      <img src="${business.creator?.avatar || "../../assets/img/default-avatar.png"}" alt="Creator Avatar">
                                  </div>
                                  <p>${business.creator?.full_name || "Unknown creator"}</p>
                              </div>
                              <div class="d-flex vendor-pill-wrapper"></div>
                            </div>
            </div>
          </div>
            </div>

      `;

    // Add the new card to the list
    businessList.appendChild(newCard);

    // Add category pills
    const pillWrapper = newCard.querySelector(".vendor-pill-wrapper");
    if (business.categories) {
      business.categories.slice(0, 3).forEach((category, index) => {
        const pill = document.createElement("span");
        pill.className = `pill${index + 1} me-1`; // Cycle pill colors
        pill.innerText = category.name;
        pillWrapper.appendChild(pill);
      });
    }
  });
}

// Fetch and populate the category filters
function fetchCategories() {
  fetch(
    `${API_URL}/api/business-categories?page=1&per_page=50&search&sort_col=name&sort_dir=asc`
  )
    .then((response) => response.json())
    .then((data) => {
      const categoryContainer = document.querySelector("#categories-container");
      data.data.forEach((category) => {
        const checkbox = document.createElement("div");
        checkbox.classList.add("form-check");
        checkbox.innerHTML = `
          <input class="form-check-input" type="checkbox" value="${category.id}" id="category-${category.id}">
          <label class="form-check-label" for="category-${category.id}">${category.name}</label>
        `;
        categoryContainer.appendChild(checkbox);

        // Add change event listener to update selectedCategories
        checkbox.querySelector("input").addEventListener("change", (e) => {
          const categoryId = e.target.value;
          if (e.target.checked) {
            // Add to selected categories
            selectedCategories.push(categoryId);
          } else {
            // Remove from selected categories
            selectedCategories = selectedCategories.filter(
              (id) => id !== categoryId
            );
          }
        });
      });
    })
    .catch((error) => console.error("Error fetching categories:", error));
}
// Handle search with selected categories
function handleSearch() {
  document
    .querySelectorAll(".filter .form-check-input:checked")
    .forEach((checkbox) => {
      selectedCategories.push(checkbox.value);
    });

  // Now fetch businesses based on selected categories
  getAllBusinesses(1, selectedCategories);
}

function viewBusinessDetail(id) {
  sessionStorage.setItem("businessDetailId", id);
  location.href = "../../pages/browse/business-detail.html";
}

// Add event listener to search button
document
  .querySelector(".filter .btn-brand")
  .addEventListener("click", handleSearch);

// Clear selected filters
document
  .querySelector(".filter .btn-outline-secondary")
  .addEventListener("click", () => {
    // Uncheck all checkboxes
    document
      .querySelectorAll(".filter .form-check-input")
      .forEach((checkbox) => {
        checkbox.checked = false;
      });

    // Fetch all businesses again with no categories selected
    getAllBusinesses(1, []);
  });

document.getElementById("search-input").addEventListener("keypress", (e) => {
  if (e.code == "Enter") {
    getAllBusinesses(1, selectedCategories, e.target.value);
  }
});

// Call to fetch categories on page load
fetchCategories();

getAllBusinesses(1);
