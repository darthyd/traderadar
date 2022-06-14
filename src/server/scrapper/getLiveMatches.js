const puppeteer = require("puppeteer");

module.exports = async function getLiveMatches() {
  console.log("getLiveMatches is called");
  const browser = await puppeteer.launch({
    headless: true,
    devtools: false,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  console.log("initiate puppetter");

  const page = await browser.newPage();

  await page.goto(
    `https://sports.williamhill.com/betting/en-gb/in-play/football`,
    {
      waitUntil: "networkidle2",
    }
  );

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
      arr.push({
        id: Number(e.href.split("OB_EV")[1].split("/")[0]),
        home: e.innerText.split(" v ")[0].trim(),
        away: e.innerText.split(" v ")[1].trim(),
      });
    });

    return arr;
  });

  console.log("exiting puppeteer");

  await browser.close();

  console.log("getLiveMatches is returning", dataMatches);

  return dataMatches;
};
