let matchID = 0;
let compact = false;
const matchList = document.getElementById("sr-widget");
const pressureStats = document.getElementById("pressure-stats");
const timeMachine = document.getElementById("time-machine");
const footer = document.getElementById("footer");
const divider = document.querySelectorAll(".divider");
const activeMatch = document.querySelector(".srt-base-1-is-active");
const whill = document.getElementById("william-hill");

console.log("compact");

async function findId(home, away) {
  const dataMatches = await fetch("http://localhost:3000/api/matches").then(
    (res) => res.json()
  );
  if (dataMatches.length === 0)
    res.send(
      "Sem dados. Verifique a requisição ou tente Novamente mais tarde."
    );
  const filtered = dataMatches.find((match) => {
    return (
      match.home.toLowerCase().includes(home.toLowerCase()) &&
      match.away.toLowerCase().includes(away.toLowerCase())
    );
  });
  console.log("find", filtered);
  return filtered?.id;
}

function changeMode(id) {
  console.log(id);
  if (id !== 0) {
    whill.style.display = compact ? "" : "none";
  }
  matchList.style.display = compact ? "none" : "";
  pressureStats.style.display = compact ? "none" : "";
  timeMachine.style.display = compact ? "none" : "";
  footer.style.display = compact ? "none" : "";
  divider.forEach((e) => {
    e.style.display = compact ? "none" : "";
  });
}

document.addEventListener("keydown", async (e) => {
  if (e.keyCode === 32 && e.ctrlKey) {
    compact = !compact;
    matchID = document.querySelector(".srt-base-1-is-active").parentNode.dataset
      .srMatchId;
    home = document
      .querySelector(".srt-base-1-is-active")
      .querySelector(".srm-left").textContent;
    away = document
      .querySelector(".srt-base-1-is-active")
      .querySelector(".srm-right").textContent;
    // const id = (await findId(home, away)) || 0;
    const id = 0;
    whill.src = `https://sports.whcdn.net/scoreboards/app/football/index.html?eventId=${id}&sport=football&locale=pt-pt&streamingAvailable=false&showSuggestions=true&expandDetails=true&showStreaming=false`;
    changeMode(id);
  }
});
