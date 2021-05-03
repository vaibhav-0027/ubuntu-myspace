import React from 'react'
import { selectCompleteTodos, selectIncompleteTodos, selectTodos } from '../../selectors/TodoSelector'
import { connect } from "react-redux";
import { DeleteTodo, UpdateTodo } from '../../actions/TodoAction';
import IncompleteTodo from './IncompleteTodo';
import CompleteTodo from './CompleteTodo';

interface Todo {
    id: string;
    status: number;
    text: string;
}

interface updateTodoParams {
    id: string;
    complete?: boolean;
    updatedText?: string;
}

interface TodoBodyProps {
    todos: Array<Todo>;
    completeTodos: Array<Todo>;
    incompleteTodos: Array<Todo>;
    updateTodo: (body: updateTodoParams) => void;
    deleteTodo: (id: string) => void;
}

const TodoBody = (props: TodoBodyProps) => {

    const { incompleteTodos, completeTodos, updateTodo, deleteTodo } = props;

    return (
        <div className="todo-container-div">
            
            <div className="d-flex flex-column mr-4 todo-container">
                {
                    incompleteTodos.map((_current: Todo) => {
                        return <IncompleteTodo
                                    key={_current.id}
                                    info={_current}
                                    updateTodo={updateTodo}
                                    deleteTodo={deleteTodo}
                                />
                    })
                }
            </div>

            <div className="d-flex flex-column todo-container">
                {
                    completeTodos.map((_current: Todo) => {
                        return <CompleteTodo 
                                    key={_current.id}
                                    info={_current}
                                    deleteTodo={deleteTodo}
                                />
                    })
                }
            </div>
        </div>
    )
}

const mapStateToProps = (state: any) => ({
    todos: selectTodos(state),
    completeTodos: selectCompleteTodos(state),
    incompleteTodos: selectIncompleteTodos(state),
});

const mapDispatchToProps = (dispatch: any) => ({
    updateTodo: (body: updateTodoParams) => dispatch(UpdateTodo.request(body)),
    deleteTodo: (id: string) => dispatch(DeleteTodo.request(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoBody)
