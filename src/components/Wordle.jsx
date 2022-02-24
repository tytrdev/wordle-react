import { useState } from 'react'
import './Wordle.css'

const TEST_WORD = "BAGEL";
const MAX_GUESS_LENGTH = 5;
const FIVE_SPACES = Array(5).fill(' ');

export default function Wordle() {
    const [guess, setGuess] = useState([]);
    const [guesses, setGuesses] = useState([]);

    function onTouch(key) {
        if (guess.length < MAX_GUESS_LENGTH) {
            setGuess([...guess, key]);
        }
    }

    function backspace() {
        if (guess.length > 0) {
            setGuess(guess.slice(0, guess.length - 1))
        }
    }

    function submit() {
        console.log("Submitting guess: ", guess);

        setGuesses([...guesses, guess])

        for (let i = 0; i < guess.length; i++) {
            if (guess[i] !== TEST_WORD[i]) {
                console.log(i, ": character mismatch");
            }
        }

        setGuess([])
    }

    return (
        <div className="wordle-app">
            <Guesses guesses={guesses} />
            <hr className='wordle-separator' />
            <Input input={guess} />
            <Keyboard onTouch={onTouch} backspace={backspace} submit={submit} />
        </div>
    )
}

function Guess(guess) {
    const characters = guess.slice(0, 5).map((c, i) => {
        const valid = TEST_WORD[i] === c;
        const misplaced = TEST_WORD.includes(c);
        return <div className={`wordle-character ${valid ? 'valid' : ''} ${!valid && misplaced ? 'misplaced' : ''}`}>{c}</div>
    });

    return (
        <div className="wordle-guess">{characters}</div>
    )
}

function Guesses(props) {
    const padded = [...props.guesses, ...Array(5).fill(FIVE_SPACES)];
    const guesses = padded.slice(0, 5).map(g => Guess(g, false));

    return (
        <div className="wordle-guesses">
            {guesses}
        </div>
    )
}

function InputRow(guess) {
    const padded = [...guess, ...FIVE_SPACES];
    const firstSpace = padded.indexOf(' ');

    const characters = padded.slice(0, 5).map((c, i) => (
        <div className={`wordle-character ${i === firstSpace ? 'selected' : ''}`}>{c}</div>
    ));

    return (
        <div className="wordle-guess">{characters}</div>
    )
}

function Input(props) {
    return (
        <div className="wordle-input">
            {InputRow(props.input)}
        </div>
    )
}

function Keyboard(props) {
    const row1 = [
        'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P',
    ]
    const row2 = [
        'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L',
    ]
    const row3 = [
        'Z', 'X', 'C', 'V', 'B', 'N', 'M',
    ]

    return (
        <div className="wordle-keyboard">
            <div>
                {row1.map(l => Key(l, props.onTouch))}
            </div>
            <div>
                {row2.map(l => Key(l, props.onTouch))}
            </div>
            <div>
                {row3.map(l => Key(l, props.onTouch))}
            </div>
            <div>
                <div className="wordle-key wide" onClick={props.submit}>√</div>
                <div className="wordle-key wide" onClick={props.backspace}>Back</div>
            </div>
        </div>
    )
}

function Key(key, onTouch) {
    return (<div className="wordle-key" onClick={() => onTouch(key)}>{key}</div>);
}