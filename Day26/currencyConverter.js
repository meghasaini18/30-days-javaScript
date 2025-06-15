const apiUrl = "https://api.unirateapi.com/api/convert?";
const apiKey = "arVwG76xVxsDjOfELpkKGIfHZVL7VNfaTfvXHOhcozbxu3X97mmeGtKphUVjxLz8";

const dropdown = document.querySelectorAll("select");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const btn = document.querySelector("form button");
const msg = document.querySelector(".msg");

for(let select of dropdown){
    for(let currCode in countryList){
    // console.log(currCode, countryList[currCode]);
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if(select.name ==="from" && currCode ==="USD"){
            newOption.selected = "selected";
        }
        else if(select.name ==="to" && currCode ==="INR"){
            newOption.selected = "selected";
        }
        select.append(newOption);   
    }
    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    });
}
const updateFlag = (element) => {
    // console.log(element);
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
}
btn.addEventListener("click", async(evt) => {
    evt.preventDefault();
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    // console.log(amtVal);
    if(amtVal == 0 || amtVal < 1){
        amount.value = "1";
        amtVal = 1;
    }
    // console.log(fromCurr.value, toCurr.value);
    const url = `${apiUrl}&api_key=${apiKey}&amount=${amtVal}&from=${fromCurr.value}&to=${toCurr.value}`;
    const response = await fetch(url);
    const data = await response.json();
    let rate = data.result;
    // console.log(rate);
    let finalAmount = rate * amtVal;

    msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
});