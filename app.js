const exchangeRates = {
    "USD": {
        "INR": 82.50,   //UPDATE THESE REGULARLY!
        "EUR": 0.92,
        "GBP": 0.80,
        "JPY": 140.20,
        "USD": 1
    },
    "INR": {
        "USD": 0.012,   //UPDATE THESE REGULARLY!
        "EUR": 0.011,
        "GBP": 0.0097,
        "JPY": 1.7,
        "INR": 1
    },
    "EUR": {
        "INR": 90,   //UPDATE THESE REGULARLY!
        "USD": 1.08,
        "GBP": 0.87,
        "JPY": 152,
        "EUR": 1
    },
    "GBP": {
        "INR": 105,   //UPDATE THESE REGULARLY!
        "USD": 1.23,
        "EUR": 1.15,
        "JPY": 175,
        "GBP": 1
    },
    "JPY": {
        "INR": 0.59,   //UPDATE THESE REGULARLY!
        "USD": 0.0071,
        "EUR": 0.0066,
        "GBP": 0.0057,
        "JPY": 1
    },
    // ... add more currencies
};

// const BASE_URL = "";
const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

for (let select of dropdowns) {
    for (currCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if (select.name === "from" && currCode === "USD") {
            newOption.selected = "selected";
        } else if (select.name === "to" && currCode === "INR") {
            newOption.selected = "selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    });
}

const updateExchangeRate = async () => {
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    if (amtVal === "" || amtVal < 1) {
        amtVal = 1;
        amount.value = "1";
    }

    const rate = exchangeRates[fromCurr.value][toCurr.value];
    if (rate) { // Check if the rate exists
        let finalAmount = amtVal * rate;
        msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount.toFixed(2)} ${toCurr.value}`;
    } else {
        msg.innerText = "Exchange rate not available.";
    }

    // const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
    // let response = await fetch(URL);
    // let data = response.json();
    // let rate = data[toCurr.value.toLowerCase()];
    // let finalAmount = amtVal * rate;
    // msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
};

const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
};

btn.addEventListener("click", (evt) => {
    evt.preventDefault();
    updateExchangeRate();
});

// window.addEventListener("load", () => {
//     updateExchangeRate();
// });
