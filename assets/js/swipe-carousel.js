import Carousel from './carousel.js';

class SwipeCarousel extends Carousel {
  swipeStart(e) {
    this.swipeStartX = e.changedTouches[0].pageX;
  }

  swipeEnd(e) {
    this.swipeEndX = e.changedTouches[0].pageX;
    if (this.swipeStartX - this.swipeEndX < -100) this.prev();
    if (this.swipeStartX - this.swipeEndX > 100) this.next();
  }

  initListeners() {
    super.initListeners();
    this.container.addEventListener('touchstart', this.swipeStart.bind(this));
    this.container.addEventListener('touchend', this.swipeEnd.bind(this));
  }
}

export default SwipeCarousel;