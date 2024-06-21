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

loadMoreBtn.classList.add('visually-hidden');

let currentPage = 1;
let currentQuery = '';

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const value = event.target.elements.query.value.trim();
  currentPage = 1;
  currentQuery = value;

  loader.classList.toggle('visually-hidden');
  loadMoreBtn.classList.add('visually-hidden');
  list.innerHTML = '';

  if (value === '') {
    iziToast.error({
      position: "topRight",
      message: 'Please enter some text',
    });
    loader.classList.add('visually-hidden');
    return;
  }

  loadImages();

  // try {
  //   const data = await getImages(currentQuery, currentPage);
  //   if (value === '') {
  //     iziToast.error({
  //       position: "topRight",
  //       message: 'Please enter some text',
  //     });
  //     loader.classList.toggle('visually-hidden');
  //   } else if (data.hits && data.hits.length > 0) {
  //     const markup = renderImage(data.hits);
  //     list.insertAdjacentHTML("beforeend", markup);
  //     loader.classList.toggle('visually-hidden');
  //     loadMoreBtn.classList.remove('visually-hidden');

  //     let lightbox = new SimpleLightbox('.gallery a', {
  //       captions: true,
  //       captionDelay: 250,
  //       captionPosition: 'bottom',
  //       captionsData: 'alt',
  //     });

  //     lightbox.refresh();
  //   } else {
  //     iziToast.error({
  //       position: "topRight",
  //       message: 'Sorry, there are no images matching your search query. Please try again!',
  //     })
  //     loader.classList.toggle('visually-hidden');
  //   }
  // } catch (err) {
  //     console.log(err);
  //     iziToast.error({
  //       position: "topRight",
  //       message: 'Sorry, the request cant be completed at this time. Please try again',
  //     })
  //   };

  input.value = '';
});

loadMoreBtn.addEventListener('click', async () => {
  currentPage += 1;
  loader.classList.remove('visually-hidden');
  loadMoreBtn.classList.add('visually-hidden');

  loadImages();

  // try {
  //   const data = await getImages(currentQuery, currentPage);
  //   if (data.hits && data.hits.length > 0) {
  //     const markup = renderImage(data.hits);
  //     list.insertAdjacentHTML("beforeend", markup);
  //     loader.classList.remove('visually-hidden');
  //     loadMoreBtn.classList.add('visually-hidden');

  //     const lightbox = new SimpleLightbox('.gallery a', {
  //       captions: true,
  //       captionDelay: 250,
  //       captionPosition: 'bottom',
  //       captionsData: 'alt',
  //     });

  //     lightbox.refresh();
  //   } else {
  //     iziToast.error({
  //       position: "topRight",
  //       message: 'Sorry, there are no more images to load.',
  //     });
  //     loadMoreBtn.classList.add('visually-hidden');
  //   }
  // } catch (err) {
  //   console.log(err);
  //   iziToast.error({
  //     position: "topRight",
  //     message: 'Sorry, the request cannot be completed at this time. Please try again.',
  //   });
  // }

  loader.classList.add('visually-hidden');
  loadMoreBtn.classList.remove('visually-hidden');
});


async function loadImages() {
  try {
    const data = await getImages(currentQuery, currentPage);
     if (data.hits && data.hits.length > 0) {
      const markup = renderImage(data.hits);
      list.insertAdjacentHTML("beforeend", markup);
      loader.classList.toggle('visually-hidden');
      loadMoreBtn.classList.remove('visually-hidden');

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
      loader.classList.toggle('visually-hidden');
    }
  } catch (err) {
      console.log(err);
      iziToast.error({
        position: "topRight",
        message: 'Sorry, the request can\'t be completed at this time. Please try again',
      })
    };
}