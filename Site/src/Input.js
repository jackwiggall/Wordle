import {useState} from 'react'

function checkValid(value) {
  //wordle only allows 5 character words so verify length
  if (value.length==5) {
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
      console.log("No special characters");

      //DO SOMETHING HERE


    }else {
      console.log("String contains special characters");
    }

  }else {
    console.log("length "+value.length);
  }
}

function Input() {
const [value, setValue] = useState("");

  return (
    <div className="Input">
        <input value={value} maxLength="5" onChange={e => setValue(e.target.value)}/>
        <button onClick={()=>{checkValid(value)}}>Submit</button>
    </div>
  );
}

export default Input;
