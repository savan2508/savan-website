
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
        playerNameField.className = "form-control";
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

        sidebarStyle();
        
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

        var roundNumberTag = document.getElementById("roundNumber");

        var roundNumber = roundNumberTag.children.length + 1;        

        for (var i = 0; i < numPlayers; i++) {
            var playerResult = [];
            playerStats[playerNames[i]].totalRoundRoll = 0;

            for (var j = 0; j < numDice; j++) {
                var randomNumber = Math.floor(Math.random() * 6) + 1;
                var randomDiceImage = "images/dice" + randomNumber + ".png";
                playerResult.push(randomDiceImage);
                playerStats[playerNames[i]].totalRoundRoll += randomNumber; 
            }

            playerStats[playerNames[i]].CumulativeTotal += playerStats[playerNames[i]].totalRoundRoll;

            diceResults.push(playerResult);

        }
        animateDiceRoll(2000, 30, diceResults, playerNames, roundNumber);
    }

    function animateDiceRoll(duration, frames, diceResults, playerNames, roundNumber) {
        // Disable the roll button during animation
        rollDiceButton.disabled = true;
      
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

            roundWinner = determineRoundWinner();

            updateRoundLog(roundNumber, roundWinner);
            updateStats(roundNumber, roundWinner);
            scrollToLastUpdatedPoint();

            var winnerMessage = document.createElement("h1");

            if (roundWinner === -1) {
              winnerMessage.textContent = "Draw! Please hit roll.";
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

    function updateRoundLog(roundNumber, roundWinner) {
        var roundLog = document.getElementById("roundNumber");
        
        var roundEntry = document.createElement("li");
        roundEntry.textContent = "Round " + roundNumber + ":";
        
        var roundLogList = document.createElement("ul");
        
        for (var i = 0; i < numPlayers; i++) {
        //   var playerResult = diceResults[i];
          var playerName = playerNames[i];
      
          var playerEntry = document.createElement("li");
          playerEntry.textContent = playerName + ": " + playerStats[playerNames[i]].totalRoundRoll;
          roundLogList.appendChild(playerEntry);
        }
        
        if (roundWinner !== -1) {
          var winnerEntry = document.createElement("li");
          winnerEntry.textContent = "Winner: " + playerNames[roundWinner];
          roundLogList.appendChild(winnerEntry);
        } else {
          var drawEntry = document.createElement("li");
          drawEntry.textContent = "Draw";
          roundLogList.appendChild(drawEntry);
        }
        
        roundEntry.appendChild(roundLogList);
        roundLog.appendChild(roundEntry);
      }

    function updateStats(roundNumber, roundWinner) {
        // Calculate and update stats

        roundWinner = playerNames[roundWinner];

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
    
        var resultContainer = document.getElementById("resultContainer");
        resultContainer.innerHTML = "";

        var resultContainer = document.getElementById("roundStats");
        resultContainer.innerHTML = "";

        var resultContainer = document.getElementById("roundNumber");
        resultContainer.innerHTML = "";

        playerStats = {};
        playerNames = [];

        homePageStyleDefault();
        createPlayerNameFields(numPlayers, numDice);
    }

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

function homePageStyleDefault() {
    // Change the style of the webpage to the default

    var content = document.getElementsByClassName("content")[0];
    var sideBar = document.getElementsByClassName("sidebar")[0];

    sideBar.style.display = "none";

    content.style.flex = "";
    content.style.width = "90%";
    content.style.textAlign = "center";
    content.style.marginRight = "";
    content.style.justifyContent = "center";
    content.style.alignItems = "center";
}

function sidebarStyle() {
    // Change the style of the sidebar dynamically

    var sideBar = document.getElementsByClassName("sidebar")[0];
    var content = document.getElementsByClassName("content")[0];
    
    content.style.flex = "0 0 85%";
    content.style.width = "90%";
    content.style.textAlign = "center";
    content.style.marginRight = "15%";
    content.style.justifyContent = "center";
    content.style.alignItems = "center";

    sideBar.style.display = "block";

    sideBar.style.width = "15%";
    sideBar.style.position = "absolute";
    sideBar.style.top = "0";
    sideBar.style.right = "0";
    sideBar.style.height = "100vh";
    sideBar.style.display = "flex";
    sideBar.style.flexDirection = "column";
    sideBar.style.paddingRight = "10px";

    // Add media query dynamically
    var style = document.createElement("style");
    style.textContent = `
        @media (max-width: 768px) {
        .container {
            flex-direction: column;
        }
    
        .content {
            flex: 0 0 100%;
            order: 0;
            margin-bottom: 10%;
            margin-left: 10%;
            margin-right: 10%;
        }
    
        .sidebar {
            flex: 0 0 100%;
            order: 1;
            position: relative;
            width: 100%;
            margin-top: 10px;
        }
        }
    `;
    document.head.appendChild(style);
}

