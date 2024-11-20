//header

// document.querySelector("header").innerHTML = `
//   <div class="container">
//                 <nav class="d-flex align-items-center justify-content-between">
//                     <div class="logo">
//                         <a href="/pages/homepage.html">
//                             <img
//                                 src="/assets/img/Prutika_Logo_text(2).png"
//                                 alt>
//                         </a>
//                     </div>
//                     <div
//                         class="d-flex align-items-center w-25 position-relative ">
//                         <i
//                             class="fa-solid fa-magnifying-glass text-brand fs-6 position-absolute"></i>
//                         <input type="text"
//                             class="form-control search-bar ps-5 w-100 " name id
//                             aria-describedby="helpId"
//                             placeholder="Search Event " />
//                         <button class="btn-pink text-white"><i
//                                 class="fa-solid fa-magnifying-glass text-brand fs-6"></i></button>
//                     </div>
//                     <div class="action-btn d-flex">
//                         <button class="btn-outline-pink ms-3"><i
//                                 class="fa-solid fa-plus text-brand"></i> Create
//                             a
//                             post</button>
//                         <a href="#" class=" btn-outline-pink ms-3" role="button"
//                             id="browseDropdown"
//                             data-bs-toggle="dropdown" aria-expanded="false">
//                             Browse <i
//                                 class="fa-solid fa-caret-down text-brand"></i>
//                             <!-- User Icon -->
//                         </a>
//                         <a href="ticket/myticket.html"

//                             class="btn-outline-pink ms-3 d-flex align-items-center"><i
//                                 class="fa-solid fa-ticket pe-1 text-brand"></i>My
//                             Ticket</a>

//                         <ul class="dropdown-menu dropdown-menu-end"
//                             aria-labelledby="browseDropdown">
//                             <li><a class="dropdown-item"
//                                     href="browse/browse-event.html">Browse
//                                     events</a></li>
//                             <li><a class="dropdown-item"
//                                     href="browse/browse-recruitment.html">Browse
//                                     vendor recruitments</a></li>
//                             <li><a class="dropdown-item"
//                                     href="browse/browse-vendor.html">Browse
//                                     vendor services</a></li>

//                         </ul>
//                     </div>
//                     <div class="dropdown">
//                         <a href="#" class="dropdown-toggle fs-3 text-brand"
//                             role="button" id="accountDropdown"
//                             data-bs-toggle="dropdown" aria-expanded="false">
//                             <i class="bi bi-person-circle"></i>
//                             <!-- User Icon -->
//                         </a>
//                         <ul class="dropdown-menu dropdown-menu-end"
//                             aria-labelledby="accountDropdown">
//                             <li><a class="dropdown-item"
//                                     href="./organizer/event.html">Manage
//                                     as
//                                     organizer</a></li>
//                             <li><a class="dropdown-item"
//                                     href="./vendor/vendor-business.html">Manage as
//                                     vendor</a></li>
//                             <li><a class="dropdown-item"
//                                     href="./wishlist.html">Wishlist</a></li>
//                             <li><a class="dropdown-item"
//                                     href="./authentication/accountsetting.html">Account
//                                     Setting</a></li>
//                             <li>
//                                 <hr class="dropdown-divider">
//                             </li>
//                             <li><a class="dropdown-item"
//                                     href="javascript:void(0);"
//                                     id="btn-logout">Log
//                                     out</a>
//                             </li>
//                         </ul>
//                     </div>
//                 </nav>
//             </div>`;
const apiUrl1 = "https://mps2.chandalen.dev";
const token1 = localStorage.getItem("authToken");

window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
    document.getElementById("header").style.boxShadow = "1px 1px 8px #e1159325";
  } else {
    document.getElementById("header").style.boxShadow = "none";
  }
}


let searchClicked = document.getElementById('searchEvent');

searchClicked.addEventListener('focus', () => {
  let searchEventbyName = document.getElementById('searchEvent').value;
  if (searchEventbyName == '') {
    document.querySelector('.search-dropdown').style.display = 'none';
  }
  else {
    document.querySelector('.search-dropdown').style.display = 'block';
    document.querySelector('.overlay').style.display = 'block';
  }
})

searchClicked.addEventListener("blur", () => {
  document.querySelector('.overlay').style.display = 'none';
  // document.querySelector('.search-dropdown').style.display = 'none';
})

document.getElementById('searchEvent').addEventListener('keyup', function () {
  let searchEventbyName = document.getElementById('searchEvent').value;
  document.getElementById('search-dropdown').style.display = 'block';
  if (searchEventbyName == '') {
    document.querySelector('.search-dropdown').style.display = 'none';
  }
  fetch(`${apiUrl1}/api/events?page=1&per_page=50&search=${searchEventbyName}`, {
    headers: {
      Authorization: `Bearer ${token1}`
    }
  })
    .then(res => res.json())
    .then(json => {
      const { data } = json;
      let searchList = "";
      if (data.length == 0) {
        searchList = `<li class="search-dropdown-item">
                              <i class="fa-solid fa-magnifying-glass text-brand fs-6 pe-2"></i>
                              <span>No result</span>
                          </li>`;
      }
      else {
        data.slice(0, 5).forEach(element => {
          searchList += `<li class="search-dropdown-item" onclick="showEventDetail(${element.id})">
                                <i class="fa-solid fa-magnifying-glass text-brand fs-6 pe-2"></i>
                                <span>${element.name}</span>
                            </li>`;
        })
      }
      document.getElementById('search-dropdown').innerHTML = searchList;
    })
})

function showEventDetail(id) {
  console.log("z.ljfnv.ksfj");

  sessionStorage.setItem('itemID', id);
  location.href = '/pages/browse/event-detail.html';
}


fetch(`${apiUrl1}/api/me`, {
  headers: {
    Authorization: `Bearer ${token1}`
  }
})
  .then(res => res.json())
  .then(json => {
    const { data } = json;
    document.getElementById('userEmail').innerText = data.full_name;
  })