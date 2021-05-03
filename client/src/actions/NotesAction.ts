import dash_api from "../helpers/dash_api";
import {ReduxAsyncAction} from "../helpers/action_helper";

export const FetchNotes = new ReduxAsyncAction('FETCH_NOTES');
FetchNotes.registerRequest(async () => {
    return dash_api.get(`/note`).then(({ data }) => data);
});
export const FETCH_NOTES = FetchNotes.constants;

interface addNoteParams {
    title: string,
    text: string,
    userId: string
}

export const AddNote = new ReduxAsyncAction('ADD_NOTE');
AddNote.registerRequest(async (info: addNoteParams) => {
    return dash_api.post(`/note`, info ).then(({ data }) => data);
});
export const ADD_NOTE = AddNote.constants;

interface updateNoteParams {
    id: string;
    title: string;
    text: string;
}

export const UpdateNote = new ReduxAsyncAction('UPDATE_NOTE');
UpdateNote.registerRequest(async ({id, title, text}: updateNoteParams) => {
    const body = {id, title, text};
    return dash_api.put(`/note/${id}`, body).then(({ data }) => data);
});
export const UPDATE_NOTE = UpdateNote.constants;


export const DeleteNote = new ReduxAsyncAction('DELETE_NOTE');
DeleteNote.registerRequest(async (noteId: string) => {
    return dash_api.delete(`/note/${noteId}`).then(({data}) => {
        return {id: noteId}
    });
});
export const DELETE_NOTE = DeleteNote.constants;
