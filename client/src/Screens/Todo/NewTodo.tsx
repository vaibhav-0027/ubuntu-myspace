import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Button, Col, Form, Input, InputGroup, InputGroupAddon, Row } from 'reactstrap';
import { AddTodo } from '../../actions/TodoAction';
import { getUserAccessId } from '../../helpers/authentication';
import classnames from "classnames";

interface addTodoParams {
    text: string,
    userId: string,
}

interface newTodoProps {
    addTodo: (body: addTodoParams) => void;
}

const NewTodo = (props: newTodoProps) => {

    const { addTodo } = props;

    const [text, setText] = useState("");
    const [active, setActive] = useState(false);
    const [userId] = useState(getUserAccessId());

    const changeHandler = (e: any) => {
        if(e.target.value.length <= 150) {
            setText(e.target.value);
        }
    }

    const cancelHandler = () => {
        setText("");
        setActive(false);
    }

    const addTaskHandler = (e: any) => {
        e.preventDefault();

        if(!text) return ;

        const body = {
            text,
            userId,
        }

        addTodo(body);
        return cancelHandler();
    }

    return (
        <Row className="m-0">
            <Col sm={12} md={6} lg={6} className="pl-1">

                <Form onSubmit={addTaskHandler}>
                    <InputGroup className="d-flex align-items-center">
                        <InputGroupAddon addonType="prepend">
                            <i className="ri-add-line todo-plus-symbol m-auto" />
                        </InputGroupAddon>

                        <Input 
                            value={text}
                            onChange={changeHandler}
                            type={"text"}
                            onClick={() => setActive(true)}
                            placeholder="Add a task"
                            className={classnames("pl-1 font-weight-bold shadow-none bg-transparent", {"border-0": !active}, {"todo-border-bottom mb-1": active})}
                        />

                        {
                            active ?
                                <div className="pl-2">
                                    <Button type="submit" className="todo-add-task">Add task</Button>
                                    <Button onClick={cancelHandler} className="todo-cancel ml-2">Cancel</Button>
                                </div>
                                :
                                null
                        }
                    </InputGroup>
                </Form>

            </Col>
        </Row>
    )
}

const mapDispatchToProps = (dispatch: any) => ({
    addTodo: (body: addTodoParams) => dispatch(AddTodo.request(body)),
});

export default connect(null, mapDispatchToProps)(NewTodo);
