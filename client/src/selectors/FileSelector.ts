import { createSelector } from "reselect";
import { INIT_STATE } from "../reducers/FileReducer";

export const getState = (state: any) => {
    return state || INIT_STATE;
}

export const selectFiles = createSelector(
    getState,
    fileReducer => {
        return fileReducer.files.data || []
    }
)

export const selectSpaceUsed = createSelector(
    getState,
    spaceReducer => spaceReducer.files.space || 0
)