// Splash Screen

const startButton = document.querySelector('.start-button');

const canvas = document.getElementById('canvas');

const bg = document.getElementById('splash-screen');

const introRoller = document.getElementById('introdiv');

const video = document.getElementById('roller')

const changeVisibility = () => {
    // canvas.setAttribute('class', 'screen-on');

    introRoller.setAttribute('class', 'screen-on');
    bg.setAttribute('class', 'screen-off');
    video.play();


    // hackWars.init();
}

startButton.addEventListener('click', changeVisibility);

// Launch Game

const launchButton = document.querySelector('.launch-button');

const launchGame = () => {

    canvas.setAttribute('class', 'screen-on');
    introRoller.setAttribute('class', 'screen-off');
    video.pause();
    hackWars.init();

}

launchButton.addEventListener('click', launchGame);
