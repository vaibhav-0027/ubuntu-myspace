import { createSelector } from "reselect";
import { INIT_STATE } from "../reducers/NoteReducer";

export function getState(state: any) {
    return state || INIT_STATE;
}

export const selectNotes = createSelector(
    getState,
    noteReducer => {
        return noteReducer.notes.data || []
    }
);
