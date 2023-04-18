class Carousel {
  constructor() {
    this.container = document.querySelector('#carousel');
    this.slidesContainer = document.querySelector('#slides');
    this.slides = document.querySelectorAll('.slide');
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
    this.LEFT_ICON = '<i class="fa-solid fa-angle-left"></i>';
    this.RIGHT_ICON = '<i class="fa-solid fa-angle-right"></i>';
  }


  initControls() {
    const controlsContainer = document.createElement('div');
    controlsContainer.setAttribute('class', 'controls_container');
    const PAUSE = `<div class="controls controls-pause" id="pause-btn">${this.PAUSE_ICON}</div>`;
    const PREV = ` <div class="controls controls-prev" id="prev-btn">${this.LEFT_ICON}</div>`;
    const NEXT = `<div class="controls controls-next" id="next-btn">${this.RIGHT_ICON}</div>`;
    controlsContainer.innerHTML = PREV + PAUSE + NEXT;

    this.slidesContainer.appendChild(controlsContainer);

    this.pauseButton = document.querySelector('#pause-btn');
    this.nextButton = document.querySelector('#next-btn');
    this.previousButton = document.querySelector('#prev-btn');
  }

  initIndicators() {
    const indicators = document.createElement('div');
    indicators.setAttribute('class', 'indicators_container');

    for (let i = 0; i < this.SLIDES_LENGTH; i++) {
      const indicator = document.createElement('div');
      indicator.setAttribute('class', 'indicator');
      indicator.dataset.slideTo = `${i}`;

      if (i === 0) indicator.classList.add('active');
      indicators.appendChild(indicator);
    }

    this.slidesContainer.appendChild(indicators);

    this.indicatorsContainer = document.querySelector('.indicators_container');
    this.indicators = document.querySelectorAll('.indicator');
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

  initListeners() {
    this.pauseButton.addEventListener('click', this.pausePlay.bind(this));
    this.previousButton.addEventListener('click', this.prev.bind(this));
    this.nextButton.addEventListener('click', this.next.bind(this));
    this.indicatorsContainer.addEventListener('click', this.indicate.bind(this));
    document.addEventListener('keydown', this.pressKey.bind(this));
  }

  init() {
    this.initVariables();
    this.initControls();
    this.initIndicators();
    this.initListeners();
    this.timerID = setInterval(this.nextSlide.bind(this), this.interval);
  }
}

export default Carousel;
