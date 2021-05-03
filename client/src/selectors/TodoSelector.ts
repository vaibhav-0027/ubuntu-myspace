import { createSelector } from "reselect";
import { INIT_STATE } from "../reducers/TodoReducer";

export function getState(state: any) {
    return state || INIT_STATE;
}

export const selectTodos = createSelector(
    getState,
    todoReducer => {
        return todoReducer.todos.data || []
    }
);

export const selectIncompleteTodos = createSelector(
    selectTodos,
    todos => {
        return todos.filter((todo: any) => {
            return todo.status === 0
        })
    }
);

export const selectCompleteTodos = createSelector(
    selectTodos,
    todos => todos.filter((todo: any) => {
        return todo.status === 1
    })
)
