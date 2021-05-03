import { applyMiddleware, createStore, combineReducers } from "redux";
import ReduxThunk from "redux-thunk";

import TodoReducer from "./TodoReducer";
import NoteReducer from "./NoteReducer";
import FileReducer from "./FileReducer";

export const reducers = {
    todos: TodoReducer,
    notes: NoteReducer,
    files: FileReducer,
};


const app = combineReducers(reducers);

const rootReducer = (state: any, action: any) => {
    return app(state, action);
};

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));
export default store;