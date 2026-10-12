
import { useState } from 'react';
import './App.css';

function App() {
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="container">
      {!submitted ? (
        <div className="card">
          <h1>Registration Form</h1>
          <p className="subtitle">Please enter your details</p>

          <form onSubmit={handleSubmit}>
            <label>Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <label>City</label>
            <input
              type="text"
              placeholder="Enter your city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />

            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label>Gender</label>
            <div className="gender">
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="Male"
                  onChange={(e) => setGender(e.target.value)}
                  required
                />
                Male
              </label>

              <label>
                <input
                  type="radio"
                  name="gender"
                  value="Female"
                  onChange={(e) => setGender(e.target.value)}
                />
                Female
              </label>
            </div>

            <button type="submit">Submit</button>
          </form>
        </div>
      ) : (
        <div className="card">
          <h1>Your Details</h1>
          <p><strong>Name:</strong> {name}</p>
          <p><strong>City:</strong> {city}</p>
          <p><strong>Email:</strong> {email}</p>
          <p><strong>Gender:</strong> {gender}</p>

          <button onClick={() => setSubmitted(false)}>
            Back
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
