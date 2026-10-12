
import { useState } from 'react';
import './App.css';

function App() {
  const [count, setCount] = useState(0);
  const [number, setNumber] = useState('0');
  const [message, setMessage] = useState('');

  function increase() {
    setCount(count + 1);
  }

  function decrease() {
    setCount(count - 1);
  }

  function reset() {
    setCount(0);
    setNumber('0');
  }

  function setValue() {
    if (number !== '') {
      setCount(Number(number));
    }
  }

  return (
    <div className="app">
      <h1>Assignment 6(A)</h1>
      <h2>React Counter App</h2>

      <h2>Count: {count}</h2>

      <input
        type="number"
        value={number}
        onChange={(e) => setNumber(e.target.value)}
        placeholder="Enter a number"
      />

      <button onClick={setValue}>Set Number</button>

      <div className="buttons">
        <button onClick={decrease}>Decrease -</button>
        <button onClick={reset}>Reset</button>
        <button onClick={increase}>Increase +</button>
      </div>

      <hr />

      <h2>Text Display</h2>

      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Enter your text"
      />

      <p>{message || 'Your text will appear here!'}</p>

      <p>
        {count > 0
          ? 'Counter is positive!'
          : count < 0
          ? 'Counter is negative!'
          : 'Counter is zero!'}
      </p>
    </div>
  );
}

export default App;
