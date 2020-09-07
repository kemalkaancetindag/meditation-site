const app = () => {
  const song = document.querySelector(".song");
  const play = document.querySelector(".play");
  const outline = document.querySelector(".moving-outline circle");
  const video = document.querySelector(".vid-container video");

  //sounds

  const sounds = document.querySelectorAll(".sound-picker button");
  //time display
  const timeDisplay = document.querySelector(".time-display");
  const timeSelect = document.querySelectorAll(".time-select button");
  //Get the legth of the outline
  const outlineLength = outline.getTotalLength();

  //Duration
  let fakeDuration = 600;

  outline.style.strokeDasharray = outlineLength;
  outline.style.strokeDashoffset = outlineLength;

  //Pick Different Sounds

  sounds.forEach((sound) => {
    sound.addEventListener("click", function () {
      song.src = this.getAttribute("data-sound");
      video.src = this.getAttribute("data-video");
      checkPlaying(song);
    });
  });

  //Play sound
  play.addEventListener("click", () => {
    checkPlaying(song);
  });

  //Select Sound
  timeSelect.forEach((option) => {
    option.addEventListener("click", function () {
      fakeDuration = this.getAttribute("data-time");
      timeDisplay.textContent = `${Math.floor(fakeDuration / 60)}:${Math.floor(
        fakeDuration % 60
      )}`;
    });
  });

  //Create a function specific to stop and play the sounds
  const checkPlaying = (song) => {
    if (song.paused) {
      song.play();
      video.play();
      play.src = "./svg/pause.svg";
    } else {
      song.pause();
      video.pause();
      play.src = "./svg/play.svg";
    }
  };

  //Animate the circle
  song.ontimeupdate = () => {
    let currenTime = song.currenTime;
    let elaspsed = fakeDuration - currenTime;
    let seconds = Math.floor(elaspsed % 60);
    let minutes = Math.floor(elaspsed / 60);

    //Animate the circle
    let progress = outlineLength - (currenTime / fakeDuration) * outlineLength;
    outline.style.strokeDashoffset = progress;
    //Animate The text
    timeDisplay.textContent = `${minutes}:${seconds}`;

    if (currenTime >= fakeDuration) {
      song.pause();
      song.currenTime = 0;
      play.src = "./svg/play.svg";
      video.pause();
    }
  };
};

app();
