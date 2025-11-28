import { useState,useReducer } from 'react'
import guesses from './Dictionaries/Guesses.json'
import words from './Dictionaries/Words.json'

function Display() {
  const [, forceUpdate] = useReducer(x => x + 1, 0);

  function handleClick() {
    forceUpdate();
  }
  const alphabet = ['A','B','C','D','E','F','G','H','I','J','','K','L','M','N','O','P','Q','R','S','','T','U','V','W','X','Y','Z'];
  const keyboard = ['Q','W','E','R','T','Y','U','I','O','P','','A','S','D','F','G','H','J','K','L','','Z','X','C','V','B','N','M'];

  const [order, setOrder] = useState("kb"); //which keyboard layout
  const [kbUsed, setKBUsed] = useState([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]);
  const [abUsed, setABUsed] = useState([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]);
//0=possible, 1=no possible, 2=yellow/in word

const [dict, setDict] = useState("Guesses");
const handleChange = (e) => {
    setDict(e.target.value);
    handleClick();
  };
//which dictionary is being used

  const keyboardList = keyboard.map((a,id) => {
      if(a!=='') {
        if (kbUsed[id]===0) {
          return <li key={id}><button style={{fontSize: "100%"}} onClick={() => {setUsed(id);handleClick();}}><strong>{a}</strong></button></li>
        }else if (kbUsed[id]===1) {
          return <li key={id}><button style={{fontSize: "100%",background:"gray"}} onClick={() => {setUsed(id);handleClick();}}><strong>{a}</strong></button></li>
        }else {
          return <li key={id}><button style={{fontSize: "100%",background:"#d5b338"}} onClick={() => {setUsed(id);handleClick();}}><strong>{a}</strong></button></li>
        }
      }else {
        return <br key={id}/>
      }
    }
  );
  const alphabetList = alphabet.map((a,id) => {
      if(a!=='') {
        if (abUsed[id]===0) {
          return <li key={id}><button style={{fontSize: "100%"}} onClick={() => {setUsed(id);handleClick();}}><strong>{a}</strong></button></li>
        }else if (abUsed[id]===1) {
          return <li key={id}><button style={{fontSize: "100%",background:"gray"}} onClick={() => {setUsed(id);handleClick();}}><strong>{a}</strong></button></li>
        }else {
          return <li key={id}><button style={{fontSize: "100%",background:"#d5b338"}} onClick={() => {setUsed(id);handleClick();}}><strong>{a}</strong></button></li>
        }
      }else {
        return <br key={id}/>
      }
    }
  );

  function setUsed(id) {
    if (order==="kb") {
      let newList = kbUsed;
      if (newList[id]===2) {
        newList[id]=0;
      }else if(newList[id]===1){
        newList[id]=2;
      }else {
        newList[id]=1;
      }
      setKBUsed(newList);
      for (let i = 0; i < alphabet.length; ++i) {
        if (alphabet[i]===keyboard[id]) {
          let otherList = abUsed;
          if (otherList[i]===2) {
            otherList[i]= 0;
          }else if(otherList[i]===1){
            otherList[i]=2;
          }else {
            otherList[i]=1;
          }
          setABUsed(otherList);
          //exit
        }
      }
    }else {
      let newList = abUsed;
      if (newList[id]===2) {
        newList[id]=0;
      }else if(newList[id]===1){
        newList[id]=2;
      }else {
        newList[id]=1;
      }
      setABUsed(newList);
      for (let i = 0; i < keyboard.length; ++i) {
        if (keyboard[i]===alphabet[id]) {
          let otherList = kbUsed;
          if (otherList[i]===2) {
            otherList[i]=0;
          }else if(otherList[i]===1){
            otherList[i]=2;
          }else {
            otherList[i]=1;
          }
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
        if (kbUsed[i]===1) {
          setUsed(i);
        }
        if (kbUsed[i]===2) {
          setUsed(i);
        }
      }
    } else{
      for (let i = 0; i < alphabet.length; ++i) {
        if (abUsed[i]===1) {
          setUsed(i);
        }
        if (abUsed[i]===2) {
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

    let wordList = [];

    if (dict==="Guesses") {
      wordList = guesses;
    }else {
      wordList = words;
    }

    for (let i = 0; i < alphabet.length; ++i) {
        if (abUsed[i]===1) {
          charLen++;
          charList[charLen] = alphabet[i].toLowerCase();
        }
    }
    if (charLen !== -1 )
    {
      for (let i = 0; i < wordList.length; ++i) {
        //loop possible guess list
        let word = wordList[i];
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
      yellowList(guessList);
    }else {
      //console.log("no characters to remove");
      yellowList(wordList);
    }
  }

  function yellowList(guessList) {
    let newList = [];
    if (guessList.length!==0) {
      let charList = [];
      let charLen = -1;
      for (let i = 0; i < alphabet.length; ++i) {
          if (abUsed[i]===2) {
            charLen++;
            charList[charLen] = alphabet[i].toLowerCase();
          }
      }
      if (charLen !== -1 ) {
        newList = guessList;
        for (let i = 0; i < charLen+1; ++i) {
          newList = yellowCheck(newList,charList[i]);
        }
        console.log(newList);
    }else {
      //console.log("no yellows");
      console.log(guessList);
    }
  }else {
    console.log("empty list");
  }
}

function yellowCheck(guessList,char) {
  let newList = [];
  let guessLen = -1;
  for (let i = 0; i < guessList.length; ++i) {
    //loop possible guess list
    let word = guessList[i];
    let possible = false;
    for (let k = 0; k < 5; ++k) {
      //loop for length of word
      if (word[k]===char) {
          possible = true;
          break;
      }
    } if (possible) {
      guessLen++;
      newList[guessLen] = word;
    }
  }

  return newList;
}

  if (order==="kb") {
    return (
      <div className="Display">
        <ul style={{alignItems: "center"}}>{keyboardList}</ul>
        <button onClick={() => {setOrder("ab");}}>Change Order</button>
        <button onClick={() => {reset();handleClick();}}>Reset</button>
        <button onClick={() => {list();handleClick();}}>List Options</button>
        <select name="dictionary" value={dict} onChange={handleChange}>
          <option value="Guesses">Guesses</option>
          <option value="Words">All Words</option>
        </select>
      </div>
    )
  }else {
    return (
      <div className="Display">
        <ul style={{alignItems: "center"}}>{alphabetList}</ul>
        <button onClick={() => {setOrder("kb");}}>Change Order</button>
        <button onClick={() => {reset();handleClick();}}>Reset</button>
        <button onClick={() => {list();handleClick();}}>List Options</button>
        <select name="dictionary" value={dict} onChange={handleChange}>
          <option value="Guesses">Guesses</option>
          <option value="Words">All Words</option>
        </select>
      </div>
    )
  }
};
export default Display;
