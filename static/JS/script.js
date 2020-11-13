
/*---------------------Challenge 1 -----------------------*/

function ageInDays(){
    var b_day = prompt('Enter your birth year..');
    var age = (2020-b_day)*365;
    var h1 = document.createElement('h1');
    var result = document.createTextNode("You are "+ age + " days");
    h1.setAttribute('id','ageInDays');
    h1.appendChild(result);
    document.getElementById('flex-box-result').appendChild(h1);
}

function reset(){
    document.getElementById('ageInDays').remove();
}

/*---------------------Challenge 2 -----------------------*/

function catGen(){
    var image = document.createElement('img');
    var div = document.getElementById('flex-box-gen');
    image.src = "/static/images/Cat_Gen/cat.gif";
    div.appendChild(image);
}

/*---------------------Challenge 3 ------------------------ */

function rpsGame(yourChoice){
    console.log(yourChoice);
    var humanChoice, botChoice;
    humanChoice = yourChoice.id;
    botChoice = numberToRan(randomRpm());
    
    results = decideWinner(humanChoice, botChoice);
    message = finalMessage(results);
    rpsFrontEnd(yourChoice.id, botChoice, message);
    
}

function randomRpm(){
    return Math.floor(Math.random()*3);
}
function numberToRan(number){
    return ['rock', 'paper', 'scissor'][number];
}

function decideWinner(yourChoice, comChoice){
    var rpsDatabase = {
        'rock' : {'scissor': 1, 'rock': 0.5, 'paper': 0},
        'paper' : {'rock': 1, 'paper': 0.5, 'scissor': 0},
        'scissor' : {'paper': 1, 'scissor': 0.5, 'rock': 0}
    };
    var yourScore = rpsDatabase[yourChoice][comChoice];
    var compScore = rpsDatabase[comChoice][yourChoice];
    return [yourScore, compScore];
}

function finalMessage([yourScore, compScore]){
    if (yourScore === 0) {
        return {'message': 'You Lost', 'color' : 'red'};
    }
    else if (yourScore === 0.5) {
        return {'message': 'You tied', 'color' : 'yellow'};
    }
    else {
        return {'message': 'You Won!', 'color' : 'green'};
    }
}
function rpsFrontEnd(h_img, b_img, finalMessage){
    var imgDB = {
        'rock' : document.getElementById('rock').src,
        'paper' : document.getElementById('paper').src,
        'scissor' : document.getElementById('scissor').src
    }

    document.getElementById('rock').remove();
    document.getElementById('paper').remove();
    document.getElementById('scissor').remove();

    var humanDiv = document.createElement('div');
    var botDiv = document.createElement('div');
    var messageDiv = document.createElement('div');

    humanDiv.innerHTML = "<img src='" + imgDB[h_img] + "' height=150 width=150>"
    messageDiv.innerHTML = "<h1 style='color: " + finalMessage['color'] + "; font-size: 60px; padding: 30px; '>" + finalMessage['message'] + "</h1>"
    botDiv.innerHTML = "<img src='" + imgDB[b_img] + "' height=150 width=150>"
    

    document.getElementById('flex-box-rps').appendChild(humanDiv);
    document.getElementById('flex-box-rps').appendChild(messageDiv);
    document.getElementById('flex-box-rps').appendChild(botDiv);    
}

/*-------------------------- Challenge 4 ---------------------- */

var allButton = document.getElementsByTagName('button');
var copyAllButton = [];
for (let i = 0; i < allButton.length; i++) {
    copyAllButton.push(allButton[i].classList[1]);
}

function buttonColorChange(buttonThing){
    if (buttonThing.value === 'red') {
        buttonRed();
    }
    else if (buttonThing.value === 'green') {
        buttonGreen();
    }
    else if (buttonThing.value === 'reset') {
        buttonReset();
    }
    else if (buttonThing.value === 'random') {
        buttonRandom();
    }
}
function buttonRed(){
    for (let i = 0; i < allButton.length; i++) {
        allButton[i].classList.remove(allButton[i].classList[1]);
        allButton[i].classList.add('btn-danger');     
    }
}
function buttonGreen(){
    for (let i = 0; i < allButton.length; i++) {
        allButton[i].classList.remove(allButton[i].classList[1]);
        allButton[i].classList.add('btn-success');     
    }
}
function buttonReset(){
    for (let i = 0; i < allButton.length; i++) {
        allButton[i].classList.remove(allButton[i].classList[1]);
        allButton[i].classList.add(copyAllButton[i]);     
    }
}
function buttonRandom(){
    var choices = ['btn-primary', 'btn-success', 'btn-warning', 'btn-danger'];
    
    for (let i = 0; i < allButton.length; i++) {
        var random_col = Math.floor(Math.random()*4);
        allButton[i].classList.remove(allButton[i].classList[1]);
        allButton[i].classList.add(choices[random_col]);     
    }
}

/* --------------------------Challenge 5 -------------------------------- */

let blackJackGame = {
    'you' : {'scoreSpan':'#your-bj-result', 'div':'#your-box', 'score':0},
    'dealer' : {'scoreSpan':'#dealer-bj-result', 'div':'#dealer-box', 'score':0},
    'cards' : ['2','3','4','5','6','7','8','9','10','J','K','Q','A'],
    'cardsMap' : {'2':2,'3':3,'4':4,'5':5,'6':6,'7':7,'8':8,'9':9,'10':10,'J':10,'K':10,'Q':10,'A':[1, 11]},
    'wins' : 0,
    'losses' : 0,
    'draws' : 0,
    'isStand' : false,
    'turnOver' : false
};

const YOU = blackJackGame['you']
const DEALER = blackJackGame['dealer']
const hitSound = new Audio('static/sounds/swish.m4a');
const winSound = new Audio('static/sounds/cash.mp3');
const lossSound = new Audio('static/sounds/aww.mp3');

document.querySelector('#bj-hit-btn').addEventListener('click', blackjackHit);
document.querySelector('#bj-stand-btn').addEventListener('click', dealerLogic);
document.querySelector('#bj-deal-btn').addEventListener('click', blackjackDeal);

function blackjackHit(){
    if (blackJackGame['isStand'] === false) {
        let card = randomCard();
       showCard(card, YOU);
        updateScore(card, YOU);
        showScore(YOU);    
    }
}

function randomCard(){
    let randomIndex = Math.floor(Math.random()*13);
    return blackJackGame['cards'][randomIndex];
}

function blackjackDeal(){

    if (blackJackGame['turnOver'] === true) {

        blackJackGame['isStand'] = false;
        let yourImages = document.querySelector('#your-box').querySelectorAll('img');
        let dealerImages = document.querySelector('#dealer-box').querySelectorAll('img');

        for (let i = 0; i < yourImages.length; i++) {
            yourImages[i].remove();
        }
        for (let i = 0; i < dealerImages.length; i++) {
            dealerImages[i].remove();
        }

        YOU['score']=0;
        DEALER['score']=0;

        document.querySelector('#your-bj-result').textContent = 0;
        document.querySelector('#dealer-bj-result').textContent = 0;
        document.querySelector('#your-bj-result').style.color = '#ffffff';
        document.querySelector('#dealer-bj-result').style.color = '#ffffff';
        document.querySelector('#bj-result').textContent = "Let's Play";
        document.querySelector('#bj-result').style.color = "black";

        blackJackGame['turnOver'] = true;
    }
}
function showCard(card, activePlayer){
    if (activePlayer['score'] <= 21) {
        let cardImage = document.createElement('img');
        cardImage.src = `static/images/BlackJack/${card}.png`;
        document.querySelector(activePlayer['div']).appendChild(cardImage);
        hitSound.play();
    }
}

function updateScore(card, activePlayer){
    if (card === 'A') {
        if (activePlayer['score'] + blackJackGame['cardsMap'][card][1] <= 21) {
            activePlayer['score'] += blackJackGame['cardsMap'][card][1];
        }
        else{
            activePlayer['score'] += blackJackGame['cardsMap'][card][0];
        }
    }
    else{
        activePlayer['score'] += blackJackGame['cardsMap'][card];
    }
}

function showScore(activePlayer){
    if (activePlayer['score'] > 21) {
        document.querySelector(activePlayer['scoreSpan']).textContent = 'Bust!';
        document.querySelector(activePlayer['scoreSpan']).style.color = 'red';
    }
    else{
        document.querySelector(activePlayer['scoreSpan']).textContent = activePlayer['score'];
    }
}

/* --------------- Dealer Logic --------------------- */

function sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function dealerLogic(){
    blackJackGame['isStand'] = true;

    while (DEALER['score']<16 && blackJackGame['isStand'] === true) {
        let card = randomCard();
        showCard(card, DEALER);
        updateScore(card, DEALER);
        showScore(DEALER);
        await sleep(1000);
    }
    blackJackGame['turnOver'] = true;
    showResult(computeWinner());
}

function computeWinner(){
    let winner;

    if (YOU['score']<=21) {
        if (YOU['score'] > DEALER['score'] || (DEALER['score']>21)) {
            blackJackGame['wins']++;
            winner=YOU;
        }
        else if (YOU['score']<DEALER['score']) {
            blackJackGame['losses']++;
            winner=DEALER;
        }
        else if (YOU['score'] === DEALER['score']) {
            blackJackGame['draws']++;
        }
    }
    else if (YOU['score']>21 && DEALER['score']<=21) {
        blackJackGame['losses']++;
        winner=DEALER;
    }
    else if (YOU['score']>21 && DEALER['score']>21) {
        blackJackGame['draws']++;
    }
    return winner;
}

function showResult(winner){
    let message, messageColor;
    if (blackJackGame['turnOver'] === true) {
           
        if (winner === YOU) {
            document.querySelector('#wins').textContent = blackJackGame['wins'];
            message='You Won!';
            messageColor = 'green';
            winSound.play();
        }
        else if (winner === DEALER) {
            document.querySelector('#losses').textContent = blackJackGame['losses'];
            message='You Lost!';
            messageColor = 'red';
            lossSound.play();
        }
        else{
            document.querySelector('#draws').textContent = blackJackGame['draws'];
            message='You Drew!';
            messageColor = 'yellow';
        }

        document.querySelector('#bj-result').textContent = message;
        document.querySelector('#bj-result').style.color = messageColor;
    }
}
