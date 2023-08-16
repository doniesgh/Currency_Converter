// script.js

const api = `https://v6.exchangerate-api.com/v6/b2a485a10f6d7a746522a390/latest/USD`;

const fromDropDown = document.getElementById("from-currency-select");
const toDropDown = document.getElementById("to-currency-select");
const result = document.getElementById("result"); // Declare result here

// Create dropdown from the currencies array
currencyCodes.forEach((currency) => {
  const option1 = document.createElement("option");
  const option2 = document.createElement("option");
  option1.value = currency.code;
  option1.text = currency.code;
  fromDropDown.appendChild(option1);
  option2.value = currency.code;
  option2.text = currency.code;
  toDropDown.appendChild(option2);
});

fromDropDown.value = "USD";
toDropDown.value = "INR";

const convertCurrency = () => {
  const amount = parseFloat(document.querySelector("#amount").value);
  const fromCurrency = fromDropDown.value;
  const toCurrency = toDropDown.value;

  if (!isNaN(amount)) {
    fetch(api)
      .then((resp) => resp.json())
      .then((data) => {
        const fromExchangeRate = data.conversion_rates[fromCurrency];
        const toExchangeRate = data.conversion_rates[toCurrency];
        const convertedAmount = (amount / fromExchangeRate) * toExchangeRate;
        result.innerHTML = `${amount} ${fromCurrency} = ${convertedAmount.toFixed(
          2
        )} ${toCurrency}`;
      })
      .catch((error) => {
        console.error("Error fetching exchange rates:", error);
        result.innerHTML = "Error fetching exchange rates. Please try again later.";
      });
  } else {
    alert("Please enter a valid amount.");
  }
};

document.querySelector("#convert-button").addEventListener("click", convertCurrency);
convertCurrency();
