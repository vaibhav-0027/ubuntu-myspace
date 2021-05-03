import React from 'react'
import NewTodo from './NewTodo'
import TodoBody from './TodoBody'

const Todo = () => {

    const _renderHeader = () => {
        return (
            <div className="fa-2x font-weight-bolder ml-3 text-orange">
                Todo
            </div>
        )
    }

    return (
        <div className="h-94 w-100 bg-off-white">
            {_renderHeader()}

            <div className="mx-3 h-100">
                <NewTodo />
                <TodoBody />
            </div>
        </div>
    )
}

export default Todo
