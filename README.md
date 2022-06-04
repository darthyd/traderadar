# Float Chromium
## A simple and minimalist chromium-based webview that float above all windows on your screen
  A browser app useful for preview webpages under development, that app have some default configurations
  set to always acess localhost:3000, but you can configure that as you want on config.js file.

  This is an open source project so all you need to do for use this is give the credits for the developers.
  In turn, this project was based on another one that can be found at this link https://github.com/maykbrito/simple-webview 

### Building
  You can make a easy build running these commands:
  
  - Install all dependencies running: ```bash npm install```
  - Build for Windows x64 running ```bash npm run build:win```
      - for Windows 32bits systems run ```bash npm run build:win32```
      - IMPORTANT: For build to Windows you will need to be in a Windows machine or a system that have Wine installed
  - Build for Linux x64 running ```bash npm run build:linux```
      - for Linux 32bits systems run ```bash npm run build:linux32```
  - Build for MacOS with: ```bash npm run build:mac```
    - If you wanna build a dmg package give a look at https://github.com/electron-userland/electron-installer-dmg
  
  You can run ```bash npm run build:all``` to build for all systems above.

### For build for a lot of other archs or platforms give a look at the documentation from electron-packager
 - https://github.com/electron/electron-packager

### Usage
  This app have some shortcuts configurated for default: 
  
    - Cmd or Ctrl + J - Toggle Development Tools
    - Cmd or Ctrl + X - Toggle alwaysOnTop property that made your windows stays above of another all in your screen
    - Cmd or Ctrl + 1/2/3 - Change the size of the window
