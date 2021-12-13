import './App.css';
import Compressor from './components/Compressor';
import Steps from './components/steps'

function App() {
  return (
    <div className="App">
        <Steps />
        <div className='compressorDiv'>
          <Compressor />
        </div>
    </div>
  );
}

export default App;
