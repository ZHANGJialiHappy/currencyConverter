import { useEffect, useState } from 'react';
import CurrencyRow from './CurrencyRow';

const BASE_URL = 'https://api.exchangerate.host/latest'

function App() {
  const [currencyOptions, setCurrencyOptions] = useState<string[]>([])
  const [fromCurrency, setFromCurrency] = useState<string>("")
  const [toCurrency, setToCurrency] = useState<string>("")
  const [exchangeRate, setExchangeRate] = useState<number>(1)
  const [amount, setAmount] = useState<number | string>(1)
  const [amountInFromCurrency, setAmountInFromCurrency] = useState<boolean>(true)

  useEffect(() => {
    fetch(BASE_URL)
      .then(res => res.json())
      .then((data) => {
        const firstCurrency = Object.keys(data.rates)[0];
        setCurrencyOptions(Object.keys(data.rates));

        setFromCurrency(data.base);
        setToCurrency(firstCurrency);
        setExchangeRate(data.rates[firstCurrency]);
      })
  }, [])

  let fromAmount: number | string, toAmount: number | string;
  if (amountInFromCurrency) {
    fromAmount = amount;
    toAmount = typeof(fromAmount) === "string" ? "" : fromAmount * exchangeRate;
  } else{
    toAmount = amount;
    fromAmount = typeof(toAmount) === "string" ? "" :toAmount / exchangeRate;
  } 

  const handleFromAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if(value) {
      setAmount(Number(value));
    } else {
      setAmount("");
    }
    setAmountInFromCurrency(true);
  }
  const handleToAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if(value) {
      setAmount(Number(value));
    } else {
      setAmount("");
    }
    setAmountInFromCurrency(false);
  }

  useEffect(() => {
    fetch(`${BASE_URL}?base=${fromCurrency}&symbols=${toCurrency}`)
      // fetch(`${BASE_URL}?base=${fromCurrency}&symbols=${toCurrency}`)
      // 0
      .then(res => res.json())
      .then(data => setExchangeRate(data.rates[toCurrency]))
  }, [fromCurrency, toCurrency]);

  return (
    <div className="flex justify-center items-center min-h-screen text-center">
      <div>
        <h1 className="text-2xl mb-5">Convert</h1>
        <CurrencyRow
          currencyOptions={currencyOptions}
          selectedCurrency={fromCurrency}
          onChangeCurrency={(e: React.ChangeEvent<HTMLSelectElement>) => setFromCurrency(e.target.value)}
          onChangeAmount={handleFromAmountChange}
          amount={fromAmount}
        />
        <div>=</div>
        <CurrencyRow
          currencyOptions={currencyOptions}
          selectedCurrency={toCurrency}
          onChangeCurrency={(e: React.ChangeEvent<HTMLSelectElement>) => setToCurrency(e.target.value)}
          onChangeAmount={handleToAmountChange}
          amount={toAmount}
        />
      </div>
    </div>
  );
}

export default App;