const itemsPerPage = 10; // Results per page
let selectedCategories = [];
let currentPage = 1;

function loadCategories() {
  fetch(
    `${API_URL}/api/vendor-categories?page=1&per_page=50&search&sort_col=name&sort_dir=asc`
  )
    .then((res) => res.json())
    .then((json) => {
      if (json.result) {
        const categoriesContainer = document.getElementById(
          "categories-container"
        );
        categoriesContainer.innerHTML = ""; // Clear existing categories

        json.data.forEach((category) => {
          // Create a checkbox for each category
          const checkboxWrapper = document.createElement("div");
          checkboxWrapper.classList.add("form-check");

          checkboxWrapper.innerHTML = `
            <input class="form-check-input" type="checkbox" data-value="${category.id}" id="category-${category.id}">
            <label class="form-check-label" for="category-${category.id}">
              ${category.name}
            </label>
          `;

          categoriesContainer.appendChild(checkboxWrapper);
        });

        // Add event listeners to the newly created checkboxes
        document.querySelectorAll(".form-check-input").forEach((checkbox) => {
          checkbox.addEventListener("change", () => {
            const value = checkbox.getAttribute("data-value");
            if (checkbox.checked) {
              selectedCategories.push(value); // Add category
            } else {
              selectedCategories = selectedCategories.filter(
                (id) => id !== value
              ); // Remove category
            }
          });
        });
      }
    })
    .catch((error) => console.error("Error loading categories:", error));
}

// Event listener for category checkboxes
document.querySelectorAll(".form-check-input").forEach((checkbox) => {
  checkbox.addEventListener("change", () => {
    const value = checkbox.getAttribute("data-value");
    if (checkbox.checked) {
      selectedCategories.push(value); // Add selected category
    } else {
      selectedCategories = selectedCategories.filter((id) => id !== value); // Remove unselected category
    }
  });
});

function getAllRecruitments(page, searchStr='') {
  const recruitList = document.querySelector(".card-recruit-list");
  recruitList.innerHTML = `
  <div class="mb-3">
    <td colspan="5">
      <div class="card border-0" aria-hidden="true">
        <div class="row g-0">
          <div class="col-4">
            <div class="bg-secondary-subtle border rounded-1" style="width: 100%; height: 100%;"></div>
          </div>
          <div class="col-8">
            <div class="card-body py-2">
              <h5 class="card-title">
                <span class="placeholder col-11" style="background-color: #D4D4D4;"></span>
              </h5>
              <p class="card-text">
                <span class="placeholder col-10" style="background-color: #D4D4D4;"></span>
                <span class="placeholder col-12" style="background-color: #D4D4D4;"></span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </td>
  </div>
  <div class="mb-3">
    <td colspan="5">
      <div class="card border-0" aria-hidden="true">
        <div class="row g-0">
          <div class="col-4">
            <div class="bg-secondary-subtle border rounded-1" style="width: 100%; height: 100%;"></div>
          </div>
          <div class="col-8">
            <div class="card-body py-2">
              <h5 class="card-title">
                <span class="placeholder col-11" style="background-color: #D4D4D4;"></span>
              </h5>
              <p class="card-text">
                <span class="placeholder col-10" style="background-color: #D4D4D4;"></span>
                <span class="placeholder col-12" style="background-color: #D4D4D4;"></span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </td>
  </div>
  <tr>
    <td colspan="5">
      <div class="card border-0" aria-hidden="true">
        <div class="row g-0">
          <div class="col-4">
            <div class="bg-secondary-subtle border rounded-1" style="width: 100%; height: 100%;"></div>
          </div>
          <div class="col-8">
            <div class="card-body py-2">
              <h5 class="card-title">
                <span class="placeholder col-11" style="background-color: #D4D4D4;"></span>
              </h5>
              <p class="card-text">
                <span class="placeholder col-10" style="background-color: #D4D4D4;"></span>
                <span class="placeholder col-12" style="background-color: #D4D4D4;"></span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </td>
  </tr>
  `; 

  const categoryFilter = selectedCategories.length
    ? selectedCategories.map((id) => `&category=${id}`).join("") // Include selected categories
    : "";

  fetch(
    `${API_URL}/api/vendors/?page=${page}&per_page=${itemsPerPage}${categoryFilter}&search=${searchStr}`
  )
    .then((res) => res.json())
    .then((json) => {
      document.getElementById("result-card").innerHTML = json.paginate.total;
      if (json.data.length === 0) {
        recruitList.innerHTML = `
          <div><div colspan=5><div class="text-center">
            <img src="../../assets/img/noFound.png" alt="" height="220px;">
            <h4 class="text-center text-brand mt-2">No Vendor Recruitment to Display...</h4>
          </div></div></div>`;
        return;
      }

      recruitList.innerHTML = '';
      json.data.forEach((element, index) => {
        // Create card container
        let cardHTML = document.createElement("div");
        cardHTML.className = "card mb-4 recruitmentCard";

        cardHTML.innerHTML = `
          <div class="card-content px-3" onclick="viewRecruitDetail(${element.id})">
            <div class="card-body">
              <div class="profile d-flex align-items-center justify-content-between mb-3">
                <div class="d-flex align-items-center">
                  <div class="pf-img me-2">
                    <img src="${
                      element.creator.avatar
                    }" alt="avatar" width="30px" height="30px">
                  </div>
                  <p class="mb-0 pb-0">${element.creator.full_name}</p>
                </div>
                <div class="d-flex recruit-pill-wrapper"></div>
              </div>
              <h5 class="card-title mt-2 mb-0 fw-bold">${element.name}</h5>
              <div class="card-text py-3 card-description">${element.description}</div>
              <div class="duration">
                <span class="text-secondary">
                  <i class="bi bi-calendar fs-6 text-brand"></i> ${moment(element.start_date).format('ddd, D MMMM, YYYY')}
                </span><br>
                <span class="location">
                  <i class="bi bi-geo-alt fs-6 text-brand"></i> ${
                    element.location
                  }
                </span>
              </div>
            </div>
          </div>`;

        recruitList.appendChild(cardHTML);

        // Add category pills
        let recruitPillWrapper = cardHTML.querySelector(
          ".recruit-pill-wrapper"
        );
        let colorId = 1;

        element.categories.slice(0, 3).forEach((categoryElement) => {
          let spanTag = document.createElement("span");
          spanTag.className = `pill${colorId} me-1`;
          spanTag.innerHTML = categoryElement.name;
          recruitPillWrapper.appendChild(spanTag);
          colorId++;
        });
      });

      // Update pagination
      setupPagination(json.paginate);
    });
}

function setupPagination(pagination) {
  const paginationContainer = document.getElementById("pagination");
  paginationContainer.innerHTML = ""; // Clear previous pagination

  const currentPageNum = pagination.current_page;
  const totalPages = pagination.last_page;
  const maxButtonsToShow = 5;

  // Previous button
  const prevPageButton = document.createElement("button");
  prevPageButton.innerHTML = '<i class="fa-solid fa-arrow-left"></i>';
  prevPageButton.disabled = currentPageNum === 1;
  prevPageButton.onclick = () => {
    if (currentPageNum > 1) {
      updateUrlAndFetch(currentPageNum - 1);
    }
  };
  paginationContainer.appendChild(prevPageButton);

  // Page numbers
  const pages = [];
  if (totalPages <= maxButtonsToShow) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
  } else {
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

  pages.forEach((page) => {
    const pageButton = document.createElement("button");
    pageButton.innerText = page;
    pageButton.disabled = page === "...";
    if (page === currentPageNum) pageButton.classList.add("active");

    pageButton.onclick = () => {
      if (page !== "...") updateUrlAndFetch(page);
    };

    paginationContainer.appendChild(pageButton);
  });

  // Next button
  const nextPageButton = document.createElement("button");
  nextPageButton.innerHTML = '<i class="fa-solid fa-arrow-right"></i>';
  nextPageButton.disabled = currentPageNum === totalPages;
  nextPageButton.onclick = () => {
    if (currentPageNum < totalPages) {
      updateUrlAndFetch(currentPageNum + 1);
    }
  };
  paginationContainer.appendChild(nextPageButton);
}

function updateUrlAndFetch(page) {
  currentPage = page;
  getAllRecruitments(page);

  // Scroll to the top for better UX
  window.scrollTo({ top: 200, behavior: "smooth" });
}

function viewRecruitDetail(id){
  sessionStorage.setItem("recruitDetailId", id)
  location.href = '../../pages/browse/recruitment-detail.html'
}

// Clear All functionality
document.querySelector(".btn-clear-all").addEventListener("click", () => {
  // Uncheck all checkboxes
  document.querySelectorAll(".form-check-input").forEach((checkbox) => {
    checkbox.checked = false;
  });

  // Reset selected categories
  selectedCategories = [];

  // Optionally, fetch and display results without any filter
  currentPage = 1; // Reset to the first page
  getAllRecruitments(currentPage);
});

document.getElementById('search-input').addEventListener('keypress', (e)=>{
  if (e.key === 'Enter') {
    currentPage = 1; // Reset to the first page
    getAllRecruitments(currentPage, e.target.value); // Fetch results with search query
  }
})

// Event listener for the "Search" button
document.querySelector("#btn-search-filter").addEventListener("click", () => {
  currentPage = 1; // Reset to the first page
  getAllRecruitments(currentPage); // Fetch results with filters
});

// Initial calls
loadCategories(); // Load categories on page load
getAllRecruitments(currentPage); // Fetch recruitments on page load
