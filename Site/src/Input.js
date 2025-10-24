import {useState} from 'react';
import gFile from './Dictionaries/Guesses.json';

function checkValid(value,guesses) {
  //wordle only allows 5 character words so verify length
  if (value.length===5) {
    //console.log("length valid");
    //checks if any special characters or non alphabet are entered
    let specialChar = false;
    for (let i = 0; i < value.length; ++i) {
    let ch = value.charCodeAt(i);
    if (
        !(ch >= 65 && ch <= 90) && // A-Z
        !(ch >= 97 && ch <= 122) // a-z
    ) {
        specialChar = true;
    }}
    if (!specialChar) {
      //console.log("No special characters");
      let inList = false;
      for (let i = 0; i < guesses.length; ++i) {
        if(value===guesses[i]) {
          inList = true;
          break;
        }
      }
      if (!inList) {
        setResponse("Word not in the list");
      }else {
        setResponse("Word is valid");
      }

    }else {
      setResponse("Word contains special characters");
    }
  }else {
    setResponse("Word must be 5 characters");
  }
}

function setResponse(text) {
  document.getElementById("response").innerText = text;
}

function Input() {
const [value, setValue] = useState("");
// This state will store the parsed data

/*Converts json list into readable numbered object*/
var guesses = [];
Object.entries(gFile).forEach(([key,value]) => {
  guesses.push(value)
});

const onFormSubmit = e => {
  e.preventDefault();
  checkValid(value,guesses)
  // send state to server with e.g. `window.fetch`
}

  return (
    <div className="Input">
      <form onSubmit={onFormSubmit}>
        <input value={value} maxLength="5" onChange={e => setValue(e.target.value)}/>
        <button type="submit">Submit</button>
      </form>
      <p style={{fontSize: "20px",marginTop:"0"}} id="response"></p>
    </div>
  );
}

export default Input;
