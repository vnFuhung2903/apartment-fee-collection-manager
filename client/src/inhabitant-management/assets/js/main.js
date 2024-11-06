// add hovered class to selected list item
let list = document.querySelectorAll(".navigation li");

function activeLink() {
  list.forEach((item) => {
    item.classList.remove("hovered");
  });
  this.classList.add("hovered");
}

list.forEach((item) => item.addEventListener("mouseover", activeLink));

// Menu Toggle
let toggle = document.querySelector(".toggle");
let navigation = document.querySelector(".navigation");
let main = document.querySelector(".main");

toggle.onclick = function () {
  navigation.classList.toggle("active");
  main.classList.toggle("active");
};

//thêm sự kiện thanh điều hướng và nút xem
// Toggle navigation bar
document.querySelector('.toggle').onclick = function() {
  document.querySelector('.navigation').classList.toggle('active');
  document.querySelector('.main').classList.toggle('active');
}

// Dummy function for "Xem" buttons
document.querySelectorAll('.btn-details').forEach(button => {
  button.onclick = function() {
      window.location.href="page2_fee.html";
  }
});

