// getAllEvent();
const apiUrl = "https://mps2.chandalen.dev";
const token = localStorage.getItem("authToken");
getAllWish();
function getAllWish() {
    fetch(apiUrl + '/api/wishlists', {
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
        },
    })
        .then(res => res.json())
        .then(json => {
            let data = json.data;
            // console.log(dEvent);
            let listE = '';
            let eNum = 0;
            data.forEach(element => {
                let dEvent = element.event;
                console.log(dEvent);
                let price = dEvent.ticket_price == 0 ? 'Free' : `${dEvent.ticket_price}`;
                let catagory = dEvent.event_categories.map(cata => cata.name).join(' &nbsp; ');
                listE += `<div class="card mb-4">
                                    <div class="row g-0">
                                        <div class="col-3 position-relative">
                                            <img src="../assets/img/test-img/cta-event-search-banner.avif"
                                                class="img-fluid rounded-start " alt="...">
                                            
                                        </div>
                                        <div class="col-8 ">
                                            <div class="card-body ps-4 pe-0 py-4">
                                                <h3 class="card-title">
                                                    <a href="javascript: void(0)" onclick="getEDetail(this)" data-id="${dEvent.id}">${dEvent.name}</a>
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
                                                        class="text-body-secondary m-0">${dEvent.start_date}</small>
                                                </div>
                                                <div class="d-flex align-items-center">
                                                    <i class="fa-solid fa-location-dot me-2 text-brand"></i> <small
                                                        class="text-body-secondary">${dEvent.location}</small>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-1 py-4 d-flex justify-content-center ">
                                            <button class="btn" onclick="deleteItem(this)" data-id="${element.id}"><i class="fa-solid fa-trash-can fs-3 text-brand"></i></button>
                                            
                                        </div>
                                    </div>
                                </div>`;
                eNum++;
            });
            if (eNum == 0) {
                document.getElementById('show-re').innerHTML = `<div class="nonfound">
                                    <div class="content">
                                        <img src="../assets/img/noFound.png" alt="" height="280px;">
                                        <h3 class="text-center text-brand mt-2">No Content</h3>
                                    </div>
                                </div>`;
            }
            else {
                document.getElementById('show-re').innerHTML=`<div class="d-flex justify-content-between mt-2 mb-4 ">
                                    <h5 class="border-brand-start  ps-3 m-0 text-brand">My Wishlist</h5>
                                    <h5 class="m-0 " >
                                    <span class="text-brand" >${eNum}</span>
                                    wish events
                                </h5>
                                </div>
                                
                `;
            }
            document.getElementById('list-card').innerHTML = listE;

        })
}
function getEDetail(card) {
    id = card.dataset.id;
    sessionStorage.setItem('itemID', id);
    location.href = 'http://127.0.0.1:5501/browse/event-detail.html';
}
function deleteItem(card) {
    id = card.dataset.id;
    fetch(apiUrl + '/api/wishlists/' + id, {
        method: "DELETE",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
        },
    })
        .then(res => res.json())
        .then(json => {
            alert("delete Item successfully");
            getAllWish();
        })
}
