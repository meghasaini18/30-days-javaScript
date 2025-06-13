let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newBtn = document.querySelector("#new-btn");
let msg = document.querySelector("#msg");
let msgContainer = document.querySelector(".msg-container");

let turn0 = true;
const winPattern = [[0, 1, 2],[0, 3, 6], [0, 4, 8],
                    [1, 4, 7], 
                    [2, 5, 8], [2, 4, 6], 
                    [3, 4, 5], 
                    [6, 7, 8]];


boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if(turn0){
            box.innerHTML = "O";
            turn0 = false;
        }
        else{
            box.innerHTML = "X";
            turn0 = true;
        }
        box.disabled = true;

        checkWinner();
    });
});

const disabledBoxes = () => {
    for(box of boxes){
        box.disabled = true;
    }
}
const enabledBoxes = () => {
    for(box of boxes){
        box.disabled = false;
        box.innerText = "";
    }
}
const showWinner = (winner) => {
    msg.innerText = `Congratulations! Winner is ${winner}`;
    msgContainer.style.display = "block";
    disabledBoxes();
}
function checkWinner(){
    for(let pattern of winPattern){
        // console.log(boxes[pattern[0]].innerText, boxes[pattern[1]].innerText, boxes[pattern[2]].innerText);
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if(pos1Val != "" && pos2Val != "" && pos3Val != ""){
            if(pos1Val == pos2Val && pos2Val == pos3Val){
            // console.log("winner", pos1Val);
            showWinner(pos1Val);
        }
        }
    }
}

const resetGame = () => {
    turn0 = true;
    enabledBoxes();
    msgContainer.style.display = "none";
}
newBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);