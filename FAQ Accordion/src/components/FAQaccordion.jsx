import React from 'react'
import FAQitem from './FAQitem';
import "./FAQaccordion.css";

const FAQaccordion = ({data}) => {

  return (
    <>
      <div className="faq-accordion">
        <h2>FAQs</h2>
        {data.map((item)=>(
        <FAQitem key={item.id} question={item.question} answer={item.answer}/>
        ))}
      </div>
    </>
  );
}

export default FAQaccordion;
