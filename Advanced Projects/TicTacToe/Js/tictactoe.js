//This function will get fired once the DOM's loaded.
// Disable the stop button since it is not needed until game start.
window.onload=function() {WebAuthentication()};
function watch() {
    var btn = document.getElementById('btnStop');
    btnDisabled(btn); //disable the stop button since the game has not started
}

//this function will roll for random number twice, one for
//each player and determins which player wins the roll.

function rollForTurn() {
    var xArray = [];
    var ranNum='';
    var minimum = 1;
    var maximum = 11;
    var first ="";
    var txt1 = "";
    for (var i = 0; i < 2; i++) {
        // random whole number between 1 and 10
        ranNum = Math.floor(Math.random()*(maximum - minimum) + minimum);
        xArray.push(ranNum); //Means put something into Array. The two ranNumbers will be pushed into the array
    }
    diceRoll(); // play dice sounds during the game roll for turn
    //build the string to show which player rolled what die roll
    for (i=0;i<xArray.length;i++) {
        var result = i + 1; //Iterates twice
        var pOne = xArray[0]; //First Num Roll
        var pTwo = xArray[1]; //Second Num Roll
        if (pOne == pTwo) { //Avoids Tie Game Bug if both players roll the same number
            pOne = 1;
            pTwo = 2;
        }
        txt1 = "Player 1 rolled ["+pOne+"]<br>";
        writeMsg(txt1);
        txt1 = txt1 + "Player 2 rolled ["+pTwo+"]<br><br>";
        setTimeout(function() {writeMsg(txt1);}, 1000); // time delay for dramatic affect   
    }
    // determine and concatenate string showing which player won the roll
    if (pOne > pTwo) {
        first = "Player 1";
        setTimeout(function() { txt1 = txt1 + "Player 1 wins, please choose a square.";}, 2000);
        setTimeout(function() {writeMsg(txt1);}, 2000);
    } else if (pOne < pTwo) {
        first ="Player 2";
        setTimeout(function() { txt1 = txt1 + "Player 2 wins, please choose a square.";}, 2000);
        setTimeout(function() {writeMsg(txt1);}, 2000);
    }
    // pass which player won the roll
    return first;
}

//---------------------------------------------------
// initiate the game, roll for turn & determine the active player
//---------------------------------------------------------------
function startGame() {
    var xTurn = 0;
    activePlayer = rollForTurn();
    if (activePlayer == "") { // if it was a tie, then reroll
        activePlayer = rollForTurn();
    }
    setTimeout(function() {hideGameMsg();}, 4000);

    // assign proper state of the control buttons
    var btn = document.getElementById('btnStart');
    btnDisabled(btn); // disable the start button since the game is now afoot
    var btn = document.getElementById('btnStop');
    stopEnabled(btn); // enable the stop button since the game is afoot

    //Assign the Active Player to the console
    var showPlayer = document.getElementById('showPlayer')
    showPlayer.innerHTML = activePlayer;
    showPlayer.style.color="green";

}

//this function styles the game buttons while they are disabled
function btnDisabled(btn) {
    btn.style.color = "fff";
    btn.style.border = "2px solid rgb(153, 153, 102)";
    btn.style.backgroundColor = "rgb(214, 214, 194)";
    btn.disabled = true;

}