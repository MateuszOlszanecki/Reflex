const board1 = document.querySelector('.gui .board1');
const board2 = document.querySelector('.gui .board2');
const board3 = document.querySelector('.gui .board3');
const board4 = document.querySelector('.gui .board4');
const tiles1 = document.querySelectorAll('.gui .board1 .tile');
const tiles2 = document.querySelectorAll('.gui .board2 .tile');
const tiles3 = document.querySelectorAll('.gui .board3 .tile');
const tiles4 = document.querySelectorAll('.gui .board4 .tile');
const scoreShow = document.querySelector('.score');
const timeShow = document.querySelector('.time');
const gui = document.querySelector('.gui');
const menu = document.querySelector('.menu');
const pickGrid = document.querySelector('.menu .pickGrid');
const startGame = document.querySelector('.menu .startGame');
const clickAudio = document.querySelector('.clickAudio');
const errorAudio = document.querySelector('.errorAudio');
const pickedName = document.querySelector('.pickedName');
const recordBtn = document.querySelector('.record');
const bestString = document.querySelector('.menu .bestString');

colorsSet1 = "gold";

colorsSet2 = ["gold", "#5717eb",
             "#ed0562", "#1e9e96"];

colorsSet3 = ["gold", "#b3e394", "#0482bd",
             "#8c3be3", "#e84a4a", "#ea0afa",
             "#f590e6", "#18f099", "#541f6b"];

colorsSet4 = ["gold", "#697822", "#b3e394", "#18f099",
             "#1e9e96", "#e84a4a", "#0482bd", "#0451bd",
             "#3e61de", "#5717eb", "#8c3be3", "#541f6b",
             "#ea0afa", "#f590e6", "#ed0562", "#f71924"];

pickedGrid = 3;

gameStarted = false;
score = 0;
goalScore = 50;

var gameTime = null;
timeMilisec = 0;
timeSec = 0;
timeMinu = 0;

allTime = 0;
playerName = "";
scoreboard = [];
sb1 = [];
sb2 = [];
sb3 = [];
sb4 = [];
sbBest = [];
newSBrecord = {id: '',
               grid: '',
               nickname: '',
               time: ''};

var bestScoreInterval = null;

// clicking the tile event
tiles1.forEach(tile => {
    tile.addEventListener('click', e => tileClicked(e))
})

tiles2.forEach(tile => {
    tile.addEventListener('click', e => tileClicked(e))
})

tiles3.forEach(tile => {
    tile.addEventListener('click', e => tileClicked(e))
})

tiles4.forEach(tile => {
    tile.addEventListener('click', e => tileClicked(e))
})

function tileClicked(e) {
    if(gameStarted){
        if(e.target.style.background === "gold"){
            clickAudio.play();
            changeScore(1);
        }
        else{
            errorAudio.play();
            changeScore(-1);
        }
        scoreShow.textContent = score + "/50";
        shuffleColors();
    }
}
//

// starting the game
window.addEventListener('click', e => {
    if(!gameStarted && menu.style.display === "none"){
        gameStarted = !gameStarted;
        score = 0;
        scoreShow.textContent = "0/50";
        timeMilisec = 0;
        timeSec = 0;
        timeMinu = 0;
        allTime = 0;
        newSBrecord = {id: '',
               grid: '',
               nickname: '',
               time: ''};
        gameTime = setInterval(updateTime, 10);
        shuffleColors();
    }
})
//

// shuffling colors on grids
function shuffleColors() {
    if(pickedGrid === 1){
        tiles1[0].style.background = colorsSet1;
    }
    if(pickedGrid === 2){
        colorsSet2 = colorsSet2.sort(() => Math.random() - 0.5);
        for(let i = 0; i < tiles2.length; i++){
            tiles2[i].style.background = colorsSet2[i];
        }
    }
    if(pickedGrid === 3){
        colorsSet3 = colorsSet3.sort(() => Math.random() - 0.5);
        for(let i = 0; i < tiles3.length; i++){
            tiles3[i].style.background = colorsSet3[i];
        }
    }
    if(pickedGrid === 4){
        colorsSet4 = colorsSet4.sort(() => Math.random() - 0.5);
        for(let i = 0; i < tiles4.length; i++){
            tiles4[i].style.background = colorsSet4[i];
        }
    }
}
//

// change in score
function changeScore(x){
    if((score + x) >= 0){
        score += x;
    }
    checkEnd();
}
//

// updating stopwatch
function updateTime(){
    allTime += 1;
    timeMilisec += 1;
    if(timeMilisec > 99){
        timeMilisec = 0;
        timeSec += 1;
    }
    if(timeSec > 59){
        timeSec = 0;
        timeMinu += 1;
    }
    timeShow.textContent = "";
    if(timeMinu < 10){
        timeShow.textContent += "0" + timeMinu;
    }
    else{
        timeShow.textContent += timeMinu;
    }

    if(timeSec < 10){
        timeShow.textContent += ":0" + timeSec;
    }
    else{
        timeShow.textContent += ":" + timeSec;
    }
    
    timeShow.textContent += "." + timeMilisec;
}
//

//picking the grid
pickGrid.addEventListener('change', e => {
    if(e.target.value === "1grid"){
        pickedGrid = 1;
    }
    if(e.target.value === "2grid"){
        pickedGrid = 2;
    }
    if(e.target.value === "3grid"){
        pickedGrid = 3;
    }
    if(e.target.value === "4grid"){
        pickedGrid = 4;
    }
});
//

//go from menu to board
startGame.addEventListener('click', e => {
    if(playerName !== ""){
        menu.style.display = "none";
        gui.style.display = "block";
    
        if(pickedGrid === 1){
            board1.style.display = "grid";
            board2.style.display = "none";
            board3.style.display = "none";
            board4.style.display = "none";
        }
        if(pickedGrid === 2){
            board1.style.display = "none";
            board2.style.display = "grid";
            board3.style.display = "none";
            board4.style.display = "none";
        }
        if(pickedGrid === 3){
            board1.style.display = "none";
            board2.style.display = "none";
            board3.style.display = "grid";
            board4.style.display = "none";
        }
        if(pickedGrid === 4){
            board1.style.display = "none";
            board2.style.display = "none";
            board3.style.display = "none";
            board4.style.display = "grid";
        }
    }
})
//

//players name
pickedName.addEventListener('change', e => {
    playerName = e.target.value;
})
//

//the end of game
function checkEnd(){
    if(score == goalScore){
        clearInterval(gameTime);
        menu.style.display = "block";
        gui.style.display = "none";
        pickedName.value = "";
        gameStarted = !gameStarted;

        newSBrecord['id'] = Date.now();
        newSBrecord['grid'] = pickedGrid;
        newSBrecord['nickname'] = playerName;
        newSBrecord['time'] = allTime;

        scoreboard.push(newSBrecord);
        
        sendData();
        sortScoreboards();

        playerName = "";
    }
}
//

//send data to database
function sendData(){
    fetch("saveToJason.php", {
        method: 'POST',
        body: JSON.stringify(scoreboard)
    })
}
//

//get data from database
function getData(){
    fetch("saveToJason.php", {
        method: 'GET'
    }).then(response => response.json()).then(json => {
    scoreboard = json;
    });
}
//

//onload function
window.onload = function() {
    getData();
}
//

//sort scoreboards
function sortScoreboards() {
    sb1 = [];
    sb2 = [];
    sb3 = [];
    sb4 = [];
    scoreboard.forEach(i => {
        if(i['grid'] === 1){
            sb1.push(i)
        }
        else if(i['grid'] === 2){
            sb2.push(i)
        }
        else if(i['grid'] === 3){
            sb3.push(i)
        }
        else if(i['grid'] === 4){
            sb4.push(i)
        }
    });
    sb1 = sb1.sort((a,b) => {
        if(a.time < b.time) {
            return -1;
        }
    })
    sb2 = sb2.sort((a,b) => {
        if(a.time < b.time) {
            return -1;
        }
    })
    sb3 = sb3.sort((a,b) => {
        if(a.time < b.time) {
            return -1;
        }
    })
    sb4 = sb4.sort((a,b) => {
        if(a.time < b.time) {
            return -1;
        }
    })
    sbBest = [];
    sbBest.push(sb1[0]);
    sbBest.push(sb2[0]);
    sbBest.push(sb3[0]);
    sbBest.push(sb4[0]);
}
//

//best score button
recordBtn.addEventListener('click', e => {
    sortScoreboards();
    recordBtn.disabled = true;
    bestScoreInterval = setInterval(hideBestScore, 2000);

    if(sbBest[(pickedGrid-1)]){
        tmpTime = "";
        if(Math.floor(sbBest[(pickedGrid-1)]['time']/6000) < 10){
            tmpTime += "0" + Math.floor(sbBest[(pickedGrid-1)]['time']/6000);
        }
        else{
            tmpTime += Math.floor(sbBest[(pickedGrid-1)]['time']/6000);
        }
        if(Math.floor(sbBest[(pickedGrid-1)]['time']%6000/100) < 10){
            tmpTime += ":0" + Math.floor(sbBest[(pickedGrid-1)]['time']%6000/100);
        }
        else{
            tmpTime += ":" + Math.floor(sbBest[(pickedGrid-1)]['time']%6000/100);
        }
        if(sbBest[(pickedGrid-1)]['time']%100 < 10){
            tmpTime += ".0" + sbBest[(pickedGrid-1)]['time']%100;
        }
        else{
            tmpTime += "." + sbBest[(pickedGrid-1)]['time']%100;
        }
        bestString.innerHTML = sbBest[(pickedGrid-1)]['nickname'] + " - " + tmpTime;
    }

    bestString.style.display = "block";
})

function hideBestScore(){
    bestString.style.display = "none";
    bestString.innerHTML = "There is no record yet";
    recordBtn.disabled = false;
    clearInterval(bestScoreInterval);
}
//