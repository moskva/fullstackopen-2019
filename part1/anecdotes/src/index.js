import React, {useState} from 'react';
import ReactDOM from 'react-dom';

const Display = ({text}) => {
    return (
        <h1>{text}</h1>
    )
}

const Votes = ({votes}) => {
    return (
        <div>
            has {votes} votes
        </div>
    )
}

const Button = ({onClick, text}) => {
    return (
        <button onClick={onClick} >{text}</button>
    )
}

const App = (props) => {
    const [selected, setSelected] = useState(0)
    const [votes, setVotes] = useState(0)
    const [points, setPoints] = useState([0, 0, 0, 0, 0, 0])
    const [mostvotes, setMostvotes] = useState(0)

    const len = props.anecdotes.length

    const handleVote = () => {
        points[selected] += 1
        setVotes(votes + 1)
        setPoints(points)
        setMostvotes(Math.max(...points))

        console.log(points)

    }

    const handleNext = () => {
        setSelected(Math.floor(Math.random() * len))
    }

    return (
        <div>
            <Display text='Anecdote of the day' />
            {props.anecdotes[selected]}
            <Votes votes={points[selected]} />
            <Button onClick={handleVote} text='vote' />
            <Button onClick={handleNext} text='next anecdots' />
            <Display text='Anecdote with most votes' />
            {props.anecdotes[points.indexOf(mostvotes)]}
            <Votes votes={mostvotes} />
        </div>
    )
}

const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById('root'));