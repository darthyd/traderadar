import { app, BrowserWindow } from 'electron'
import * as path from 'path'
import { app as server } from './server';
import config from './config';

let mainWindow: BrowserWindow;

function createWindow(): void {
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
            preload: path.resolve(__dirname, 'preload.js'),
        },
        show: false,
    });

    mainWindow.loadURL(config.url);

    mainWindow.on('ready-to-show', () => {
        mainWindow.show();
    });
}

// app.on('ready', createWindow);

app.whenReady().then(() => {

    server.listen(config.port, () => {
      console.log(`Server listening on port ${config.port}`);
    })
  
    // if (require('electron-squirrel-startup')) return app.quit();
    
    createWindow()
    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })

    })
    
    app.on('window-all-closed', function () {
      if (process.platform !== 'darwin') app.quit()
    })