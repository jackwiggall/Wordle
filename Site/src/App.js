import logo from './logo.svg';
import Display from './Display.js';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Display />
      </header>
    </div>
  );
}

export default App;
