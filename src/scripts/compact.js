let compact = false;
const matchList = document.getElementById('sr-widget')
const pressureStats = document.getElementById('pressure-stats')
const timeMachine = document.getElementById('time-machine')
const footer = document.getElementById('footer')
const divider = document.querySelectorAll('.divider')

document.addEventListener('keydown', (e) => {
    if(e.keyCode === 32 && e.ctrlKey){
        compact = !compact;
        changeMode()
    }
  });

function changeMode(){
    matchList.style.display = compact ? 'none': '';
    pressureStats.style.display = compact ? 'none' : '';
    timeMachine.style.display =  compact ? 'none' : '';
    footer.style.display =  compact ? 'none' : '';
    divider.forEach(e => {
        e.style.display =  compact ? 'none' : '';
    })
}