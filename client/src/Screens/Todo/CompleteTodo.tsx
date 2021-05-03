import React, { useState } from 'react'
import { Col, Row } from 'reactstrap';
import classnames from "classnames";

interface Todo {
    id: string;
    status: number;
    text: string;
}

interface incompleteTodoProps {
    info: Todo;
    deleteTodo: (id: string) => void;
}

const CompleteTodo = (props: incompleteTodoProps) => {

    const { info, deleteTodo } = props;

    const [hover, setHover] = useState(false);

    const deleteHandler = () => {
        return deleteTodo(info.id);
    }

    const _renderCheckbox = () => {
        return (
            <Col className="todo-checkbox">
                <span>
                    <i className="ri-checkbox-fill fa-lg text-orange" />
                </span>
            </Col>
        )
    }

    const _renderTextOnly = () => {
        return (
            <div className={classnames("my-2 py-1 complete-todo-text text-line-through")}>
                {info.text}
            </div>
        )
    }

    const _renderHoverIcons = () => {
        if(hover) {
            return (
                <div>
                    <i
                        onClick={deleteHandler}
                        className="ri-delete-bin-line fa-lg text-danger cursor-pointer mr-3 bg-transparent"
                    />
                </div>
            )
        }
    }

    const _renderTodoText = () => {
        return (
            <Col sm={11} className="p-0">
                <div className="d-flex flexxow align-items-center justify-content-between">
                    {_renderTextOnly()}
                    {_renderHoverIcons()}
                </div>
            </Col>
        )
    }

    return (
        <Row
            className={classnames("todo-row m-0 border-bottom")}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            {_renderCheckbox()}
            {_renderTodoText()}
        </Row>
    )
}

export default CompleteTodo;
