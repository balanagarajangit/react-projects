import { useEffect, useState } from 'react'
import './App.css'
import axios from "axios";

function App() {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFormCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("INR");
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [exchangeRate, setExchangeRate] = useState(null);
  useEffect(() => {
    const getExchangeRate = async () => {
      try {
        let url = `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`;
        const response = await axios.get(url);
        setExchangeRate(response.data.rates[toCurrency]);
      } catch (error) {
        console.error("Error fetching exchange rate:", error);
      }
    };
    getExchangeRate();
  }, [fromCurrency, toCurrency])

  useEffect(() => {
    if (exchangeRate !== null) {
      setConvertedAmount((amount * exchangeRate).toFixed(2))
    }
  }, [amount, exchangeRate])

  const handleAmountChange = (e) => {
    const value = parseFloat(e.target.value);
    setAmount(isNaN(value) ? 0 : value);
  }
  const handleFromCurrencyChange = (e) => {
    setFormCurrency(e.target.value)
  }
  const handleToChangeCurrency = (e) => {
    setToCurrency(e.target.value)
  }


  return (
    <>
      <div className="currency-converter">
        <div className="box">
          <div className="data">
            <h1>Currency Converter</h1>
            <div className="input-container">
              <label htmlFor="amt">Amout:</label>
              <input type="number" id='amt' value={amount} onChange={handleAmountChange} />
            </div>
            <div className="input-container">
              <label htmlFor="fromCurrency">From Currenct:</label>
              <select id="fromCurrency" value={fromCurrency} onChange={handleFromCurrencyChange}>
                <option value="USD">USD - United States Dollar</option>
                <option value="EUR">EUR - Euro</option>
                <option value="GBP">GBP - British Pound Sterling</option>
                <option value="JPY">JPY - Japanese Yen</option>
                <option value="AUD">AUD - Australian Dollar</option>
                <option value="CAD">CAD - Canadian Dollar</option>
                <option value="CNY">CNY - Chinese Yuan</option>
                <option value="INR">INR - Indian Rupee</option>
                <option value="BRL">BRL - Brazilian Real</option>
                <option value="ZAR">South African Rand</option>
              </select>
            </div>
            <div className="input-container">
              <label htmlFor="toCurrency">To Currenct:</label>
              <select id="toCurrency" value={toCurrency} onChange={handleToChangeCurrency}>
                <option value="USD">USD - United States Dollar</option>
                <option value="EUR">EUR - Euro</option>
                <option value="GBP">GBP - British Pound Sterling</option>
                <option value="JPY">JPY - Japanese Yen</option>
                <option value="AUD">AUD - Australian Dollar</option>
                <option value="CAD">CAD - Canadian Dollar</option>
                <option value="CNY">CNY - Chinese Yuan</option>
                <option value="INR">INR - Indian Rupee</option>
                <option value="BRL">BRL - Brazilian Real</option>
                <option value="ZAR">South African Rand</option>
              </select>
            </div>
            <div className="result">
              <p>{amount} {fromCurrency} is equal to {convertedAmount} {toCurrency}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
