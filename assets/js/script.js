function game() {

    const choices = ['rock', 'paper', 'scissors', 'lizard', 'spock'];
    const userWinResults = ['scissorspaper', 'paperrock', 'rocklizard', 'lizardspock', 'spockscissors', 'rockscissors', 'scissorslizard', 'lizardpaper', 'paperspock', 'spockrock'];
    let userChoice = '';
    let sheldonChoice = '';
    const userChoiceElement = document.querySelector('.user-choice');
    const pickedElement = document.querySelector('.picked');
    const userPickedElement = document.querySelector('.user-pick');
    const sheldonPickedElement = document.querySelector('.sheldon-pick')
    const resultElement = document.querySelector('.result');
    const resultTitleElement = resultElement.querySelector('.title');
    let userScoreForWin = 0;
    let sheldonScoreForWin = 0;


    window.addEventListener('load', () => {

        document.querySelectorAll('.user-choice .game-card').forEach(card => {
            card.addEventListener('click', (event) => {
                userChoice = getUserChoice(event.target);
                sheldonChoice = getSheldonChoice()

                startGame();
            })
        })

        resultElement.querySelector('button').addEventListener('click', tryAgain)
    })

    function startGame() {
        calculateWinner(userChoice, sheldonChoice)

        userChoiceElement.classList.add('hidden');
        pickedElement.classList.remove('hidden');
        clearResultsBeforeAppend();
        buildChoiceElement(true, userChoice);
        buildChoiceElement(false, sheldonChoice);
    }
    // return the second item in the class-list array which in this case indicates which option was selected
    function getUserChoice(target) {
        if (target.nodeName === "IMG") {
            return target.parentElement.classList[1];
        }
        return target.classList[1];
    }
    // a randomised function that "sheldon" uses to select an option from the five available
    function getSheldonChoice() {
        return choices[Math.floor(Math.random() * 5)];
    }
    //calculates whether the user has won or not by comparing the concatenated string values of the user choice and sheldon choice against an array of possible win combinations
    function calculateWinner(usercard, sheldoncard) {
        if (usercard === sheldoncard) {
            resultTitleElement.innerText = "I don't need sleep, I need answers";
            incrementTries();
        } else if (getUserWinsStatus(usercard + sheldoncard)) {
            resultTitleElement.innerText = "Alright, I'll bow to social pressure";
            incrementTries();
            incrementScore();
            userScoreForWin += 1
            console.log('user score', userScoreForWin);
        } else {
            resultTitleElement.innerText = 'bazinga';
            incrementTries();
            incrementSheldonScore();
            sheldonScoreForWin += 1;
            console.log('sheldon score', sheldonScoreForWin);
        }
        calculateUltimateWinner();
    }

    //look for the combination of selected moves in the array of potential winning combinations
    function getUserWinsStatus(result) {
        return userWinResults.some(winStr => winStr === result);

    }

    //update the choices on the results block (hidden until an option is picked)

    function buildChoiceElement(isItUserElement, className) {
        const choiceElement = document.createElement('div');
        choiceElement.classList = [`game-card ${className}`];
        choiceElement.innerHTML = `<img src="assets/images/icon-${className}.svg" alt="${className}">`;
        if (isItUserElement) {
            userPickedElement.append(choiceElement);
        } else {
            sheldonPickedElement.append(choiceElement)

        }

    }

    function calculateUltimateWinner() {
        if (userScoreForWin === 3) {
            userChoiceElement.classList.add('hidden');
            pickedElement.classList.add('hidden');
            document.querySelector('.player-ultimate-win').classList.remove('hidden')
            document.querySelector('.player-ultimate-win').classList.add('active')
        } else if (sheldonScoreForWin === 3) {
            userChoiceElement.classList.add('hidden');
            pickedElement.classList.add('hidden');
            document.querySelector('.sheldon-ultimate-win').classList.remove('hidden')
            document.querySelector('.sheldon-ultimate-win').classList.add('active')
        }
    }


    function tryAgain() {
        userChoiceElement.classList.remove('hidden');
        pickedElement.classList.add('hidden');

    }

    //clears the selected options before updating them with subsequent choices
    function clearResultsBeforeAppend() {
        userPickedElement.innerHTML = '';
        sheldonPickedElement.innerHTML = '';
    }

    //adds to the player score when the player winns a round 
    function incrementScore() {

        let oldScore = parseInt(document.getElementById('score').innerText);
        document.getElementById('score').innerText = ++oldScore;

    }
    //adds to sheldon score when sheldon wins a round
    function incrementSheldonScore() {

        let oldScore = parseInt(document.getElementById('sheldon-score').innerText);
        document.getElementById('sheldon-score').innerText = ++oldScore;

    }
    //adds to the round counter, will add even if a tie
    function incrementTries() {

        let oldScore = parseInt(document.getElementById('round').innerText);
        document.getElementById('round').innerText = ++oldScore;

    }
    // reset button reselts all counters

    const resetBtn = document.querySelector('.reset-btn');

    resetBtn.addEventListener('click', resetGame);

    function resetGame() {
        document.getElementById('sheldon-score').innerText = 0;
        document.getElementById('score').innerText = 0;
        document.getElementById('round').innerText = 0;
        userScoreForWin = 0;
        sheldonScoreForWin = 0;
        userChoiceElement.classList.remove('hidden');
        pickedElement.classList.add('hidden');
    }



    //work with modal

    const rulesBtn = document.querySelector('.rules-btn');
    const modalBg = document.querySelector('.modal-bg');
    const modal = document.querySelector('.modal');

    rulesBtn.addEventListener('click', () => {
        modal.classList.add('active');
        modalBg.classList.add('active');
    });

    modalBg.addEventListener('click', (event) => {
        if (event.target === modalBg) {
            hideModal();
        }
    });

    document.querySelector('.close').addEventListener('click', hideModal);

    function hideModal() {
        modal.classList.remove('active');
        modalBg.classList.remove('active');
    }
}



game()