// const apiUrl = "https://mps2.chandalen.dev";
let currentPage = 1; // Start on the first page
const itemsPerPage = 10; // Number of events per page
let selectedCategories = []; // Store selected category IDs
let selectedComingFilter = null;

function getAllEvent(page = 1, categories = [], searchStr = "") {
  let url = `${apiUrl}/api/events?page=${page}&per_page=${itemsPerPage}&search=${searchStr}`;

  document.getElementById("list-card").innerHTML = `
  <div class="mb-3">
                                              <div colspan="5">
                                                  <div
                                                      class="card border-0 h-100"
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
                                                                  class="card-body py-2">
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
                                                      class="card border-0 h-100"
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
                                                                  class="card-body py-2">
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
                                                      class="card border-0 h-100"
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
                                                                  class="card-body py-2">
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

                                              </td>`;

  if (categories.length) {
    categories.forEach((category) => {
      url += `&category=${category}`; // Add selected categories to the URL
    });
  }

  if (selectedComingFilter) {
    url += `&coming=${selectedComingFilter}`; // Add the coming filter to the URL
  }

  fetch(url)
    .then((res) => res.json())
    .then((json) => {
      
      displayEvents(json.data);
      setupPagination(json.paginate);
      let resultNum = json.paginate.total;
      document.getElementById("result-num").innerHTML = resultNum;
    });
}
window.onload = () => {
  getAllEvent(currentPage);
  loadCategories();
};
function loadCategories() {
  fetch(
    `${apiUrl}/api/event-categories?page=1&per_page=100&sort_col=name&sort_dir=asc`
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

        document
          .querySelectorAll("#categories-container .form-check-input")
          .forEach((checkbox) => {
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

        document
          .querySelectorAll(".form-check-input[name='comingFilter']")
          .forEach((checkbox) => {
            checkbox.addEventListener("change", () => {
              const value = checkbox.value;
              if (checkbox.checked) {
                selectedComingFilter = value; // Add category
              }
            });
          });
      }
    })
    .catch((error) => console.error("Error loading categories:", error));
}
function displayEvents(events) {
  if(events.length == 0){

    return document.getElementById("list-card").innerHTML = `<div class="text-center w-100 my-4">
              <img src="../../assets/img/noFound.png" alt="..." height="220px;">
              <h4 class="text-center text-brand mt-2">No Event to Display...</h4>
            </div>`
  }
  events.forEach((element) => {
    element.status = checkDateTimeRange(element.start_date, element.end_date);
  });
  // Sort events based on status
  events.sort((a, b) => {
    const statusOrder = { Showing: 0, Upcoming: 1, Past: 2 };
    return statusOrder[a.status] - statusOrder[b.status];
  });
  let listE = "";
  events.forEach((element) => {
    let price = element.ticket_price == 0 ? "Free" : `$${element.ticket_price.toFixed(2)}`;
    let catas = "";
    let thumbnail =
      element.thumbnail && !element.thumbnail.includes("no_photo")
        ? element.thumbnail
        : "/assets/img/party/party1.png";

    element.event_categories.forEach((cata) => {
      let pill = ((cata.id - 1) % 5) + 1;
      catas += `<div class="pill pill${pill} me-1">${cata.name}</div>`;
    });
    listE += `<div class="card mb-4 cursor-pointer" onclick="getEDetail(this)" data-id="${element.id}">
                            <div class="row g-0">
                                <div class="col-3 position-relative">
                                    <img src="${thumbnail}"
                                        class="img-fluid rounded-start " alt="...">
                                    <div class="i-wish add-wish position-absolute top-0 end-0" data-id="${element.id}">
                                        <i class="fa-regular fa-heart"></i>
                                    </div>
                                </div>
                                <div class="col-6 ">
                                    <div class="card-body ps-4 pe-0 py-4">
                                        <h3 class="card-title">
                                            <a onclick="getEDetail(this)" data-id="${element.id}">${element.name}</a>
                                        </h3>
                                        <div class="d-flex mb-2">
                                            
                                            <div class="d-flex event-pill-wrapper">${catas}</div>
                                            <div class=" ms-5 border-start border-danger ps-5 m-0 fs-18 text-brand fw-medium">
                                                <i class="fa-solid fa-tag me-2 fs-18"></i><span
                                                    class="">${price}</span>
                                            </div>
                                        </div>
                                        <div class="mb-2 d-flex align-items-center fs-18">
                                            <i class="fa-regular fa-calendar text-brand me-2 "></i><small
                                                class="text-body-secondary m-0">${moment(element.start_date).format('ddd, MMM D • h:mm A')}</small>
                                        </div>
                                        <div class="d-flex align-items-center">
                                            <i class="fa-solid fa-location-dot me-2 text-brand"></i> <small
                                                class="text-body-secondary">${element.location}</small>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-3 py-4">
                                    <p class="status">${element.status}</p>
                                </div>
                            </div>
                        </div>`;
    checkEventInWishlist(element.id);
  });

  document.getElementById("list-card").innerHTML = listE;

  setUpWishBtn();
}
function setupPagination(pagination) {
  const paginationContainer = document.getElementById("pagination");
  paginationContainer.innerHTML = ""; // Clear previous pagination
  // Previous button
  const prevPageButton = document.createElement("button");
  prevPageButton.innerHTML = '<i class="fa-solid fa-arrow-left"></i>';
  prevPageButton.disabled = pagination.current_page === 1; // Disable if on the first page
  prevPageButton.onclick = () => {
    if (pagination.current_page > 1) {
      currentPage--;
      updateUrlAndFetch(currentPage);
    }
  };
  paginationContainer.appendChild(prevPageButton);
  // Page number buttons
  const totalPages = pagination.last_page;
  const currentPageNum = pagination.current_page;
  const maxButtonsToShow = 5; // Total buttons including ellipsis

  // Calculate the range of page numbers to display
  let pages = [];
  if (totalPages <= maxButtonsToShow) {
    // If total pages are less than or equal to maxButtonsToShow, show all
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
  } else {
    // Determine the start and end page numbers
    if (currentPageNum <= 3) {
      pages = [1, 2, 3, 4, "...", totalPages];
    } else if (currentPageNum >= totalPages - 3) {
      pages = [
        1,
        "...",
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];
    } else {
      pages = ["...", currentPageNum - 1, currentPageNum];
      pages.unshift(1); // Always show the first page
      pages.push("..."); // Add ellipsis
      pages.push(totalPages); // Always show the last page
    }
  }

  // Add page number buttons
  pages.forEach((page) => {
    const pageButton = document.createElement("button");
    if (page === "...") {
      pageButton.innerText = "...";
      pageButton.disabled = true; // Disable ellipsis button
    } else {
      pageButton.innerText = page;
      pageButton.onclick = () => {
        currentPage = page;
        // getAllEvent(currentPage);
        updateUrlAndFetch(currentPage);
      };
      if (page === currentPageNum) {
        pageButton.classList.add("active"); // Highlight the current page
      }
    }
    paginationContainer.appendChild(pageButton);
  });

  // Next button
  const nextPageButton = document.createElement("button");
  nextPageButton.innerHTML = '<i class="fa-solid fa-arrow-right"></i>';
  nextPageButton.disabled = pagination.current_page === pagination.last_page; // Disable if on the last page
  nextPageButton.onclick = () => {
    if (pagination.current_page < pagination.last_page) {
      currentPage++;
      // getAllEvent(currentPage);
      updateUrlAndFetch(currentPage);
    }
  };
  paginationContainer.appendChild(nextPageButton);
}
function updateUrlAndFetch(page) {
  getAllEvent(page);
  window.location.href = `javascript: void(0)`;
  window.scrollTo({ top: 220, behavior: "instant" });
}
function filterEventsByCategories() {
  currentPage = 1; // Reset to first page
  getAllEvent(currentPage, selectedCategories, ""); // Fetch events based on selected categories
}
function getEDetail(card) {
  id = card.dataset.id;
  sessionStorage.setItem("itemID", id);
  location.href = "/pages/browse/event-detail.html";
}

document.getElementById("search-input").addEventListener("keypress", (e) => {
  if (e.code == "Enter") {
    getAllEvent(currentPage, selectedCategories, e.target.value);
  }
});

document.getElementById("search-events").addEventListener("click", () => {
  filterEventsByCategories(); // Trigger the search when the button is clicked
  window.scrollTo({ top: 0, behavior: "instant" });
});

document.getElementById("clear-filters").addEventListener("click", () => {
  selectedCategories = []; // Clear selected categories
  selectedComingFilter = null;
  selectedPricing = "";
  document.querySelectorAll(".form-check-input").forEach((checkbox) => {
    checkbox.checked = false; // Uncheck all checkboxes
  });
  filterEventsByCategories(); // Trigger the search after clearing
  window.scrollTo({ top: 0, behavior: "instant" });
});
