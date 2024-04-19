import { useState } from 'react';
import './App.css';
import FAQaccordion from './components/FAQaccordion';

const data = [
  {id:1,question:"What is React JS ?",answer:"React JS is an open-source JavaScript library, crafted with precision by Facebook, that aims to simplify the intricate process of building interactive user interfaces."},
  {id:2,question:"Is Angular better than React ?",answer:"No, Because of its virtual DOM implementation and rendering optimizations, React outperforms Angular. It's also simple to switch between React versions; unlike Angular, you don't have to install updates one by one."},
  {id:3,question:"Is React easy for beginners ?",answer:"Compared to other front-end frameworks like Angular or Vue, learning React is comparatively simple."},
  {id:4,question:"Is CSS needed for React ?",answer:"Yes, you will need to know CSS if you want to add styling in React."},
  {id:5,question:"What is a state in React ?",answer:"The state is a built-in React object that is used to contain data or information about the component. A component's state can change over time; whenever it changes, the component re-renders."}
];

function App() {
  return (
      <>
        <div className="App">
        <FAQaccordion data={data}/>
        </div>
      </>
  );
}

export default App;
