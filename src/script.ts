"use strict";

window.addEventListener("load", app);

let isGameOver = false;
let guessCount = 0;
let min = 1;
let max = 100;
let mid = calculateMid();

function app() {
    console.log("Start game!");

    addEventListeners();
}

function addEventListeners() {
    document.querySelector("#start-btn")?.addEventListener("click", startGame);
    document.querySelector("#high-btn")?.addEventListener("click", GuessIsTooHigh);
    document.querySelector("#low-btn")?.addEventListener("click", GuessIsTooLow);
    document.querySelector("#correct-btn")?.addEventListener("click", GuessIsCorrect);
}

function startGame() {
    document.querySelector("#start-container")?.remove();

    printGuess(guessNumber());
}

function guessNumber(): number {
    return mid;
}

function printGuess(guess: number) {
    let html =
        /*html*/
        `<li>I'm guessing ${guess} - 
            <span id="btn-container">
                Is that <button id="high-btn">Too high</button><button id="low-btn">Too low</button><button
                id="correct-btn">Correct</button>
            </span>
        </li>`;

    if (min === max) {
        html =
            /*html*/
            `
            <li>It must be ${mid}!</li>
            `;

        isGameOver = true;
    }

    document.querySelector("#guesses-list")?.insertAdjacentHTML("beforeend", html);

    updateGuessCount();
    checkGameState();
    addEventListeners();

    console.log("min:", min, "max:", max, "mid:", mid, "isGameOver:", isGameOver);
}

function printAnswer(answer: string) {
    document.querySelector("#btn-container")!.remove();
    document.querySelector("li:last-child")!.textContent += answer;
}

function GuessIsTooHigh() {
    printAnswer("that was too high.");
    max = mid - 1;
    mid = calculateMid();
    printGuess(guessNumber());
}

function GuessIsTooLow() {
    printAnswer("that was too low.");
    min = mid + 1;
    mid = calculateMid();
    printGuess(guessNumber());
}

function GuessIsCorrect() {
    printAnswer("that was correct!");
    isGameOver = true;
    checkGameState();
}

function updateGuessCount() {
    guessCount++;
    document.querySelector("#guess-count")!.textContent = guessCount.toString();
}

function calculateMid() {
    return Math.floor((min + max) / 2);
}

function checkGameState() {
    console.log(isGameOver);
    console.log(guessCount);

    if (isGameOver) {
        let html =
            /*html*/
            `<li>It took me <b>${guessCount}</b> guesses - `;
        if (guessCount <= 3) {
            html += "Awesome! 😎";
        } else if (guessCount >= 4 && guessCount <= 6) {
            html += "Decent! 🙂";
        } else if (guessCount === 7) {
            html += "Meh! 😥";
        }

        html += "</li>";

        document.querySelector("#guesses-list")?.insertAdjacentHTML("beforeend", html);
    } else {
        return;
    }
}
