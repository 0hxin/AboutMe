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

// title
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
$(".title").spanLetters();

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
// information Btn
document.addEventListener("DOMContentLoaded", function () {
  const informationButtons = document.querySelectorAll(".InformationBtn");
  informationButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const name = this.id;
      informationClick(name);
    });
  });
  // 페이지가 로드될 때 "Profile" 버튼을 기본으로 클릭된 상태로 설정
  informationClick("Profile");
});
function informationClick(name) {
  // 선택된 버튼에 스타일 적용
  const selectedButton = document.getElementById(name);
  const section = document.getElementById("My" + name);
  console.log(section);
  const informationSections = document.querySelectorAll(".InformationSection");
  const informationButtons = document.querySelectorAll(".InformationBtn");

  // 모든 버튼의 클래스 제거
  informationButtons.forEach((button) => {
    button.classList.remove("Click");
  });
  // 모든 섹션을 숨김 처리
  informationSections.forEach((div) => {
    div.style.display = "none";
  });
  // 선택된 버튼에 클래스 추가 및 해당 섹션 표시
  selectedButton.classList.add("Click");
  section.style.display = "flex";
}
// img 태그 경로설정
$(document).ready(function () {
  $(".User").attr("src", "images/user.png");
  $(".Birthday").attr("src", "images/birthday.png");
  $(".School").attr("src", "images/school.png");
  $(".Game").attr("src", "images/game.png");
  $(".Music").attr("src", "images/music.png");
});

// Skill Btn Text
document.addEventListener("DOMContentLoaded", function () {
  const skillButtons = document.querySelectorAll(".SkillBtn");
  skillButtons.forEach((button) => {
    button.innerHTML = button.id;
  });
  // 페이지가 로드될 때 "JAVA" 버튼을 기본으로 클릭된 상태로 설정
  SkillButton("JAVA");
});

let currentSkillIndex = 0;
const skillNames = ["JAVA", "Python", "C++", "Oracle"];

function changeSkill(direction) {
  if (direction === "next") {
    currentSkillIndex = (currentSkillIndex + 1) % skillNames.length;
  } else if (direction === "before") {
    currentSkillIndex =
      (currentSkillIndex - 1 + skillNames.length) % skillNames.length;
  }
  const currentSkill = skillNames[currentSkillIndex];
  SkillButton(currentSkill);
  // span 엘리먼트 업데이트
  const currentSkillSpan = document.getElementById("currentSkill");
  currentSkillSpan.textContent = currentSkill;
}

function SkillButton(name) {
  const SkillStyles = {
    JAVA: {
      text: "JAVA",
      percentage: 92,
      color: "#C5D3F5",
    },
    Python: {
      text: "Python",
      percentage: 84,
      color: "#C5D3F5",
    },
    "C++": {
      text: "C++",
      percentage: 85,
      color: "#C5D3F5",
    },
    Oracle: {
      text: "Oracle",
      percentage: 93,
      color: "#C5D3F5",
    },
  };
  const SkillSpans = document.querySelectorAll(".SkillBtnSpan");
  SkillSpans.forEach((span) => {
    span.classList.remove("SelectSkill");
  });
  const SelectSpan = document.getElementById(name);
  SelectSpan.classList.add("SelectSkill");

  Object.keys(SkillStyles).forEach((key) => {
    const SkillName = SkillStyles[key].text.trim();
    if (name === SkillName) {
      drawDonutChart(
        SkillStyles[key].percentage,
        SkillStyles[key].color,
        SkillStyles[key].text
      );
    }
  });
}

function drawDonutChart(percentage, color) {
  const ChartSection = document.getElementsByClassName("AboutSkillSection")[0];
  const width = ChartSection.clientWidth;
  const height = ChartSection.clientHeight;

  console.log("Width: ", width, "Height: ", height); // 크기 확인을 위한 로그

  // 기존 차트를 제거
  d3.select("#Skillchart").selectAll("*").remove();
  const radius = Math.min(width, height) / 2;

  const svg = d3
    .select("#Skillchart")
    .append("svg")
    .attr("viewBox", `0 0 ${width} ${height}`)
    .attr("preserveAspectRatio", "xMidYMid meet")
    .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

  const data = { value: percentage, rest: 100 - percentage };
  const pie = d3
    .pie()
    .value((d) => d.value)
    .sort(null);

  const data_ready = pie(d3.entries(data));
  const arc = d3
    .arc()
    .innerRadius(radius * 0.5)
    .outerRadius(radius * 0.7)
    .cornerRadius(radius * 0.5); // 둥근 끝을 설정

  svg
    .selectAll("slices")
    .data(data_ready)
    .enter()
    .append("path")
    .attr("d", arc)
    .attr("fill", (d) => (d.data.key === "value" ? color : "white"))
    .style("stroke-linecap", "round") // 둥근 끝을 설정
    .transition()
    .duration(3000)
    .attrTween("d", function (d) {
      const i = d3.interpolate(
        { startAngle: -0.5 * Math.PI, endAngle: -0.5 * Math.PI },
        d
      );
      return function (t) {
        return arc(i(t));
      };
    });

  // 반응형 폰트 크기 설정
  const fontSize = Math.min(width, height) / 10;

  // 차트 중앙에 텍스트 추가
  svg
    .append("text")
    .attr("text-anchor", "middle")
    .attr("font-size", fontSize + "px") // 반응형 폰트 크기
    .attr("font-family", "HakgyoansimWoojuR")
    .attr("fill", "black")
    .attr("dy", "0.35em")
    .text(0)
    .transition()
    .duration(3000)
    .tween("text", function () {
      const that = d3.select(this);
      const i = d3.interpolateNumber(0, percentage);
      return function (t) {
        that.text(Math.round(i(t)) + "%");
      };
    });
}
