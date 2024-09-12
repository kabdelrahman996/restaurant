const breakfastBtn = document.querySelector(".breakfast");
const lunchBtn = document.querySelector(".lunch");
const dinnerBtn = document.querySelector(".dinner");
const drinksBtn = document.querySelector(".drinks");
const mealsBtn = document.querySelectorAll(".list-item-meal");
const foodItems = document.querySelector(".food-items");
const reservationBtn = document.querySelectorAll(".reservation-btn");
// Contact form
const contactForm = document.querySelector("#contactForm");
const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
const messageTextarea = document.querySelector("#message");
const contactBtn = document.querySelector("#contact-submit");
const succsessMsg = document.querySelector(".succsess");

// sections
const allSections = document.querySelector(".container-all");
const heroSection = document.querySelector("#hero-section");
const menuSection = document.querySelector("#menu");
const specialSection = document.querySelector("#special-dish");
const aboutSection = document.querySelector("#about");
const contactSection = document.querySelector("#contact");
const reservationSection = document.querySelector("#reservation");

let data;
let currentIndex = 0;

// function to initialize event listeners for each meal button
function initializeEventListeners() {
  mealsBtn.forEach((meal, index) => {
    meal.addEventListener("click", () => {
      setActiveCategory(meal, index);
    });
  });

  reservationBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
      allSections.classList.add("d-none");
      reservationSection.classList.remove("d-none");
    });
  });
}

// function to add active class for the selected element
function setActiveCategory(button, index) {
  removeActiveClass();
  button.classList.add("active");
  currentIndex = index;
  displayItems();
}

// function to remove active class from the selected element
function removeActiveClass() {
  mealsBtn.forEach((meal) => {
    meal.classList.remove("active");
  });
}

// function to fetch the data from json file
function fetchData() {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "./assets/js/data.json");
  xhr.send();

  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4 && xhr.status === 200) {
      data = JSON.parse(xhr.responseText);
      displayItems();
    }
  };
}

// function to display the items based on the selected category
function displayItems() {
  foodItems.innerHTML = "";

  const activeCategory = document.querySelector(".list-item-meal.active");

  let selectedCategory = getSelectedCategory(activeCategory);

  selectedCategory.forEach((item) => {
    const itemElement = createItemElement(item);
    foodItems.appendChild(itemElement);
  });
}

// function to get the selected category
function getSelectedCategory(activeCategory) {
  switch (activeCategory.classList[1]) {
    case "breakfast":
      return data[0].breakfast;
    case "lunch":
      return data[1].lunch;
    case "dinner":
      return data[2].dinner;
    case "drinks":
      return data[3].drinks;
    default:
      return [];
  }
}

// function to create the item element
function createItemElement(item) {
  const itemElement = document.createElement("div");
  itemElement.classList.add("meal-item");

  itemElement.innerHTML = `
    <div class="food-image">
      <img src="${item.image}" alt="${item.name}">
    </div>
    <div class="food-details">
      <h4>${item.name}</h4>
      <p>Price: ${item.price}</p>
    </div>
  `;

  return itemElement;
}

// function to automatically rotate active class
function rotateActiveClass() {
  removeActiveClass();
  mealsBtn[currentIndex].classList.add("active");
  displayItems();
  currentIndex = (currentIndex + 1) % mealsBtn.length; // Move to the next button
}

// function to check email validation
function validateEmail(email) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
}

// start the  app
initializeEventListeners();
fetchData();

setInterval(rotateActiveClass, 3000);

contactBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (
    validateEmail(emailInput.value) &&
    nameInput.value != "" &&
    (emailInput.value != "") & (messageTextarea.value != "")
  ) {
    nameInput.value = "";
    emailInput.value = "";
    messageTextarea.value = "";
    succsessMsg.classList.remove("d-none");
    setTimeout(() => {
      succsessMsg.classList.add("d-none");
    }, 5000);
  }
});

// reservation
document
  .querySelector("#reservationForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.querySelector("#reservationName").value.trim();
    const email = document.querySelector("#reservationEmail").value.trim();
    const date = document.querySelector("#reservationDate").value.trim();
    const time = document.querySelector("#reservationTime").value.trim();

    if (name && email && date && time) {
      document.querySelector(".reservation-msg").classList.remove("d-none");

      setTimeout(() => {
        reservationSection.classList.add("d-none");
        allSections.classList.remove("d-none");
      }, 3000);

      this.reset();
    } else {
      alert("Please fill out all fields.");
    }
  });
