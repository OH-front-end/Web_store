let slides = document.querySelectorAll('.slide');
let currentSlide = 0;
let slideInterval = setInterval(nextSlide, 2000);
let playing = true;
let pauseButton = document.querySelector('#pause');
let next = document.querySelector('#next');
let previous = document.querySelector('#previous');



function goToNth() {
  slides[currentSlide].className = 'slide';
  currentSlide = (currentSlide + 1) % slides.length;
  slides[currentSlide].className = 'slide active';
}


function pause() {
  pauseButton.innerHTML = 'Play';
  playing = false;
  clearInterval(slideInterval);
}

function play() {
  pauseButton.innerHTML = 'Pause';
  playing = true;
  slideInterval = setInterval(nextSlide, 2000);
}

function pausePlay() {
  if (playing) {
    pause();
  } else {
    play();
  }
}


function nextSlide() {
  goToNth(currentSlide + 1);
}

function previousSlide() {
  goToNth(currentSlide - 1);
}


pauseButton.addEventListener('click', pausePlay);
previous.addEventListener('click', previousSlide);
next.addEventListener('click', nextSlide);