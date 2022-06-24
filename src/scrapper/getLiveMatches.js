const { BrowserWindow, app } = require("electron");
const puppeteer = require("puppeteer-core");
const pie = require("puppeteer-in-electron");

module.exports = async function getLiveMatches() {
  console.log("getLiveMatches is called");
  const browser = await pie.connect(app, puppeteer);
  const window = new BrowserWindow({
    show: false,
    webPreferences: { nodeIntegration: true },
  });

  console.log("initiate puppetter");

  await window.loadURL(
    `https://sports.williamhill.com/betting/en-gb/in-play/football`
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

    const inLive = document.querySelectorAll(
      "a.btmarket__name.btmarket__name--featured"
    );

    const arr = [];

    inLive.forEach((e) => {
      if (!e.innerText || !e.href) return;
      arr.push({
        id: Number(e.href.split("OB_EV")[1].split("/")[0]),
        home: e.innerText.split(" v ")[0],
        away: e.innerText.split(" v ")[1],
      });
    });

    return arr;
  });

  console.log("exiting puppeteer");

  window.destroy();

  console.log("getLiveMatches is returning", dataMatches);

  return dataMatches;
};
