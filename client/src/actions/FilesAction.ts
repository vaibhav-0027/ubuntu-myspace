import dash_api from "../helpers/dash_api";
import {ReduxAsyncAction} from "../helpers/action_helper";

export const FetchFiles = new ReduxAsyncAction('FETCH_FILES');
FetchFiles.registerRequest(async (id: string) => {
    return dash_api.get(`/file/${id}`).then(({data}) => data);
});
export const FETCH_FILES = FetchFiles.constants;

interface AddFileParams {
    name: string;
    size?: number;
    url: string;
    type: number;
    parentId: string;
}

export const AddFile = new ReduxAsyncAction('ADD_FILE');
AddFile.registerRequest(async (info: AddFileParams) => {
    return dash_api.post(`/file`, info).then(({data}) => data);
});
export const ADD_FILE = AddFile.constants;


interface UpdateFileParams {
    id: string; //file id
    parentId?: string;
    name?: string;
}

export const UpdateFile = new ReduxAsyncAction('UPDATE_FILE');
UpdateFile.registerRequest(async (info: UpdateFileParams) => {
    const { id } = info;
    return dash_api.put(`/file/${id}`, info).then(({data}) => data);
});
export const UPDATE_FILE = UpdateFile.constants;


export const DeleteFile = new ReduxAsyncAction('DELETE_FILE');
DeleteFile.registerRequest(async (id: string) => {
    return dash_api.delete(`/file/${id}`).then(({data}) => {
        return data
    });
});
export const DELETE_FILE = DeleteFile.constants;
