const testimonials = document.querySelector('.container--testimonials');
const testimonialCards = testimonials.querySelectorAll('.container__card');
const btnNext = testimonials.querySelector('#btnNext');
const btnPrevious = testimonials.querySelector('#btnPrevious');

const mql = window.matchMedia('(max-width: 991px)');

let cardIndex = 0;
let lastIndex = testimonialCards.length - 1;

const updateVisibleCards = () => {
  if (mql.matches) {
    // Small screens: only show the selected card
    testimonialCards.forEach((card, index) => {
      card.classList.toggle('hidden', index !== cardIndex);
    });
  } else {
    // Larger screens: show 3 cards at a time
    testimonialCards.forEach((card) => card.classList.add('hidden'));
    for (let i = 0; i < 3; i++) {
      testimonialCards[
        (cardIndex + i) % testimonialCards.length
      ].classList.remove('hidden');
    }
  }
};

const buttonControl = () => {
  btnNext.addEventListener('click', () => {
    cardIndex = (cardIndex + 1) % testimonialCards.length;
    updateVisibleCards();
  });

  btnPrevious.addEventListener('click', () => {
    cardIndex =
      (cardIndex - 1 + testimonialCards.length) % testimonialCards.length;
    updateVisibleCards();
  });
};

if (mql.matches) {
  updateVisibleCards();
  buttonControl();
}

mql.addEventListener('change', (e) => {
  updateVisibleCards();
  if (e.matches) {
    buttonControl();
  }
});

updateVisibleCards();
