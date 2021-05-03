import {reducerWrapper} from "../helpers/action_helper";
import {FETCH_NOTES, ADD_NOTE, UPDATE_NOTE, DELETE_NOTE} from "../actions/NotesAction";

export const INIT_STATE = {
    loading: false,
    error: null,
    data: []
};

const Handler = (state=INIT_STATE, action: any) => {
    const {data} = action;

    switch(action.type) {
        case FETCH_NOTES.response:
            return Object.assign({}, state, {loading: false, data: data});

        case ADD_NOTE.response:
            const updatedData = state.data.concat(data);
            return Object.assign({}, state, {data: updatedData});

        case UPDATE_NOTE.response: 
            const updatedNoteData = state.data.map((current: any) => {
                if(current.id === data.id) {
                    return {
                        ...current,
                        text: data.text,
                        title: data.title,
                    }
                }

                return current;
            });

            return Object.assign({}, state, {data: updatedNoteData});

        case DELETE_NOTE.response:
            const updatedDeleteNote = state.data.filter((current: any) => {
                if(current.id !== data.id)
                    return current;
                return null;
            })
            return Object.assign({}, state, {data: updatedDeleteNote});

        default: 
            return state;
    }
}

const NotesReducer = reducerWrapper(INIT_STATE, Handler, {
    request: [
        FETCH_NOTES,
        ADD_NOTE,
        UPDATE_NOTE,
        DELETE_NOTE
    ],
    error: [
        FETCH_NOTES,
        ADD_NOTE,
        UPDATE_NOTE,
        DELETE_NOTE
    ]
});

export default NotesReducer;