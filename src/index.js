import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { getRefs } from './js/getRefs';
import NewApiService from './js/newApiService';
import { markupPage } from './js/markupPage';
const { formEl, galleryEl, buttonEl } = getRefs();

const newApiService = new NewApiService();
// gallery.refresh();
buttonEl.classList.add('is-hiden');
formEl.addEventListener('submit', onSearchPicture);
buttonEl.addEventListener('click', onShowMore);

function onSearchPicture(event) {
  event.preventDefault();
  newApiService.query = event.target.searchQuery.value.trim('');
  if (!newApiService.query) {
    onClearPage();
    buttonEl.classList.add('is-hiden');
    return;
  }
  newApiService.resetPage();

  newApiService
    .fetchArticles()
    .then(rules => {
      const arrayLength = rules.data.hits.length;
      newApiService.totalHids = rules.data.totalHits;
      buttonEl.classList.remove('is-hiden');

      onClearPage();
      onCreatePage(rules);
      checkAvailability(arrayLength);
    })
    .catch(error => {
      console.log(error);
    });
}

function onShowMore() {
  newApiService
    .fetchArticles()
    .then(rules => {
      newApiService.changeHids();
      console.log(newApiService.hits);
      stopsMarkapPage(newApiService.hits);
      onCreatePage(rules);
    })
    .catch(error => {
      console.log(error);
    });
}
function checkAvailability(data) {
  if (data === 0) {
    Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    buttonEl.classList.add('is-hiden');
    formEl.reset('');
    return;
  }
}
function stopsMarkapPage(data) {
  if (data === 20) {
    Notify.failure(
      "We're sorry, but you've reached the end of search results."
    );
    buttonEl.classList.add('is-hiden');
    return;
  }
}

function onCreatePage(params) {
  galleryEl.insertAdjacentHTML('beforeend', markupPage(params.data.hits));
}
function onClearPage() {
  galleryEl.innerHTML = '';
}
