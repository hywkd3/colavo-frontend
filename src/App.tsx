import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
    const [text, setText] = useState<string>('text');
    // useEffect(() => {
    //   fetch('https://jsonplaceholder.typicode.com/users')
    //     .then((response) => response.json())
    //     .then((json) => setUser(json));
    // }, []);
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                    Edit <code>src/App.tsx</code> and save to reload.
                </p>
                <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
                    Learn React
                </a>
                <a>{text}</a>
            </header>
        </div>
    );
}

export default App;
