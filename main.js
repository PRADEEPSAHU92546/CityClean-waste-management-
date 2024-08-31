/* nav bar manu operation */

/* manu bar for mobile */

const navLinks = document.querySelector(".nav-links");
const menuIcon = document.querySelector("ion-icon");
const registrationForm = document.getElementById('registrationpage-form');
const registrationPage = document.getElementById('registration-page');
const signInForm = document.getElementById('signinpage-form');
const signinPage = document.getElementById('signin-page');
const userPage = document.getElementById('userpage');
const usernameDisplay = document.getElementById('username-display');
const usernameDisplayxl = document.getElementById('username-displayxl');
const logoutButton = document.getElementById('logout-button');

// Menu toggle function
function onToggleMenu(e) {
  if (navLinks.classList.contains("hidden")) {
    e.name = "close";
    navLinks.classList.remove("hidden");
    navLinks.classList.add("visible");
  } else {
    e.name = "menu";
    navLinks.classList.remove("visible");
    navLinks.classList.add("hidden");
  }
}

// Scroll to close menu bar
window.addEventListener("scroll", () => {
  if (menuIcon.name === "close") {
    menuIcon.name = "menu";
    navLinks.classList.remove("visible");
    navLinks.classList.add("hidden");
  }
});

// Close menu when touching outside the menu bar
document.addEventListener("click", (event) => {
  const isClickInsideMenu = navLinks.contains(event.target) || menuIcon.contains(event.target);
  if (!isClickInsideMenu && menuIcon.name === "close") {
    menuIcon.name = "menu";
    navLinks.classList.remove("visible");
    navLinks.classList.add("hidden");
  }
});
// Registration validation and form submission
registrationForm.addEventListener('submit', function (event) {
  event.preventDefault();
  const email = event.target.email.value;
  const password = event.target.password.value;
  let username = event.target.username.value;

  // Validate email
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    alert("Please enter a valid email address.");
    return;
  }

  // Validate password length
  if (password.length < 6) {
    alert("Password must be at least 6 characters long.");
    return;
  }

  // Get the first name (split by spaces) and limit to 10 characters
  username = username.split(' ')[0].substring(0, 10);

  // Store user data in an object (this would normally be sent to a server)
  const registeredUser = {
    email: email,
    username: username,
    password: password
  };

  // Save the registration data to localStorage
  localStorage.setItem('registeredUser', JSON.stringify(registeredUser));
  localStorage.setItem('hasRegistered', 'true');

  // Move to the sign-in page after successful registration
  signinPage.style.display = 'block';
  registrationPage.style.display = 'none';
});

// Sign-in validation and form submission
signInForm.addEventListener('submit', function (event) {
  event.preventDefault();
  const email = event.target.email.value;
  const password = event.target.password.value;

  // Retrieve registered user data from localStorage
  const registeredUser = JSON.parse(localStorage.getItem('registeredUser'));

  // Validate against registered user data
  if (registeredUser && email === registeredUser.email && password === registeredUser.password) {
    // Successful sign-in, store in local storage
    localStorage.setItem('isSignedIn', 'true');
    localStorage.setItem('username', registeredUser.username);

    // Update UI
    usernameDisplay.textContent = registeredUser.username;
    usernameDisplayxl.textContent = registeredUser.username;
    userPage.style.display = 'block';
    signinPage.style.display = 'none';
    registrationPage.style.display = 'none';
  } else {
    alert("Invalid email or password. Please try again.");
    alert("Email id: " + registeredUser.email + " & password: " + registeredUser.password);
  }
});
/* onclick signup on signin page */
function togglePages1(hidePageId, showPageId) {
  const hidePage = document.getElementById(hidePageId);
  const showPage = document.getElementById(showPageId);

  if (hidePage && showPage) {
    hidePage.style.display = 'block';
    showPage.style.display = 'none';
  }
}


// Logout function
logoutButton.addEventListener('click', function (event) {
  event.preventDefault();
  logout();
});

function logout() {
  localStorage.removeItem('isSignedIn');
  localStorage.removeItem('username');

  // Go back to the registration page after logout
  signinPage.style.display = 'block';
  registrationPage.style.display = 'none';
  userPage.style.display = 'none';
}

// Check sign-in state on page load
window.addEventListener('load', () => {
  const isSignedIn = localStorage.getItem('isSignedIn');
  const storedUsername = localStorage.getItem('username');
  const hasRegistered = localStorage.getItem('hasRegistered');

  if (isSignedIn === 'true' && storedUsername) {
    // User is signed in, show the user page
    usernameDisplay.textContent = storedUsername;
    usernameDisplayxl.textContent = storedUsername;
    userPage.style.display = 'block';
    registrationPage.style.display = 'none';
    signinPage.style.display = 'none';
  } else if (hasRegistered === 'true') {
    // User has registered but is not signed in, show the sign-in page
    signinPage.style.display = 'block';
    registrationPage.style.display = 'none';
    userPage.style.display = 'none';
  } else {
    // User is not signed in and hasn't registered, show the registration page
    registrationPage.style.display = 'block';
    signinPage.style.display = 'none';
    userPage.style.display = 'none';
  }
});


// Slider functionality
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const slideContainer = document.getElementById('slide-container');
const indicators = document.querySelectorAll('.indicator');
const totalSlides = slides.length;

// Clone the first slide and append it to the end
const firstClone = slides[0].cloneNode(true);
slideContainer.appendChild(firstClone);

// Update indicators function
function updateIndicators(index) {
  indicators.forEach((indicator, i) => {
    indicator.classList.toggle('bg-gray-400', i !== index);
    indicator.classList.toggle('bg-blue-500', i === index);
  });
}

function showSlide(index) {
  const offset = -index * 100;
  slideContainer.style.transition = 'transform 0.5s ease-in-out';
  slideContainer.style.transform = `translateX(${offset}%)`;

  // Reset slide if we're on the cloned slide (smooth jump to real 1st slide)
  if (index === totalSlides) {
    setTimeout(() => {
      slideContainer.style.transition = 'none'; // Disable transition for instant jump
      slideContainer.style.transform = 'translateX(0%)'; // Jump to the real first slide
      currentSlide = 0; // Reset to real 1st slide
    }, 500); // Wait for the transition to complete
  }

  // Update indicators (don't show for the clone)
  updateIndicators(index >= totalSlides ? 0 : index);
}

function nextSlide() {
  currentSlide++;

  // Check if we are on the cloned slide (just before the wraparound)
  if (currentSlide > totalSlides) {
    currentSlide = 0; // Reset slide index to 0 (the real first slide)
  }

  showSlide(currentSlide);
}

function previousSlide() {
  currentSlide--;

  if (currentSlide < 0) {
    currentSlide = totalSlides - 1; // Jump to the last slide
    slideContainer.style.transition = 'none';
    slideContainer.style.transform = `translateX(${-currentSlide * 100}%)`;
    setTimeout(() => {
      slideContainer.style.transition = 'transform 0.5s ease-in-out';
      previousSlide();
    }, 20);
  } else {
    showSlide(currentSlide);
  }
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
      newComplaintForm.reset();
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