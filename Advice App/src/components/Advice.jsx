import React, { useEffect } from 'react'
import { useState } from 'react'
import "./Advice.css"

const Advice = () => {
    const[advice,setAdvice] = useState("");
    const[count,setCount] = useState(0);
    async function getAdvice(){
        const res = await fetch("https://api.adviceslip.com/advice");
        const data = await res.json();
        setAdvice(data.slip.advice);
        setCount((c)=>c+1);
    }

    useEffect(function(){
        getAdvice();
    },[]);

  return (
    <div className="app">
      <h3>{advice}</h3>
      <button onClick={getAdvice}>Get Advice</button>
      <p>
        You have read <b>{count}</b> pieces of Advice
      </p>
    </div>
  )
}

export default Advice
