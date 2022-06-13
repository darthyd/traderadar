const WIDGET = document.getElementById("widget");
const queryID = location.search.split("id=")[1].split("?id2=")[0];
let whData = false;

console.log("prescript");

WIDGET.innerHTML = `<div id="sr-widget" data-sr-widget="match.momentum" data-sr-match-id="${queryID}"></div>`;
