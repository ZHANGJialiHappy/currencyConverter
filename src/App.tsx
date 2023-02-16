import { useEffect, useState } from 'react';
import CurrencyRow from './CurrencyRow';

const BASE_URL = 'https://api.exchangerate.host/latest'

function App() {
  const [currencyOptions, setCurrencyOptions] = useState<string[]>([])
  const [fromCurrency, setFromCurrency] = useState<string>("")
  const [toCurrency, setToCurrency] = useState<string>("")
  
  useEffect(()=>{
    fetch(BASE_URL)
    .then(res=>res.json())
    .then(data => {
      setCurrencyOptions([...Object.keys(data.rates)])
          // ...Object.keys(data.rates)

      setFromCurrency(data.base)
      setToCurrency(Object.keys(data.rates)[0])
    })
  }, [])

  return (
    <div className="flex justify-center items-center min-h-screen text-center">
      <div>
      <h1 className="text-2xl mb-5">Convert</h1>
      <CurrencyRow currencyOptions={currencyOptions} selectedCurrency={fromCurrency} onChangeCurrency={(e: React.ChangeEvent<HTMLSelectElement>)=>setFromCurrency(e.target.value)}/>
      <div>=</div>
      <CurrencyRow currencyOptions={currencyOptions} selectedCurrency={toCurrency} onChangeCurrency={(e: React.ChangeEvent<HTMLSelectElement>)=>setToCurrency(e.target.value)}/>
      </div>
    </div>
  );
}

export default App;
