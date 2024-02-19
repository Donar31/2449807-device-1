const promoLink = document.querySelector('.main-title-link');
const modal = document.querySelector('.modal');
const modalCloseButton = document.querySelector('.modal-close-button');
const prevButton = document.querySelector('.arrow-prev');
const nextButton = document.querySelector('.arrow-next');
const bulletsBlock = document.querySelector('.slider-bullet-block');
const sliderList = document.querySelector('.slider-list');
const bulletsTags = document.querySelectorAll('.slider-bullet');
const bullets = Array.from(bulletsTags);
const screensTags = document.querySelectorAll('.slider-screen');
const screens = Array.from(screensTags);
const advantagesLegend = document.querySelector('.advantages-legend');
const legendLinksTags = document.querySelectorAll('.legend-item-link');
const legendLinks = Array.from(legendLinksTags);
const advantagesItemsTags = document.querySelectorAll('.advantages-item');
const advantagesItems = Array.from(advantagesItemsTags);


promoLink.addEventListener('click', (e) => {
  e.preventDefault();
  modal.classList.remove('modal-closed')
});

modalCloseButton.addEventListener('click', (e) => {
  e.preventDefault();
  modal.classList.add('modal-closed');
});

if (sliderList) {
  const model = [true, false, false];
  const getCurrentActiveSlide = () => model.findIndex((item) => item);
  renderSlider();
  function renderSlider() {
    const active = getCurrentActiveSlide();
    screens.forEach((element, index) => {
      element.querySelectorAll('a').forEach((link) => {
        link.tabIndex = (index === active) ? '0' : '-1'
      })
    })
    sliderList.style.transform = `translateX(-${active * 1160}px)`
  }

  const renderBullet = () => {
    const active = getCurrentActiveSlide();
    document.querySelector('.slider-bullet-active').classList.remove('slider-bullet-active');
    bullets[active].classList.add('slider-bullet-active');
  }

  const setCurrentActiveSlide = (index) => {
    model.forEach((element, i) => {
      model[i] = i === index
    })
    renderSlider();
    renderBullet();
  }

  prevButton.addEventListener('click', () => {
    const currentActive = getCurrentActiveSlide()
    const newActive = (currentActive > 0) ? currentActive - 1 : currentActive;
    setCurrentActiveSlide(newActive);
  });

  nextButton.addEventListener('click', () => {
    const currentActive = getCurrentActiveSlide()
    const newActive = (currentActive < model.length - 1) ? currentActive + 1 : currentActive;
    setCurrentActiveSlide(newActive);
  });

  bulletsBlock.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('slider-bullet')) {
      const index = bullets.indexOf(evt.target)
      setCurrentActiveSlide(index);
    }
  });
}

if(advantagesLegend) {
  advantagesLegend.addEventListener('click', (evt) => {
    evt.preventDefault();
    if(evt.target.classList.contains('legend-item-link')){
      document.querySelector('.legend-item-link.active').classList.remove('active')
      evt.target.classList.add('active')
      const index = legendLinks.indexOf(evt.target)
      document.querySelector('.advantages-item-active').classList.remove('advantages-item-active')
      advantagesItems[index].classList.add('advantages-item-active')
    }
  })
}
