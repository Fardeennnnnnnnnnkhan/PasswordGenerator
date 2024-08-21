import { useState, useCallback, useEffect, useRef } from "react";

function App() {
  const [length, setlength] = useState(8);
  const [number, setnumber] = useState(false);
  const [char, setchar] = useState(false);
  const [password, setpassword] = useState("");
  const passwordRef = useRef(null);

  const PasswordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (number) str += "0123456789";
    if (char) str += "!@#$%^&*(){}|:?></,.";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setpassword(pass);
  }, [number, char, length, setpassword]);

  const copyToClipboard = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    PasswordGenerator();
  }, [length, number, char, PasswordGenerator]);
  return (
    <div className=" overflow-hiddenw-full mt-56 max-w-md mx-auto rounded-lg bg-zinc-800 text-orange-500 p-3">
      <h1 className="text-center  text-3xl">Password Generator</h1>
      <div className="flex overflow-hidden rounded-lg justify-center align-center mb-3">
        <input
          type="text"
          value={password}
          placeholder="Password"
          readOnly
          ref={passwordRef}
          className="outline-none w-full  p-2  "
        />
        <button
          onClick={copyToClipboard}
          className="bg-blue-700 text-white p-2"
        >
          Copy
        </button>
      </div>

      <div className="flex flex-wrap overflow-hidden text-lg ">
        <div className="flex gap-x-2">
          <input
            onChange={(e) => {
              setlength(e.target.value);
            }}
            type="range"
            className="cursor-pointer"
            min={6}
            max={100}
            value={length}
          />
          <label>Length:{length} </label>
          <input
            type="checkbox"
            defaultChecked={number}
            onChange={() => setnumber((prev) => !prev)}
          />
          <label>Number</label>
          <input
            type="checkbox"
            defaultChecked={char}
            onChange={() => setchar((prev) => !prev)}
          />
          <label>Characters</label>
        </div>
      </div>
    </div>


  );
}

export default App;
