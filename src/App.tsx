import CurrencyRow from './CurrencyRow';

function App() {
  return (
    <div className="flex justify-center items-center min-h-screen text-center">
      <div>
      <h1 className="text-2xl mb-5">Convert</h1>
      <CurrencyRow/>
      <div>=</div>
      <CurrencyRow/>
      </div>
    </div>
  );
}

export default App;
