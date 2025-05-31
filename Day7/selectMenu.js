let socialMedia = document.getElementById("social-media");
let selectText = document.getElementById("select-text");
let options = document.getElementsByClassName("options");
let list = document.getElementById("list");
let button = document.getElementById("button");

for(option of options){
    option.onclick = function(){
        selectText.innerHTML = this.textContent;
        list.classList.toggle("hide");
        button.classList.toggle("rotate");
    }
}

button.onclick = function(){
    list.classList.toggle("hide");
    button.classList.toggle("rotate");
}