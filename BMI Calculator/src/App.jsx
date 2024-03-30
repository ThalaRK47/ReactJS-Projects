import { useState } from 'react'
import './App.css'

function App() {
  const [height,setHeight] = useState("");
  const [weight,setWeight] = useState("");
  const [bmi,setBmi] = useState(null);
  const [bmiStatus,setBmiStatus] = useState("");
  const [errorMessage,setErrorMessage] = useState("");

  const changeHandlerHeight = (e)=>{
    setHeight(e.target.value);
  };

  const changeHandlerWeight = (e)=>{
    setWeight(e.target.value);
  };

  const calculateBmi = () => {
    const isValidHeight = /^\d+$/.test(height);
    const isValidWeight = /^\d+$/.test(weight);

    if(isValidHeight && isValidWeight){
      let heightInMeters = height/100;
      let bmiValue = weight / (heightInMeters * heightInMeters);
      setBmi(bmiValue.toFixed(2));

      if(bmiValue < 18.5){
        setBmiStatus("Under Weight");
      }
      else if(bmiValue >=18.5 && bmiValue < 24.9){
        setBmiStatus("Normal Weight");
      }
      else if (bmiValue >=25 && bmiValue < 29.9){
        setBmiStatus("OverWeight");
      }
      else{
        setBmiStatus("Obese");
      }
      setErrorMessage("");
    }
    else{
      setBmi(null);
      setBmiStatus("");
      setErrorMessage("Please enter valid numeric values for height and weight.");
    }
  };

  function clearAll(){
    setHeight("");
    setWeight("");
    setBmi(null);
    setBmiStatus("");
    setErrorMessage("");
  };

  return (
    <>
      <div className="bmi-calculator">
        <div className="box"></div>
        <div className="data">
          <h1>BMI Calculator</h1>
          {errorMessage && <p className="error">{errorMessage}</p>}
          <div className="input-container">
            <label htmlFor="height">Height (cm) : </label>
            <input type="text" id='height' value={height} onChange={changeHandlerHeight}/>
          </div>
          <div className="input-container">
            <label htmlFor="weight">Weight (kg) : </label>
            <input type="text" id='weight' value={weight} onChange={changeHandlerWeight}/>
          </div>
          <button className='btn-1' onClick={calculateBmi}>Calculate BMI </button>
          <button onClick={clearAll}>Clear All </button>
          {bmi !== null && (<div className="result">
            <p>Your BMI is : {bmi}</p>
            <p>Status : {bmiStatus}</p>
          </div>)}
        </div>
      </div>
    </>
  )
}

export default App
