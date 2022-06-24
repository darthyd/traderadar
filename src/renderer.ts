const { ipcRenderer } = require("electron");

const putOnLocalStorage = async () => {
    const resultLive = await ipcRenderer.invoke('getMatchesLive');
    const resultDay = await ipcRenderer.invoke('getMatchesDay');

    localStorage.setItem('matches', JSON.stringify([ ...resultLive, ...resultDay ]));
    localStorage.setItem('timestamp', Date.now().toString());
}

const day = new Date().getDate();
const updatedDay = new Date(Number(localStorage.getItem('timestamp'))).getDate();

console.log(updatedDay !== day)

if( updatedDay !== day ) {
    putOnLocalStorage();
}
