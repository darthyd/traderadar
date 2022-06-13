import { contextBridge } from "electron";

console.log(`Preload script is running`);

contextBridge.exposeInMainWorld('api', {
    whData: false
})
