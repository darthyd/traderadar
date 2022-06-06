const { app, BrowserWindow, globalShortcut } = require('electron');
const { nativeTheme } = require('electron/main');
const config = require('./config')
let win;

function createWindow () {
    //cria a janela do browser
    win = new BrowserWindow({
        width: 420,
        height: 275,
        frame: config.frame,
        titleBarStyle: config.titleBar,
        titleBarOverlay: {
          color: '#141435',
          symbolColor: '#74b1be'
        },
        autoHideMenuBar: config.autoHideMenu,
        webPreferences: {
          nodeIntegration: config.nodeInteg,
        }
      });
    // e carrega o index.html
        win.loadURL(`File://${__dirname}/index.html?id=`);
    // // seta o tema padrão
    //   nativeTheme.themeSource = config.theme
}

function createShortcuts() {
  // Cria os atalhos do teclado
    globalShortcut.register('CmdOrCtrl+Shift+J', () => win.webContents.toggleDevTools())
    globalShortcut.register('CmdOrCtrl+Shift+X', () => win.setAlwaysOnTop(!win.isAlwaysOnTop()))
}

// Este método irá ser chamado quando o Electron
// terminar sua inicialização e estiver pronto
// para criar janelas
// Algumas APIs podem ser usadas somente depois que este evento ocorre.
app.whenReady().then(() => {

  if (require('electron-squirrel-startup')) return app.quit();

    createWindow()
    createShortcuts()
  
    app.on('activate', function () {
      if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
  })
  
  app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
  })