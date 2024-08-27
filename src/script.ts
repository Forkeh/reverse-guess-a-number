"use strict";

window.addEventListener("load", app);

let guessCount = 0;

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
    return Math.ceil(Math.random() * 100);
}

function printGuess(guess: number) {
    const html =
        /*html*/
        `<li>I'm guessing ${guess} - 
            <span id="btn-container">
                Is that <button id="high-btn">Too high</button><button id="low-btn">Too low</button><button
                id="correct-btn">Correct</button>
            </span>
        </li>`;

    document.querySelector("#guesses-list")?.insertAdjacentHTML("beforeend", html);

    updateGuessCount();
    addEventListeners();
}

function printAnswer(answer: string) {
    document.querySelector("#btn-container")!.remove();
    document.querySelector("li:last-child")!.textContent += answer;
}

function GuessIsTooHigh() {
    printAnswer("that was too high.");
    printGuess(guessNumber());
}

function GuessIsTooLow() {
    printAnswer("that was too low.");
    printGuess(guessNumber());
}

function GuessIsCorrect() {
    printAnswer("that was correct!");
}

function updateGuessCount() {
    guessCount++;
    document.querySelector("#guess-count")!.textContent = guessCount.toString();
}
