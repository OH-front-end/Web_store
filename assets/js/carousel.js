const slides = document.querySelectorAll('.slide');
const indicatorContainer = document.querySelector('#indicators_container');
const indicators = document.querySelectorAll('.indicator');
const pauseButton = document.querySelector('#pause-btn');
const nextButton = document.querySelector('#next-btn');
const previousButton = document.querySelector('#prev-btn');



let currentSlide = 0;
let playing = true;

function goToNth(n) {
  slides[currentSlide].classList.toggle('active');
  indicators[currentSlide].classList.toggle('active');
  currentSlide = (slides.length + n) % slides.length;
  slides[currentSlide].classList.toggle('active');
  indicators[currentSlide].classList.toggle('active');
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

function previousSlide() {
  goToNth(currentSlide - 1);
}

function nextSlide() {
  goToNth(currentSlide + 1);
}

function prev() {
  pause();
  previousSlide();
}

function next() {
  pause();
  nextSlide();
}

function indicate(e) {
  const target = e.target;
  if (target.classList.contains('indicator')) {
    pause();
    goToNth(+target.dataset.slideTo);
  }
}

pauseButton.addEventListener('click', pausePlay);
previousButton.addEventListener('click', prev);
nextButton.addEventListener('click', next);
indicatorContainer.addEventListener('click', indicate);

let slideInterval = setInterval(nextSlide, 2000);