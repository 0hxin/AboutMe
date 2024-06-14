// 스크롤 시 Fade-In
const observer = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // 화면에 들어옴
        entry.target.classList.add("fade-in");
      } else {
        // 화면에서 나감
        entry.target.classList.remove("fade-in");
      }
    });
  },
  // 화면에서 해당 요소가 50% 이상 보일 경우 화면에 들어온 것으로 판단함
  { threshold: 0.4 }
);

// 관찰 대상 설정
const targetElements = document.querySelectorAll(".fade-wrap");
targetElements.forEach((element) => {
  observer.observe(element);
});

// titleName
(function ($) {
  $.fn.spanLetters = function () {
    this.each(function () {
      var words, i, text;
      words = $(this).text().split("");
      for (i = 0; i in words; i++) {
        words[i] =
          '<span class="sl' + (i + 1) + ' span-letter">' + words[i] + "</span>";
      }
      text = words.join("");
      $(this).html(text);
    });
    return this;
  };
})(jQuery);
$(".titleName").spanLetters();

// 별 생성 및 반짝이는 효과
$(document).ready(function () {
  var starCount = 100; // 별 개수 설정
  var $stars = $(".stars");

  for (var i = 0; i < starCount; i++) {
    var $star = $("<div class='star'></div>");
    var size = Math.random() * 3 + 1; // 1px에서 4px 사이의 크기
    var left = Math.random() * 100; // 0%에서 100% 사이의 위치
    var top = Math.random() * 100; // 0%에서 100% 사이의 위치
    var animationDelay = Math.random() * 5 + "s"; // 0s에서 5s 사이의 딜레이

    $star.css({
      width: size + "px",
      height: size + "px",
      left: left + "%",
      top: top + "%",
      animationDelay: animationDelay,
    });

    $stars.append($star);
  }
});

// btn 클릭 시 스크롤
function goToScroll(name) {
  var loaction = $("#" + name).offset().top;
  window.scrollTo({ top: loaction, behavior: "smooth" });
}

// audio
$(function () {
  const myAudio = new Audio("music.mp3");
  myAudio.volume = 1;
  // 오디오 재생시간 업데이트
  const audioBar = document.getElementById("audioBar");
  const currentTimeSpan = document.getElementById("currentTime");
  const durationSpan = document.getElementById("durationTime");
  myAudio.addEventListener("timeupdate", () => {
    const currentTime = myAudio.currentTime;
    const duration = myAudio.duration;
    audioBar.value = (currentTime / duration) * 100;
    currentTimeSpan.textContent = formatTime(currentTime);
  });

  // 재생바 이동시 오디오 위치 변경
  audioBar.addEventListener("input", () => {
    const duration = myAudio.duration;
    myAudio.currentTime = (audioBar.value / 100) * duration;
  });

  //데이터 로드 시 총 재생시간 표시
  myAudio.addEventListener("loadedmetadata", () => {
    durationSpan.textContent = formatTime(myAudio.duration);
  });

  // 버튼 클릭시 레코드판 회전 애니메이션
  let keyframes = [{ transform: "rotate(360deg)" }];
  let options = {
    delay: 500,
    duration: 5000,
    easing: "linear",
    iterations: Infinity,
  };
  const audioImg = document.getElementById("audioImg");

  // 재생, 멈춤
  const play = document.getElementById("audioPlay");
  play.onclick = function () {
    if (myAudio.paused) {
      play.innerHTML = '<ion-icon name="pause-outline"></ion-icon>';
      myAudio.play();
      audioImg.animate(keyframes, options);
    } else {
      play.innerHTML = '<ion-icon name="caret-forward-outline"></ion-icon>';
      myAudio.pause();

      // 현재 요소의 회전 각도 가져오기
      let computedStyle = window.getComputedStyle(audioImg);
      let transformValue = computedStyle.getPropertyValue("transform");
      let matrix = transformValue.replace(/[^0-9\-.,]/g, "").split(",");
      let angle = Math.round(
        Math.atan2(matrix[1], matrix[0]) * (180 / Math.PI)
      );

      // 천천히 회전을 멈추도록 애니메이션 적용
      audioImg.animate(
        [{ transform: `rotate(${angle}deg)` }, { transform: "rotate(0deg)" }],
        {
          duration: 1000, // 1초 동안 천천히 멈추도록 설정
          easing: "ease-out", // 부드러운 멈춤 효과 적용
          fill: "both", // 애니메이션이 끝나면 해당 상태를 유지하도록 설정
        }
      ).onfinish = function () {
        audioImg.style.transform = "none"; // 애니메이션 완료 후 transform 속성 제거
      };
    }
  };

  // 볼륨조절
  const audioVolume = document.getElementById("audioVolumn");
  audioVolume.onclick = function () {
    if (myAudio.volume === 1.0) {
      myAudio.volume = 0;
      audioVolume.innerHTML = '<ion-icon name="volume-mute"></ion-icon>';
    } else {
      myAudio.volume = 1;
      audioVolume.innerHTML = '<ion-icon name="volume-medium"></ion-icon>';
    }
  };

  // 시간 포맷 함수 (초를 분:초로 변환)
  function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  }
});

$(document).ready(function () {
  $(".User").attr("src", "images/user.png");
  $(".Birthday").attr("src", "images/birthday.png");
  $(".School").attr("src", "images/school.png");
  $(".Game").attr("src", "images/game.png");
  $(".Music").attr("src", "images/music.png");
});
