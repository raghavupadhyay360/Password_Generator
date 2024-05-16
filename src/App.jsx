import { useCallback, useState, useEffect, useRef } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numAll, setNumAll] = useState(false);
  const [charAll, setCharAll] = useState(false);
  const [password, setPassword] = useState("")

  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numAll) str += "0123456789"
    if (charAll) str += "!@#$%^&*(}]`~+-"

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass)

  }, [length, numAll, charAll, setPassword])

  const copyPasswordToClipboard = useCallback(() => {
    // passwordRef.current?.Select();
    window.navigator.clipboard.writeText(password);
  }, [password])

  useEffect(() => {
    passwordGenerator()
  }, [length, numAll, charAll, passwordGenerator])

  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 bg-gray-700 text-orange-400">
        <h1 className="text-white text-center text-3xl mb-4" id="main-text">Password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-3">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3"
            placeholder="password"
            readOnly
            ref={passwordRef}
          />
          <button className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0
          font-medium" onClick={copyPasswordToClipboard}>
            copy
          </button>
        </div>

        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1 mb-4 font-medium">
            <input type="range"
              min={6}
              max={100}
              value={length}
              className="cursor: pointer"
              onChange={(e) => { setLength(e.target.value) }}
            />
            <label>Length: {length}</label>
          </div>
          <div className="flex items-center gap-x-1 mb-4 font-medium">
            <input
              type="checkbox"
              defaultChecked={numAll}
              id="numberInput"
              onChange={() => {
                setNumAll((prev) => !prev);
              }}
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className="flex items-center gap-x-1 mb-4 font-medium">
            <input
              type="checkbox"
              defaultChecked={charAll}
              id="numberInput"
              onChange={() => {
                setCharAll((prev) => !prev);
              }}
            />
            <label htmlFor="characterInput">Characters</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App

