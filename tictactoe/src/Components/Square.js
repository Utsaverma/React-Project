import React from 'react';

function Square(props) {
    let colorClass=props.value=='X'?'colorRed':'colorBlack'
    let classVal="square square"+props.provideClass.toString()+" "+colorClass;
    
    return (
      <button className="square" className={classVal} onClick={props.onClick}>
        {props.value}
      </button>
    );
}

export default Square;