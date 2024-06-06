
  const images = [
  { src: 'img/storyoflublin/story_of_lublin_region_1.jpg', description: 'Zamek Lubelski w Lublinie' },
  { src: 'img/storyoflublin/story_of_lublin_region_janowiec_zamek.jpg', description: 'Zamek w Janowcu - powiat puławski' },
  { src: 'img/storyoflublin/story_of_lublin_region_kleniewo.jpg', description: 'Ścieżka przyrodnicza "Kleniewo" w miejscowości Pomorze - powiat chodelski' },
  { src: 'img/storyoflublin/story_of_lublin_region_muzeum_wsi_lubelskiej.jpg', description: 'Muzeum Wsi Lubelskiej w Lublinie.' },
  { src: 'img/storyoflublin/story_of_lublin_region_palac_kazlowka.jpg', description: 'Pałac w Kozłówce – zabytkowy pałac z zespołem w miejscowości Kozłówka - powiat lubartowski.'},
      { src: 'img/storyoflublin/story_of_lublin_region_poleski_park_narodowy.jpg', description: 'Poleski Park Narodowy – park narodowy położony w województwie lubelskim, w polskiej części Polesia' }
  ];

  let currentImageIndex = 0;

  function updateGallery() {
  const imageElement = document.getElementById('current-image');
  const descriptionElement = document.getElementById('image-description');
  imageElement.src = images[currentImageIndex].src;
  descriptionElement.innerText = images[currentImageIndex].description;
}

  function nextImage() {
  currentImageIndex = (currentImageIndex + 1) % images.length;
  updateGallery();
}

  function prevImage() {
  currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
  updateGallery();
}

  document.getElementById('current-image').addEventListener('click', () => {
  const enlargedView = document.getElementById('enlarged-view');
  const enlargedImage = document.getElementById('enlarged-image');
  enlargedImage.src = images[currentImageIndex].src;
  enlargedView.classList.add('visible');
});

  document.getElementById('enlarged-view').addEventListener('click', () => {
  const enlargedView = document.getElementById('enlarged-view');
  enlargedView.classList.remove('visible');
});

  document.addEventListener('DOMContentLoaded', () => {
  updateGallery();
});
