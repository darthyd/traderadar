// // console.log(`Preload script is running`);

// import getMatches from "./scrapper";

// const getData: (force?: boolean | undefined) => Promise<boolean | void> = async (force?: boolean | undefined): Promise<boolean | void> => {
//     console.log('getData called');

//     const matches = await getMatches.live();

//     localStorage.setItem('matches', JSON.stringify(matches));

//     return matches
// }

// contextBridge.exposeInMainWorld('api', {
//     getData
// })

// getData(true);