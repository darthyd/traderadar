let compact = false;
const matchList = document.getElementById("sr-widget");
const pressureStats = document.getElementById("pressure-stats");
const timeMachine = document.getElementById("time-machine");
const footer = document.getElementById("footer");
const divider = document.querySelectorAll(".divider");
const whill = document.getElementById("william-hill");
const strSim = require("string-similarity");

async function findId(home, away) {
  const localData = localStorage.getItem("matches");
  const dataMatches = await JSON.parse(localData);
  const str2 = `${home} ${away}`;

  if (!dataMatches) return;

  const compare = await dataMatches.reduce(
    (acc, match) => {
      const str = `${match.home} ${match.away}`;

      const concatSimilarity = strSim.compareTwoStrings(str, str2);
      const homeSimilarity = strSim.compareTwoStrings(match.home, home);
      const awaySimilarity = strSim.compareTwoStrings(match.away, away);
      const mostSimilar = Math.max(
        concatSimilarity,
        homeSimilarity,
        awaySimilarity
      );

      if (mostSimilar > acc.similarity) {
        return { ...match, similarity: mostSimilar };
      }

      return acc;
    },
    { similarity: 0 }
  );

  console.log("find", compare);
  return compare?.id;
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
    const id = (await findId(home, away)) || 0;
    whill.src = `https://sports.whcdn.net/scoreboards/app/football/index.html?eventId=${id}&sport=football&locale=pt-pt&streamingAvailable=false&showSuggestions=true&expandDetails=true&showStreaming=false`;
    changeMode(id);
  }

  if (e.keyCode === 13 && e.altKey && e.ctrlKey) {
    console.log("req update");
    api.getData(true);
  }
});
