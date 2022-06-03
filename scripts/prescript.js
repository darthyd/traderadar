const inputId = document.getElementById("input-match-id");
const WIDGET = document.getElementById("widget");
const queryID = location.search.split("id=")[1].split("?id2=")[0];
const queryID2 = location.search.split("id2=")[1];
const lay = "layout:(colorTheme:(colors:(away:%23FD2954,background:%23141435,base:%23ffffff,home:%230495E3,primary:%23FD2954),formula:solid),width:512)"

WIDGET.innerHTML = `<div id="sr-widget" data-sr-widget="match.momentum" data-sr-layout="${lay}" data-sr-match-id="${queryID}"></div>`;
inputId.value = queryID;
