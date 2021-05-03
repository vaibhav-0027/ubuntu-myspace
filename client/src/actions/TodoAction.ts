import dash_api from "../helpers/dash_api";
import { ReduxAsyncAction } from "../helpers/action_helper";

export const FetchTodos = new ReduxAsyncAction('FETCH_TODOS');
FetchTodos.registerRequest(function() {
    return dash_api.get(`/todo/`).then(({ data }) => {
        return data
    });
});
export const FETCH_TODOS = FetchTodos.constants;

interface addTodoParams {
    text: string,
    userId: string,
}

export const AddTodo = new ReduxAsyncAction('ADD_TODO');
AddTodo.registerRequest(function(body: addTodoParams) {
    return dash_api.post(`/todo/`, body).then(({ data }) => {
        return data
    });
  });
export const ADD_TODO = AddTodo.constants;

interface updateTodoParams {
    id: string;
    status?: boolean;
    updatedText?: string;
}

export const UpdateTodo = new ReduxAsyncAction('UPDATE_TODO');
UpdateTodo.registerRequest(async ({updatedText, id, status}: updateTodoParams) => {
    const body = {text: updatedText, status};
    return dash_api.put(`/todo/${id}`, body).then(({ data }) => data);
});
export const UPDATE_TODO = UpdateTodo.constants;


export const DeleteTodo = new ReduxAsyncAction('DELETE_TODO');
DeleteTodo.registerRequest(async (id: string) => {
    return dash_api.delete(`/todo/${id}`).then(({data}) => {
        return {id}
    });
});
export const DELETE_TODO = DeleteTodo.constants;