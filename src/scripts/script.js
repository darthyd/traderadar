const PRESSURE_STATS_DIV = document.getElementById("pressure-stats");
const BEFORE_STATS_DIV = document.getElementById("stats-before");
let HOME_BARS = [];
let AWAY_BARS = [];
let PRESSURE_BARS = [];
let THREE = "N/A";
let FIVE = "N/A";
let TEN = "N/A";
let TOTAL = "N/A";
let REFERENCE;
const buttonMinute = document.getElementById("submit-minute");
const submitButton = document.getElementById("submit-button");
const inputIdMatch = document.getElementById("input-match-id");


function getPressure(){
    const pressure = [];

    HOME_BARS.childNodes.forEach(item => {
        pressure.push({element: item, min: item.x1.baseVal.value / 10, value: 100 - item.y1.baseVal.value})
    })

    AWAY_BARS.childNodes.forEach(item => {
        pressure.push({element: item, min: item.x1.baseVal.value / 10, value: 0 - item.y2.baseVal.value + 100})
    })

    pressure.sort((a, b) => {
        return a.min - b.min;
    })

    return pressure
}

function getLastBars(bars, nBars) {
    const sliceOfBars = bars.slice(bars.length - nBars)
    return sliceOfBars.length === nBars ? sliceOfBars : "N/A" 
}

function barsAverage(bars){
    if (bars === "N/A") return "N/A"
    return (bars.reduce((acc, item) => acc + item.value, 0) / bars.length).toFixed(2);
}

function updateScreen(div, three, five, ten, total){
    const tenColor = ten < 0 ? "red" : ten !== "N/A" ? "green" : "default"; 
    const fiveColor = five < 0 ? "red" : five !== "N/A" ? "green" : "default";
    const threeColor = three < 0 ? "red" : three !== "N/A" ? "green" : "default";
    const totalColor = total < 0 ? "red" : ten !== 0.0 ? "green" : "default";;

    div.innerHTML = `
        <div class="pressure-stats-item">
            <span class="lb-item ${threeColor}">3 barras:</span>
            <span class="vl-item ${threeColor}">${three}</span>
        </div>
        <div class="pressure-stats-item">
            <span class="lb-item ${fiveColor}">5 barras:</span>
            <span class="vl-item ${fiveColor}">${five}</span>
        </div>
        <div class="pressure-stats-item">
            <span class="lb-item ${tenColor}">10 barras:</span>
            <span class="vl-item ${tenColor}">${ten}</span>
        </div>
        <div class="pressure-stats-item">
            <span class="lb-item ${totalColor}">JOGO:</span>
            <span class="vl-item ${totalColor}">${total}</span>
        </div>
    `;
}

setInterval(() => {
        HOME_BARS = document.querySelector(".srt-stroke-home-1");
        AWAY_BARS = document.querySelector(".srt-stroke-away-1");
        PRESSURE_BARS = getPressure()
        THREE = barsAverage(getLastBars(PRESSURE_BARS, 3));
        FIVE = barsAverage(getLastBars(PRESSURE_BARS, 5));
        TEN = barsAverage(getLastBars(PRESSURE_BARS, 10));
        TOTAL = barsAverage(PRESSURE_BARS);
        updateScreen(PRESSURE_STATS_DIV, THREE, FIVE, TEN, TOTAL);
}, 10000)

buttonMinute.addEventListener("click", () => {
    BEFORE_STATS_DIV.innerHTML = "<p>Carregando...</p>"
    const minute = document.getElementById("input-minute").value - 1;
    const minuteBars = PRESSURE_BARS.slice(0, minute);
    REFERENCE?.classList.remove("white");
    REFERENCE = minuteBars[minuteBars.length - 1].element;
    REFERENCE.classList.add("white");
    const three = barsAverage(getLastBars(minuteBars, 3));
    const five = barsAverage(getLastBars(minuteBars, 5));
    const ten = barsAverage(getLastBars(minuteBars, 10));
    const total = barsAverage(minuteBars);
    console.log(minuteBars);
    updateScreen(BEFORE_STATS_DIV, three, five, ten, total);
})

submitButton.addEventListener("click", () => {
    const URL = window.location.href.split("=")[0] + "=" + inputIdMatch.value;
    window.location.href = URL;
})