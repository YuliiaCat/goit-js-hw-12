'use strict';
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import { getImages } from "./js/pixabay-api";
import { renderImage } from "./js/render-functions";

const loadMoreBtn = document.querySelector('.load-more-btn');
const form = document.querySelector('.search-form');
const input = document.querySelector('.search-input');
const list = document.querySelector('.gallery');
const loader = document.querySelector('.loader')

let currentPage;
let currentQuery = '';
let maxPage;
const perPage = 15;

// render gallery

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  currentQuery = event.target.elements.query.value.trim();
  currentPage = 1;

  showLoader();
  hideLoadBtn();
  list.innerHTML = '';

  if (currentQuery === '') {
    iziToast.error({
      position: "topRight",
      message: 'Please enter some text',
    });
    hideLoader();
    return;
  }

  try {
    const data = await getImages(currentQuery, currentPage);
    maxPage = Math.ceil(data.totalHits / perPage);

    if (data.hits && data.hits.length > 0) {
      const markup = renderImage(data.hits);
      list.insertAdjacentHTML("beforeend", markup);

      hideLoader();
      hideLoadBtn();

      let lightbox = new SimpleLightbox('.gallery a', {
        captions: true,
        captionDelay: 250,
        captionPosition: 'bottom',
        captionsData: 'alt',
      });

      lightbox.refresh();
    } else {
      iziToast.error({
        position: "topRight",
        message: 'Sorry, there are no images matching your search query. Please try again!',
      })
      hideLoader();
      hideLoadBtn();
    }
  } catch (err) {
    console.log(err);
    hideLoadBtn();
    hideLoader();
    iziToast.error({
      position: "topRight",
      message: 'Sorry, the request can\'t be completed at this time. Please try again',
    })
  }

  input.value = '';
  updateBtnStatus();
});

// add images on a button 'load more'

loadMoreBtn.addEventListener('click', async () => {
  currentPage++;
  showLoader();
  hideLoadBtn();

  try {
    const data = await getImages(currentQuery, currentPage);
    const markup = renderImage(data.hits);
    list.insertAdjacentHTML("beforeend", markup);
    scrollPage();
  } catch (err) {
    console.log(err);
  }

  hideLoader();
  updateBtnStatus();
});

// service functions

function showLoadBtn() {
  loadMoreBtn.classList.remove('visually-hidden');
}

function hideLoadBtn() {
  loadMoreBtn.classList.add('visually-hidden');
}

function showLoader() {
  loader.classList.remove('visually-hidden');
}

function hideLoader() {
  loader.classList.add('visually-hidden');
}

function updateBtnStatus() {
  if (currentPage >= maxPage) {
    hideLoadBtn();

    if (maxPage) {
      iziToast.info({
        position: "bottomRight",
        message: 'We\'re sorry, but you\'ve reached the end of search results',
      })
    hideLoadBtn();
    }
  } else {
    showLoadBtn();
  }
}

function scrollPage() {
  const liElem = list.children[0];
  const height = liElem.getBoundingClientRect().height;

  scrollBy({
    top: height * 2,
    behavior: "smooth",
  });
}

