const passwordBox = document.getElementById("password");
// const length = 8;

const upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowerCase = "abcdefghijklmnopqrstuvwxyz";
const number = "0123456789";
const symbol = "@#$%^&*()_+~|[]{}<>/+-=";

const allChars = symbol+number+lowerCase+upperCase;

function createPassword(){
    let password = "";
    password += upperCase[Math.floor(Math.random() * upperCase.length)];
    password += lowerCase[Math.floor(Math.random() * lowerCase.length)];
    password += number[Math.floor(Math.random() * number.length)];
    password += symbol[Math.floor(Math.random() * symbol.length)];

    while(password.length < length){
        password += allChars[Math.floor(Math.random() * allChars.length)];
    }
    passwordBox.value = password;
}

function copyPassword(){
    passwordBox.select();
    document.execCommand("copy");
}

let eyeicon = document.getElementById("eyeicon");
let password = document.getElementById("password");

eyeicon.onclick = function(){
    if(password.type == "password"){
        password.type = "text";
        eyeicon.src = "eye-open.png"
    }
    else{
        password.type = "password";
        eyeicon.src = "close-eye.jpg"
    }
}



let pass = document.getElementById("password");
let msg = document.getElementById("message");
let str = document.getElementById("strength");
let inputBox = document.getElementById("box");

pass.addEventListener('input', ()=> {
    if(pass.value.length > 0){
        msg.style.display = "block";
    }
    else{
        msg.style.display = "none";
    }

    if(pass.value.length < 4){
        str.innerHTML = "weak";
        inputBox.style.borderColor = "red";
        msg.style.color = "red";
    }
    else if(pass.value.length >= 4 && pass.value.length < 8){
        str.innerHTML = "medium";
        inputBox.style.borderColor = "orange";
        msg.style.color = "orange";
    }
    else if(pass.value.length >= 8){
        str.innerHTML = "strong";
        inputBox.style.borderColor = "green";
        msg.style.color = "green";
    }
})
let submit = document.getElementById("submit");
submit.onclick = function(){
    if(password.value == ""){
        alert("please enter your pasword");
    }
    else{
        alert("submitted");
    }
}
