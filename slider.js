// ------------- SLIDER --------------
import data from './assets/data/data.js';
const container = document.querySelector('.slide-container');
const nextBtn = document.querySelector('.next-btn');
const prevBtn = document.querySelector('.prev-btn');
// if length is 1 hide buttons
if (data.length === 1) {
  nextBtn.style.display = 'none';
  prevBtn.style.display = 'none';
}
// if length is 2, add copies of slides
let people = [...data];
if (data.length === 2) {
  people = [...data, ...data];
}
container.innerHTML = people
  .map((person, slideIndex) => {
    const { img, name, job, text } = person;
    let position = 'slide-next';
    if (slideIndex === 0) {
      position = 'slide-active';
    }
    if (slideIndex === people.length - 1) {
      position = 'slide-last';
    }
    if (data.length <= 1) {
      position = 'slide-active';
    }
    return `<article class="slide ${position}">
  <img src=${img} class="slider-img" alt="${name}"/>
  <h4>${name}</h4>
  <p class="title">${job}</p>
  <p class="text">
   ${text}
  </p>
 </article>`;
  })
  .join('');

const startSlider = (type) => {
  // get all three slides active,last next
  const slideActive = document.querySelector('.slide-active');
  const last = document.querySelector('.slide-last');
  let next = slideActive.nextElementSibling;
  if (!next) {
    next = container.firstElementChild;
  }
  slideActive.classList.remove('slide-active');
  last.classList.remove('slide-last');
  next.classList.remove('slide-next');

  if (type === 'prev') {
    slideActive.classList.add('slide-next');
    last.classList.add('slide-active');
    next = last.previousElementSibling;
    if (!next) {
      next = container.lastElementChild;
    }
    next.classList.remove('slide-next');
    next.classList.add('slide-last');
    return;
  }
  slideActive.classList.add('slide-last');
  last.classList.add('slide-next');
  next.classList.add('slide-active');
};
nextBtn.addEventListener('click', () => {
  startSlider();
});
prevBtn.addEventListener('click', () => {
  startSlider('prev');
});
