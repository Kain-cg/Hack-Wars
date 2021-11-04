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

// Game Over

const loseScreen = document.querySelector('#lose-screen');

const LoseVid = document.getElementById('lose-vid');

const retryBtn = document.querySelector('.retry-button');

const GameOverSplash = () => {

    canvas.setAttribute('class', 'screen-off');
    loseScreen.setAttribute('class', 'screen-on');
    LoseVid.play();

}

function reload() {
    reload = location.reload();
}

retryBtn.addEventListener('click', reload, false);

// Victory

const winScreen = document.querySelector('#win-screen');

const winVid = document.getElementById('win-vid');

const backBtn = document.querySelector('.back-btn');

const victorySplash = () => {

    canvas.setAttribute('class', 'screen-off');
    winScreen.setAttribute('class', 'screen-on');
    winVid.play();

}

backBtn.addEventListener('click', reload, false);