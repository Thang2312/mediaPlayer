$(document).ready(function () {
  const volumeControl = document.querySelector("#volume")
  const player = document.querySelector('#player');
  const timeLine = document.querySelector("#timeline");
  const btnRandom = document.querySelector("#random");
  let isRepeating = false;
  var isRandomized = false;
  volumeControl.addEventListener('change', function () {
    player.volume = volumeControl.value / 10;
  });

  $("#player").on("canplaythrough", function (e) {
    var seconds = e.currentTarget.duration;
    setMusicTime(seconds);
    timeLine.setAttribute("max", Math.round(seconds));
  });

  btnRandom.addEventListener("click", () => {
    if (!isRandomized) {
      btnRandom.classList.add('on');
      isRandomized = true;
    } else {
      btnRandom.classList.remove('on');
      isRandomized = false;
    }
  });

  document.querySelectorAll('.list-item').forEach((listItem) => {
    listItem.addEventListener('click', () => {
      if (listItem.classList.contains("isPlaying")) {
        if (listItem.querySelector('button.btn').classList.contains("icon-pause")) {
          player.pause();
          listItem.querySelector('button.btn').classList.remove('icon-pause');
          listItem.querySelector('button.btn').classList.add('icon-play');
          document.querySelector('#btn-play').classList.remove('icon-pause');
          document.querySelector('#btn-play').classList.add('icon-play');
        } else {
          player.play();
          listItem.querySelector('button.btn').classList.remove('icon-play');
          listItem.querySelector('button.btn').classList.add('icon-pause');
          document.querySelector('#btn-play').classList.remove('icon-play');
          document.querySelector('#btn-play').classList.add('icon-pause');
        }
      } else {
        const playingSpan = document.querySelector('.isPlaying');
        if (playingSpan) {
          playingSpan.classList.remove("isPlaying");
          playingSpan.removeChild(playingSpan.querySelector('#list-icon-0'));
          playingSpan.querySelector('button.btn').classList.remove('icon-pause');
          playingSpan.querySelector('button.btn').classList.add('icon-play');
          document.querySelector('#btn-play').classList.remove('icon-pause');
          document.querySelector('#btn-play').classList.add('icon-play');
        }

        listItem.classList.add('isPlaying');
        listItem.querySelector('button.btn').classList.add('icon-pause');
        listItem.querySelector('button.btn').classList.remove('icon-play');
        document.querySelector('#btn-play').classList.remove('icon-play');
        document.querySelector('#btn-play').classList.add('icon-pause');
        const songName = listItem.querySelector('span').innerText;
        player.src = `/static/music/${songName}`;
        player.play();
        listItem.innerHTML += `<span id="list-icon-0" class="sound-wave playing">
                                  <span class="bar"></span>
                                  <span class="bar"></span>
                                  <span class="bar"></span>
                              </span>`;

      }
    });
  });
  document.querySelector('#next').addEventListener('click', () => {
    let listItems = document.querySelectorAll('.list-item');
    for (let i = 0; i < listItems.length; i++) {
      let listItem = listItems[i];
      if (listItem.classList.contains('isPlaying')) {
        let scrollTop = listItem.offsetTop;
        document.querySelector('.play-list-wrap').scrollTo(0, scrollTop);

        if (!isRandomized) {
          var itemNext = listItem.nextElementSibling;
          console.log('not RamDom');
        } else {
          var itemNext = listItem.nextElementSibling;
          console.log('Da radom');
        }
        if (!itemNext) {
          itemNext = listItems[0];
          document.querySelector('.play-list-wrap').scrollTo(0, 0);
        }
        listItem.classList.remove('isPlaying');
        listItem.querySelector('button.btn').classList.remove('icon-pause');
        listItem.querySelector('button.btn').classList.add('icon-play');
        listItem.removeChild(listItem.querySelector('#list-icon-0'));
        itemNext.classList.add('isPlaying');
        itemNext.querySelector('button.btn').classList.add('icon-pause');
        itemNext.querySelector('button.btn').classList.remove('icon-play');
        const songName = itemNext.querySelector('span').innerText;
        player.src = `/static/music/${songName}`;
        player.play();
        itemNext.innerHTML += `<span id="list-icon-0" class="sound-wave playing">
                                    <span class="bar"></span>
                                    <span class="bar"></span>
                                    <span class="bar"></span>
                                </span>`;

        return 0;
      }
    }
  });
  document.querySelector('#prev').addEventListener('click', () => {
    let listItems = document.querySelectorAll('.list-item');
    for (let i = 0; i < listItems.length; i++) {
      let listItem = listItems[i];
      if (listItem.classList.contains('isPlaying')) {
        let itemPrev = listItem.previousElementSibling;
        if (!itemPrev) {
          itemPrev = listItems[listItems.length - 1];
        }
        listItem.classList.remove('isPlaying');
        listItem.querySelector('button.btn').classList.remove('icon-pause');
        listItem.querySelector('button.btn').classList.add('icon-play');
        listItem.removeChild(listItem.querySelector('#list-icon-0'));
        itemPrev.classList.add('isPlaying');
        itemPrev.querySelector('button.btn').classList.add('icon-pause');
        itemPrev.querySelector('button.btn').classList.remove('icon-play');
        const songName = itemPrev.querySelector('span').innerText;
        player.src = `/static/music/${songName}`;
        player.play();
        itemPrev.innerHTML += `<span id="list-icon-0" class="sound-wave playing">
                                    <span class="bar"></span>
                                    <span class="bar"></span>
                                    <span class="bar"></span>
                                </span>`;

        return 0;
      }
    }
  });
  document.querySelector('#btn-play').addEventListener('click', () => {
    if (document.querySelector('#btn-play').classList.contains("icon-pause")) {
      player.pause();
      document.querySelector('#btn-play').classList.remove('icon-pause');
      document.querySelector('#btn-play').classList.add('icon-play');
    } else {
      player.play();
      document.querySelector('#btn-play').classList.remove('icon-play');
      document.querySelector('#btn-play').classList.add('icon-pause');
    }
    if (document.querySelector('.isPlaying button.btn').classList.contains("icon-pause")) {
      player.pause();
      document.querySelector('.isPlaying button.btn').classList.remove('icon-pause');
      document.querySelector('.isPlaying button.btn').classList.add('icon-play');
    } else {
      player.play();
      document.querySelector('.isPlaying button.btn').classList.remove('icon-play');
      document.querySelector('.isPlaying button.btn').classList.add('icon-pause');
    }
  });
  document.querySelector("#repeat").addEventListener('click', () => {
    btnRepeat = document.querySelector("#repeat");
    audio = document.querySelector("#player");
    if (isRepeating === false) {
      btnRepeat.classList.add("on");
      audio.setAttribute("loop", "");
      isRepeating = true;
    } else {
      btnRepeat.classList.remove("on");
      audio.removeAttribute("loop");
      isRepeating = false;
    }
  });
  player.addEventListener("timeupdate", function () {
    musicCountUpdate(Math.floor(player.currentTime));
  });

  player.onended = function () {
    let audioActive = document.querySelector('.list-item.isPlaying');
    let itemNext = audioActive.nextElementSibling;
    let scrollTop = itemNext.offsetTop;
    document.querySelector('.play-list-wrap').scrollTo(0, scrollTop);
    if (!itemNext) {
      itemNext = listItems[0];
      document.querySelector('.play-list-wrap').scrollTo(0, 0);
    }
    audioActive.classList.remove('isPlaying');
    audioActive.querySelector('button.btn').classList.remove('icon-pause');
    audioActive.querySelector('button.btn').classList.add('icon-play');
    audioActive.removeChild(audioActive.querySelector('#list-icon-0'));
    itemNext.classList.add('isPlaying');
    itemNext.querySelector('button.btn').classList.add('icon-pause');
    itemNext.querySelector('button.btn').classList.remove('icon-play');
    const songName = itemNext.querySelector('span').innerText;
    player.src = `/static/music/${songName}`;
    player.play();
    itemNext.innerHTML += `<span id="list-icon-0" class="sound-wave playing">
                                    <span class="bar"></span>
                                    <span class="bar"></span>
                                    <span class="bar"></span>
                                </span>`;

    return 0;
  };
});


function setMusicTime(time) {
  const musicTime = document.querySelector("#time");
  musicTime.innerHTML = formatTime(Math.round(time));
};

function formatTime(digitalTime) {
  if (isNaN(digitalTime) || digitalTime == "" || typeof digitalTime != 'number') {
    return "00:00";
  }
  let hours = parseInt(digitalTime / 3600) % 24;
  let minutes = parseInt(digitalTime / 60) % 60;
  let seconds = parseInt(digitalTime % 60);
  if (hours > 0) {
    var result = (hours < 10 ? "0" + hours : hours) + ":" + (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds < 10 ? "0" + seconds : seconds);
  } else {
    var result = (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds < 10 ? "0" + seconds : seconds);
  }
  return result;
}

function musicCountUpdate() {
  const musicTimeCount = document.querySelector("#time-count");
  musicTimeCount.innerHTML = formatTime(Math.round(player.currentTime));
  document.getElementById('timeline').value = Math.round(player.currentTime);
}