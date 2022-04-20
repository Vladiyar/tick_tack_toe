import React, {useState} from 'react';
import Square from "./Square";
import {logPlugin} from "@babel/preset-env/lib/debug";
import {patterns} from "./patters";

const Container = () => {
    const [turn, setTurn] = useState('X');
    const [squares, setSquares] = useState(Array(9).fill(''));
    const [winner, setWinner] = useState();
    const [draw, setDraw] = useState('');

    const findWinner = (squaresData) => {
        for (let pattern in patterns) {
            patterns[pattern].forEach((element) => {
                if (
                    squaresData[element[0]] === '' ||
                    squaresData[element[1]] === '' ||
                    squaresData[element[2]] === ''
                ) {

                }
                else if (
                    squaresData[element[0]] === squaresData[element[1]] &&
                    squaresData[element[0]] === squaresData[element[2]]
                ) {
                    setWinner(squaresData[element[0]])
                }

                for (let i = 0; i < 9; i++) {
                    if (squaresData[i] === '') {
                        return;
                    }
                }

                setDraw('draw');

            });
        }
    };

    const onRestartHandler = () => {
        setWinner(null);
        setDraw('');
        setSquares(Array(9).fill(''));
    }
    const onClickHandler = (number) => {
        if (squares[number] !== '') return;

        let filledSquares = [...squares];

        if (turn === 'X') {
            filledSquares[number] = 'X';
            setTurn('O');
        } else {
            filledSquares[number] = 'O';
            setTurn('X');
        }
        findWinner(filledSquares);
        setSquares(filledSquares);
    }
        const Square = ({number}) => {
            return (
                <div className="square" onClick={() => onClickHandler(number)}>
                    {squares[number]}
                </div>
            );
        };

    let arrayOfSquares = []
    for (let i = 0; i < 9; i++) {
        arrayOfSquares.push(<Square key={i} number={i}/>)
    }

    return (
        <div>
            <div className='turn-result'>
                <h2>Turn: {turn}</h2>
                {winner && (
                    <div className="winner">
                        <h2>{winner} won</h2>
                        <button onClick={() => onRestartHandler()}>Play again</button>
                    </div>
                )}
                {draw && (
                    <div className="draw">
                        <h2>Draw</h2>
                        <button onClick={() => onRestartHandler()}>Play again</button>
                    </div>
                )}
            </div>

            <div className="container">
                {arrayOfSquares}
            </div>

        </div>
    );
};

export default Container;