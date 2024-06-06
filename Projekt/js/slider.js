$(document).ready(function() {
  let currentIndex = 0;
  const images = $('.slider-img');
  const imageCount = images.length;

  function showNextImage() {
    images.eq(currentIndex).removeClass('active');
    currentIndex = (currentIndex + 1) % imageCount;
    images.eq(currentIndex).addClass('active');
  }

  setInterval(showNextImage, 5000); // 5000 milliseconds = 5 seconds
});
