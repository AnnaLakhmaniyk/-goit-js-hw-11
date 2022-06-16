import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { getRefs } from './js/getRefs';
import NewApiService from './js/newApiService';
import { markupPage } from './js/markupPage';
import { checkAvaiLability, stopsMarkapPage } from './js/verificationData';
const { formEl, galleryEl, buttonEl } = getRefs();

let lightbox = new SimpleLightbox('.gallery a', {
  captionSelector: '.gallery__image',
  doubleTapZoom: 2,
});

const newApiService = new NewApiService();
buttonEl.classList.add('is-hiden');
formEl.addEventListener('submit', onSearchPicture);
buttonEl.addEventListener('click', onShowMore);

async function onSearchPicture(event) {
  event.preventDefault();
  newApiService.query = event.target.searchQuery.value.trim('');
  if (!newApiService.query) {
    onClearPage();
    buttonEl.classList.add('is-hiden');
    return;
  }
  newApiService.resetPage();
  onClearPage();
  try {
    const featchData = await newApiService.fetchArticles();
    const arrayLength = featchData.data.hits.length;
    newApiService.totalHids = featchData.data.totalHits;
    buttonEl.classList.remove('is-hiden');

    onCreatePage(featchData);
    lightbox.refresh();
    const checkAvai = await checkAvaiLability(arrayLength);
  } catch (error) {
    console.log(error);
  }
}

async function onShowMore() {
  try {
    const featchData = await newApiService.fetchArticles();
    displaysTotalHids();
    const createPage = await onCreatePage(featchData);
    lightbox.refresh();
  } catch (error) {
    console.log(error);
  }
}

async function onCreatePage(params) {
  galleryEl.insertAdjacentHTML('beforeend', markupPage(params.data.hits));
  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
function onClearPage() {
  galleryEl.innerHTML = '';
}
function displaysTotalHids() {
  newApiService.changeHids();
  Notify.info(`Hooray! We found 
  ${newApiService.hits} images.`);
  stopsMarkapPage(newApiService.hits);
  console.log(newApiService.hits);
}

const scrollEl = document.querySelector('.js-scroll');

scrollEl.addEventListener('click', () => window.scroll(0, 0));
window.addEventListener('scroll', onScrollClick);

function onScrollClick(e) {
  e.preventDefault();
  window.scrollY < 320
    ? scrollEl.classList.remove('isShown')
    : scrollEl.classList.add('isShown');
}
