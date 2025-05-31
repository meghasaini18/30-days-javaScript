let nameError = document.getElementById("name-error");
let numberError = document.getElementById("number-error");
let emailError = document.getElementById("email-error");
let messageError = document.getElementById("message-error");
let submitError = document.getElementById("submit-error");

function validateName(){
    var name = document.getElementById("contact-name").value;

    if(name.length == 0){
        nameError.innerHTML = 'name is required';
        return false;
    }
    if(!name.match(/^[A-Za-z]*\s{1}[A-Za-z]*$/)){
        nameError.innerHTML = 'write full name';
        return false;
    }
    nameError.innerHTML = '<i class="fa-solid fa-circle-check" style="color: seagreen"></i>';
    return true;
}

function validatePhone(){
    var number = document.getElementById("contact-phone").value;

    if(number.length == 0){
        numberError.innerHTML = 'number is required';
        return false;
    }
    if(number.length != 10){
        numberError.innerHTML = 'number should be 10 digit';
        return false;
    }
    if(!number.match(/^[0-9]{10}$/)){
        numberError.innerHTML = 'Phone number is required';
        return false;
    }
    numberError.innerHTML = '<i class="fa-solid fa-circle-check" style="color: seagreen"></i>';
    return true;
}

function validateEmail(){
    var email = document.getElementById("contact-email").value;
    if(email == 0){
        emailError .innerHTML = 'email is required';
        return false;
    }
    if(!email.match(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/)){
        emailError.innerHTML = 'email is not valid';
        return false;
    }
    emailError.innerHTML = '<i class="fa-solid fa-circle-check" style="color: seagreen"></i>';
    return true;
}

function validateMessage(){
    var message = document.getElementById("contact-message").value;
    var required = 30;
    var left = required - message.length;

    if(left > 0){
        messageError.innerHTML = left + 'more character required';
        return false;
    }
    messageError.innerHTML = '<i class="fa-solid fa-circle-check" style="color: seagreen"></i>';
    return true;
}

function validateForm(){
    if(!validateName() || !validatePhone() || !validateEmail() || !validateMessage()){
        submitError.style.display = "block";
        submitError.innerHTML = 'please fix the error to submit';
        setTimeout(function(){submitError.style.display = 'none';}, 3000);
        return false;
    }
}