/* nav bar manu operation */

/* manu bar for mobile */

const navLinks = document.querySelector(".nav-links");
const menuIcon = document.querySelector("ion-icon");
const signinForm = document.getElementById('signin-form');
const signinPage = document.getElementById('signin-page');
const userPage = document.getElementById('userpage');
const usernameDisplay = document.getElementById('username-display');
const usernameDisplayxl = document.getElementById('username-displayxl');
const logoutButton = document.getElementById('logout-button');
let username = '';

// Menu toggle function
function onToggleMenu(e) {
  e.name = e.name == "menu" ? "close" : "menu";
  navLinks.classList.toggle("top-[0%]");
}

window.addEventListener("scroll", () => {
  if (menuIcon.name === "close") {
    menuIcon.name = "menu";
    navLinks.classList.remove("top-[0%]");
  }
});

// Sign-in validation and form submission
signinForm.addEventListener('submit', function (event) {
  event.preventDefault();
  const email = event.target.email.value;
  const password = event.target.password.value;
  username = event.target.username.value;

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    alert("Please enter a valid email address.");
    return;
  }

  if (password.length < 6) {
    alert("Password must be at least 6 characters long.");
    return;
  }

  localStorage.setItem('isSignedIn', 'true');
  localStorage.setItem('username', username);

  usernameDisplay.textContent = username;
  userPage.style.display = 'block';
  signinPage.style.display = 'none';
});

// Logout function
logoutButton.addEventListener('click', function(event) {
  event.preventDefault();
  logout();
});

function logout() {
  localStorage.removeItem('isSignedIn');
  localStorage.removeItem('username');

  signinPage.style.display = 'block';
  userPage.style.display = 'none';
}

// Check sign-in state on page load
window.addEventListener('load', () => {
  const isSignedIn = localStorage.getItem('isSignedIn');
  const storedUsername = localStorage.getItem('username');

  if (isSignedIn === 'true' && storedUsername) {
    usernameDisplay.textContent = storedUsername;
    usernameDisplayxl.textContent = storedUsername;
    userPage.style.display = 'block';
    signinPage.style.display = 'none';
  } else {
    signinPage.style.display = 'block';
    userPage.style.display = 'none';
  }
});

// Slider functionality
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const slideContainer = document.getElementById('slide-container');
const indicators = document.querySelectorAll('.indicator');

function showSlide(index) {
  const offset = -index * 100;
  slideContainer.style.transform = `translateX(${offset}%)`;

  indicators.forEach((indicator, i) => {
    indicator.classList.toggle('bg-gray-400', i !== index);
    indicator.classList.toggle('bg-blue-500', i === index);
  });
}

function previousSlide() {
  currentSlide = (currentSlide > 0) ? currentSlide - 1 : slides.length - 1;
  showSlide(currentSlide);
}

function nextSlide() {
  currentSlide = (currentSlide < slides.length - 1) ? currentSlide + 1 : 0;
  showSlide(currentSlide);
}

function goToSlide(index) {
  currentSlide = index;
  showSlide(currentSlide);
}

// Initialize the first slide
showSlide(currentSlide);

// Swipe functionality
let touchstartX = 0;
let touchendX = 0;

const slider = document.getElementById('slider');

function handleGesture() {
  if (touchendX < touchstartX) {
    nextSlide();
  }
  if (touchendX > touchstartX) {
    previousSlide();
  }
}

slider.addEventListener('touchstart', (e) => {
  touchstartX = e.changedTouches[0].screenX;
});

slider.addEventListener('touchend', (e) => {
  touchendX = e.changedTouches[0].screenX;
  handleGesture();
});

// Auto-slide functionality
setInterval(nextSlide, 7000);
/* complaint form  */
document.addEventListener('DOMContentLoaded', function () {
  const newComplaintForm = document.getElementById('newComplaintForm');
  const updateComplaintForm = document.getElementById('updateComplaintForm');
  const newComplaintSection = document.getElementById('newComplaint');
  const updateComplaintSection = document.getElementById('updateComplaint');

  const newComplaintLink = document.getElementById('newComplaintLink');
  const updateComplaintLink = document.getElementById('updateComplaintLink');
  const newComplaintLinkxl = document.getElementById('newComplaintLinkxl');
  const updateComplaintLinkxl = document.getElementById('updateComplaintLinkxl');
  const gotoNew = document.getElementById('gotoNew');
  const gotoUpdate = document.getElementById('gotoUpdate');
  /* for xl */
  newComplaintLinkxl.addEventListener('click', function () {
    newComplaintSection.classList.remove('hidden');
    updateComplaintSection.classList.add('hidden');
  });

  updateComplaintLinkxl.addEventListener('click', function () {
    newComplaintSection.classList.add('hidden');
    updateComplaintSection.classList.remove('hidden');
  });
  /* for mid page transaction new and update */
  gotoNew.addEventListener('click', function () {
    newComplaintSection.classList.remove('hidden');
    updateComplaintSection.classList.add('hidden');
  });

  gotoUpdate.addEventListener('click', function () {
    newComplaintSection.classList.add('hidden');
    updateComplaintSection.classList.remove('hidden');
  });
  /* for sm */
  newComplaintLink.addEventListener('click', function () {
    newComplaintSection.classList.remove('hidden');
    updateComplaintSection.classList.add('hidden');
  });

  updateComplaintLink.addEventListener('click', function () {
    newComplaintSection.classList.add('hidden');
    updateComplaintSection.classList.remove('hidden');
  });

  newComplaintForm.addEventListener('submit', function (e) {
    e.preventDefault();
    if (newComplaintForm.checkValidity()) {
      alert('Complaint is registered and will be resolved soon. Reference No.xxxxxxx099');
      newComplaintSection.classList.add('hidden');
      updateComplaintSection.classList.remove('hidden');
    }
  });

  updateComplaintForm.addEventListener('submit', function (e) {
    e.preventDefault();
    if (updateComplaintForm.checkValidity()) {
      alert('Complaint is updated and will be resolved soon.');
      updateComplaintForm.reset(); // Clears all the form fields
    }
  });
});