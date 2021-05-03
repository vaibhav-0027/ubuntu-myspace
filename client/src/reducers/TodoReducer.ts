import { ADD_TODO, DELETE_TODO, FETCH_TODOS, UPDATE_TODO } from "../actions/TodoAction";
import { reducerWrapper } from "../helpers/action_helper";

export const INIT_STATE: any = {
    loading: false,
    error: null,
    data: []
};

const Handler = (state=INIT_STATE, action: any) => {
    const { data } = action;

    switch (action.type) {
        case FETCH_TODOS.response: 
            return Object.assign({}, state, {loading: false, data: data});
        case ADD_TODO.response:
            const updatedData = [data, ...state.data];
            return Object.assign({}, state, {data: updatedData});
        case UPDATE_TODO.response:
            const updatedTodoData = state.data.map((current: any) => {
                if(current.id === data.id) {
                    return {
                        ...current,
                        text: data.text,
                        status: data.status
                    }
                }
                return current;
            });
            return Object.assign({}, state, {data: updatedTodoData});
        case DELETE_TODO.response:
            const updatedDeleteTodo = state.data.filter((current: any) => {
                if(current.id !== data.id)
                    return current;

                return null;
            })
            return Object.assign({}, state, {data: updatedDeleteTodo});
        default:
            return state; 
    }
}

const TodoReducer = reducerWrapper(INIT_STATE, Handler, {
    request: [
        FETCH_TODOS,
        ADD_TODO,
        UPDATE_TODO,
        DELETE_TODO
    ],
    error: [
        FETCH_TODOS,
        ADD_TODO,
        UPDATE_TODO,
        DELETE_TODO
    ]
});

export default TodoReducer;