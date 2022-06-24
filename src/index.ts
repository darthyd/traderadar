import {BrowserWindow, app, ipcMain } from "electron";
import pie from "puppeteer-in-electron";
import puppeteer from "puppeteer-core";
import config from "./config";
import * as path from "path";
import getMatches from "./scrapper";

let mainWindow: BrowserWindow;

const main = async () => {
  await pie.initialize(app);
  await pie.connect(app, puppeteer);

  mainWindow = new BrowserWindow({
    width: config.fullWidth,
    height: config.fullHeight,
    frame: config.frame,
    titleBarStyle: config.titleBar,
    titleBarOverlay: {
      color: '#141435',
      symbolColor: '#74b1be'
    },
    autoHideMenuBar: config.autoHideMenu,
    webPreferences: {
        nodeIntegration: config.nodeInteg,
        webSecurity: config.webSec,
        contextIsolation: false,
        preload: path.resolve(__dirname, 'preload.js'),
      },
    show: false,
});

mainWindow.loadURL(config.url);

mainWindow.on('ready-to-show', async () => {
  mainWindow.show();
});

ipcMain.handle('getMatchesLive', async (event) => {
  const result = await getMatches.live();
  return result
})

ipcMain.handle('getMatchesDay', async (event) => {
  const result = await getMatches.day();
  return result
})

};

app.whenReady().then(async () => {
  
  // if (require('electron-squirrel-startup')) return app.quit();

  app.on('activate', function () {
      if (BrowserWindow.getAllWindows().length === 0) main()
  })


  })
  
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

main();