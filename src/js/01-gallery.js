import SimpleLightbox from "simplelightbox";

import "simplelightbox/dist/simple-lightbox.min.css";

import { galleryItems } from './gallery-items.js';

const galleryList = document.querySelector('.gallery');

function createGalleryItemMarkup(item) {
  return `
    <li class="gallery__item">
      <a class="gallery__link" href="${item.original}" data-alt="${item.description}">
        <img
          class="gallery__image"
          src="${item.preview}"
          alt="${item.description}"
        />
      </a>
    </li>
  `;
}

const galleryItemsMarkup = galleryItems.map(createGalleryItemMarkup).join('');

galleryList.insertAdjacentHTML('beforeend', galleryItemsMarkup);

const lightbox = new SimpleLightbox('.gallery a', {
  captions: true, 
  captionDelay: 250, 
  captionsData: 'alt', 
});

lightbox.on('show.simplelightbox', () => {
  document.addEventListener('keydown', handleKeyPress);
});

lightbox.on('close.simplelightbox', () => {
  document.removeEventListener('keydown', handleKeyPress);
});

function handleKeyPress(event) {
  if (event.key === 'Escape') {
    lightbox.close();
  }
}

console.log(galleryItems);
