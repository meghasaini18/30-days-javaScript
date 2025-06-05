let questionElement = document.getElementById("question");
let ansBtn = document.querySelectorAll(".btn");
let nxtBtn = document.querySelector(".nxtBtn");

const url_Qs = "https://opentdb.com/api.php?amount=10&category=18&difficulty=medium&type=multiple";

let score = 0;
let correctAns = "";
let crntQIdx = 0;
let questions = [];

async function getQuestion(url){
    const response = await fetch(url);
    var data = await response.json();
    questions = data.results;
    // console.log(data);
    showQuestion();
}

function showQuestion(){
    resetBtn();
    const Qs = questions[crntQIdx];
    questionElement.innerHTML = `${crntQIdx + 1}. ${Qs.question}`;

    const option = [...Qs.incorrect_answers, Qs.correct_answer]
    .sort(() => Math.random()- 0.5);

    correctAns = Qs.correct_answer;

    ansBtn.forEach((btn, i) => {
        btn.innerHTML = option[i];
        btn.disabled = false;
        btn.addEventListener("click",selectAns)
    });
}

function selectAns(e){
    const selected = e.target.innerHTML;
    if(selected === correctAns){
        score++;
        e.target.style.backgroundColor = "green";
    }
    else{
        e.target.style.backgroundColor = "red";

        ansBtn.forEach(btn => {
            if(btn.innerHTML === correctAns){
            btn.style.backgroundColor = "green";    
            }
        });
    }
    ansBtn.forEach(btn => btn.disabled = true);
    nxtBtn.style.display = "block";
}

function resetBtn(){
    ansBtn.forEach(btn => {
        btn.style.background = "";
        btn.disabled = false;
    });
    nxtBtn.style.display= "none";
}
nxtBtn.addEventListener("click",()=> {
    crntQIdx++;
    if(crntQIdx < questions.length){
        showQuestion();
    }
    else{
        showScore();
    }
});

function showScore(){
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}`;
    ansBtn.forEach(btn => {
        btn.style.display = "none";
        nxtBtn.innerHTML = "Restart";
        nxtBtn.style.display= "block";
        nxtBtn.addEventListener("click", ()=> {
            crntQIdx = 0;
            score = 0;
            getQuestion(url_Qs);
        })

    });
}
 
getQuestion(url_Qs);