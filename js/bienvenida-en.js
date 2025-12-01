// bienvenida-en.js
document.addEventListener("DOMContentLoaded", () => {
  const popup = document.getElementById("welcome-popup");
  const closeBtn = document.getElementById("close-popup");
  const message = document.getElementById("welcome-message");

  // Check if message has already been shown in this session
  const messageShown = sessionStorage.getItem("welcomeMessageShown");

  if (!messageShown) {
    const hour = new Date().getHours();
    let greeting = "";

    if (hour >= 5 && hour < 12) {
      greeting = "Good morning!";
    } else if (hour >= 12 && hour < 18) {
      greeting = "Good afternoon!";
    } else {
      greeting = "Good evening!";
    }

    // Personalized message
    message.textContent = `${greeting} Welcome to the website of Mexican gastronomy, here you will find everything from history, preparation and festivals.`;

    // Show popup after 1 second
    setTimeout(() => {
      popup.classList.add("show");
    }, 1000);

    // Close popup on click
    closeBtn.addEventListener("click", () => {
      popup.classList.remove("show");
      // Save state so it won't show again this session
      sessionStorage.setItem("welcomeMessageShown", "true");
    });
  }
});
