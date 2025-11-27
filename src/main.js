import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { getImagesByQuery } from './js/pixabay-api';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions';

const form = document.querySelector('.form');
const input = form.querySelector('input[name="search-text"]');
const loadMore = document.querySelector('.btn-load-more');
let page = 1;
let query = '';

form.addEventListener('submit', async e => {
  e.preventDefault();

  query = input.value.trim();
  page = 1;

  if (!query) {
    iziToast.warning({
      message: 'Input field cannot be empty.',
      position: 'topRight',
      backgroundColor: '#FFA000',
      messageColor: '#fff',
    });
    return;
  }

  clearGallery();
  hideLoadMoreButton();
  showLoader();

  try {
    const data = await getImagesByQuery(query);
    if (data.hits.length === 0) {
      return iziToast.error({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
        backgroundColor: '#EF4040',
        messageColor: '#fff',
      });
    }

    createGallery(data.hits);

    if (data.totalHits > 15) {
      showLoadMoreButton();
    } else {
      hideLoadMoreButton();
    }
  } catch (error) {
    console.log(error);
  } finally {
    hideLoader();
  }
});

loadMore.addEventListener('click', async () => {
  hideLoadMoreButton();
  showLoader();

  page += 1;

  try {
    const data = await getImagesByQuery(query, page);
    const totalPages = Math.ceil(data.totalHits / 15);

    createGallery(data.hits);

    if (page < totalPages) {
      showLoadMoreButton();
    } else {
      hideLoadMoreButton();
      return iziToast.error({
        position: 'topRight',
        message: "We're sorry, but you've reached the end of search results.",
      });
    }
  } catch (err) {
    console.log(err);
  } finally {
    hideLoader();
  }
});
