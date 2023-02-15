
function CurrencyRow () {
  return (
    <div className="flex gap-5">
      <input 
      type="number" 
      placeholder="Type a number" 
      className="input input-bordered input-warning w-full max-w-xs flex-none" /> 

      <select 
      className="select select-warning w-full max-w-xs flex-1"> 
        <option value="hi">hi</option>
      </select>
    </div>
  )
}

export default CurrencyRow
