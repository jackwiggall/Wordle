import RICIBs from 'react-individual-character-input-boxes';
import {useState,useReducer} from 'react';
import guesses from './Dictionaries/Guesses.json'
import words from './Dictionaries/Words.json'

function WordInput() {

  const [winput, setInput] = useState("");
  const [letters, setLetters] = useState([]);

  const [row1, setRow1] = useState([[0,0,0,0,0]]);

  const [white, setWhite] = useState([]);
  const [yellow, setYellow] = useState([]);
  const [green, setGreen] = useState(['_','_','_','_','_']);

  const [dict, setDict] = useState("Guesses");
  const [total, setTotal] = useState(""); //all the possible word list
  const handleChange = (e) => {
      setDict(e.target.value);
      list();
      handleClick();
    };

  const [, forceUpdate] = useReducer(x => x + 1, 0);

  function handleClick() {
    forceUpdate();
  }

  function handleInput(input) {
    // Do something with the string
    if (input.length===5) {
      setInput(input.toUpperCase());
    }else {
      setInput("");
    }
  }

  const onButtonSubmit = e => {
    e.preventDefault();
    if (winput.length!==5) {
      console.log("Not 5 chars");
    }else {
      let word = [];
      for (let i = 0; i < 5; ++i) {
        word[i] = winput[i];
      }
      if (letters.length!==0) {
        setRow1([...row1,[0,0,0,0,0]]);
        setLetters([...letters,word]);
      }else {
        setLetters([word]);
      }
    }
  }
  const onButtonReset = e => {
    e.preventDefault();
    setLetters([]);
    setRow1([[0,0,0,0,0]]);
    setWhite([]);
    setYellow([]);
    setGreen(['_','_','_','_','_']);
    list();
  }

  const submmissionList = letters.map((a,i) => {
      if(a!=='') {
        let temp = a.map((b,j) => {
          if (row1[i][j]===0) {
            return <button className="inputButtons" onClick={() => {changeColor(i,j);}}>{b}</button>
          }else if (row1[i][j]===1) {
            return <button className="inputButtons" style={{background:"#d1b036"}} onClick={() => {changeColor(i,j);}}>{b}</button>
          }else {
            return <button className="inputButtons" style={{background:"#6aaa64"}} onClick={() => {changeColor(i,j);}}>{b}</button>
          }
        });
        return <div>{temp}<button className="inputButtons" onClick={() => {checkColor(row1[i],i);}}>🎯</button></div>;
      } else {
        return <p />
      }
    }
  );

function checkColor(row,i) {
  //console.log(row);
  for (let j = 0; j < 5; ++j) {
    let c = letters[i][j];
    if (row[j]===0) {
      //white
      if (white!==[]) {
        setWhite([...white,c]);
      }else {
        setWhite([c]);
      }
    }else if (row[j]===1) {
      //yellow
      if (yellow.length!==0) {
        //console.log(yellow);
        let pos = -1; //check if character already in yellow
        let found = false;
        for (let k = 0; k < yellow.length; ++k) {
          if (yellow[k][0] === c) {
            pos = k;
            for (let l = 0; l < yellow[k].length; ++l) {
              if (yellow[k][l]===j) {
                //number already exists, ignore
                found = true;
                console.log("repeat");
                break;
              }
            }
            if (!found) {
              let tempYellow = yellow;
              console.log("not found");
              tempYellow[k] = [tempYellow[k],j];
              setYellow(tempYellow);
            }
            break;
          }
        }
        if (pos===-1&&!found) {
          //character not in yellow
          setYellow([...yellow,[c,j]]);
          console.log("no yell");
        }
      }else {
        //first yellow entry
        setYellow([[c,j]]);
        console.log("first entry");
      }

    }else {
      //green
      let tempGreen = green;
      tempGreen[j] = c;
      setGreen(tempGreen);
    }
  }
  list();
  handleClick();
}

function changeColor(i,j) {
    let w = row1; //word in number form

    if (row1[i][j]===0) {
      w[i][j]++;
    }else if (row1[i][j]===1) {
      w[i][j]++;
    }else {
      w[i][j]=0;
    }
    setRow1(w);
    handleClick();
  }

function list() {
    let wordList = [];

    if (dict==="Guesses") {
      wordList = guesses;
    }else {
      wordList = words;
    }
    if (letters.length!==0) {

      //check green letters first to trim list the most
      let newList = wordList;
      for (let g = 0; g < 5; ++g) {
        if (green[g]!=='_') {
          let tempList = [];
          let count = 0;

          for (let i = 0; i < newList.length; ++i) {
            if (newList[i][g]===green[g].toLowerCase()) {
              tempList[count] = newList[i];
              count++;
            }
          }
          newList = tempList;
        }
      }

      console.log(yellow);
      //for yellow, first remove all words not containing any instance of letter
      for (let y = 0; y < yellow.length; ++y) {
        let tempList = [];
        let count = 0;

        for (let i = 0; i < newList.length; ++i) {
          for (let j = 0; j < 5; ++j) {
            if (newList[i][j]===yellow[y][0].toLowerCase()) {
              tempList[count] = newList[i];
              count++;
              break;
            }
          }
        }
        newList = tempList;
      }


      setTotal(newList);

    }else {
      setTotal(wordList);
    }
  }

  if (letters.length===0) {
    return (
      <div className="WordInput">
        <div className="PriorEntry" id="PriorEntry"></div>
        <RICIBs
            amount={5}
            handleOutputString={handleInput}
            inputProps={
              { className: "2fa-box",
                style: { "color": "black", textTransform: "uppercase",background: "#ffffff" },
                placeholder: "_",
              }}
            inputRegExp={/^[aA-zZ]$/}
          /><form onSubmit={onButtonSubmit} style={{display:"inline"}}>
          <button type="submit">Enter</button></form>
          <form onSubmit={onButtonReset} style={{display:"inline"}}>
          <button type="submit">Reset</button></form>

          <div className="Results">
          <p style={{fontSize: "20px",marginBottom:"0"}}>({total.length})</p>
            <textarea name="message" value={total} />
          </div>
          <select name="dictionary" value={dict} onChange={handleChange}>
            <option value="Guesses">Guesses</option>
            <option value="Words">All Words</option>
          </select>

      </div>
    );
  } else {
    return (
      <div className="WordInput">
        <div className="PriorEntry" id="PriorEntry">{submmissionList}</div>
        <RICIBs
            amount={5}
            handleOutputString={handleInput}
            inputProps={
              { className: "2fa-box",
                style: { "color": "black", textTransform: "uppercase",background: "#ffffff" },
                placeholder: "_",
              }}
            inputRegExp={/^[aA-zZ]$/}
          /><form onSubmit={onButtonSubmit} style={{display:"inline"}}>
          <button type="submit">Enter</button></form>
          <form onSubmit={onButtonReset} style={{display:"inline"}}>
          <button type="submit">Reset</button></form>

          <div className="Results">
          <p style={{fontSize: "20px",marginBottom:"0"}}>({total.length})</p>
            <textarea name="message" value={total} />
          </div>
          <select name="dictionary" value={dict} onChange={handleChange}>
            <option value="Guesses">Guesses</option>
            <option value="Words">All Words</option>
          </select>

      </div>
    );
  }

}
export default WordInput;
