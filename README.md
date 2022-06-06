# Trade Radar

## A simple, easy to use, and fast radar for traders.
<a href="https://github.com/darthyd/traderadar/releases/latest">Download the latest build here</a> or build it yourself!

### Building

You can make a easy build running these commands:

- Install all dependencies running: `bash npm install`
- Build for Windows x64 running `bash npm run build:win`
  - for Windows 32bits systems run `bash npm run build:win32`
  - IMPORTANT: For build to Windows you will need to be in a Windows machine or a system that have Wine installed
- Build for Linux x64 running `bash npm run build:linux`
  - for Linux 32bits systems run `bash npm run build:linux32`
- Build for MacOS with: `bash npm run build:mac`
  - If you wanna build a dmg package give a look at https://github.com/electron-userland/electron-installer-dmg

You can run `bash npm run build:all` to build for all systems above.

### For build for a lot of other archs or platforms give a look at the documentation from electron-packager

- https://github.com/electron/electron-packager

### Usage

This app have some shortcuts configurated for default:

    - Cmd or Ctrl + Shift + J - Toggle Development Tools
    - Cmd or Ctrl + Shift + X - Toggle alwaysOnTop property that made your windows stays above of another all in your screen
