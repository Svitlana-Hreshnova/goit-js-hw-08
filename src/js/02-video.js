import Player from '@vimeo/player';

import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

function saveCurrentTime(time) {
  localStorage.setItem('videoplayer-current-time', time);
}

function restoreCurrentTime() {
  const savedTime = localStorage.getItem('videoplayer-current-time');
  if (savedTime) {
    player.setCurrentTime(parseFloat(savedTime)).then(() => {
      player.play();
    });
  }
}

player.on('timeupdate', throttle((event) => {
  const currentTime = event.seconds;
  saveCurrentTime(currentTime);
}, 1000));

document.addEventListener('DOMContentLoaded', () => {
  restoreCurrentTime();
});

player.on('play', function () {
  console.log('played the video!');
});

player.getVideoTitle().then(function (title) {
  console.log('title:', title);
});

