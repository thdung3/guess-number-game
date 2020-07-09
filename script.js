let randomNumber = Math.floor(Math.random() * 100) + 1;
console.log('randomNumber:', randomNumber);
let remaining = 5;
let history = [];
let time = 30 // time start from 0
let myTime; // timer will be assign to this variable
let isWin = false;
let previous = {};
let bestScore = {};
let bestTime = 0;
timeCounting()// fire the timecounting function!!

document.getElementById('inputNumber').addEventListener("keyup", function (event) {
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
        // Cancel the default action, if needed
        event.preventDefault();
        // Trigger the button element with a click
        document.getElementById("btnGuess").click();
    }
});

function doGuess() {
    if ((isWin == true) || (remaining == 0) || (time == 0)) {
        return 0
    }
    let numberGuessString = document.getElementById('inputNumber').value;
    let numberGuess = parseInt(numberGuessString);
    console.log('numberGuess:', numberGuess)

    // Control the input number
    let isCheckNumber = controlInputNumber()
    if (isCheckNumber == false) {
        return 0
    }

    // Show notification
    if (numberGuess > randomNumber) {
        document.getElementById('text-result').className = ''
        document.getElementById('text-result').classList.add('too-heigh-color')
        document.getElementById('text-result').innerHTML = 'Too high'
    } else if (numberGuess < randomNumber) {
        document.getElementById('text-result').className = ''
        document.getElementById('text-result').innerHTML = 'Too Low'
        document.getElementById('text-result').classList.add('too-low-color')
    } else {
        isWin = true;
        document.getElementById('text-result').className = ''
        document.getElementById('text-result').classList.add('win-color')
        document.getElementById('text-result').innerHTML = 'You win'
        document.getElementById('winning-number').innerHTML = randomNumber
        previous.result = isWin
        previous.numbers = history
        bestScore.time = time;
        bestScore.numbers = history;
        clearInterval(myTime);
    }
    history.push(numberGuess)
    remaining--
    if (remaining == 0) {
        document.getElementById('text-result').className = ''
        document.getElementById('text-result').classList.add('lose-color')
        document.getElementById('text-result').innerHTML = 'You lose'
        document.getElementById('winning-number').innerHTML = randomNumber
        previous.result = isWin
        previous.numbers = history
        clearInterval(myTime);
    }
    document.getElementById('numberRemaining').innerHTML = remaining
    document.getElementById('history-text').innerHTML = history
    document.getElementById('inputNumber').value = ''
}

function doReset() {
    clearInterval(myTime);
    time = 30
    remaining = 5
    randomNumber = Math.floor(Math.random() * 100) + 1;
    history = []
    isWin = false
    console.log('randomNumber:', randomNumber)
    document.getElementById('winning-number').innerHTML = '???'
    document.getElementById('numberTime').innerHTML = time
    document.getElementById('numberRemaining').innerHTML = remaining
    document.getElementById('history-text').innerHTML = '---'
    document.getElementById('number-notify').innerHTML = ''
    document.getElementById('inputNumber').value = ''
    if (previous.result != undefined) {
        if (previous.result) {
            document.getElementById('previous-text').innerHTML = `${previous.numbers} - Win`
        } else {
            document.getElementById('previous-text').innerHTML = `${previous.numbers} - Lose`
        }

    }
    if (bestScore.time != undefined) {
        if (bestScore.time > bestTime) {
            bestTime = bestScore.time
            document.getElementById('best-score-text').innerHTML = `${previous.numbers} - Time: ${bestTime}`
        }
    }
    timeCounting()
}

function timeCounting() {
    myTime = setInterval(() => {
        time -= 1
        document.getElementById('numberTime').innerHTML = time
        if (time == 0) {
            clearInterval(myTime);
            document.getElementById('text-result').className = ''
            document.getElementById('text-result').classList.add('lose-color')
            document.getElementById('text-result').innerHTML = 'You lose'
        }
    }, 1000)// every 1 second, it will add 1 into time variable (computer use millisecond so 1000 is 1 second)
}

function controlInputNumber() {
    let numberGuessString = document.getElementById('inputNumber').value;
    let numberGuess = parseInt(numberGuessString);
    if (numberGuess <= 0 || numberGuess > 100) {
        document.getElementById('number-notify').innerHTML = 'Shoud be between 1 and 100'
        return false
    }

    if (isNaN(numberGuess)) {
        document.getElementById('number-notify').innerHTML = 'Should be a number'
        return false
    }

    if (history.indexOf(numberGuess) >= 0) {
        document.getElementById('number-notify').innerHTML = `You've already guessed ${numberGuess}`
        return false
    }
    document.getElementById('number-notify').innerHTML = ''
    return true
}

