import SimpleLightbox from "simplelightbox";

import "simplelightbox/dist/simple-lightbox.min.css";

import { galleryItems } from './gallery-items.js';

let isModalOpen = false;

const galleryList = document.querySelector('.gallery');

function createGalleryItemMarkup(item) {
  return `
    <li class="gallery__item">
      <a class="gallery__link" href="${item.original}">
        <img
          class="gallery__image"
          src="${item.preview}"
          data-source="${item.original}"
          alt="${item.description}"
        />
      </a>
    </li>
  `;
}

const galleryItemsMarkup = galleryItems.map(createGalleryItemMarkup).join('');

galleryList.insertAdjacentHTML('beforeend', galleryItemsMarkup);

galleryList.addEventListener('click', handleGalleryItemClick);

function handleGalleryItemClick(event) {
  event.preventDefault();

  if (event.target.nodeName !== 'IMG') {
    return;
  }

  const originalImageUrl = event.target.dataset.source;

  const modal = basicLightbox.create(
    `<img src="${originalImageUrl}" width="800" height="600">`
  );

  modal.show();

  isModalOpen = true;

  document.addEventListener('keydown', handleKeyPress);

  function handleKeyPress(event) {
    if (event.key === 'Escape' && isModalOpen) {
      modal.close();
      isModalOpen = false;
      document.removeEventListener('keydown', handleKeyPress);
    }
  }
}

console.log(galleryItems);
