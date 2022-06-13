import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { getRefs } from './js/getRefs';
import NewApiService from './js/newApiService';
import { markupPage } from './js/markupPage';
const { formEl, galleryEl, buttonEl } = getRefs();

let gallery = new SimpleLightbox('.gallery a');

const newApiService = new NewApiService();
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
      console.log((newApiService.totalHids = rules.data.totalHits));

      const totalHits = rules.data.totalHits;
      const arrayLength = rules.data.hits.length;
      buttonEl.classList.remove('is-hiden');
      onClearPage();
      onCreatePage(rules);
      checkAvailability(arrayLength);
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
    return;
  }
}

function onShowMore() {
  newApiService.fetchArticles().then(rules => onCreatePage(rules));
}

function onCreatePage(params) {
  galleryEl.insertAdjacentHTML('beforeend', markupPage(params.data.hits));
}
function onClearPage() {
  galleryEl.innerHTML = '';
}
