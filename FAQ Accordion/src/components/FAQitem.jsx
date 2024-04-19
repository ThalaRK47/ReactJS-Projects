import React from 'react'
import {useState} from "react";

const FAQitem = ({question,answer}) => {

  const [show,setShow] = useState(false);

  function toggleShow(){
    setShow(!show);
  };

  return (
    <div className={`faq-item ${show ? "active" : ""}`}>
        <div className="faq-item-header" onClick={toggleShow}>{question}</div>
        <div className="faq-item-body">
          <div className="faq-item-body-content">
            {answer}
          </div>
        </div>
    </div>
  );
}

export default FAQitem;
