type Props = {currencyOptions: string[]}



function CurrencyRow ({currencyOptions}: Props) {
  return (
    <div className="flex gap-5">
      <input 
      type="number" 
      placeholder="Type a number" 
      className="input input-bordered input-warning w-full max-w-xs flex-none" /> 

      <select 
      className="select select-warning w-full max-w-xs flex-1 w-32"> 
      {currencyOptions.map((option: string, key: number)=>
      <option value={option}>{option}</option>
      )}

      </select>
    </div>
  )
}

export default CurrencyRow
