const locations = [
  {
    name: "",
    images: [
      "img/kazimierz/kazimierz.jpg",
      "img/kazimierz/kazimierz.jpg",
      "img/kazimierz/kazimierz.jpg",
      "img/kazimierz/kazimierz.jpg",
    ],
    titles: [
      "",
      "",
      "",
      "",
    ],
    texts: [
      "",
      "",
      "",
      "",
    ],
  },

];

let currentIndex = 0;
let currentLocationIndex = 0;

function showImagesForLocation(index) {
  currentLocationIndex = index;
  currentIndex = 0;
  updateGallery();
}

function updateGallery() {
  const location = locations[currentLocationIndex];
  const galleryImage = document.getElementById("gallery-image");
  const galleryText = document.getElementById("gallery-text");
  const galleryTitle = document.getElementById("gallery-title");

  galleryImage.style.opacity = 0;
  galleryText.style.opacity = 0;
  galleryTitle.style.opacity = 0;

  setTimeout(() => {
    galleryImage.src = location.images[currentIndex];
    galleryText.innerText = location.texts[currentIndex];
    galleryTitle.innerText = location.titles[currentIndex];

    galleryImage.style.opacity = 1;
    galleryText.style.opacity = 1;
    galleryTitle.style.opacity = 1;
  }, 500);
}

document.getElementById("prevArea").addEventListener("click", () => {
  const location = locations[currentLocationIndex];
  currentIndex = (currentIndex - 1 + location.images.length) % location.images.length;
  updateGallery();
});

document.getElementById("nextArea").addEventListener("click", () => {
  const location = locations[currentLocationIndex];
  currentIndex = (currentIndex + 1) % location.images.length;
  updateGallery();
});

document.getElementById("prevLocationBtn").addEventListener("click", () => {
  currentLocationIndex = (currentLocationIndex - 1 + locations.length) % locations.length;
  showImagesForLocation(currentLocationIndex);
});

document.getElementById("nextLocationBtn").addEventListener("click", () => {
  currentLocationIndex = (currentLocationIndex + 1) % locations.length;
  showImagesForLocation(currentLocationIndex);
});

// Initial load
showImagesForLocation(currentLocationIndex);
