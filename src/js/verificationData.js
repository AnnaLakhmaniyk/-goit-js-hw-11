import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { getRefs } from './getRefs';
const { formEl, buttonEl } = getRefs();
async function checkAvaiLability(data) {
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
  const totalPages = Math.ceil(data / 40);
  if (totalPages <= 1) {
    Notify.failure(
      "We're sorry, but you've reached the end of search results."
    );
    buttonEl.classList.add('is-hiden');
    return;
  }
}
export { checkAvaiLability, stopsMarkapPage };
