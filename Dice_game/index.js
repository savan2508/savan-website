
window.onload = function() {

    var numPlayers = 2; // Default number of players
    var numDice = 1; // Default number of dice
    var playerNames = [];
    var playerStats = {};
    var roundWinner = -1;

    var numPlayersInput = document.getElementById("numPlayers");
    var numDiceInput = document.getElementById("numDice");
    var playerNamesContainer = document.getElementById("playerNamesContainer");
    var rollButton = document.getElementById("rollButton");
    var rollDiceButton = document.getElementById("rollDiceButton");
    var resetButton = document.getElementById("resetButton");
    var gameContainer = document.getElementById("gameContainer");
    var roundLog = document.getElementById("roundLog");
    var LogoText = document.getElementById("logo");

    numPlayersInput.addEventListener("input", createPlayerNameFields);
    numDiceInput.addEventListener("input", createPlayerNameFields);
    rollButton.addEventListener("click", startGame);
    rollDiceButton.addEventListener("click", rollDice);
    resetButton.addEventListener("click", resetGame);
    LogoText.addEventListener("click", resetGame);
    
    createPlayerNameFields(numPlayers, numDice);

    function createPlayerNameFields(numPlayers, numDice) {
        var numPlayersInput = document.getElementById("numPlayers");
        var playerNamesContainer = document.getElementById("playerNamesContainer");

        numPlayers = parseInt(numPlayersInput.value) || numPlayers;

        playerNamesContainer.innerHTML = "";

        for (var i = 1; i <= numPlayers; i++) {
        var playerNameField = document.createElement("input");
        playerNameField.type = "text";
        playerNameField.placeholder = "Player " + i + " Name";
        playerNamesContainer.appendChild(playerNameField);
        }

    }

    function startGame() {
        var numPlayersInput = document.getElementById("numPlayers");
        var numDiceInput = document.getElementById("numDice");
        var formContainer = document.getElementById("formContainer");

        numPlayers = parseInt(numPlayersInput.value) || numPlayers;
        numDice = parseInt(numDiceInput.value) || numDice;

        formContainer.style.display = "none";
    
        gameContainer.style.display = "block";
        for (var i = 1; i <= numPlayers; i++) {
            var playerNameField = playerNamesContainer.children[i - 1];
            var playerName = playerNameField.value || "Player " + i;
            playerNames.push(playerName);
            }
        
        for (var player = 0; player < numPlayers; player++) {
        playerStats[playerNames[player]] = {wins: 0, winPercentage: 0, totalRoundRoll: 0, CumulativeTotal: 0};
        }
        playerStats["Draw"] = {draw: 0, drawPercentage: 0};
    }

    function rollDice() {

        var diceResults = [];
        roundWinner = -1;
        var diceLog = document.getElementById("diceLog");

        var roundNumberTag = document.getElementById("roundNumber");

        var roundNumber = roundNumberTag.children.length + 1;        

        var resultContainer = document.getElementById("resultContainer");
        resultContainer.innerHTML = "";

        var roundLogContainer = document.getElementById("sidebarTextStats");
        // roundLogContainer.innerHTML = "";

        
        var roundNumberItem = document.createElement("li");
        roundNumberItem.textContent = "Round: " + roundNumber + ":";
        roundNumberTag.appendChild(roundNumberItem);

        var roundLog = document.createElement("ul"); // Dynamically add unordered list to the round number
        roundNumberItem.appendChild(roundLog);

        for (var i = 0; i < numPlayers; i++) {
            var playerResult = [];
            playerStats[playerNames[i]].totalRoundRoll = 0;

            for (var j = 0; j < numDice; j++) {
                var randomNumber = Math.floor(Math.random() * 6) + 1;
                var randomDiceImage = "images/dice" + randomNumber + ".png";
                playerResult.push(randomDiceImage);
                playerStats[playerNames[i]].totalRoundRoll += randomNumber; 

                var diceLogItem = document.createElement("li");
                diceLogItem.textContent = playerNames[i] + ": " + randomNumber;
                diceLog.appendChild(diceLogItem);

            }

            playerStats[playerNames[i]].CumulativeTotal += playerStats[playerNames[i]].totalRoundRoll;

            diceResults.push(playerResult);

            var roundLogItem = document.createElement("li");
            roundLogItem.textContent = playerNames[i] + ": " + playerStats[playerNames[i]].totalRoundRoll;
            roundLog.appendChild(roundLogItem);
        }

        roundWinner = determineRoundWinner();
        var roundLogEntry = document.createElement("li");
        if (roundWinner !== -1) {
            roundLogEntry.textContent = "Winner: " + playerNames[roundWinner];
        } 
        else {
            roundLogEntry.textContent = "Round " + roundNumber + ": Draw";
        }
        roundLog.appendChild(roundLogEntry);

        scrollToLastUpdatedPoint();

        animateDiceRoll(2000, 30, diceResults, playerNames);

        updateStats(roundNumber, playerNames[roundWinner]);
    }

    function updateStats(roundNumber, roundWinner) {
        // Calculate and update stats

        if (typeof roundWinner !== "undefined"){
            playerStats[roundWinner].wins += 1;
        }
        else {
            playerStats["Draw"].draw += 1;
        }
        

        // Update stats display
        var statsContainer = document.getElementById("roundStats");
        statsContainer.innerHTML = "";

        for (var player in playerStats) {
            if (playerStats.hasOwnProperty(player) && player !== "Draw") {
                var playerInfo = playerStats[player];
                playerInfo.winPercentage = ((playerInfo.wins / roundNumber) * 100).toFixed(2);

                var playerStatsEntry = document.createElement("li");
                playerStatsEntry.textContent = player + ": " + playerInfo.wins + " wins";
                playerStatsEntry.textContent += " (" + playerInfo.winPercentage + "%)";
                statsContainer.appendChild(playerStatsEntry);
            }
        }
        var playerStatsEntry = document.createElement("li");
        playerStats["Draw"].drawPercentage = ((playerStats["Draw"].draw / roundNumber) * 100).toFixed(2);
        playerStatsEntry.textContent = "Draw: " + playerStats["Draw"].draw;
        playerStatsEntry.textContent += " (" + playerStats["Draw"].drawPercentage + "%)";
        statsContainer.appendChild(playerStatsEntry);
    }

    function resetGame() {
        var formContainer = document.getElementById("formContainer");
        formContainer.style.display = "block";
    
        gameContainer.style.display = "none";
    
        playerNamesContainer.innerHTML = "";
        numPlayersInput.value = 2;
        numDiceInput.value = 1;
    
        var diceLog = document.getElementById("diceLog");
        diceLog.innerHTML = "";
    
        var resultContainer = document.getElementById("resultContainer");
        resultContainer.innerHTML = "";

        var resultContainer = document.getElementById("roundStats");
        resultContainer.innerHTML = "";

        var resultContainer = document.getElementById("roundNumber");
        resultContainer.innerHTML = "";

        playerStats = {};
        playerNames = [];

        createPlayerNameFields(numPlayers, numDice);
    }

    function animateDiceRoll(duration, frames, diceResults, playerNames) {
        // Disable the roll button during animation
        rollDiceButton.disabled = true;
      
        // Clear the result container
        resultContainer.innerHTML = "";
      
        var animationFrame = 0;
        var animationInterval = duration / frames;

        var diceImages = [];
        for (var i = 1; i <= 6; i++) {
          diceImages.push("images/dice" + i + ".png");
        }
      
        var animateDice = setInterval(function() {
          animationFrame++;
          if (animationFrame > frames) {
            clearInterval(animateDice);
            displayDiceResults(diceResults, playerNames);
            rollDiceButton.disabled = false; // Enable the roll button

            var winnerMessage = document.createElement("h1");

            if (roundWinner === -1) {
              winnerMessage.textContent = "Draw! Please Reload.";
            } else {
              winnerMessage.textContent = playerNames[roundWinner] + " Wins! 🤩";
            }
            
            resultContainer.insertBefore(winnerMessage, resultContainer.firstChild);

          } else {
            // Generate random dice numbers for animation frames
            var playerResult = [];
            for (var i = 0; i < numPlayers; i++) {
              var playerDiceResult = [];
              for (var j = 0; j < numDice; j++) {
                var randomNumber = Math.floor(Math.random() * 6) + 1;
                var randomDiceImage = "images/dice" + randomNumber + ".png";
                playerDiceResult.push(randomDiceImage);
              }
              playerResult.push(playerDiceResult);
            }
            displayDiceResults(playerResult, playerNames);
          }
        }, animationInterval);

      }
      

    function displayDiceResults(results, playerNames) {
        var resultContainer = document.getElementById("resultContainer");

        // Clear the result container
        resultContainer.innerHTML = "";

        for (var i = 0; i < results.length; i++) {
            var playerResult = results[i];
            var playerName = playerNames[i];

            var playerContainer = document.createElement("div");
            playerContainer.className = "dice";

            var playerNameElement = document.createElement("p");
            playerNameElement.textContent = playerName;
            playerContainer.appendChild(playerNameElement);

                for (var j = 0; j < playerResult.length; j++) {
                    var diceImage = document.createElement("img");
                    diceImage.className = "img" + (j + 1);
                    diceImage.src = playerResult[j];
                    playerContainer.appendChild(diceImage);
                }

            resultContainer.appendChild(playerContainer);
        }
    };

    function determineRoundWinner() {
        var maxSum = -1;
        var roundWinner = -1;

            for (var i = 0; i < playerNames.length; i++) {
                var playerResult = playerStats[playerNames[i]].totalRoundRoll;

                if (playerResult === maxSum) {
                    roundWinner = -1
                }
                else if (playerResult > maxSum) {
                maxSum = playerResult;
                roundWinner = i;
                }
            }

        return roundWinner;
    };
};

var roundLogContainer = document.querySelector('.round-log-container');

// Function to scroll the container to the last updated point
function scrollToLastUpdatedPoint() {
  roundLogContainer.scrollTop = roundLogContainer.scrollHeight;
}

