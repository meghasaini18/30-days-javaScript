const apiKey = "EHTBVKOBIJWU4ZKG";

async function getStockData(){
    const symbol = document.querySelector(".symbol-input").value.toUpperCase();
    const result = document.querySelector(".result");

    if(!symbol){
        result.innerHTML = "Please enter a stock symbol";
        return;
    }

    const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${apiKey}`;
    try{
        result.innerHTML = "Loading...";
        const response = await fetch(url);
        const data = await response.json();
        // console.log(data);
        const stock = data["Global Quote"];
        // console.log(stock);
        if(!stock || !stock["05. price"]){
            result.innerHTML = "Invalid symbol or API limit reached";
            return;
        }
        const price = parseFloat(stock["05. price"]).toFixed(2);
        const change = parseFloat(stock["10. change percent"]).toFixed(2);
        // console.log(price, change);

        result.innerHTML = `<h2>${symbol}</h2>
                            <p><strong>Price: </strong>${price}</p>
                            <p><strong>Change: </strong>${change}%</p>`;
    }
    catch(error){
        result.innerHTML = "Error fetching the stock data";
    }
}