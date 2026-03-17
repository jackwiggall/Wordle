import RICIBs from 'react-individual-character-input-boxes';
import {useState,useReducer} from 'react';

function WordInput() {

  const [winput, setInput] = useState("");
  const [letters, setLetters] = useState([]);
  const [row1, setRow1] = useState([[0,0,0,0,0]]);

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
        return <div>{temp}</div>;
      } else {
        return <p />
      }
    }
  );

  function changeColor(i,j) {
    let temp = row1;
    if (row1[i][j]<2) {
      temp[i][j]++;
    }else{
      temp[i][j]=0;
    }
    setRow1(temp);
    handleClick();
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
      </div>
    );
  }


}
export default WordInput;
