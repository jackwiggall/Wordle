import { useState } from 'react'

const alphabet = ["A","B","C","D","E","F","G","H","I","J","","K","L","M","N","O","P","Q","R","S","","T","U","V","W","X","Y","Z"];
const keyboard = ["Q","W","E","R","T","Y","U","I","O","P","","A","S","D","F","G","H","J","K","L","","Z","X","C","V","B","N","M"];

function Display() {
  const [order, setOrder] = useState("kb");
  const keyboardList = keyboard.map(a => {
      if(a!=="") {
        return <li key={a.id}>{a}</li>
      }else {
        return <br/>
      }
    }
  );
  const alphabetList = alphabet.map(a => {
      if(a!=="") {
        return <li key={a.id}>{a}</li>
      }else {
        return <br/>
      }
    }
  );
  if (order==="kb") {
    return (
      <div className="Display">
        <ul>{keyboardList}</ul>
        <button onClick={() => {setOrder("ab")}}>Change Order</button>
      </div>
    )
  }else {
    return (
      <div className="Display">
        <ul>{alphabetList}</ul>
        <button onClick={() => {setOrder("kb")}}>Change Order</button>
      </div>
    )
  }
};

export default Display;
