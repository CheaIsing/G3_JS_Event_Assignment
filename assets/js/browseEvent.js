const apiUrl = "https://mps2.chandalen.dev";
// const token = localStorage.getItem("authToken");
let currentPage = 1; // Start on the first page
const itemsPerPage = 10; // Number of events per page
getAllCatagory("/api/event-categories?page=1&per_page=50&sort_col=name&sort_dir=asc&search");
function getAllEvent(page = 1) {
    let url = `${apiUrl}/api/events?page=${page}&per_page=${itemsPerPage}`;
    fetch(url)
        .then(res => res.json())
        .then(json => {
            displayEvents(json.data);
            setupPagination(json.paginate);
            let resultNum=json.paginate.total;
            document.getElementById('result-num').innerHTML = resultNum;
        });
}
function displayEvents(events) {
    events.forEach(element => {
        element.status = checkDateTimeRange(element.start_date, element.end_date);
    });
    // Sort events based on status
    events.sort((a, b) => {
        const statusOrder = { "Showing": 0, "Upcoming": 1, "Past": 2 };
        return statusOrder[a.status] - statusOrder[b.status];
    });
    let listE = '';
    events.forEach(element => {
        let price = element.ticket_price == 0 ? 'Free' : `$${element.ticket_price}`;
        let catas = "";
        element.event_categories.forEach((cata) => {
            let pill=((cata.id - 1) % 5 + 1);
            console.log(pill);
            catas += `<div class="pill pill${pill} me-1">${cata.name}</div>`;
        });
        listE += `<div class="card mb-4">
                            <div class="row g-0">
                                <div class="col-3 position-relative">
                                    <img src="../../assets/img/test-img/cta-event-search-banner.avif"
                                        class="img-fluid rounded-start " alt="...">
                                    <div class="i-wish add-wish position-absolute top-0 end-0" data-id="${element.id}">
                                        <i class="fa-regular fa-heart"></i>
                                    </div>
                                </div>
                                <div class="col-6 ">
                                    <div class="card-body ps-4 pe-0 py-4">
                                        <h3 class="card-title">
                                            <a href="javascript: void(0)" onclick="getEDetail(this)" data-id="${element.id}">${element.name}</a>
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
                                                class="text-body-secondary m-0">${element.start_date}</small>
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
    });
    document.getElementById('list-card').innerHTML = listE;
    // wish();
}
function setupPagination(pagination) {
    const paginationContainer = document.getElementById('pagination');
    paginationContainer.innerHTML = ''; // Clear previous pagination
    // Previous button
    const prevPageButton = document.createElement('button');
    prevPageButton.innerHTML = '<i class="fa-solid fa-arrow-left"></i>';
    prevPageButton.disabled = pagination.current_page === 1; // Disable if on the first page
    prevPageButton.onclick = () => {
        if (pagination.current_page > 1) {
            currentPage--;
            updateUrlAndFetch(currentPage);

        }
    };
    paginationContainer.appendChild(prevPageButton);
    console.log(prevPageButton);
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
            pages = [1, 2, 3, 4, '...', totalPages];
        } else if (currentPageNum >= totalPages - 3) {
            pages = [1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
        } else {
            pages = ['...', currentPageNum - 1, currentPageNum];
            pages.unshift(1); // Always show the first page
            pages.push('...'); // Add ellipsis
            pages.push(totalPages); // Always show the last page
        }
    }

    // Add page number buttons
    pages.forEach(page => {
        const pageButton = document.createElement('button');
        if (page === '...') {
            pageButton.innerText = '...';
            pageButton.disabled = true; // Disable ellipsis button
        } else {
            pageButton.innerText = page;
            pageButton.onclick = () => {
                currentPage = page;
                // getAllEvent(currentPage);
                updateUrlAndFetch(currentPage);

            };
            if (page === currentPageNum) {
                pageButton.classList.add('active'); // Highlight the current page
            }
        }
        paginationContainer.appendChild(pageButton);
    });

    // Next button
    const nextPageButton = document.createElement('button');
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
    window.location.href = `javascript: void(0)`
    window.scrollTo({ top: 200, behavior: 'instant' });
}
// function getAllEvent() {
//     let url = apiUrl + `/api/events?page=1&per_page=50&search`;
//     fetch(url)
//         .then(res => res.json())
//         .then(json => {
//             let data = json.data;
//             // get status
//             data.forEach(element => {
//                 element.status = checkDateTimeRange(element.start_date, element.end_date);
//             });
//             // Sort events based on status
//             data.sort((a, b) => {
//                 const statusOrder = { "Showing": 0, "Upcoming": 1, "Past": 2 };
//                 return statusOrder[a.status] - statusOrder[b.status];
//             });
//             let listE = '';
//             let numResult = 0
//             data.forEach(element => {
//                 let price = element.ticket_price == 0 ? 'Free' : `$${element.ticket_price}`;
//                 let catagory = element.event_categories.map(cata => cata.name).join(',&nbsp;');
//                 let catas = "";
//                 element.event_categories.forEach((cata) => {
//                     catas += `<div class="pill${cata.id} me-1">${cata.name}</div>`;
//                 });
//                 listE += `<div class="card mb-4">
//                                     <div class="row g-0">
//                                         <div class="col-3 position-relative">
//                                             <img src="../../assets/img/test-img/cta-event-search-banner.avif"
//                                                 class="img-fluid rounded-start " alt="...">
//                                             <div class="i-wish add-wish position-absolute top-0 end-0" data-id="${element.id}">
//                                                 <i class="fa-regular fa-heart"></i>
//                                             </div>
//                                         </div>
//                                         <div class="col-6 ">
//                                             <div class="card-body ps-4 pe-0 py-4">
//                                                 <h3 class="card-title">
//                                                     <a href="javascript: void(0)" onclick="getEDetail(this)" data-id="${element.id}">${element.name}</a>
//                                                 </h3>
//                                                 <div class="d-flex mb-2">

//                                                     <div class="d-flex event-pill-wrapper">${catas}</div>
//                                                     <div class=" ms-5 border-start border-danger ps-5 m-0 fs-18 text-brand fw-medium">
//                                                         <i class="fa-solid fa-tag me-2 fs-18"></i><span
//                                                             class="">${price}</span>
//                                                     </div>
//                                                 </div>
//                                                 <div class="mb-2 d-flex align-items-center fs-18">
//                                                     <i class="fa-regular fa-calendar text-brand me-2 "></i><small
//                                                         class="text-body-secondary m-0">${element.start_date}</small>
//                                                 </div>
//                                                 <div class="d-flex align-items-center">
//                                                     <i class="fa-solid fa-location-dot me-2 text-brand"></i> <small
//                                                         class="text-body-secondary">${element.location}</small>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                         <div class="col-3 py-4">
//                                             <p class="status">${element.status}</p>
//                                         </div>
//                                     </div>
//                                 </div>`;
//                 numResult++;
//             });
//             document.getElementById('list-card').innerHTML = listE;
//             document.getElementById('result-num').innerHTML = numResult;
//             const wishButtons = document.querySelectorAll('.add-wish');
// wishButtons.forEach(button => {
//     button.addEventListener('click', () => {
//         const eventId = button.dataset.id; 
//         // console.log(eventId);
//         addWishlist(eventId);
//         button.classList.toggle('clicked');
//     });
// });
//         })
// }
function getEDetail(card) {
    id = card.dataset.id;
    sessionStorage.setItem('itemID', id);
    location.href = '/pages/browse/event-detail.html';
}

window.onload = () => {
    getAllEvent(currentPage);
};

