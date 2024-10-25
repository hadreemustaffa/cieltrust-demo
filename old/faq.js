const faqButton = document.getElementById('faqButton');
const faqButtonIcon = faqButton.querySelector('svg');
const faqContentWrapper = document.querySelector(
  '.container--faqs .container__content-wrapper'
);

faqButton.addEventListener('click', () => {
  if (faqButton.getAttribute('aria-expanded') == 'false') {
    faqButton.setAttribute('aria-expanded', 'true');
    faqButtonIcon.style.transform = 'rotate(180deg)';
    faqContentWrapper.classList.remove('collapse');
    faqContentWrapper.classList.add('show');
  } else {
    faqButton.setAttribute('aria-expanded', 'false');
    faqButtonIcon.removeAttribute('style');
    faqContentWrapper.removeAttribute('style');
    faqContentWrapper.classList.remove('show');
    faqContentWrapper.classList.add('collapse');
  }
});
