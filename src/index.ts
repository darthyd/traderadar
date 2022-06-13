import { app, BrowserWindow } from 'electron'
import * as path from 'path'

let mainWindow: BrowserWindow;

function createWindow(): void {
    mainWindow = new BrowserWindow({
        width: 900,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            webSecurity: false,
            preload: path.resolve(__dirname, 'preload.js'),
        },
        show: false,
    });

    mainWindow.loadFile('./src/index.html');

    mainWindow.on('ready-to-show', () => {
        mainWindow.show();
    });
}

app.on('ready', createWindow);