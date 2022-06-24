const { ipcRenderer, contextBridge } = require("electron");
const Store = require('electron-store');

const store = new Store();

const storeData = async () => {
    const strTimestamp = Date.now().toString()
    
    const resultLive = await ipcRenderer.invoke('getMatchesLive');
    const resultDay = await ipcRenderer.invoke('getMatchesDay');
    
    store.set('matches', [ ...resultLive, ...resultDay ]);
    store.set('timestamp', strTimestamp);
}

const latestTimestamp = Number(store.get('timestamp')) || 0;
console.log(Number(latestTimestamp));

const day = new Date().getDate();
const updatedDay = new Date(latestTimestamp).getDate();

console.log(updatedDay !== day)

if( updatedDay !== day ) {
    storeData();
}