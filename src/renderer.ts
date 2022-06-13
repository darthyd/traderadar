console.log('Hello from renderer.ts');

document.addEventListener('DOMContentLoaded', () => {
    const coreDiv = document.getElementById('core');
    // @ts-expect-error
    coreDiv?.innerHTML = `<p>Core Count: ${api.threads}</p>`;
})