import { useEffect, useState } from 'react';
import CurrencyRow from './CurrencyRow';

const BASE_URL = 'https://api.exchangerate.host/latest'

function App() {
  const [currencyOptions, setCurrencyOptions] = useState<string[]>([])
  

  useEffect(()=>{
    fetch(BASE_URL)
    .then(res=>res.json())
    //   .then(res=>res.json())
    .then(data => {
      setCurrencyOptions([data.base, ...Object.keys(data.rates)])
    })
  }, [])
  return (
    <div className="flex justify-center items-center min-h-screen text-center">
      <div>
      <h1 className="text-2xl mb-5">Convert</h1>
      <CurrencyRow currencyOptions={currencyOptions}/>
      <div>=</div>
      <CurrencyRow currencyOptions={currencyOptions}/>
      </div>
    </div>
  );
}

export default App;
