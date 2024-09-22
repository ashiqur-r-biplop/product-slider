document.addEventListener("DOMContentLoaded", function () {
  const sliderContainer = document.querySelector(".sliders");
  const sliders = document.querySelectorAll(".slider");
  const nextBtn = document.getElementById("next");
  const prevBtn = document.getElementById("prev");
  let currentIndex = 0;
  let mobileSlides = 0;
  const sliderCount = sliders.length; // Should be 6 (the actual number of sliders, excluding clones)
  let autoSlideInterval;

  // Clone first and last slider for infinite effect
  const firstClone = sliders[0].cloneNode(true);
  const lastClone = sliders[sliderCount - 1].cloneNode(true);

  sliderContainer.appendChild(firstClone);
  sliderContainer.insertBefore(lastClone, sliders[0]);

  const totalSlidesWithClones = sliderCount + 2; // Total slides including clones (for proper calculations)

  // Adjust the initial transform to start at the real first slide
  const startSlider = () => {
    const screenWidth = window.innerWidth;
    const slidesToShow = screenWidth <= 550 ? 1 : 4; // Show 1 slide on mobile, 4 on larger screens
    sliderContainer.style.transform = `translateX(-${
      slidesToShow === 4
        ? 100 / slidesToShow
        : 100 / slidesToShow + mobileSlides
    }%)`;
  };

  const updateSliderPosition = () => {
    const screenWidth = window.innerWidth;
    const slidesToShow = screenWidth <= 550 ? 1 : 4;

    sliderContainer.style.transition = "transform 0.3s ease-in-out";
    sliderContainer.style.transform = `translateX(-${
      slidesToShow === 4
        ? (currentIndex + 1) * (100 / slidesToShow)
        : (currentIndex + 1) * (100 / slidesToShow) + mobileSlides
    }%)`;
  };
  const resetSliderPosition = () => {
    const screenWidth = window.innerWidth;
    const slidesToShow = screenWidth <= 550 ? 1 : 4;
  const trueDesktop = screenWidth > 550 ? currentIndex + 3 >= sliderCount : currentIndex >= sliderCount
    // When moving forward, check if we've reached the last clone and reset to the first real slide
    if (trueDesktop) {
      sliderContainer.style.transition = "none"; // Disable transition
      console.log(currentIndex);
      // Reset to the first real slide for desktop and mobile
      currentIndex = 0; 
      mobileSlides = 0;
      sliderContainer.style.transform = `translateX(-${100 / slidesToShow}%)`;
    }
    // When moving backward, check if we've reached the first clone and reset to the last real slide
    else if (currentIndex < 0) {
      sliderContainer.style.transition = "none"; // Disable transition
      console.log(currentIndex);
  
      // Go to the last real slide (for both desktop and mobile)
      currentIndex = sliderCount - slidesToShow; // Adjust to go to the last fully visible set of slides
      sliderContainer.style.transform = `translateX(-${
        (sliderCount - slidesToShow + 1) * (100 / slidesToShow)
      }%)`;
    }
  
    // Re-enable the transition after the reset
    setTimeout(() => {
      sliderContainer.style.transition = "transform 0.3s ease-in-out";
    }, 50);
  };
  
  
  const startAutoSlide = () => {
    autoSlideInterval = setInterval(() => {
      currentIndex++;
      mobileSlides = mobileSlides + 1.5;
      updateSliderPosition();

      if (currentIndex >= sliderCount) {
        setTimeout(resetSliderPosition, 300);
      }
    }, 3000); // Adjust slide duration as needed
  };

  const stopAutoSlide = () => {
    clearInterval(autoSlideInterval);
  };
  nextBtn.addEventListener("click", () => {
    currentIndex++;
  
    // Update mobileSlides only for mobile screens
    if (window.innerWidth <= 550) {
      mobileSlides += 1.5;
    }
  
    updateSliderPosition();
  
    // After reaching the last real slide, reset to the first
    if (currentIndex >= sliderCount) {
      setTimeout(resetSliderPosition, 300);
    }
  });
  

  // Add next button functionality
  

  // Add previous button functionality
  prevBtn.addEventListener("click", () => {
    currentIndex--;
    if(currentIndex > 0){
      mobileSlides = mobileSlides - 1.5;
    } else{
      mobileSlides = 0
    }

    updateSliderPosition();

    if (currentIndex < 0) {
      setTimeout(resetSliderPosition, 300);
    }
  });

  // Initialize slider position and start auto-slide
  startSlider();
  startAutoSlide();

  // Pause on hover and resume on mouse leave
  const resumeAutoSlide = () => {
    startAutoSlide(); // Resume auto-slide
  };

  const pauseAutoSlide = () => {
    stopAutoSlide(); // Pause auto-slide
  };

  // Event listeners to pause/resume auto-slide when hovering over the slider container or buttons
  sliderContainer.addEventListener("mouseover", pauseAutoSlide);
  sliderContainer.addEventListener("mouseleave", resumeAutoSlide);

  nextBtn.addEventListener("mouseover", pauseAutoSlide);
  nextBtn.addEventListener("mouseleave", resumeAutoSlide);

  prevBtn.addEventListener("mouseover", pauseAutoSlide);
  prevBtn.addEventListener("mouseleave", resumeAutoSlide);

  // Update slider position on window resize
  window.addEventListener("resize", startSlider);

  // Reset slider when animation ends on clone slides
  sliderContainer.addEventListener("transitionend", resetSliderPosition);
});
