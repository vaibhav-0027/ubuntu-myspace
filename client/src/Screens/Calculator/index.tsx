import React from 'react'
import Calculator from './Calculator'


const CalculatorScreen = () => {

    const _renderHeader = () => {
        return (
            <div>
                <div className="font-weight-bolder fa-2x text-orange pt-4 ml-5">
                    Calculator
                </div>
            </div>
        )
    }

    return (
        <div className="h-100 w-100 bg-off-white">
            {_renderHeader()}

            <div className="d-flex h-75 flex-row align-items-center justify-content-center">
                <Calculator />
            </div>
        </div>
    )
}

export default CalculatorScreen
