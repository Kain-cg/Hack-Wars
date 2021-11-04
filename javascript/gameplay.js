const startButton = document.querySelector('.startButton');

const canvas = document.getElementById('canvas');

const bg = document.getElementById('splash-screen');

const changeVisibility = () => {
    canvas.setAttribute('class', 'screen-on');

    bg.setAttribute('class', 'screen-off');

    hackWars.init();
}

startButton.addEventListener('click', changeVisibility);