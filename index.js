
///////// DOM
const buttons = document.querySelectorAll('.game__button');
const attemptDisplay = document.querySelector('.footer__attempt');
const header = document.querySelector('.container__header');
const currentTimer = document.querySelector('.footer__timer');
const averageTimer = document.querySelector('.footer__avg');
///////// TIMES
let currentTime = 0;
let times = [];

function init() {
    ///////// INITIAL VALUES
    let first, modifiers, modifier, last, question, answer, attempt, attemptString;
    attempt = [];
    attempt.length = 0;
    attemptDisplay.textContent = '';
    times.push(currentTime);
    averageTimer.innerHTML = `<span> Average </span> ${((times.reduceRight((a,b) => a + b)) / times.length).toFixed(2)}`;    
    currentTime = 0;
    console.clear();
    ///////// BORDERS
        const borderList = new Map();
    borderList.set(0, ['border-right: 1px solid white;', 'border-top: 1px solid white']);
    borderList.set(1, ['border-right: 1px solid white', 'border-bottom: 1px solid white']);
    borderList.set(2, ['border-left: 1px solid white', 'border-top: 1px solid white']);
    borderList.set(3, ['border-left: 1px solid white', 'border-bottom: 1px solid white']);
    borderList.set(4, ['border-right: 1px solid white', 'border-left: 1px solid white']);
    for (let i of buttons) {
        i.style = borderList.get(Math.floor(Math.random() * borderList.size))[0];
        i.style = borderList.get(Math.floor(Math.random() * borderList.size))[1];
    }
    ////////// GET QUESTION
    modifiers = ['+', '-', '*', '/'];
    [first, modifier, last] = [`${(Math.random() * 9).toFixed()} ${modifiers[Math.floor(Math.random() * modifiers.length)]} ${(Math.random() * 9).toFixed()}`];
    question = [first, modifier, last];
    header.textContent = question.join('');
    ////////// GET ANSWER
    answer = (eval(first, modifier, last)).toFixed(1);
    answer == Infinity ? init() : answer = answer;
    answer.charAt(answer.length - 1) === '0' ? answer = answer.slice(0, -2) : answer = answer;
    console.log(`The answer is ${answer}, but you're a cheater.`);
    ////////// PLAY
    for (let i of buttons) {
        i.addEventListener('click', () => {
            attempt.push(i.textContent);
            attemptString = attempt.join('');
            attemptDisplay.textContent = attemptString;
            if (attemptString.length == answer.length) {
                attemptString == answer ? init() : attempt.length = 0;
            } 
        });
    }
}
///////// TIMERS
setInterval(() => {
    currentTime++, 100
    currentTimer.innerHTML = `<span> Current </span> ${currentTime}`;
}, 1000);
init();

