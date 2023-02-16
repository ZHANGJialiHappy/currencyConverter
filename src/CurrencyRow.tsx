import { FC } from "react"

type Props = {
  currencyOptions: string[],
  selectedCurrency: string,
  onChangeCurrency(e:React.ChangeEvent<HTMLSelectElement>): void
}



function CurrencyRow ({currencyOptions, selectedCurrency, onChangeCurrency}: Props) {

  return (
    <div className="flex gap-5">
      <input 
      type="number" 
      placeholder="Type a number" 
      className="input input-bordered input-warning w-full max-w-xs flex-none" /> 

      <select 
      value= {selectedCurrency}
      onChange={onChangeCurrency}
      className="select select-warning w-full max-w-xs flex-1 w-32"> 
      {currencyOptions.map((option: string)=>
      <option key={option} value={option}>{option}</option>
      )}

      </select>
    </div>
  )
}

export default CurrencyRow
