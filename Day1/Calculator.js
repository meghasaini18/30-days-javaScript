const display = document.getElementById('display');

function appendValue(input){
    display.value += input;
}
function clearDisplay(){
    display.value = '';
}
function deleteLast(){
    display.value = display.value.slice(0, -1);
}
function calculateResult(){
        try{
            // display.value = new Function('return ' + display.value)();
            display.value = eval(display.value);
        }
        catch(err){
            alert("Invalid Input");
            display.value = '';
        }

}