import { useEffect, useState } from 'react'
import './Advice.css'

export const Advice = () => {
    const [advice, setAdvice] = useState("Please Click the button to get advice");
    const [count, setCount] = useState(0);
    async function getAdvice() {
        const res = await fetch("https://api.adviceslip.com/advice");
        const data = await res.json();
        setAdvice(data.slip.advice);
        setCount((c) => c + 1);
    }
    useEffect(function () {
        getAdvice();
    }, [])
    return (
        <div>
            <h3>{advice}</h3>
            <button onClick={getAdvice}>Get Advice</button>
            <Counter count={count} />
        </div>
    )
}

function Counter(props) {
    return (
        <p>
            You have read <b>{props.count}</b> pieces of advice.
        </p>
    )
}