
import { contextBridge } from "electron";

console.log(`Preload script is running`);

const getData: (force?: boolean | undefined) => Promise<boolean | void> = async (force?: boolean | undefined): Promise<boolean | void> => {
    console.log('getData called');
    
    const lastUpdate = await fetch('http://localhost:3428/api/updatedAt');
    const timestamp = await lastUpdate.json();

    console.log('check:', new Date(timestamp.updatedAt).getDate() === new Date().getDate() && !force);
    
    if(new Date(timestamp.updatedAt).getDate() === new Date().getDate() && !force) return true;
    
    const reqData = await fetch('http://localhost:3428/api/update');
    const data = await reqData.json();

    return data.ok;
}

contextBridge.exposeInMainWorld('api', {
    getData
})

getData();