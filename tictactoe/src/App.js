import React from 'react';
import './App.css';
import Game from './Components/Game';

function App() {
  return (
    <div className="App">
      <div className="headerContainer">
        <h1 className="header">Tic Tac Toe Games Corp Limited</h1>
      </div>
      <Game/>
      <marquee>Yours is the first chance with 'O'. After your turn Computer will play with 'X'. At any time you can restart the game</marquee>
      <div className="footerContainer">
        <ul className="footerLinks">
            <li>© 2020 Games Corp Limited. All Rights Reserved</li>
            <li><a href="#" target="_blank">Privacy Policy</a></li>
            <li><a href="#" target="_blank">TPDR Privacy Notice</a></li>
            <li>Terms & Condition</li>
        </ul>
      </div>
    </div>
  );
}

export default App;
