import { useState,useReducer } from 'react'
import guesses from './Dictionaries/Guesses.json'

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
          return <li key={id}><button style={{fontSize: "100%"}} onClick={() => {setUsed(id);handleClick();}}><strong>{a}</strong></button></li>
        }else {
          return <li key={id}><button style={{fontSize: "100%",background:"gray"}} onClick={() => {setUsed(id);handleClick();}}><strong>{a}</strong></button></li>
        }
      }else {
        return <br key={id}/>
      }
    }
  );
  const alphabetList = alphabet.map((a,id) => {
      if(a!=='') {
        if (abUsed[id]===false) {
          return <li key={id}><button style={{fontSize: "100%"}} onClick={() => {setUsed(id);handleClick();}}><strong>{a}</strong></button></li>
        }else {
          return <li key={id}><button style={{fontSize: "100%",background:"gray"}} onClick={() => {setUsed(id);handleClick();}}><strong>{a}</strong></button></li>
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
          //exit
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
          //exit
        }
      }
    }
  }

//flips all tiles that have been disabled
  function reset() {
    if (order==="kb") {
      for (let i = 0; i < alphabet.length; ++i) {
        if (kbUsed[i]) {
          setUsed(i);
        }
      }
    } else{
      for (let i = 0; i < alphabet.length; ++i) {
        if (abUsed[i]) {
          setUsed(i);
        }
      }
    }
  }

  function list() {
    //console.log(guesses);
    let guessList = [];
    let guessLen = -1;

    let charList = [];
    let charLen = -1;

    for (let i = 0; i < alphabet.length; ++i) {
        if (abUsed[i]) {
          charLen++;
          charList[charLen] = alphabet[i].toLowerCase();

        }
    }
    if (charLen !== -1 )
    {
      for (let i = 0; i < guesses.length; ++i) {
        //loop possible guess list
        let word = guesses[i];
        let possible = true;
        for (let j = 0; j < 5; ++j) {
          //loop for length of word
          for (let k = 0; k < charLen; ++k) {
            //loop to remove characters from list
              if (word[j]===charList[k]) {
                possible = false;
                break;
              }
          }
          if (!possible) {
            break;
          }
        }
        if (possible) {
          guessLen++;
          guessList[guessLen] = word;
        }
      }
      console.log(guessList);
    }else {
      console.log("no characters to remove");
    }
  }

  if (order==="kb") {
    return (
      <div className="Display">
        <ul style={{alignItems: "center"}}>{keyboardList}</ul>
        <button onClick={() => {setOrder("ab");}}>Change Order</button>
        <button onClick={() => {reset();handleClick();}}>Reset</button>
        <button onClick={() => {list();handleClick();}}>List Options</button>
      </div>
    )
  }else {
    return (
      <div className="Display">
        <ul style={{alignItems: "center"}}>{alphabetList}</ul>
        <button onClick={() => {setOrder("kb");}}>Change Order</button>
        <button onClick={() => {reset();handleClick();}}>Reset</button>
        <button onClick={() => {list();handleClick();}}>List Options</button>
      </div>
    )
  }
};
export default Display;
