document.addEventListener("DOMContentLoaded", function () {
  const sliderContainer = document.querySelector(".sliders");
  const sliders = document.querySelectorAll(".slider");
  const sliderCount = sliders.length;
  let currentIndex = 0;
  let autoSlideInterval;

  // Clone first and last slider for infinite effect
  const firstClone = sliders[0].cloneNode(true);
  const lastClone = sliders[sliderCount - 1].cloneNode(true);

  sliderContainer.appendChild(firstClone);
  sliderContainer.insertBefore(lastClone, sliders[0]);

  const updateSliderPosition = () => {
    const screenWidth = window.innerWidth;
    const slidesToShow = screenWidth <= 550 ? 1 : 3; // Show 1 slide on mobile, 3 on larger screens
    if (slidesToShow && currentIndex <= 5) {
      console.log((currentIndex + 1) * (100 / slidesToShow));
      sliderContainer.style.transform = `translateX(-${
        (currentIndex + 1) * (100 / slidesToShow) - 2
      }%)`;
    } else if (slidesToShow && currentIndex >= 6 && currentIndex <= 11) {
      sliderContainer.style.transform = `translateX(-${
        (currentIndex + 1) * (100 / slidesToShow) - 1
      }%)`;
    } else if (slidesToShow && currentIndex >= 12 && currentIndex <= 17) {
      sliderContainer.style.transform = `translateX(-${
        (currentIndex + 1) * (100 / slidesToShow) + 2
      }%)`;
    } else if (slidesToShow && currentIndex >= 18 && currentIndex <= 22) {
      sliderContainer.style.transform = `translateX(-${
        (currentIndex + 1) * (100 / slidesToShow) + 3
      }%)`;
    }
    sliderContainer.style.transform = `translateX(-${
      (currentIndex + 1) * (100 / slidesToShow)
    }%)`;
  };

  const startAutoSlide = () => {
    autoSlideInterval = setInterval(() => {
      currentIndex++;
      updateSliderPosition();

      if (currentIndex >= sliderCount) {
        setTimeout(() => {
          sliderContainer.style.transition = "none";
          currentIndex = 0;
          updateSliderPosition();
          setTimeout(() => {
            sliderContainer.style.transition = "transform 0.3s ease-in-out";
          }, 50);
        }, 300);
      }
    }, 3000); // Adjust slide duration as needed
  };

  const stopAutoSlide = () => {
    clearInterval(autoSlideInterval);
  };

  // Initialize slider position and start auto-slide
  updateSliderPosition();
  startAutoSlide();

  // Pause on hover and resume on mouse leave
  sliderContainer.addEventListener("mouseover", stopAutoSlide);
  sliderContainer.addEventListener("mouseleave", startAutoSlide);

  // Update slider position on window resize
  window.addEventListener("resize", updateSliderPosition);
});
