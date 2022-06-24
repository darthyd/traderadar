const { BrowserWindow, app } = require("electron");
const puppeteer = require("puppeteer-core");
const pie = require("puppeteer-in-electron");

module.exports = async function getDayMatches() {
  console.log("getDayMatches is called");
  const browser = await pie.connect(app, puppeteer);
  const window = new BrowserWindow({
    show: false,
    webPreferences: { nodeIntegration: true },
  });

  console.log("initiate puppetter");

  await window.loadURL(
    `https://sports.williamhill.com/betting/en-gb/football/matches/competition/today/match-betting`
  );

  const page = await pie.getPage(browser, window);

  const dataMatches = await page.evaluate(async () => {
    function sleep(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    }

    sleep(5000);

    const distance = 100;
    const delay = 500;

    while (
      document.scrollingElement.scrollTop + window.innerHeight <
      document.scrollingElement.scrollHeight
    ) {
      document.scrollingElement.scrollBy(0, distance);
      await sleep(delay);
    }

    sleep(2000);

    const matches = document.querySelectorAll("article.sp-o-market--default");

    const arr = [];

    matches.forEach((e) => {
      if (!e.childNodes[1].childNodes[1].href || !e.childNodes[1].textContent) {
        return;
      }
      arr.push({
        id: e.childNodes[1].childNodes[1].href.split("OB_EV")[1].split("/")[0],
        home: e.childNodes[1].textContent.split(" v ")[0].trim(),
        away: e.childNodes[1].textContent.split(" v ")[1].trim(),
      });
    });

    return arr;
  });

  console.log("exiting puppeteer");

  window.destroy();

  console.log("getDayMatches is returning", dataMatches);

  return dataMatches;
};
