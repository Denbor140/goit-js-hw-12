import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const loadMore = document.querySelector('.btn-load-more');
let lightbox;

export function createGallery(images) {
  const li = images
    .map(
      image =>
        `<li class="gallery-item"><a class="gallery-link" href="${image.largeImageURL}"><img
      class="gallery-image"
      src="${image.webformatURL}"
      data-source="${image.largeImageURL}"
      alt="${image.tags}"
    /></a><div class="img-data"><div><h5>Likes</h5><p>${image.likes}</p></div><div><h5>Views</h5><p>${image.views}</p></div><div><h5>Comments</h5><p>${image.comments}</p></div><div><h5>Downloads</h5><p>${image.downloads}</p></div></div></li>`
    )
    .join('');
  gallery.insertAdjacentHTML('beforeend', li);

  if (!lightbox) {
    lightbox = new SimpleLightbox('.gallery-item a', {
      captions: true,
      captionsData: 'alt',
      captionDelay: 250,
      animationSpeed: 300,
    });
  } else {
    lightbox.refresh();
  }
}

export function clearGallery() {
  gallery.innerHTML = '';
}

export function showLoader() {
  loader.classList.remove('hidden');
}

export function hideLoader() {
  loader.classList.add('hidden');
}

export function showLoadMoreButton() {
  loadMore.classList.remove('hidden');
}

export function hideLoadMoreButton() {
  loadMore.classList.add('hidden');
}
