const apiUrl1 = "https://mps2.chandalen.dev";
const token1 = localStorage.getItem("authToken");

const header = document.getElementById('header');
const toggleClass = "is-sticky";

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;
  if (currentScroll > 150) {
    header.classList.add(toggleClass);
  } else {
    header.classList.remove(toggleClass);
  }
})

let searchClicked = document.getElementById("searchEvent");


searchClicked.addEventListener("focus", () => {
  let searchEventbyName = document.getElementById("searchEvent").value;
  if (searchEventbyName == "") {
    document.querySelector(".search-dropdown").style.display = "none";
  } else {
    document.querySelector(".search-dropdown").style.display = "block";
    document.querySelector(".overlay").style.display = "block";
  }
});

searchClicked.addEventListener("blur", () => {
  document.querySelector(".overlay").style.display = "none";
  // document.querySelector('.search-dropdown').style.display = 'none';
});

document.getElementById("searchEvent").addEventListener("keyup", function () {
  let searchEventbyName = document.getElementById("searchEvent").value;

  document.getElementById("search-dropdown").style.display = "block";
  if (searchEventbyName == "") {
    document.querySelector(".search-dropdown").style.display = "none";
  }
  fetch(
    `${apiUrl1}/api/events?page=1&per_page=10000&search=${searchEventbyName}`,
    {
      headers: {
        Authorization: `Bearer ${token1}`,
      },
    }
  )
    .then((res) => res.json())
    .then((json) => {
      const { data } = json;

      let searchList = "";
      if (data.length == 0) {
        searchList = `<li class="search-dropdown-item">
                              <i class="fa-solid fa-magnifying-glass text-brand fs-6 pe-2"></i>
                              <span>No result</span>
                          </li>`;
      } else {
        data.slice(0, 5).forEach((element) => {
          searchList += `<li class="search-dropdown-item" onclick="showEventDetail(${element.id})">
                                <i class="fa-solid fa-magnifying-glass text-brand fs-6 pe-2"></i>
                                <span>${element.name}</span>
                            </li>`;
        });
      }
      document.getElementById("search-dropdown").innerHTML = searchList;
    });
});

function showEventDetail(id) {

  sessionStorage.setItem("itemID", id);
  location.href = "/pages/browse/event-detail.html";
}

function setUserEmail() {
  if (localStorage.getItem("authToken")) {
    fetch(`${apiUrl1}/api/me`, {
      headers: {
        Authorization: `Bearer ${token1}`,
      },
    })
      .then((res) => res.json())
      .then((json) => {
        const { data } = json;
        document.getElementById("userEmail").innerText = data.full_name;
      });
  }
}

// Call the function to set the user email
setUserEmail();

function goCreatePost(type = "") {
  if (type == "event") {
    if (localStorage.getItem("authToken")) {
      location.href = "/pages/organizer/create-events.html";
    } else {
      location.href = "/pages/authentication/login.html";
    }
  }
  if (type == "recruit") {
    if (localStorage.getItem("authToken")) {
      location.href = "/pages/organizer/vendor-recruitment.html";
    } else {
      location.href = "/pages/authentication/login.html";
    }
  }
  if (type == "business") {
    if (localStorage.getItem("authToken")) {
      location.href = "/pages/vendor/create_vendor_business.html";
    } else {
      location.href = "/pages/authentication/login.html";
    }
  }
}

function checkAuth() {
  if (!localStorage.getItem("authToken")) {

    if (document.querySelectorAll(".add-wish")) {

      document.querySelectorAll(".add-wish").forEach((item) => {
        item.onclick = () => {
          location.href = "/pages/authentication/login.html";
        };
      });
      if (document.getElementById("btn-purchase")) {
        document.getElementById("btn-purchase").onclick = () => {
          location.href = "/pages/authentication/login.html";
        };
      }
    }
  }
}
checkAuth();
