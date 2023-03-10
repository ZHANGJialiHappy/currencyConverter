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
  if (amountInFromCurrency ) {
    fromAmount = amount;
    toAmount = typeof (fromAmount) === "number" && fromAmount>=0 ? (Math.round((fromAmount * exchangeRate)  * 100) / 100): "";
  } else {
    toAmount = amount;
    fromAmount = typeof (toAmount) === "number" && toAmount>=0 ? (Math.round((toAmount / exchangeRate)  * 100) / 100): ""
  }

  const handleFromAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value:number | string = e.target.value;
    if (value) {
      setAmount(Number(value));
    } else {
      setAmount("");
    }
    setAmountInFromCurrency(true);
  }
  const handleToAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value) {
      setAmount(Number(value));
    } else {
      setAmount("");
    }
    setAmountInFromCurrency(false);
  }

  useEffect(() => {
    if (fromCurrency && toCurrency) {
      fetch(`${BASE_URL}?base=${fromCurrency}&symbols=${toCurrency}`)
      .then(res => res.json())
      .then(data => setExchangeRate(data.rates[toCurrency]))
    }
  }, [fromCurrency, toCurrency]);
  
  return (
    <div className="flex justify-center items-center min-h-screen text-center">
      <div>
        <h1 className="text-2xl mb-5">CURRENCY CONVERTER</h1>
        <CurrencyRow
          currencyOptions={currencyOptions}
          selectedCurrency={fromCurrency}
          onChangeCurrency={(e: React.ChangeEvent<HTMLSelectElement>) => setFromCurrency(e.target.value)}
          onChangeAmount={handleFromAmountChange}
          amount={fromAmount}
        />
        <div className="text-2xl my-3">=</div>
        <CurrencyRow
          currencyOptions={currencyOptions}
          selectedCurrency={toCurrency}
          onChangeCurrency={(e: React.ChangeEvent<HTMLSelectElement>) => setToCurrency(e.target.value)}
          onChangeAmount={handleToAmountChange}
          amount={toAmount}
        />
        <h1 className="text-2xl mt-3">{`1 ${fromCurrency} = ${(Math.round(exchangeRate  * 100) / 100)} ${toCurrency}`}</h1>
      </div>
    </div>
  );
}

export default App;
