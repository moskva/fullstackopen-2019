import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Display = ({text}) => {
    return (
        <div>
            <h1>{text}</h1>
        </div>
    )
}

const Button = ({onClick, text}) => {
    return (
        <button onClick={onClick}>
            {text}
        </button>
    )
}

const Statistics = (props) => {
    const formatedNum = (num) => Number.parseFloat(num).toFixed(1)

    if (props.text === 'average') {
        return (
            <tr>
                <td>{props.text} {formatedNum(props.value)}</td>
            </tr>
        )
    }

    if (props.text === 'positive') {
        return (
            <tr>
                <td>{props.text} {formatedNum(props.value * 100)} %</td>
            </tr>
        )
    }

    return (
        <tr>
            <td>{props.text} {props.value}</td>
        </tr>
    )
}

const App = () => {
    // save clicks of each button to own state
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)
    const [allClicks, setAll] = useState(0)
    const [scores, setScores] = useState(0)
    const [average, setAverage] = useState(0)
    const [positive, setPositive] = useState(0)

    const Feedback = ({allClicks}) => {
        if (allClicks === 0) {
            return (
                <div>No feedback given</div>
            )
        }

        return (
            <div>
                <table>
                    <tbody>
                        <Statistics text='good' value={good} />
                        <Statistics text='neutral' value={neutral} />
                        <Statistics text='bad' value={bad} />
                        <Statistics text='all' value={allClicks} />
                        {/* <Statistics text='Total scores' value={scores} /> */}
                        <Statistics text='average' value={average} />
                        <Statistics text='positive' value={positive} />
                    </tbody>
                </table>
            </div>
        )
    }

    const handleGoodClicks = () => {
        setGood(good + 1)
        setAll(allClicks + 1)
        setScores(scores + 1)
        setAverage((scores + 1) / (allClicks + 1))
        setPositive((good + 1) / (allClicks + 1))
    }

    const handleNeutralClicks = () => {
        setAll(allClicks + 1)
        setNeutral(neutral + 1)
        setAverage(scores / (allClicks + 1))
        setPositive(good / (allClicks + 1))
    }

    const handleBadClicks = () => {
        setBad(bad + 1)
        setAll(allClicks + 1)
        setScores(scores - 1)
        setAverage((scores - 1) / (allClicks + 1))
        setPositive(good / (allClicks + 1))
    }

    return (
        <div>
            <Display text='give feedback' />

            <Button onClick={handleGoodClicks} text='good' />
            <Button onClick={handleNeutralClicks} text='neutral' />
            <Button onClick={handleBadClicks} text='bad' />

            <Display text='statistics' />

            <Feedback allClicks={allClicks} />

        </div>
    )
}
ReactDOM.render(<App />, document.getElementById('root'));
