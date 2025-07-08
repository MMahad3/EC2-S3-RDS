import React from 'react';


import Todo from './components/Todo';
import './App.css';

const App = () => {
    return (
        <>
            <div className="App">
                <Todo />
            </div>

            <footer className="footer-credit">
                Made by <a href="https://mmahad3.github.io/" target="_blank" rel="noopener noreferrer">Mahad</a>
            </footer>
        </>
    );
};

export default App;
