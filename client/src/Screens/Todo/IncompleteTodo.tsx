import React, { useState } from 'react'
import { Col, Form, Input, Row } from 'reactstrap';
import classnames from "classnames";

interface Todo {
    id: string;
    status: number;
    text: string;
}

interface updateTodoParams {
    id: string;
    status?: number;
    updatedText?: string;
}

interface incompleteTodoProps {
    info: Todo;
    updateTodo: (body: updateTodoParams) => void;
    deleteTodo: (id: string) => void;
}

const IncompleteTodo = (props: incompleteTodoProps) => {

    const { info, updateTodo, deleteTodo } = props;

    const [text, setText] = useState(info.text);
    const [hover, setHover] = useState(false);
    const [disabled, setDisabled] = useState(true);
    const [complete, setComplete] = useState(false);

    const updateTodoHandler = (e: any) => {
        e.preventDefault();
        const body = {
            ...info,
            updatedText: text,
        }

        updateTodo(body);
        return setDisabled(true);
    }

    const deleteHandler = () => {
        return deleteTodo(info.id);
    }

    const taskCompletedHandler = () => {
        setComplete(true);
        setTimeout(() => {
            const body = {
                ...info,
                status: 1,
            }
    
            updateTodo(body);
        }, 500);
    };

    const _renderCheckbox = () => {
        return (
            <Col className="todo-checkbox">
                <span>
                    {
                        complete ? 
                            <i className="ri-checkbox-fill fa-lg text-orange" />
                            :
                            <i className="ri-checkbox-blank-line text-orange fa-lg cursor-pointer" onClick={taskCompletedHandler} />
                    }
                </span>
            </Col>
        )
    }

    const _renderTextOnly = () => {
        if(disabled) {
            return (
                <div className={classnames("my-2 py-1 complete-todo-text", {"text-line-through": complete})}>
                    {text}
                </div>
            )
        }

        return (
            <Form className="w-100" onSubmit={updateTodoHandler}>
                <Input 
                    value={text}
                    onChange={e => setText(e.target.value)}
                    placeholder="Add a task"
                    className={classnames("ml-0 z-index-0 p-1 fa-lg add-new-todo bg-transparent border-0 width-full shadow-none fa-1x", {"text-line-through": complete} )}
                />
            </Form>
        )
    }

    const _renderHoverIcons = () => {
        if(disabled && hover) {
            return (
                <div>
                    <i 
                        onClick={() => setDisabled(!disabled)}
                        className="mr-3 ri-pencil-line fa-lg cursor-pointer bg-transparent"
                    />

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
            <Col sm={11} lg={11} md={11} className="p-0">
                <div className="d-flex flex-row align-items-center justify-content-between">
                    {_renderTextOnly()}
                    {_renderHoverIcons()}
                </div>
            </Col>
        )
    }

    return (
        <Row
            className={classnames('todo-row m-0', { "todo-border-bottom": !disabled, "border-bottom": disabled })}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            {_renderCheckbox()}
            {_renderTodoText()}
        </Row>
    )
}

export default IncompleteTodo
