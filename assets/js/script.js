function game() {

    const choices = ['rock', 'paper', 'scissors', 'lizard', 'spock'];
    const userWinResults = ['scissorspaper', 'paperrock', 'rocklizard', 'lizardspock', 'spockscissors', 'rockscissors', 'scissorslizard', 'lizardpaper', 'paperspock', 'spockrock'];
    let userChoice = '';
    let sheldonChoice = '';



    window.addEventListener('load', () => {

        document.querySelectorAll('.user-choice .game-card').forEach(card => {
            card.addEventListener('click', (event) => {
                userChoice = getUserChoice(event.target);
                sheldonChoice = getSheldonChoice()

                startGame();
            })
        })
    })

    function startGame() {
        calculateWinner(userChoice, sheldonChoice)
    }

    function getUserChoice(target) {
        console.log(target);
        if (target.nodeName === "IMG") {
            return target.parentElement.classList[1];
        }
        return target.classList[1];
    }

    function getSheldonChoice() {
        return choices[Math.floor(Math.random() * 5)];
    }

    function calculateWinner(usercard, sheldoncard) {
        if (usercard === sheldoncard) {
            console.log('tie');
        } else if (getUserWinsStatus(usercard + sheldoncard)) {
            console.log('You Win');
        } else {
            console.log('you lose');
        }

    }

    function getUserWinsStatus(result) {
        return userWinResults.some(winStr => winStr === result);


    }

}

game()