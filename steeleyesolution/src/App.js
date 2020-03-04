import React from 'react';
import logo from './logo.svg';
import SomeListComponent from './componenets/Solution'
import './App.css';

function App() {
  let items=[{text:"Apple"},{text:"Banana"},{text:"Orange"},{text:"Guavava"},{text:"Grapes"}]
  function showAlert(index){
    alert(items[index].text+" is selected")
  }
  return (
    <SomeListComponent items={items} onClickChild={showAlert}/>
  );
}

export default App;
