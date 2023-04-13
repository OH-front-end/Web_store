const container = document.querySelector('#carousel');
const slides = document.querySelectorAll('.slide');
const indicatorContainer = document.querySelector('#indicators_container');
const indicators = document.querySelectorAll('.indicator');
const pauseButton = document.querySelector('#pause-btn');
const nextButton = document.querySelector('#next-btn');
const previousButton = document.querySelector('#prev-btn');



let currentSlide = 0;
let playing = true;
let swipeStartX = null;
let swipeEndX = null;
let slideInterval = setInterval(nextSlide, 2000);


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

function pressKey(e) {
  if (e.code === 'ArrowLeft') prev();
  if (e.code === 'ArrowRight') next();
  if (e.code === 'Space') pausePlay();
}

function swipeStart(e) {
  swipeStartX = e.changedTouches[0].pageX;
}

function swipeEnd(e) {
  swipeEndX = e.changedTouches[0].pageX;
  if (swipeStartX - swipeEndX < -100) prev();
  if (swipeStartX - swipeEndX > 100) next();
}

pauseButton.addEventListener('click', pausePlay);
previousButton.addEventListener('click', prev);
nextButton.addEventListener('click', next);
indicatorContainer.addEventListener('click', indicate);
container.addEventListener('touchstart', swipeStart);
container.addEventListener('touchend', swipeEnd);
document.addEventListener('keydown', pressKey);
