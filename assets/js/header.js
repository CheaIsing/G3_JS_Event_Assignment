

//header
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
    document.getElementById("header").style.boxShadow = "1px 1px 8px #e1159325";
  } else {
    document.getElementById("header").style.boxShadow = "none";
  }
}

