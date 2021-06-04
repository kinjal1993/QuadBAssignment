const FULL_DASH_ARRAY = 283;
const WARNING_THRESHOLD = 10;
const ALERT_THRESHOLD = 5;

const COLOR_CODES = {
  info: {
    color: "green"
  },
  warning: {
    color: "orange",
    threshold: WARNING_THRESHOLD
  },
  alert: {
    color: "red",
    threshold: ALERT_THRESHOLD
  }
};

const TIME_LIMIT = 60;
let timePassed = 0;
let timeLeft = TIME_LIMIT;
let timerInterval = null;
let remainingPathColor = COLOR_CODES.info.color;

document.getElementById("countdown").innerHTML = `
<div class="base-timer">
  <svg class="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <g class="base-timer__circle">
      <circle class="base-timer__path-elapsed" cx="50" cy="50" r="45"></circle>
      <path
        id="base-timer-path-remaining"
        stroke-dasharray="283"
        class="base-timer__path-remaining ${remainingPathColor}"
        d="
          M 50, 50
          m -45, 0
          a 45,45 0 1,0 90,0
          a 45,45 0 1,0 -90,0
        "
      ></path>
    </g>
  </svg>
  <span id="base-timer-label" class="base-timer__label">${formatTime(
  timeLeft
)}</span>
</div>
`;

async function getData(url = '') {
  const response = await fetch(url);
  return response.json();
}

startTimer();

function onTimesUp() {
  clearInterval(timerInterval);
  startTimer();
}

function startTimer() {
  document.getElementById("loader").style.display = "block";
  document.getElementById("crypto-table").style.display = "none";
  getData('/crypto-data')
    .then(res => {
      if (!res.error) {
        const data = res.data;
        let html = "";
        for (let i = 0; i < data.length; i++) {
          html += "<tr class='active'>";
          html += "<td>"+(i+1)+"</td>";
          html += "<td>"+data[i].name+"</td>";
          html += "<td>"+data[i].last+"</td>";
          html += "<td>"+data[i].buy_sell+"</td>";
          html += "<td>"+data[i].volume+"</td>";
          html += "<td>"+data[i].base_unit+"</td>";
          html += "</tr>";
        }
        document.getElementById("price-table-body").innerHTML = html;
        document.getElementById("crypto-table").style.display = "table";
        document.getElementById("loader").style.display = "none";
        timePassed = 0;
        timerInterval = setInterval(() => {
          timePassed = timePassed += 1;
          timeLeft = TIME_LIMIT - timePassed;
          document.getElementById("base-timer-label").innerHTML = formatTime(
            timeLeft
          );
          setCircleDasharray();

          if (timeLeft === 0) {
            onTimesUp();
          }
        }, 1000);
      }
    });


}

function formatTime(time) {
  const minutes = Math.floor(time / 60);
  let seconds = time % 60;

  if (seconds < 10) {
    seconds = `0${seconds}`;
  }

  //return `${minutes}:${seconds}`;
  return `${seconds}`;
}

function calculateTimeFraction() {
  const rawTimeFraction = timeLeft / TIME_LIMIT;
  return rawTimeFraction - (1 / TIME_LIMIT) * (1 - rawTimeFraction);
}

function setCircleDasharray() {
  const circleDasharray = `${(
    calculateTimeFraction() * FULL_DASH_ARRAY
  ).toFixed(0)} 283`;
  document
    .getElementById("base-timer-path-remaining")
    .setAttribute("stroke-dasharray", circleDasharray);
}