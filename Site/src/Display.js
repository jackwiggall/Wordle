import { useState,useReducer } from 'react'

function Display() {
  const [, forceUpdate] = useReducer(x => x + 1, 0);

  function handleClick() {
    forceUpdate();
  }
  const alphabet = ['A','B','C','D','E','F','G','H','I','J','','K','L','M','N','O','P','Q','R','S','','T','U','V','W','X','Y','Z'];
  const keyboard = ['Q','W','E','R','T','Y','U','I','O','P','','A','S','D','F','G','H','J','K','L','','Z','X','C','V','B','N','M'];

  const [order, setOrder] = useState("kb");
  const [kbUsed, setKBUsed] = useState([false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false]);
  const [abUsed, setABUsed] = useState([false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false]);

  const keyboardList = keyboard.map((a,id) => {
      if(a!=='') {
        if (kbUsed[id]===false) {
          return <li key={id}><button style={{fontSize: "40px"}} onClick={() => {setUsed(id);handleClick();}}>{a}</button></li>
        }else {
          return <li key={id}><button style={{fontSize: "40px",background:"gray"}} onClick={() => {setUsed(id);handleClick();}}>{a}</button></li>
        }
      }else {
        return <br key={id}/>
      }
    }
  );
  const alphabetList = alphabet.map((a,id) => {
      if(a!=='') {
        if (abUsed[id]===false) {
          return <li key={id}><button style={{fontSize: "40px"}} onClick={() => {setUsed(id);handleClick();}}>{a}</button></li>
        }else {
          return <li key={id}><button style={{fontSize: "40px",background:"gray"}} onClick={() => {setUsed(id);handleClick();}}>{a}</button></li>
        }
      }else {
        return <br key={id}/>
      }
    }
  );

  function setUsed(id) {
    if (order==="kb") {
      let newList = kbUsed;
      newList[id] = !newList[id];
      setKBUsed(newList);
      for (let i = 0; i < alphabet.length; ++i) {
        if (alphabet[i]===keyboard[id]) {
          let otherList = abUsed;
          otherList[i] = !otherList[i];
          setABUsed(otherList);
        }
      }
    }else {
      let newList = abUsed;
      newList[id] = !newList[id];
      setABUsed(newList);
      for (let i = 0; i < keyboard.length; ++i) {
        if (keyboard[i]===alphabet[id]) {
          let otherList = kbUsed;
          otherList[i] = !otherList[i];
          setKBUsed(otherList);
        }
      }
    }
  }

  if (order==="kb") {
    return (
      <div className="Display">
        <ul>{keyboardList}</ul>
        <button onClick={() => {setOrder("ab");}}>Change Order</button>
      </div>
    )
  }else {
    return (
      <div className="Display">
        <ul>{alphabetList}</ul>
        <button onClick={() => {setOrder("kb");}}>Change Order</button>
      </div>
    )
  }
};

export default Display;
