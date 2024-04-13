import React from 'react'
import { useState } from 'react';
import "./App.css";

const PasswordGenerator = () => {
    const [length,setLength] = useState(0);
    const [includeUpperCase,setIncludeUpperCase] = useState(false);
    const [includeLowerCase,setIncludeLowerCase] = useState(false);
    const [includeNumbers,setIncludeNumbers] = useState(false);
    const [includeSymbols,setIncludeSymbols] = useState(false);

    const [password,setPassword] = useState("");

    function generatePassword(){
        let charset = "";
        if(includeUpperCase) {
            charset+="ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        }
        if(includeLowerCase) {
            charset+="abcdefghijklmnopqrstuvwxyz";
        }
        if(includeNumbers) {
            charset+="0123456789";
        }
        if(includeSymbols) {
            charset+="!@#$%^&*()-_+="
        }

        let generatedPassword = "";
        for(let i=0;i<length;i++){
            const randomIndex = Math.floor(Math.random() * charset.length);
            generatedPassword+=charset[randomIndex];
        }
        setPassword(generatedPassword);
    }

    const copyToClipboard = () => {
        navigator.clipboard.writeText(password);
        alert(`Password Copied : ${password}`);
    };

  return (
    <div className='password-generator'>
        <h2>Strong Password Generator</h2>
        <div className="input-group">
            <label htmlFor="num">Password Length </label>
            <input type="number" name="" id="num" value={length} onChange={(e)=>{setLength(parseInt(e.target.value))}}/>
        </div>
        <div className="checkbox-group">
            <input type="checkbox" name="" id="upper" checked={includeUpperCase} onChange={(e) => setIncludeUpperCase(e.target.checked)}/>
            <label htmlFor="upper">Include UpperCase</label>
        </div>
        <div className="checkbox-group">
            <input type="checkbox" name="" id="lower" checked={includeLowerCase} onChange={(e) => setIncludeLowerCase(e.target.checked)}/>
            <label htmlFor="lower">Include LowerCase</label>
        </div>
        <div className="checkbox-group">
            <input type="checkbox" name="" id="numbers" checked={includeNumbers} onChange={(e) => {setIncludeNumbers(e.target.checked)}}/>
            <label htmlFor="numbers">Include Numbers</label>
        </div>
        <div className="checkbox-group">
            <input type="checkbox" name="" id="symbol" checked={includeSymbols} onChange={(e) => setIncludeSymbols(e.target.checked)}/>
            <label htmlFor="symbol">Include Symbols</label>
        </div>
        <button className="generate-btn" onClick={generatePassword}>Generate Password</button>
        <div className="generate-password">
            <input type="text" readOnly value={password}/>
            <button className="copy-btn" onClick={copyToClipboard}>Copy</button>
        </div>
    </div>
  );
}
export default PasswordGenerator
