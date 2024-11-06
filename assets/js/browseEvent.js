const apiUrl = "https://mps2.chandalen.dev";
// const token = localStorage.getItem("authToken");
getAllEvent();
getAllCatagory();
function checkDateTimeRange(startDateTimeStr, endDateTimeStr) {
    // Create Date objects from the input strings  
    const startDateTime = new Date(startDateTimeStr);
    const endDateTime = new Date(endDateTimeStr);
    const now = new Date(); // Current date and time  

    if (now >= startDateTime && now <= endDateTime) {
        return "Showing";
    } else if (now < startDateTime) {
        return "Upcoming";
    } else {
        return "Past";
    }
}
function getAllCatagory(){
    fetch(apiUrl+'/api/event-categories?page=1&per_page=50&sort_col=name&sort_dir=asc&search')
            .then(res=>res.json())
            .then(json=>{
                let data=json.data;
                let listCata='';
                data.forEach(element => {
                    listCata+=`<div class="form-check">
                                    <input class="form-check-input" type="checkbox" value="" id="cata${element.id}">
                                    <label class="form-check-label" for="">
                                    ${element.name}
                                    </label>
                                </div>`;
                });
                document.getElementById('catagory').innerHTML+=listCata;
            }
            )
}
function getAllEvent() {
    let url = apiUrl+`/api/events?page=1&per_page=50&search`;
    fetch(url)
        .then(res => res.json())
        .then(json => {
            let data = json.data;
            // get status
            data.forEach(element => {
                element.status = checkDateTimeRange(element.start_date, element.end_date);
            });
            // Sort events based on status
            data.sort((a, b) => {
                const statusOrder = { "Showing": 0, "Upcoming": 1, "Past": 2 };
                return statusOrder[a.status] - statusOrder[b.status];
            });
            let listE = '';
            data.forEach(element => {
                let price = element.ticket_price == 0 ? 'Free' : `$${element.ticket_price}`;
                let catagory = element.event_categories.map(cata => cata.name).join(',&nbsp;');
                listE += `<div class="card mb-4">
                                    <div class="row g-0">
                                        <div class="col-3 position-relative">
                                            <img src="../../assets/img/test-img/cta-event-search-banner.avif"
                                                class="img-fluid rounded-start " alt="...">
                                            <div class="i-wish add-wish position-absolute top-0 end-0" >
                                                <i class="fa-regular fa-heart"></i>
                                            </div>
                                        </div>
                                        <div class="col-6 ">
                                            <div class="card-body ps-4 pe-0 py-4">
                                                <h3 class="card-title">
                                                    <a href="javascript: void(0)" onclick="getEDetail(this)" data-id="${element.id}">${element.name}</a>
                                                </h3>
                                                <div class="d-flex mb-2">
                                                    <div class="m-0 fs-18 text-brand fw-medium">
                                                            <i class="fa-regular fa-folder-open me-2 fs-18"></i><span
                                                            class="">${catagory}</span>
                                                    </div>
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
            const wishButtons = document.querySelectorAll('.add-wish'); // Select all buttons with the class i-wish
            console.log(wishButtons);
            wishButtons.forEach(button => {
                button.addEventListener('click', () => {
                    button.classList.toggle('clicked'); // Toggle the clicked class for each button
                });
            });
        })
}
function getEDetail(card) {
    id = card.dataset.id;
    sessionStorage.setItem('itemID', id);
    location.href = '/pages/browse/event-detail.html';
}
function addWishlist(id){
    
}

