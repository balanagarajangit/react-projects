import { useState } from 'react'
import './App.css'

const FaqItem = ({ question, answer }) => {
  const [show, setShow] = useState(false);

  const toggleShow = () => {
    setShow(!show);
  }
  return (

    <div className={`faq-item ${show ? "active" : ""}`}>
      <div className="faq-item-header" onClick={toggleShow}>
        {question}
      </div>
      <div className="faq-item-body">
        <div className="faq-item-body-content">
          {answer}
        </div>
      </div>
    </div>
  )
}


const FaqAccordion = ({ data }) => {
  return (
    <div className="faq-accordion">
      <h2>FAQ</h2>
      {data.map((item) => (<FaqItem key={item.id} question={item.question}
        answer={item.answer} />))}
    </div>
  )
}

const data = [
  {
    id: 1,
    question: "What is React?",
    answer: "React is a JavaScript library for building user interfaces. It allows developers to create reusable UI components and manage the state of an application efficiently."
  },
  {
    id: 2,
    question: "Explain the concept of Virtual DOM in React.",
    answer: "The Virtual DOM (Document Object Model) is a concept in React that represents a lightweight copy of the actual DOM. React uses a virtual DOM to optimize and speed up the process of updating the user interface by minimizing direct manipulation of the real DOM, resulting in better performance."
  },
  {
    id: 3,
    question: "What are the key features of React Hooks?",
    answer: "React Hooks are functions that allow developers to use state and lifecycle features in functional components. Key features include useState for managing state, useEffect for handling side effects, useContext for accessing context in functional components, and more. Hooks enable developers to write more modular and readable code in functional components."
  }
];


function App() {

  return (
    <>
      <div className="app"><FaqAccordion data={data} /></div>
    </>
  )
}

export default App
