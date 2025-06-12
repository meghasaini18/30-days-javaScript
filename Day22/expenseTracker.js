const balance = document.querySelector(".balance");
const moneyPlus = document.querySelector(".money-plus");
const moneyMinus = document.querySelector(".money-minus");
const list = document.querySelector(".list");
const form = document.querySelector("form");
const text = document.querySelector(".text");
const amount = document.querySelector(".amount");

const localStorageTransaction = JSON.parse(localStorage.getItem('transactions'));
let transactions = localStorage.getItem('transactions') != null ? localStorageTransaction : [];

function addTransaction(e){
    e.preventDefault();
    // console.log("Submitted");

    if(text.value.trim() === '' || amount.value.trim() === ''){
        alert("Please add a expense and amount");
    }
    else{
        const transaction = {
            id: generateID(),
            text: text.value,
            amount: +amount.value,
        }
        transactions.push(transaction);
        addTransactionToDOM(transaction);
        updateLocalStorage();
        updateValues();

        text.value = '';
        amount.value = '';
    }
}
function addTransactionToDOM(transaction){
    const sign = transaction.amount < 0 ? "-" : "+";
    const item = document.createElement("li");
    item.classList.add(transaction.amount < 0 ? "minus" : "plus");
    item.innerHTML = `${transaction.text}
                    <span>${sign}${Math.abs(transaction.amount)}</span>
                    <button class="delete-btn" onclick="removeTransaction(${transaction.id})">x</button>`;
    list.appendChild(item);
}

function updateValues(){
    const amounts = transactions.map((transaction)=> transaction.amount);
    const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);
    const income = amounts.filter((item) => item > 0).reduce((acc, item) => (acc += item), 0).toFixed(2);
    const expense = (amounts.filter((item) => item < 0).reduce((acc, item) => (acc += item), 0) * -1).toFixed(2);
    balance.innerHTML = `$${total}`;
    moneyPlus.innerHTML = `$${income}`;
    moneyMinus.innerHTML = `$${expense}`;
}

function removeTransaction(id){
    transactions = transactions.filter((transaction) => transaction.id != id);
    updateLocalStorage();
    init();
}
function updateLocalStorage(){
    localStorage.setItem("transactions", JSON.stringify(transactions));
}
function init(){
    list.innerHTML = "";
    transactions.forEach(addTransactionToDOM);
    updateValues();
}
init();

    function generateID(){
        return Math.floor(Math.random() * 100000000);
    }

form.addEventListener("submit", addTransaction);

form.addEventListener("submit", addTransaction);

