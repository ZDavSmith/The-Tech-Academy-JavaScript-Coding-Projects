//This function will get fired once the DOM's loaded.
// Disable the stop button since it is not needed until game start.
window.onload = function() {watch()};
function watch() {
    var btn = document.getElementById('btnStop');
    btnDisabled(btn); //disable the stop button since the game has not started
}

//this function will roll for random number twice, one for
//each player and determins which player wins the roll.

function rollForTurn() {
    var xArray = [];
    var ranNum ='';
    var minimum = 1;
    var maximum = 11;
    var first = "";
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
        setTimeout(function(){ txt1 = txt1 + "Player 1 wins, please choose a square.";}, 2000);
        setTimeout(function() {writeMsg(txt1);}, 2000);
    } else if (pOne < pTwo) {
        first = "Player 2";
        setTimeout(function(){ txt1 = txt1 + "Player 2 wins, please choose a square.";}, 2000);
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
    if (activePlayer == "") { // if it was a tie, then reroll (Function Bugged)
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

function stopEnabled(btn) {
    btn.style.color = "#fff";
    btn.style.border = "2px solid rgb(204, 0, 0)";
    btn.style.backgroundColor = "rgb(255, 51, 51)";
    btn.disabled = false;
}

function startEnabled(btn) {
    btn.style.color = "#fff";
    btn.style.border = "2px solid rgb(0, 153, 0)";
    btn.style.backgroundColor = "rgb(57, 230, 0)";
    btn.disabled = false;
}

//When the user indicates, stop the current game and reset the game
function stopGame() {
    hideGameMsg(); //clear the text and hide message box
    var btn = document.getElementById('btnStart');
    startEnabled(btn); // enable the start button since the game is now stopped
    var btn = document.getElementById('btnStop');
    btnDisabled(btn); // disable the stop button since the game is now stopped
    var showPlayer = document.getElementById('showPlayer')
    showPlayer.innerHTML = "Game Stopped";
    showPlayer.style.color ='red';

    //reset all squares to their starting empty state.
    var arrayO = document.getElementsByClassName("O");
    var arrayX = document.getElementsByClassName("X");
    for (var i=0; i<arrayO.length;i++) {
        arrayO[i].style.transform = "translateY(-100%)";
    }
    for (var i=0; i<arrayX.length;i++) {
        arrayX[i].style.transform = "translateY(100%)";
    }
    // this clears the running log of all game moves
    document.getElementById('boardState').innerHTML = ""; //We stopped Game, erases it
}

// this function will show the message console and any text it may have
function showGameMsg() {
    document.getElementById('gameMsgBox').style.display = 'block';
}

// this function will conceal the message console from view
function hideGameMsg() {
    clearMsg() // clear the text from the message console
    document.getElementById('gameMsgBox').style.display = 'none'; // hide the div
}

//this function will write text to the game message console
function writeMsg(txt) {
    showGameMsg();
    document.getElementById('gameMsg').innerHTML = txt;
}

//this function will clear the text from the message console
function clearMsg() {
    document.getElementById('gameMsg').innerHTML = "";
}

//this function is for the player configuration panel and checks the
//proposed avatar assignments and prevents them from being the same.
//Check to see if both players are X or Y and presents error msg
function saveSettings() {
    var p1Index = document.getElementById("player1").selectedIndex; //Whichever option is highlighted
    var p1Selected = document.getElementById("player1").options; //X or O
    var p2Index = document.getElementById("player2").selectedIndex;
    var p2Selected = document.getElementById("player2").options;
    if (p1Selected[p1Index].text == p2Selected[p2Index].text) {
        alert("Error - Player 1 and Player 2 cannot both be assigned as: "+p1Selected[p1Index].text)
    } else {
        document.getElementById('p1Display').innerHTML=p1Selected[p1Index].text;
        document.getElementById('p2Display').innerHTML=p2Selected[p2Index].text;
    }
}

//this function returns the currently assigned avatar for each player
function getAvatars() {
    var p1Avatar = document.getElementById("p1Display").innerHTML; //Display the change
    var p2Avatar = document.getElementById("p2Display").innerHTML;
    var avatarArray = [p1Avatar,p2Avatar];
    return avatarArray;
}

//this function will return the active player's avatar
function determineAvatar() {
    // determine the correct avatar to paint for the active player
    var avatarArray = getAvatars(); // returns an array of both player's assigned avatars
    var active = document.getElementById('showPlayer').innerHTML; // get active player
    p1Avatar = avatarArray[0];
    p2Avatar = avatarArray[1];
    if (active == "Player 1") { // check which player is active and their corresponding avatar
        var paintAvatar = p1Avatar;
    } else if (active == "Player 2") {
        var paintAvatar = p2Avatar;
    }
    return paintAvatar; // returned back the correct avatar
}

//this function changes active player over to the other player
function avatarPlaced() {
	var parseText = document.getElementById('gameMsg').innerHTML;
	var showPlayer = document.getElementById('showPlayer'); // select the current element to memory
	// check if there is already a winner...if there is, then dont continue the game
	if (parseText == "That's three in a row, Player 1 wins!" || parseText == "That's three in a row, Player 2 wins!"){
		showPlayer.innerHTML = "Game Stopped";
		showPlayer.style.color='red';
	}
	activePlayer = showPlayer.innerHTML; // get the current player from the element
	if (activePlayer == "Player 1") { // once active player selects a square change the active player
		showPlayer.innerHTML = "Player 2";
	} else {
		showPlayer.innerHTML = "Player 1";
	}
	check4Tie(); // call this function to inquire if there was a cat's game.
}

//thisfunction will get the array of the current board
// and check the proposed move for a validity
function check(info,square) {
    for (var i in info) {
        var tempInfo = info[i].charAt(0); // comparing index of square (.charAt(0) only check the first index of the string. that will tell us if the square has been painted yet)
        if (tempInfo == square) {
            return tempInfo; // What's currently assigned
        }
    }
}

// as squares are selected they check in with this function to see if that particular
// square has already been assigned and if it has not, record new square with the assigned avatar.
function recordMoves(square) {
    var proposedMove = square; //Wondering if valid square <--- Important -- Checking if square already taken
    var boardState = document.getElementById('boardState').innerHTML; // retrieve boardState array
    var info = boardState.split(','); // separate the string by commas to create an array (Square number and whether its an X or O)
    verdict = check(info,square); // call function to check if proposed square is already occupied (See if its a valid move, or is it taken)
    return verdict;
}

//this function will get list of previous moves
//and then concatenate the current move to it.
function recordMove(currentMove) {
    var target = document.getElementById('boardState');
    var previousMoves = target.innerHTML;
    target.innerHTML = previousMoves+currentMove; //Now we'll have all the previous moves + current move in the array
}

function checkForWinCon() {
    var squareArray = [];
    var target = document.getElementById('boardState');
    var info = target.innerHTML; //raw array with squares and avatars (Avatars w/ squares)
    info = info.substring(1); //remove leading comma (Start after 0 so there's no errors (commas separate the string groups))
    info = info.split(','); // separates the string by commas into an array
    info.sort(); // sort the square array in order despite the actual gameplay sequence
    for (var i in info) {
        squareArray.push(info[i].charAt(0)); //new array with only squares not avatars
    }
    // call this following array of function to check for any of the possible win cons
    checkWinCon1(info,squareArray);
    checkWinCon2(info,squareArray);
    checkWinCon3(info,squareArray);
    checkWinCon4(info,squareArray);
    checkWinCon5(info,squareArray);
    checkWinCon6(info,squareArray);
    checkWinCon7(info,squareArray);
    checkWinCon8(info,squareArray);
    //console.log("New CHECK:+document.getElementById('gameMsg').innerHTML);
    check4Tie();
}

//call this function to check board state for any ties and act accordingly
function check4Tie() {
    var boardState = document.getElementById('boardState').innerHTML;
    boardState = boardState.substring(1); // remove leading comma
    boardState = boardState.split(','); // separate the string by commas into an array
    var check = document.getElementById('gameMsg').innerHTML;
    if(boardState.length >= 9 && check != "That's three in a row, Player 1 wins!" && check != "That's three in a row, Player 2 wins!") {
        var txt1 = "Oh no! Nobody wins, it was a tie!";
        tieSound(); // play a sound when a tie has been detected
        writeMsg(txt1);
        setTimeout(function() {stopGame();}, 3000);
    }
}

//whenever a win is detected the corresponding function will
//call this function to produce the following winning process for the game
function winner(winDetected,winCon) {
    if (winDetected == "win") {
        var showme = winDetected;
        var activePlayer = document.getElementById('showPlayer').innerHTML;
        var txt2 = "That's three in a row, "+activePlayer+" wins!";
        writeMsg(txt2);
        var btn = document.getElementById('btnStart');
        startEnabled(btn);
        var btn = document.getElementById('btnStop');
        btnDisabled(btn);
        document.getElementById('showPlayer').innerHTML="Game Stopped";
        glowBoard(winCon); //call function to make the gameboard pulse with colors
    }
}

// This function will make the winning squares light up
function glowBoard(pos) {
	var index0 = pos[0];
	var index1 = pos[1];
	var index2 = pos[2];
	var squares = document.getElementsByClassName('square')
	for (var i=0;i<squares.length;i++){
		if (i == index0) {
			var bg1 = squares[i];
			blink();
			winSound();
			setTimeout(function() {bg1.style.backgroundColor = 'rgb(244, 179, 66)';}, 100);
			setTimeout(function() {bg1.style.backgroundColor = 'rgb(244, 238, 66)';}, 200);
			setTimeout(function() {bg1.style.backgroundColor = 'rgb(197, 244, 66)';}, 300);
			setTimeout(function() {bg1.style.backgroundColor = 'rgb(122, 244, 66)';}, 400);
			setTimeout(function() {bg1.style.backgroundColor = 'rgb(66, 244, 235)';}, 500);
			setTimeout(function() {bg1.style.backgroundColor = 'rgb(244, 179, 66)';}, 600);
			setTimeout(function() {bg1.style.backgroundColor = 'rgb(244, 238, 66)';}, 700);
			setTimeout(function() {bg1.style.backgroundColor = 'rgb(197, 244, 66)';}, 800);
			setTimeout(function() {bg1.style.backgroundColor = 'rgb(122, 244, 66)';}, 900);
			setTimeout(function() {bg1.style.backgroundColor = 'rgb(66, 244, 235)';}, 1000);
			setTimeout(function() {bg1.style.backgroundColor = '#d7f3f7';}, 1100);
		} else if (i == index1) {
			var bg2 = squares[i];
			setTimeout(function() {bg2.style.backgroundColor = 'rgb(66, 244, 235)';}, 100);
			setTimeout(function() {bg2.style.backgroundColor = 'rgb(122, 244, 66)';}, 200);
			setTimeout(function() {bg2.style.backgroundColor = 'rgb(197, 244, 66)';}, 300);
			setTimeout(function() {bg2.style.backgroundColor = 'rgb(244, 238, 66)';}, 400);
			setTimeout(function() {bg2.style.backgroundColor = 'rgb(244, 179, 66)';}, 500);
			setTimeout(function() {bg2.style.backgroundColor = 'rgb(66, 244, 235)';}, 600);
			setTimeout(function() {bg2.style.backgroundColor = 'rgb(122, 244, 66)';}, 700);
			setTimeout(function() {bg2.style.backgroundColor = 'rgb(197, 244, 66)';}, 800);
			setTimeout(function() {bg2.style.backgroundColor = 'rgb(244, 238, 66)';}, 900);
			setTimeout(function() {bg2.style.backgroundColor = 'rgb(244, 179, 66)';}, 1000);
			setTimeout(function() {bg2.style.backgroundColor = '#d7f3f7';}, 1100);
		} else if (i == index2) {
			var bg3 = squares[i];
			setTimeout(function() {bg3.style.backgroundColor = 'rgb(244, 179, 66)';}, 100);
			setTimeout(function() {bg3.style.backgroundColor = 'rgb(244, 238, 66)';}, 200);
			setTimeout(function() {bg3.style.backgroundColor = 'rgb(197, 244, 66)';}, 300);
			setTimeout(function() {bg3.style.backgroundColor = 'rgb(122, 244, 66)';}, 400);
			setTimeout(function() {bg3.style.backgroundColor = 'rgb(66, 244, 235)';}, 500);
			setTimeout(function() {bg3.style.backgroundColor = 'rgb(244, 179, 66)';}, 600);
			setTimeout(function() {bg3.style.backgroundColor = 'rgb(244, 238, 66)';}, 700);
			setTimeout(function() {bg3.style.backgroundColor = 'rgb(197, 244, 66)';}, 800);
			setTimeout(function() {bg3.style.backgroundColor = 'rgb(122, 244, 66)';}, 900);
			setTimeout(function() {bg3.style.backgroundColor = 'rgb(66, 244, 235)';}, 1000);
			setTimeout(function() {bg3.style.backgroundColor = '#d7f3f7';}, 1100);
		}
	}
	setTimeout(function() {stopGame();}, 1200);
}

// these function will produce game sounds depending on the occassion
function squareSound() {
    var sound = document.getElementById("placeAvatar");
    sound.play();
    setTimeout(function() {sound.pause();}, 400)
    setTimeout(function() {sound.currentTime = 0;}, 500)
}
function tieSound() {
    var sound = document.getElementById("tieGame");
    var check = document.getElementById('gameMsg').innerHTML;
    setTimeout(function() {sound.play();}, 500);
}
function winSound() {
    var sound = document.getElementById("winGame");
    setTimeout(function() {sound.play();}, 500);
    setTimeout(function() {sound.pause();}, 2700);
    setTimeout(function() {sound.currentTime = 0;}, 2800);
}
function diceRoll() {
    var sound = document.getElementById("diceRoll");
    sound.play();
}

function blink() {
    var body = document.getElementById('body');
    setTimeout(function() {body.style.backgroundColor= '94f7ed';}, 100)
    setTimeout(function() {body.style.backgroundColor= '94f7ed';}, 200)
    setTimeout(function() {body.style.backgroundColor= '94f7ed';}, 300)
    setTimeout(function() {body.style.backgroundColor= '94f7ed';}, 400)
    setTimeout(function() {body.style.backgroundColor= '94f7ed';}, 500)
    setTimeout(function() {body.style.backgroundColor= '94f7ed';}, 600)
    setTimeout(function() {body.style.backgroundColor= '94f7ed';}, 700)
    setTimeout(function() {body.style.backgroundColor= '94f7ed';}, 800)
    setTimeout(function() {body.style.backgroundColor= '94f7ed';}, 900)
    setTimeout(function() {body.style.backgroundColor= '94f7ed';}, 1000)
    setTimeout(function() {body.style.backgroundColor= '#ffffff';}, 1100)
}



//----------------------------------------------------------------------------
//These function are the algorithms to find all win conditions
//-------------------------------------------------------------------------
// checking for wincon squares 012
function checkWinCon1(info,squareArray) {
    var winDetected = "on";
    var winCon1 = [0,1,2];
    //iterate through the growing array during
    //gametime searching for the existence of
    //index 0, index 1 and index 1 and once they
    //do appear in the array, record their
    //avatars and compare all 3 for win cons
    for(var i in info) {
        if (info[i].charAt(0) == "0") {
            var match0Avatar = info[i].charAt(1); // only interested in recording the avatar (.charAt index 1 will be either an X or an O in the array)
        }
        if (info[i].charAt(0) == "1") {
            var match1Avatar = info[i].charAt(1);
        }
        if (info[i].charAt(0) == "2") {
            var match2Avatar = info[i].charAt(1);
        }
    }
    // this will trigger (ONLY) if there was a match for the indexs
    if (match0Avatar != undefined && match1Avatar != undefined && match2Avatar != undefined) { //!= means NOT equal
        if(match0Avatar == match1Avater && match0Avatar == match2Avatar) {
            winDetected = "win"; // this flag will pass when a win has been detected
            winner(winDetected,winCon1);
            return;
        }
    }
    winner(winDetected,winCon1);
}

function checkWinCon2(info,squareArray) {
    var winDetected = "on";
    var winCon2 = [3,4,5];
    //iterate through the growing array during
    //gametime searching for the existence of
    //index 0, index 1 and index 1 and once they
    //do appear in the array, record their
    //avatars and compare all 3 for win cons
    for(var i in info) {
        if (info[i].charAt(0) == "3") {
            var match3Avatar = info[i].charAt(1); // only interested in recording the avatar (.charAt index 1 will be either an X or an O in the array)
        }
        if (info[i].charAt(0) == "4") {
            var match4Avatar = info[i].charAt(1);
        }
        if (info[i].charAt(0) == "5") {
            var match5Avatar = info[i].charAt(1);
        }
    }
    // this will trigger (ONLY) if there was a match for the indexs
    if (match3Avatar != undefined && match4Avatar != undefined && match5Avatar != undefined) { //!= means NOT equal
        if(match3Avatar == match4Avater && match3Avatar == match5Avatar) {
            winDetected = "win"; // this flag will pass when a win has been detected
            winner(winDetected,winCon2);
            return;
        }
    }
    winner(winDetected,winCon2);
}

function checkWinCon3(info,squareArray) {
    var winDetected = "on";
    var winCon3 = [6,7,8];
    //iterate through the growing array during
    //gametime searching for the existence of
    //index 0, index 1 and index 1 and once they
    //do appear in the array, record their
    //avatars and compare all 3 for win cons
    for(var i in info) {
        if (info[i].charAt(0) == "6") {
            var match6Avatar = info[i].charAt(1); // only interested in recording the avatar (.charAt index 1 will be either an X or an O in the array)
        }
        if (info[i].charAt(0) == "7") {
            var match7Avatar = info[i].charAt(1);
        }
        if (info[i].charAt(0) == "8") {
            var match8Avatar = info[i].charAt(1);
        }
    }
    // this will trigger (ONLY) if there was a match for the indexs
    if (match6Avatar != undefined && match7Avatar != undefined && match8Avatar != undefined) { //!= means NOT equal
        if(match6Avatar == match7Avater && match6Avatar == match8Avatar) {
            winDetected = "win"; // this flag will pass when a win has been detected
            winner(winDetected,winCon3);
            return;
        }
    }
    winner(winDetected,winCon3);
}

function checkWinCon4(info,squareArray) {
    var winDetected = "on";
    var winCon4 = [0,3,6];
    //iterate through the growing array during
    //gametime searching for the existence of
    //index 0, index 1 and index 1 and once they
    //do appear in the array, record their
    //avatars and compare all 3 for win cons
    for(var i in info) {
        if (info[i].charAt(0) == "0") {
            var match0Avatar = info[i].charAt(1); // only interested in recording the avatar (.charAt index 1 will be either an X or an O in the array)
        }
        if (info[i].charAt(0) == "3") {
            var match3Avatar = info[i].charAt(1);
        }
        if (info[i].charAt(0) == "6") {
            var match6Avatar = info[i].charAt(1);
        }
    }
    // this will trigger (ONLY) if there was a match for the indexs
    if (match0Avatar != undefined && match3Avatar != undefined && match6Avatar != undefined) { //!= means NOT equal
        if(match0Avatar == match3Avater && match0Avatar == match6Avatar) {
            winDetected = "win"; // this flag will pass when a win has been detected
            winner(winDetected,winCon4);
            return;
        }
    }
    winner(winDetected,winCon4);
}

function checkWinCon5(info,squareArray) {
    var winDetected = "on";
    var winCon5 = [1,4,7];
    //iterate through the growing array during
    //gametime searching for the existence of
    //index 0, index 1 and index 1 and once they
    //do appear in the array, record their
    //avatars and compare all 3 for win cons
    for(var i in info) {
        if (info[i].charAt(0) == "1") {
            var match1Avatar = info[i].charAt(1); // only interested in recording the avatar (.charAt index 1 will be either an X or an O in the array)
        }
        if (info[i].charAt(0) == "4") {
            var match4Avatar = info[i].charAt(1);
        }
        if (info[i].charAt(0) == "7") {
            var match7Avatar = info[i].charAt(1);
        }
    }
    // this will trigger (ONLY) if there was a match for the indexs
    if (match1Avatar != undefined && match4Avatar != undefined && match7Avatar != undefined) { //!= means NOT equal
        if(match1Avatar == match4Avater && match1Avatar == match7Avatar) {
            winDetected = "win"; // this flag will pass when a win has been detected
            winner(winDetected,winCon5);
            return;
        }
    }
    winner(winDetected,winCon5);
}

function checkWinCon6(info,squareArray) {
    var winDetected = "on";
    var winCon6 = [2,5,8];
    //iterate through the growing array during
    //gametime searching for the existence of
    //index 0, index 1 and index 1 and once they
    //do appear in the array, record their
    //avatars and compare all 3 for win cons
    for(var i in info) {
        if (info[i].charAt(0) == "2") {
            var match2Avatar = info[i].charAt(1); // only interested in recording the avatar (.charAt index 1 will be either an X or an O in the array)
        }
        if (info[i].charAt(0) == "5") {
            var match5Avatar = info[i].charAt(1);
        }
        if (info[i].charAt(0) == "8") {
            var match8Avatar = info[i].charAt(1);
        }
    }
    // this will trigger (ONLY) if there was a match for the indexs
    if (match2Avatar != undefined && match5Avatar != undefined && match8Avatar != undefined) { //!= means NOT equal
        if(match2Avatar == match5Avater && match2Avatar == match8Avatar) {
            winDetected = "win"; // this flag will pass when a win has been detected
            winner(winDetected,winCon6);
            return;
        }
    }
    winner(winDetected,winCon6);
}

function checkWinCon7(info,squareArray) {
    var winDetected = "on";
    var winCon7 = [0,4,8];
    //iterate through the growing array during
    //gametime searching for the existence of
    //index 0, index 1 and index 1 and once they
    //do appear in the array, record their
    //avatars and compare all 3 for win cons
    for(var i in info) {
        if (info[i].charAt(0) == "0") {
            var match0Avatar = info[i].charAt(1); // only interested in recording the avatar (.charAt index 1 will be either an X or an O in the array)
        }
        if (info[i].charAt(0) == "4") {
            var match4Avatar = info[i].charAt(1);
        }
        if (info[i].charAt(0) == "8") {
            var match8Avatar = info[i].charAt(1);
        }
    }
    // this will trigger (ONLY) if there was a match for the indexs
    if (match0Avatar != undefined && match4Avatar != undefined && match8Avatar != undefined) { //!= means NOT equal
        if(match0Avatar == match4Avater && match0Avatar == match8Avatar) {
            winDetected = "win"; // this flag will pass when a win has been detected
            winner(winDetected,winCon7);
            return;
        }
    }
    winner(winDetected,winCon7);
}

function checkWinCon1(info,squareArray) {
    var winDetected = "on";
    var winCon1 = [2,4,6];
    //iterate through the growing array during
    //gametime searching for the existence of
    //index 0, index 1 and index 1 and once they
    //do appear in the array, record their
    //avatars and compare all 3 for win cons
    for(var i in info) {
        if (info[i].charAt(0) == "2") {
            var match2Avatar = info[i].charAt(1); // only interested in recording the avatar (.charAt index 1 will be either an X or an O in the array)
        }
        if (info[i].charAt(0) == "4") {
            var match4Avatar = info[i].charAt(1);
        }
        if (info[i].charAt(0) == "6") {
            var match6Avatar = info[i].charAt(1);
        }
    }
    // this will trigger (ONLY) if there was a match for the indexs
    if (match2Avatar != undefined && match4Avatar != undefined && match6Avatar != undefined) { //!= means NOT equal
        if(match2Avatar == match4Avater && match2Avatar == match6Avatar) {
            winDetected = "win"; // this flag will pass when a win has been detected
            winner(winDetected,winCon8);
            return;
        }
    }
    winner(winDetected,winCon8);
}






//---------------------------------------------------------------------------------------------------
//These blocks of functions are for each click event of their corresponding square element
//---------------------------------------------------------------------------------------------------

function square1Animate() {
    var activePlayer = document.getElementById('showPlayer').innerHTML;
    if (activePlayer != "Game Stopped") { //if game has not yet started prevent avatar placement
        var square = "0"; // identify the square selected
        //check if the proposed square is valid
        var verdict = recordMoves(square);
        if (verdict == undefined) { //if verdict is empty than the square is unoccupied. undefined =  nothing is in it
            var paintAvatar = determineAvatar(); // get the correct avatar to paint for the active player
            var selected = document.getElementsByClassName(paintAvatar)[0]; // paint avatar, only get first index
            if (paintAvatar == "O") { //change these all to ternary statements instead
                animateO(selected); // call function to animate O
            } else if (paintAvatar == "X") {
                animateX(selected); // call function to animate X
            }
            //build new array adding the newly selected square and the assigned avatar
            var currentMove = ","+square+paintAvatar; //We know its a valid move, so now this is putting the string info into the program a recording it in the index
            recordMove(currentMove);
            checkForWinCon(); // call function to check if current move completes a winning condition
            avatarPlaced(square,paintAvatar); // end current turn and pass the turn to the other player
            squareSound(); // play a game sound when the avatar is placed
        }
    }
}
function square2Animate() {
    var activePlayer = document.getElementById('showPlayer').innerHTML;
    if (activePlayer !="Game Stopped") { //if game has not yet started prevent avatar placement
        var square = "1"; // identify the square selected
        //check if the proposed square is valid
        var verdict = recordMoves(square);
        if (verdict == undefined) { //if verdict is empty than the square is unoccupied. undefined =  nothing is in it
            var paintAvatar = determineAvatar(); // get the correct avatar to paint for the active player
            var selected = document.getElementsByClassName(paintAvatar)[1]; // paint avatar, only get first index
            if (paintAvatar == "O") { //change these all to ternary statements instead
                animateO(selected); // call function to animate O
            } else if (paintAvatar == "X") {
                animateX(selected); // call function to animate X
            }
            //build new array adding the newly selected square and the assigned avatar
            var currentMove =","+square+paintAvatar;
            recordMove(currentMove);
            checkForWinCon(); // call function to check if current move completes a winning condition
            avatarPlaced(square,paintAvatar); // end current turn and pass the turn to the other player
            squareSound(); // play a game sound when the avatar is placed
        }
    }
}
function square3Animate() {
    var activePlayer = document.getElementById('showPlayer').innerHTML;
    if (activePlayer !="Game Stopped") { //if game has not yet started prevent avatar placement
        var square = "2"; // identify the square selected
        //check if the proposed square is valid
        var verdict = recordMoves(square);
        if (verdict == undefined) { //if verdict is empty than the square is unoccupied. undefined =  nothing is in it
            var paintAvatar = determineAvatar(); // get the correct avatar to paint for the active player
            var selected = document.getElementsByClassName(paintAvatar)[2]; // paint avatar, only get first index
            if (paintAvatar == "O") { //change these all to ternary statements instead
                animateO(selected); // call function to animate O
            } else if (paintAvatar == "X") {
                animateX(selected); // call function to animate X
            }
            //build new array adding the newly selected square and the assigned avatar
            var currentMove =","+square+paintAvatar;
            recordMove(currentMove);
            checkForWinCon(); // call function to check if current move completes a winning condition
            avatarPlaced(square,paintAvatar); // end current turn and pass the turn to the other player
            squareSound(); // play a game sound when the avatar is placed
        }
    }
}
function square4Animate() {
    var activePlayer = document.getElementById('showPlayer').innerHTML;
    if (activePlayer !="Game Stopped") { //if game has not yet started prevent avatar placement
        var square = "3"; // identify the square selected
        //check if the proposed square is valid
        var verdict = recordMoves(square);
        if (verdict == undefined) { //if verdict is empty than the square is unoccupied. undefined =  nothing is in it
            var paintAvatar = determineAvatar(); // get the correct avatar to paint for the active player
            var selected = document.getElementsByClassName(paintAvatar)[3]; // paint avatar, only get first index
            if (paintAvatar == "O") { //change these all to ternary statements instead
                animateO(selected); // call function to animate O
            } else if (paintAvatar == "X") {
                animateX(selected); // call function to animate X
            }
            //build new array adding the newly selected square and the assigned avatar
            var currentMove =","+square+paintAvatar;
            recordMove(currentMove);
            checkForWinCon(); // call function to check if current move completes a winning condition
            avatarPlaced(square,paintAvatar); // end current turn and pass the turn to the other player
            squareSound(); // play a game sound when the avatar is placed
        }
    }
}
function square5Animate() {
    var activePlayer = document.getElementById('showPlayer').innerHTML;
    if (activePlayer !="Game Stopped") { //if game has not yet started prevent avatar placement
        var square = "4"; // identify the square selected
        //check if the proposed square is valid
        var verdict = recordMoves(square);
        if (verdict == undefined) { //if verdict is empty than the square is unoccupied. undefined =  nothing is in it
            var paintAvatar = determineAvatar(); // get the correct avatar to paint for the active player
            var selected = document.getElementsByClassName(paintAvatar)[4]; // paint avatar, only get first index
            if (paintAvatar == "O") { //change these all to ternary statements instead
                animateO(selected); // call function to animate O
            } else if (paintAvatar == "X") {
                animateX(selected); // call function to animate X
            }
            //build new array adding the newly selected square and the assigned avatar
            var currentMove =","+square+paintAvatar;
            recordMove(currentMove);
            checkForWinCon(); // call function to check if current move completes a winning condition
            avatarPlaced(square,paintAvatar); // end current turn and pass the turn to the other player
            squareSound(); // play a game sound when the avatar is placed
        }
    }
}
function square6Animate() {
    var activePlayer = document.getElementById('showPlayer').innerHTML;
    if (activePlayer !="Game Stopped") { //if game has not yet started prevent avatar placement
        var square = "5"; // identify the square selected
        //check if the proposed square is valid
        var verdict = recordMoves(square);
        if (verdict == undefined) { //if verdict is empty than the square is unoccupied. undefined =  nothing is in it
            var paintAvatar = determineAvatar(); // get the correct avatar to paint for the active player
            var selected = document.getElementsByClassName(paintAvatar)[5]; // paint avatar, only get first index
            if (paintAvatar == "O") { //change these all to ternary statements instead
                animateO(selected); // call function to animate O
            } else if (paintAvatar == "X") {
                animateX(selected); // call function to animate X
            }
            //build new array adding the newly selected square and the assigned avatar
            var currentMove =","+square+paintAvatar;
            recordMove(currentMove);
            checkForWinCon(); // call function to check if current move completes a winning condition
            avatarPlaced(square,paintAvatar); // end current turn and pass the turn to the other player
            squareSound(); // play a game sound when the avatar is placed
        }
    }
}
function square7Animate() {
    var activePlayer = document.getElementById('showPlayer').innerHTML;
    if (activePlayer !="Game Stopped") { //if game has not yet started prevent avatar placement
        var square = "6"; // identify the square selected
        //check if the proposed square is valid
        var verdict = recordMoves(square);
        if (verdict == undefined) { //if verdict is empty than the square is unoccupied. undefined =  nothing is in it
            var paintAvatar = determineAvatar(); // get the correct avatar to paint for the active player
            var selected = document.getElementsByClassName(paintAvatar)[6]; // paint avatar, only get first index
            if (paintAvatar == "O") { //change these all to ternary statements instead
                animateO(selected); // call function to animate O
            } else if (paintAvatar == "X") {
                animateX(selected); // call function to animate X
            }
            //build new array adding the newly selected square and the assigned avatar
            var currentMove =","+square+paintAvatar;
            recordMove(currentMove);
            checkForWinCon(); // call function to check if current move completes a winning condition
            avatarPlaced(square,paintAvatar); // end current turn and pass the turn to the other player
            squareSound(); // play a game sound when the avatar is placed
        }
    }
}
function square8Animate() {
    var activePlayer = document.getElementById('showPlayer').innerHTML;
    if (activePlayer !="Game Stopped") { //if game has not yet started prevent avatar placement
        var square = "7"; // identify the square selected
        //check if the proposed square is valid
        var verdict = recordMoves(square);
        if (verdict == undefined) { //if verdict is empty than the square is unoccupied. undefined =  nothing is in it
            var paintAvatar = determineAvatar(); // get the correct avatar to paint for the active player
            var selected = document.getElementsByClassName(paintAvatar)[7]; // paint avatar, only get first index
            if (paintAvatar == "O") { //change these all to ternary statements instead
                animateO(selected); // call function to animate O
            } else if (paintAvatar == "X") {
                animateX(selected); // call function to animate X
            }
            //build new array adding the newly selected square and the assigned avatar
            var currentMove =","+square+paintAvatar;
            recordMove(currentMove);
            checkForWinCon(); // call function to check if current move completes a winning condition
            avatarPlaced(square,paintAvatar); // end current turn and pass the turn to the other player
            squareSound(); // play a game sound when the avatar is placed
        }
    }
}
function square9Animate() {
    var activePlayer = document.getElementById('showPlayer').innerHTML;
    if (activePlayer !="Game Stopped") { //if game has not yet started prevent avatar placement
        var square = "8"; // identify the square selected
        //check if the proposed square is valid
        var verdict = recordMoves(square);
        if (verdict == undefined) { //if verdict is empty than the square is unoccupied. undefined =  nothing is in it
            var paintAvatar = determineAvatar(); // get the correct avatar to paint for the active player
            var selected = document.getElementsByClassName(paintAvatar)[8]; // paint avatar, only get first index
            if (paintAvatar == "O") { //change these all to ternary statements instead
                animateO(selected); // call function to animate O
            } else if (paintAvatar == "X") {
                animateX(selected); // call function to animate X
            }
            //build new array adding the newly selected square and the assigned avatar
            var currentMove =","+square+paintAvatar;
            recordMove(currentMove);
            checkForWinCon(); // call function to check if current move completes a winning condition
            avatarPlaced(square,paintAvatar); // end current turn and pass the turn to the other player
            squareSound(); // play a game sound when the avatar is placed
        }
    }
}




// this function will perform the animation for the O avatar.
function animateO(selected) {
    selected.style.transform = (selected.style.transform == "translateY(-100%)" || null) ? "translateY(0)" : "translateY(-100%)";
}

// this function will perform the animation for the X avatar.
function animateX(selected) {
    selected.style.transform = (selected.style.transform == "translateY(100%)" || null) ? "translateY(0%)" : "translateY(100%)";
}

