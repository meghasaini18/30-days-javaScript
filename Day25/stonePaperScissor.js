let userScore = 0;
let compScore = 0;

const choices = document.querySelectorAll(".choice");
const msg = document.querySelector(".msg");
const userScorePara = document.querySelector("#user-score");
const compScorePara = document.querySelector("#comp-score");


const drawGame = () => {
    // console.log("game was draw.");
    msg.innerText = "Game was draw. Play again!";
    msg.style.backgroundColor = "#081b31";
}

const showWinner = (userWin, userChoice, compChoice) => {
    if(userWin){
        userScore++;
        userScorePara.innerText = userScore;
        // console.log("You Win!");
        msg.innerText = `Yow Win! ${userChoice} beats your ${compChoice}`;
        msg.style.backgroundColor = "green";
    }else{
        compScore++;
        compScorePara.innerText = compScore;
        // console.log("You Lose!");
        msg.innerText = `Yow Loss! ${compChoice} beats your ${userChoice}`;
        msg.style.backgroundColor = "red";
    }
} 

function generateCompChoice(){
    const option = ["rock", "paper", "scissor"];
    const randIdx = Math.floor(Math.random() * 3);
    return option[randIdx];
}

const playGame = (userChoice) => {
    // console.log(userChoice);
    const compChoice = generateCompChoice();
    // console.log(compChoice);

    if(userChoice === compChoice){
        drawGame();
    }else{
        let userWin;
        if(userChoice === "rock"){
            userWin = compChoice === "paper"? false: true;
        }else if(userChoice === "paper"){
            userWin = compChoice === "scissor"? false: true;
        }else{
            userWin = compChoice === "rock"? false: true;
        }
        showWinner(userWin, userChoice, compChoice);
    }
}
choices.forEach((choice) => {
    // console.log(choice);
    choice.addEventListener("click", () => {
        const userChoice = choice.getAttribute("id");
        // console.log("choice was clicked", userChoice);
        playGame(userChoice);
    });
});