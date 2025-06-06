let userInput = document.getElementById("date");
userInput.max = new Date().toISOString().split("T")[0];

let result = document.getElementById("result");

function calculateAge(){
    if (!userInput.value) {
    alert("Please select a date.");
    return;
}

    let birthDate = new Date(userInput.value);

    let d1 = birthDate.getDate();
    let m1 = birthDate.getMonth() + 1;
    let y1 = birthDate.getFullYear();

    let today = new Date();

    let d2 = today.getDate();
    let m2 = today.getMonth()+1;
    let y2 = today.getFullYear();

    let d3, m3, y3;

    y3 = y2 -y1;
    m3 = m2 - m1;
    d3 = d2 - d1;

    if( m3 < 0){
        y3--;
        m3 += 12;    
    }
    if(d3 < 0){
        m3--;
        let previousMonth = (m2 === 0) ? 11 : m2 - 1;
        let yearOfpreviousMonth = (m2 === 0) ? y2 - 1 : y2;
        d3 += getDaysInMonth(yearOfpreviousMonth, previousMonth + 1);
    }
    result.innerHTML = `Your age is <span>${y3}</span> years, <span>${m3}</span> months and <span>${d3}</span> days.`;

}

    function getDaysInMonth(year, month){
        return new Date(year, month, 0).getDate();
    }
