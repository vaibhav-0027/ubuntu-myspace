import React, { useRef, useState } from 'react'
import { Col, Row } from 'reactstrap';
import { SketchField, Tools } from 'react-sketch';
import InputRange from 'react-input-range';
import { tools } from './utils';
import { HuePicker } from "react-color";

interface ToolProp {
    name: string;
    src: string;
    tool: SelectedTool;
}

interface Range {
    max: number;
    min: number;
}

interface SelectedTool {
    value: Tools.Select | Tools.Pencil | Tools.Line | Tools.Rectangle | Tools.Circle;
}

const Whiteboard = () => {

    const whiteboard = useRef<any>();

    const [selectedTool, setSelectedTool] = useState<SelectedTool>({ value: Tools.Pencil });
    const [lineWidth, setLineWidth] = useState<number | Range>(5);
    const [lineColor, setLineColor] = useState<string>("#000");

    const clearWhiteboardHandler = () => {
        return whiteboard?.current?.clear();
    }

    const undoHandler = () => {
        return whiteboard?.current?.undo();
    }

    const redoHandler = () => {
        return whiteboard?.current?.redo();
    }

    const eraseElementHandler = () => {
        return whiteboard?.current?.removeSelected();
    }

    const _renderHeader = () => {
        return (
            <div>
                <div className="font-weight-bolder fa-2x text-orange pt-4 ml-4">
                    Whiteboard
                </div>
            </div>
        )
    }

    const _renderTools = () => {
        return (
            <Row className="ml-3 pl-3 fa-2x d-flex align-items-center justify-content-center" xs={3}>
                {
                    tools.map((info: ToolProp, index: number) => {
                        return (
                            <div key={info.src}>
                                <i
                                    id={`${info.name}${info.src}`}
                                    className={`${info.src} cursor-pointer`}
                                    onClick={() => setSelectedTool(info.tool)}
                                />
                            </div>
                        )
                    })
                }

                <i 
                    className="ri-eraser-line cursor-pointer "
                    onClick={eraseElementHandler}
                />

                <i 
                    className="ri-arrow-go-back-line cursor-pointer "
                    onClick={undoHandler}
                />

                <i 
                    className="ri-arrow-go-forward-line cursor-pointer "
                    onClick={redoHandler}
                />

                <i
                    className="ri-delete-bin-line text-danger mb-1 cursor-pointer"
                    onClick={clearWhiteboardHandler}
                />
            </Row>
        )
    }

    const _renderLineWidthRange = () => {
        return (
            <Row className="ml-3 mt-4 line-width-container">
                <InputRange 
                    value={lineWidth}
                    onChange={value => setLineWidth(value)}
                    minValue={1}
                    maxValue={15}
                />
            </Row>
        )
    }

    const _renderLineColorPicker = () => {
        return (
            <Row className="ml-3 mt-4">
                <HuePicker 
                    color={lineColor}
                    onChange={e => setLineColor(e.hex)}
                />
            </Row>
        )
    }

    const _renderToolbar = () => {
        return (
            <Col lg={2} md={2} >

                <Row className="font-weight-bold ml-3 fa-lg mt-3 mb-2">
                    Tools:
                </Row>

                {_renderTools()}

                <Row className="font-weight-bold ml-3 fa-lg mt-4 mb-2">
                    Line Width:
                </Row>

                {_renderLineWidthRange()}

                <Row className="font-weight-bold ml-3 fa-lg mt-5 mb-2">
                    Line Color:
                </Row>

                {_renderLineColorPicker()}

            </Col>
        )
    }

    const _renderDrawingSpace = () => {
        return (
            <Col lg={9} md={9} >
                <SketchField
                    ref={whiteboard}
                    lineColor={lineColor}
                    lineWidth={lineWidth}
                    tool={selectedTool.value}
                    undoSteps={10}
                    style={{ border: "1px solid black", backgroundColor: "white" }}
                />
            </Col>
        )
    }

    return (
        <div className="h-100 w-100 bg-off-white">
            {_renderHeader()}

            <Row>
                {_renderToolbar()}

                {_renderDrawingSpace()}
            </Row>
        </div>
    )
}

export default Whiteboard
