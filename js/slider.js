// slider.js
document.addEventListener("DOMContentLoaded", () => {
  const slides = document.querySelectorAll(".slide");
  const prevBtn = document.querySelector(".prev");
  const nextBtn = document.querySelector(".next");
  const indicatorsContainer = document.querySelector(".indicators");

  let currentSlide = 0;
  let interval;

  //indicadores dinámicamente
  slides.forEach((_, index) => {
    const dot = document.createElement("button");
    dot.setAttribute("aria-label", `Ir a la imagen ${index + 1}`);
    if (index === 0) dot.classList.add("active");
    indicatorsContainer.appendChild(dot);

    dot.addEventListener("click", () => {
      showSlide(index);
      resetInterval();
    });
  });

  const dots = document.querySelectorAll(".indicators button");

  function showSlide(index) {
    slides.forEach(slide => slide.classList.remove("active"));
    dots.forEach(dot => dot.classList.remove("active"));
    slides[index].classList.add("active");
    dots[index].classList.add("active");
    currentSlide = index;
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }

  function prevSlideFunc() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
  }

  function startInterval() {
    interval = setInterval(nextSlide, 4000); 
  }

  function resetInterval() {
    clearInterval(interval);
    startInterval();
  }

  // Event listeners
  nextBtn.addEventListener("click", () => {
    nextSlide();
    resetInterval();
  });

  prevBtn.addEventListener("click", () => {
    prevSlideFunc();
    resetInterval();
  });

  // Iniciar slider automático
  startInterval();
});
