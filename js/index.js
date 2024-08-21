$(document).ready(function () {
  $("#fullpage").fullpage({
    //options here
    autoScrolling: true,
    scrollingSpeed: 1000,
  });

  let isPageSelect = true;
  // 모바일, 아이패드 화면에서 페이지 전환 이벤트
  window.togglePage = function () {
    console.log(isPageSelect);

    const sections = [
      $(".profileSection"),
      $(".photoSection"),
      $(".instaSection"),
      $(".historySection"),
      $(".timeSection"),
      $(".skillSection"),
    ];

    // 메인 바디의 그리드 템플릿 설정
    $(".mainBody").css({
      "grid-template-columns": "repeat(2, 1fr)",
      "grid-template-rows": isPageSelect ? "0.6fr 1fr" : "1fr 0.6fr",
    });

    // section grid 다시 설정
    $(".photoSection").css({
      "grid-row": "1 / 2",
      "grid-column": "1 / 2",
    });

    $(".instaSection").css({
      "grid-row": "1 / 2",
      "grid-column": "2 / 3",
    });

    $(".profileSection").css({
      "grid-row": "2 / 3",
      "grid-column": "1 / 3",
    });

    $(".historySection").css({
      "grid-row": "1 / 2",
      "grid-column": "1 / 3",
    });

    $(".timeSection").css({
      "grid-row": "2 / 3",
      "grid-column": "1 / 2",
    });

    $(".skillSection").css({
      "grid-row": "2 / 3",
      "grid-column": "2 / 3",
    });

    if (isPageSelect) {
      $("#pageStatus").text("PageTwo");
      $(".mainPageToggle").addClass("glowBox");
      $(".mainPageToggle").removeClass("darkGlowBox");
      $(".pageBtn").removeClass("movePage");
      isPageSelect = false;

      for (var i = 0; i < 6; i++) {
        if (i < 3) {
          // sections[i].slideDown("slow");
          sections[i].show();
        } else {
          sections[i].hide();
        }
      }
    } else {
      $("#pageStatus").text("PageOne");
      $(".mainPageToggle").removeClass("glowBox");
      $(".mainPageToggle").addClass("darkGlowBox");
      $(".pageBtn").addClass("movePage");
      isPageSelect = true;

      for (var i = 0; i < 6; i++) {
        if (i < 3) {
          sections[i].hide();
        } else {
          sections[i].show();
          // sections[i].slideDown("slow");
        }
      }
    }
    console.log("이벤트 종료전 " + isPageSelect);
  };

  function windowPaging() {
    $("#history2020").show();
    $("#history2021").hide();
    $("#history2022").hide();
    $("#history2023").hide();

    $("#language").show();
    $("#webFe").hide();
    $("#webBe").hide();
    $("#dbTool").hide();

    const isPhonePortrait = window.matchMedia("(max-width: 575px)").matches;
    const isTabletPortrait = window.matchMedia(
      "(min-width: 768px) and (max-width: 1024px) and (orientation: portrait)"
    ).matches;
    const mainHeader = $(".mainHeader");

    if (isPhonePortrait || isTabletPortrait) {
      $("#timeBox").show();
      $("#dateBox").hide();
      mainHeader.show();
      togglePage();
    } else {
      $("#timeBox").hide();
      $("#dateBox").show();
      mainHeader.hide();
      $(
        ".profileSection, .photoSection, .instaSection, .historySection, .timeSection, .skillSection"
      ).css({ display: "grid" });
    }
  }

  var now = new Date();
  const days = [
    "일요일",
    "월요일",
    "화요일",
    "수요일",
    "목요일",
    "금요일",
    "토요일",
  ];
  const enDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  // header
  $(".timeDate").text(
    (now.getMonth() + 1).toString() +
      "월 " +
      now.getDate().toString() +
      "일 " +
      days[now.getDay()]
  );
  // main - timeSection
  // timeBox, dateBox currentDate
  const currentDate = `${enDays[now.getDay()]} ${now.getDate()}`;
  $("#currentDate").text(currentDate);
  $("#currentDateMonth").text(`${currentDate} ${months[now.getMonth()]}`);
  // timeBox, dateBox 시간
  function updateTime() {
    var now = new Date();
    const hour = now.getHours().toString().padStart(2, "0");
    const minute = now.getMinutes().toString().padStart(2, "0");

    // timeBox
    $("#currentHour").text(hour);
    $("#currentMinute").text(`: ${minute}`);

    // borderBox
    $("#currentTime").text(`${hour} : ${minute}`);
  }
  updateTime();
  setInterval(updateTime, 1000);

  // music
  $(function () {
    const myAudio = new Audio("music.mp3");

    const audioBar = $("#audioBar");
    const audioVolume = $("#audioVolume");
    const playingTimeSpan = $("#playingTime");
    const durationTimeSpan = $("#durationTime");

    // 오디오 재생 시간 업데이트
    myAudio.addEventListener("timeupdate", () => {
      const current = myAudio.currentTime;
      const duration = myAudio.duration;
      const percentage = (current / duration) * 100;
      audioBar.val(percentage); // 재생 바 업데이트
      audioBar.css(
        "background",
        `linear-gradient(to right, rgba(255, 255, 255, 0.616) ${percentage}%, rgba(255, 255, 255, 0.404) ${percentage}%)`
      );
      playingTimeSpan.text(formatTime(current)); // 현재 시간 업데이트
    });

    // 데이터 로드 시 총 재생 시간 표시
    myAudio.addEventListener("loadedmetadata", () => {
      durationTimeSpan.text(formatTime(myAudio.duration));
    });

    // 시간 포맷 함수 (초를 분:초로 변환)
    function formatTime(time) {
      const minutes = Math.floor(time / 60);
      const seconds = Math.floor(time % 60);
      return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    }

    // 시작/멈춤 버튼
    const playButton = $("#audioPlay");
    playButton.on("click", function () {
      if (myAudio.paused) {
        myAudio.play();
        playButton.html('<span class="fa-solid fa-pause"></span>');
      } else {
        myAudio.pause();
        playButton.html('<span class="fa-solid fa-play"></span>');
      }
    });

    // 뒤로 버튼 (10초 뒤로 이동)
    $("#audioBack").on("click", function () {
      myAudio.currentTime = Math.max(0, myAudio.currentTime - 10);
    });

    // 앞으로 버튼 (10초 앞으로 이동)
    $("#audioFront").on("click", function () {
      myAudio.currentTime = Math.min(
        myAudio.duration,
        myAudio.currentTime + 10
      );
    });

    // 재생 바 이동시 오디오 위치 변경
    audioBar.on("input", function () {
      myAudio.currentTime = (audioBar.val() / 100) * myAudio.duration;
    });

    // 슬라이더 클릭 시 오디오 위치 변경
    audioBar.on("click", function (e) {
      const rect = this.getBoundingClientRect();
      const offsetX = e.clientX - rect.left;
      const percentage = (offsetX / rect.width) * 100;
      const newTime = (percentage / 100) * myAudio.duration;
      myAudio.currentTime = newTime;
      audioBar.val(percentage); // 재생 바 업데이트
      audioBar.css(
        "background",
        `linear-gradient(to right, rgba(255, 255, 255, 0.616) ${percentage}%, rgba(255, 255, 255, 0.404) ${percentage}%)`
      );
    });

    // 오디오 볼륨
    // 볼륨 슬라이더 배경 업데이트
    function updateVolumeBackground(volume) {
      const percentage = volume * 100;
      audioVolume.css(
        "background",
        `linear-gradient(to right, rgba(255, 255, 255, 0.616) ${percentage}%, rgba(255, 255, 255, 0.404) ${percentage}%)`
      );
    }
    // 볼륨 조절
    audioVolume.on("input", function () {
      const volume = audioVolume.val();
      myAudio.volume = volume;
      updateVolumeBackground(volume);
    });

    const initialVolume = audioVolume.val();
    myAudio.volume = initialVolume;
    updateVolumeBackground(initialVolume);
  });

  // main - history
  window.historyClick = function (historyId) {
    const historySection = new Set([
      "history2020",
      "history2021",
      "history2022",
      "history2023",
    ]);
    historySection.forEach(function (id) {
      const section = $("#" + id);
      if (id === historyId) {
        // 선택된 섹션은 슬라이드 다운
        if (section.is(":hidden")) {
          section.slideDown("slow");
        }
      } else {
        // 다른 섹션은 모두 숨김
        section.hide();
      }
    });
  };

  // main - skill
  window.skillShow = function (skillId) {
    const skillSection = new Set(["language", "webFe", "webBe", "dbTool"]);
    skillSection.forEach(function (id) {
      const section = $("#" + id);
      if (id === skillId) {
        if (section.is(":hidden")) {
          section.slideDown("slow");
        }
      } else {
        section.hide();
      }
    });
  };

  // footer - 처음으로
  const backSwitch = $("#backSwitch");
  const toggleText = $(".toggleText");
  backSwitch.on("change", function () {
    if (backSwitch.is(":checked")) {
      toggleText.hide("slow");

      setTimeout(function () {
        $.fn.fullpage.moveTo(1);

        setTimeout(function () {
          backSwitch.prop("checked", false);
          toggleText.show("slow");
        }, 1000);
      }, 500);
    }
  });
  // 초기 설정
  windowPaging();
  // 창 크기 변경 시 이벤트
  $(window).resize(function () {
    windowPaging();
  });
});
