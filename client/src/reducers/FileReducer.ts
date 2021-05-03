import { ADD_FILE, DELETE_FILE, FETCH_FILES, UPDATE_FILE } from '../actions/FilesAction';
import { reducerWrapper } from '../helpers/action_helper';

export const INIT_STATE = {
    loading: false,
    error: null,
    data: [],
    space: 0,
};

const Handler = (state=INIT_STATE, action: any) => {
    const { data } = action;

    switch(action.type) {
        case FETCH_FILES.response:
            return Object.assign({}, state, { loading: false, data: data.files, space: data.spaceUsed });

        case ADD_FILE.response:
            const updatedData = state.data.concat(data);
            const updatedSpace = state.space + data.size;
            return Object.assign({}, state, {data: updatedData, space: updatedSpace});

        case UPDATE_FILE.response:
            const updatedFileData = state.data.map((current: any) => {
                if(current.id === data.id) {
                    return {
                        ...current,
                        parentId: data.parentId,
                        name: data.name,
                    }
                }

                return current;
            });

            return Object.assign({}, state, {data: updatedFileData});

        case DELETE_FILE.response:
            const updatedDeleteFile = state.data.filter((current: any) => {
                if(current.id !== data.id)
                    return current;
                return null;
            });
            const updatedSpaceAfterDelete = state.space - data.size;
            return Object.assign({}, state, {data: updatedDeleteFile, space: updatedSpaceAfterDelete});

        default: 
            return state;
    }
}

const FileReducer = reducerWrapper(INIT_STATE, Handler, {
    request: [
        FETCH_FILES,
        ADD_FILE,
        UPDATE_FILE,
        DELETE_FILE,
    ],
    error: [
        FETCH_FILES,
        ADD_FILE,
        UPDATE_FILE,
        DELETE_FILE,
    ]
});

export default FileReducer;