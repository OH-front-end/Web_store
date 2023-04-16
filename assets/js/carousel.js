class Carousel {
  constructor() {
    this.container = document.querySelector('#carousel');
    this.slides = document.querySelectorAll('.slide');
    this.indicatorContainer = document.querySelector('#indicators_container');
    this.indicators = document.querySelectorAll('.indicator');
    this.pauseButton = document.querySelector('#pause-btn');
    this.nextButton = document.querySelector('#next-btn');
    this.previousButton = document.querySelector('#prev-btn');
  }

  initVariables() {
    this.currentSlide = 0;
    this.isPlaying = true;
    this.interval = 1000;
    this.SLIDES_LENGTH = this.slides.length;
    this.ARROW_LEFT = 'ArrowLeft';
    this.ARROW_RIGHT = 'ArrowRight';
    this.SPACE = 'Space';
    this.PAUSE_ICON = '<i class="fa-solid fa-pause"></i>';
    this.PLAY_ICON = '<i class="fa-solid fa-play"></i>';
  }

  goToNth(n) {
    this.slides[this.currentSlide].classList.toggle('active');
    this.indicators[this.currentSlide].classList.toggle('active');
    this.currentSlide = (this.SLIDES_LENGTH + n) % this.SLIDES_LENGTH;
    this.slides[this.currentSlide].classList.toggle('active');
    this.indicators[this.currentSlide].classList.toggle('active');
  }

  pause() {
    this.pauseButton.innerHTML = this.PLAY_ICON;
    this.isPlaying = false;
    clearInterval(this.timerID);
  }

  play() {
    this.pauseButton.innerHTML = this.PAUSE_ICON;
    this.isPlaying = true;
    this.timerID = setInterval(this.nextSlide.bind(this), this.interval);
  }

  pausePlay() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }

  previousSlide() {
    this.goToNth(this.currentSlide - 1);
  }

  nextSlide() {
    this.goToNth(this.currentSlide + 1);
  }

  prev() {
    this.pause();
    this.previousSlide();
  }

  next() {
    this.pause();
    this.nextSlide();
  }

  indicate(e) {
    const target = e.target;
    if (target.classList.contains('indicator')) {
      this.pause();
      this.goToNth(+target.dataset.slideTo);
    }
  }

  pressKey(e) {
    if (e.code === this.ARROW_LEFT) this.prev();
    if (e.code === this.ARROW_RIGHT) this.next();
    if (e.code === this.SPACE) this.pausePlay();
  }

  swipeStart(e) {
    this.swipeStartX = e.changedTouches[0].pageX;
  }

  swipeEnd(e) {
    this.swipeEndX = e.changedTouches[0].pageX;
    if (this.swipeStartX - this.swipeEndX < -100) this.prev();
    if (this.swipeStartX - this.swipeEndX > 100) this.next();
  }


  initListeners() {
    this.pauseButton.addEventListener('click', this.pausePlay.bind(this));
    this.previousButton.addEventListener('click', this.prev.bind(this));
    this.nextButton.addEventListener('click', this.next.bind(this));
    this.indicatorContainer.addEventListener('click', this.indicate.bind(this));
    this.container.addEventListener('touchstart', this.swipeStart.bind(this));
    this.container.addEventListener('touchend', this.swipeEnd.bind(this));
    document.addEventListener('keydown', this.pressKey.bind(this));
  }

  init() {
    this.initVariables();
    this.initListeners();
    this.timerID = setInterval(this.nextSlide.bind(this), this.interval);
  }
}


const carousel = new Carousel();
carousel.init();
