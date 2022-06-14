import { getRefs } from './getRefs';
const { formEl, buttonEl } = getRefs();
function checkAvaiLability(data) {
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
    buttonEl.classList.add('is-hiden');
    Notify.failure(
      "We're sorry, but you've reached the end of search results."
    );
    return;
  }
}
export { checkAvaiLability, stopsMarkapPage };