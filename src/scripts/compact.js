let compact = false;
const matchList = document.getElementById("sr-widget");
const pressureStats = document.getElementById("pressure-stats");
const timeMachine = document.getElementById("time-machine");
const footer = document.getElementById("footer");
const divider = document.querySelectorAll(".divider");
const whill = document.getElementById("william-hill");
const reloadWh = document.getElementById("reload-wh");
const reloadWhBtn = document.getElementById("reload-wh-btn");
const responseReload = document.getElementById("response-reload");

let home;
let away;

const strSim = require("string-similarity");

async function findId(home, away) {
  const compare = await store.get("matches").reduce(
    (acc, match) => {
      if (match.home.includes("vs")) return acc;

      const str = `${match.home} ${match.away}`;
      const str2 = `${home} ${away}`;

      const concatSimilarity = strSim.compareTwoStrings(str, str2);
      const homeSimilarity = strSim.compareTwoStrings(match.home, home);
      const awaySimilarity = strSim.compareTwoStrings(match.away, away);
      // const mostSimilar = Math.max(
      //   concatSimilarity,
      //   homeSimilarity,
      //   awaySimilarity
      // );
      const mostSimilar2 =
        (concatSimilarity * 2 + homeSimilarity + awaySimilarity) / 4;

      if (mostSimilar2 > acc.similarity && mostSimilar2 > 0.4) {
        return { ...match, similarity: mostSimilar2 };
      }

      return acc;
    },
    { similarity: 0 }
  );

  console.log("find", compare);
  return compare?.id;
}

function changeMode(id) {
  if (id !== 0) {
    whill.style.display = compact ? "" : "none";
  } else {
    reloadWh.style.display = compact ? "" : "none";
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
    const id = (await findId(home, away)) || 0;
    whill.src = `https://sports.whcdn.net/scoreboards/app/football/index.html?eventId=${id}&sport=football&locale=pt-pt&streamingAvailable=false&showSuggestions=true&expandDetails=true&showStreaming=false`;
    changeMode(id);
  }

  if (e.keyCode === 13 && e.altKey && e.ctrlKey) {
    console.log("req update");
    api.getData(true);
  }
});

reloadWhBtn.addEventListener("click", async () => {
  const id = (await findId(home, away)) || 0;
  whill.src = `https://sports.whcdn.net/scoreboards/app/football/index.html?eventId=${id}&sport=football&locale=pt-pt&streamingAvailable=false&showSuggestions=true&expandDetails=true&showStreaming=false`;
  responseReload.innerText = "N??o encontrado";
  changeMode(id);
});
