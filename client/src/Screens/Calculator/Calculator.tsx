import React, { useState } from 'react'
import { Button, Col } from 'reactstrap'

import Engine from "./Engine";
import { CALCOPTIONS } from './utils';

interface CalcOption {
    value?: string;
    src?: string;
    big?: boolean;
    engineVal: string;
}

const Calculator = () => {

    const [width, setWidth] = useState<string>("");
    const [display, setDisplay] = useState("");
    const [engine] = useState(new Engine());

    const buttonClickHandler = (value: string) => {
        setDisplay(engine.calculate(value))
    }

    const _renderInformation = () => {
        return (
            <div className="calculator-info-div bg-off-white">
                {display}
            </div>
        )
    }

    const RenderRowButtons = (tempProps: any) => {

        const {info} = tempProps;

        return (
            <div className="calculator-button-row w-100">
                {
                    info.map((_current: CalcOption, index: number) => {
                        setWidth("");
                        
                        if(_current.big) {
                            setWidth("w-50");
                        }

                        if(_current.value) {
                            return (
                                <Button 
                                    key={index} 
                                    className={`${width} calculator-button`}
                                    onClick={() => buttonClickHandler(_current.engineVal)}    
                                >
                                    <span className="calculator-button-text">
                                        {_current.value}
                                    </span>
                                </Button>
                            )
                        }

                        return (
                            <Button
                                key={index} 
                                className={`${width} calculator-button`}
                                onClick={() => buttonClickHandler(_current.engineVal)}
                            >
                                <i className={`${_current.src} calculator-button-text`} />
                            </Button>
                        )
                    })
                }
            </div>
        )
    }

    const _renderCalculatorButtons = () => {
        return (
            <div className="">
                {
                    CALCOPTIONS.map((info: Array<CalcOption>, index: number) => {
                        return (
                            <div key={index}>
                                { <RenderRowButtons info={info} /> }
                            </div>
                        )
                    })
                }
            </div>
        )
    }

    return (
        <div className="calculator-container">
            <div className="calculator-container-child1">
                <div className="calculator-container-child2">
                    <Col className="h-100 w-100 m-0 p-0 bg-off-white">
                        {_renderInformation()}
                        {_renderCalculatorButtons()}
                    </Col>
                </div>
            </div>
        </div>
    )
}

export default Calculator
