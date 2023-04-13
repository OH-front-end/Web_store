const container = document.querySelector('#carousel');
const slides = document.querySelectorAll('.slide');
const indicatorContainer = document.querySelector('#indicators_container');
const indicators = document.querySelectorAll('.indicator');
const pauseButton = document.querySelector('#pause-btn');
const nextButton = document.querySelector('#next-btn');
const previousButton = document.querySelector('#prev-btn');


const SLIDES_LENGTH = slides.length;
const ARROW_LEFT = 'ArrowLeft';
const ARROW_RIGHT = 'ArrowRight';
const SPACE = 'Space';
const PAUSE_ICON = '<i class="fa-solid fa-pause"></i>';
const PLAY_ICON = '<i class="fa-solid fa-play"></i>';

let currentSlide = 0;
let isPlaying = true;
let swipeStartX = null;
let swipeEndX = null;
let timerID = null;
let interval = 1000;



function goToNth(n) {
  slides[currentSlide].classList.toggle('active');
  indicators[currentSlide].classList.toggle('active');
  currentSlide = (SLIDES_LENGTH + n) % SLIDES_LENGTH;
  slides[currentSlide].classList.toggle('active');
  indicators[currentSlide].classList.toggle('active');
}


function pause() {
  pauseButton.innerHTML = PLAY_ICON;
  isPlaying = false;
  clearInterval(timerID);
}

function play() {
  pauseButton.innerHTML = PAUSE_ICON;
  isPlaying = true;
  timerID = setInterval(nextSlide, interval);
}

function pausePlay() {
  if (isPlaying) {
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

function pressKey(e) {
  if (e.code === ARROW_LEFT) prev();
  if (e.code === ARROW_RIGHT) next();
  if (e.code === SPACE) pausePlay();
}

function swipeStart(e) {
  swipeStartX = e.changedTouches[0].pageX;
}

function swipeEnd(e) {
  swipeEndX = e.changedTouches[0].pageX;
  if (swipeStartX - swipeEndX < -100) prev();
  if (swipeStartX - swipeEndX > 100) next();
}

function initListeners() {
  pauseButton.addEventListener('click', pausePlay);
  previousButton.addEventListener('click', prev);
  nextButton.addEventListener('click', next);
  indicatorContainer.addEventListener('click', indicate);
  container.addEventListener('touchstart', swipeStart);
  container.addEventListener('touchend', swipeEnd);
  document.addEventListener('keydown', pressKey);
}

function init() {
  initListeners();
  timerID = setInterval(nextSlide, interval);
}

init();
