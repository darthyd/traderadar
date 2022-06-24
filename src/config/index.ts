import path from 'path';

interface IConfig {
    url: string;
    preload: string;
    theme: string;
    titleBar?: "hidden" | "default" | "hiddenInset" | "customButtonsOnHover" | undefined; 
    fullWidth?: number;
    fullHeight?: number;
    compactWidth?: number;
    compactHeight?: number;
    frame?: boolean;
    autoHideMenu?: boolean;
    nodeInteg?: boolean;
    alwaysOnTop?: boolean;
    port?: number;
    webSec?: boolean;
}

const config: IConfig = {
    url: path.resolve(__dirname, "..", "..", "src",  "index.html?id="),
    preload: path.resolve(__dirname, "..", "scripts",  "preload.js"),
    theme: "light",
    fullWidth: 600,
    fullHeight: 400,
    compactWidth: 420,
    compactHeight: 225,
    titleBar: "hidden",
    frame: true,
    autoHideMenu: true,
    alwaysOnTop: true,
    nodeInteg: true,
    port: 3428,
    webSec: false
}

export default config;