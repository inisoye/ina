let inc = 1000;

function setLocalTime() {
  let date = new Date();

  let second = date.getSeconds();
  let minute = date.getMinutes();
  let hour = date.getHours();

  // *Angles defined
  let hourAngle  = hour * 30 + minute / 2;
  let minuteAngle = minute * 6;
  let secondAngle = second * 6;

  document.getElementById(
    "second-hand"
  ).style.transform = `rotateZ(${secondAngle}deg)`;
  document.getElementById(
    "minute-hand"
  ).style.transform = `rotateZ(${minuteAngle}deg)`;
  document.getElementById(
    "hour-hand"
  ).style.transform = `rotateZ(${hourAngle}deg)`;
}

setInterval(setLocalTime, inc);