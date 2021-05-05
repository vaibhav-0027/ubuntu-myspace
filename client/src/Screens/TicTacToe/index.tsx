import React, { useState } from 'react'
import { toast } from 'react-toastify';
import { Row, Tooltip } from 'reactstrap';
import SingleGrid from './SingleGrid'

interface SingleGridProps {
    value: 0 | 1 | 2;
}

interface CurrentPlayerProps {
    value: 2 | 1;
}

const INIT_GRID: Array<SingleGridProps> = Array(9).fill({value: 0});

const TicTacToe = () => {

    const [gridValue, setGridValue] = useState(INIT_GRID);
    const [currentPlayer, setCurrentPlayer] = useState<CurrentPlayerProps>({value: 1});
    const [gameFinish, setGameFinish] = useState(false);
    const [tooltipOpen, setTooltipOpen] = useState(false);
    const toggleTooltip = () => setTooltipOpen(!tooltipOpen);

    const checkWinner = (idx: number, values: Array<SingleGridProps>) => {
        const valid = [
            [0,1,2],
            [3,4,5],
            [6,7,8],
            [0,3,6],
            [1,4,7],
            [2,5,8],
            [0,4,8],
            [2,4,6],
        ];

        for(let i=0; i<8; ++i) {
            if(valid[i].lastIndexOf(idx) !== -1) {
                const [idx1, idx2, idx3] = valid[i];
                if(values[idx1].value === values[idx2].value && values[idx2].value === values[idx3].value) {
                    return true;
                }
            }
        }

        return false;
    }

    const singleGridClickHandler = (idx: number) => {

        if(gameFinish) {
            return ;
        }

        let temp: Array<SingleGridProps> = [];
        for(let i=0; i<9; ++i) {
            if(i == idx) {
                temp.push({value: currentPlayer.value});
            } else {
                temp.push(gridValue[i]);
            }
        }
        setGridValue(temp);

        const check = checkWinner(idx, temp);

        if(check) {
            toast(`Player ${currentPlayer.value} has won the game`);
            return setGameFinish(true);
        }
        
        if(currentPlayer.value === 1) {
            setCurrentPlayer({ value: 2 });
        } else {
            setCurrentPlayer({ value: 1 });
        }
    
    }

    const restartGameHandler = () => {
        setGridValue(INIT_GRID);
        setGameFinish(false);
        setCurrentPlayer({value: 1});
    }

    const _renderHeader = () => {
        return (
            <div className="d-flex align-items-center">
                <div className="font-weight-bolder fa-2x text-orange pt-4 ml-5">
                    Tic-Tac-Toe
                </div>

                <span 
                    className="d-flex align-items-center mt-4 ml-5 text-orange cursor-pointer"
                    onClick={restartGameHandler}
                >
                    <i 
                        className="ri-refresh-line fa-lg tictactoe-refresh-button" 
                        id="refresh-button"    
                    />

                    <Tooltip 
                        isOpen={tooltipOpen}
                        toggle={toggleTooltip}
                        target="refresh-button"
                        placement="right"
                    >
                        Restart Game
                    </Tooltip>
                </span>
            </div>
        )
    }

    const _renderMessage = () => {
        return (
            <div className="ml-5">
                {currentPlayer.value === 1 ? "First " : "Second "}
                Player
                {gameFinish ? " won" : " turn"}
            </div>
        )
    }

    return (
        <div className="h-100 w-100 bg-off-white">
            {_renderHeader()}
            {_renderMessage()}

            <div className="w-100 pl-3 d-flex align-items-center justify-content-center">
                <Row xs={4} className="tictactoe-grid-row">
                    {
                        gridValue.map((_current: SingleGridProps, index: number) => {
                            return (
                                <SingleGrid 
                                    key={index}
                                    idx={index}
                                    value={_current.value}
                                    onClick={singleGridClickHandler}
                                />
                            )
                        })
                    }
                </Row>
            </div>
        </div>
    )
}

export default TicTacToe
