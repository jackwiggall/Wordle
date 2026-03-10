import RICIBs from 'react-individual-character-input-boxes';

function WordInput() {

  function handleOutput(input) {
    // Do something with the string
    if (input.length==5) {
      console.log(input.toLowerCase());
    }
  }

  return (
    <div className="WordInput">
    <RICIBs
        amount={5}
        handleOutputString={handleOutput}
        inputProps={
          { className: "2fa-box",
            style: { "color": "black", textTransform: "uppercase" },
            placeholder: "_",
          }}
        inputRegExp={/^[aA-zZ]$/}
      />
    </div>
  );
}
export default WordInput;
