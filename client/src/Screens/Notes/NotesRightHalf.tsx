import React from 'react'
import {connect} from 'react-redux';
import { Button, Input } from 'reactstrap';
import { AddNote, DeleteNote, UpdateNote } from '../../actions/NotesAction';
import QuillEditor from '../../components/QuillEditor';
import { getUserAccessId } from '../../helpers/authentication';
import { toast } from 'react-toastify';

interface Note {
    id: string;
    title: string;
    text: string;
}

interface CreateNoteParams {
    userId: string;
    text: string;
    title: string;
}

interface notesRightProps {
    activeNote: Note;
    activeText: string;
    activeTitle: string;
    setActiveText: (body: string) => void;
    setActiveTitle: (body: string) => void;
    setActiveNote: (body: Note) => void;
    updateNote: (body: Note) => void;
    createNote: (body: CreateNoteParams) => void;
    deleteNote: (id: string) => void;
}

const NotesRightHalf = (props: notesRightProps) => {

    const {activeTitle, activeText, activeNote, setActiveNote, setActiveText, setActiveTitle} = props;

    const saveNoteHandler = () => {

        if(activeTitle === "") {
            toast.warning("Title cannot be empty!");
            return ;
        }

        const body = {
            title: activeTitle,
            text: activeText,
            userId: getUserAccessId(),
        }

        if(activeNote.id === "") {
            toast.success(<span><strong>{activeTitle}</strong> created successfully!</span>)
            return props.createNote(body);
        }

        const newBody = {
            title: activeTitle,
            text: activeText,
            id: activeNote.id,
        }

        return props.updateNote(newBody);
    }

    const deleteNoteHandler = () => {
        if(activeNote.id === "")
            return ;
        
        props.deleteNote(activeNote.id);
        toast.error(<span><strong>{activeTitle}</strong> deleted successfully!</span>);
        return setActiveNote({
                    title: "",
                    text: "",
                    id: "",
                });
    }

    return (
        <div className="note-container d-flex flex-column">
            <div className="d-flex flex-row align-items-center w-100 justify-content-between">
                <Input 
                    value={activeTitle}
                    onChange={e => setActiveTitle(e.target.value)}
                    placeholder="Enter note title"
                    className="w-50 bg-transparent font-weight-bold todo-border-bottom"
                />

                <div className="d-flex flex-row align-items-center">
                    <Button onClick={saveNoteHandler} type="submit" className="todo-add-task d-flex align-items-center">
                        <i className="mr-1 ri-save-line" />
                        Save Changes
                    </Button>    

                    <i 
                        className="text-danger ri-delete-bin-line ml-2 cursor-pointer" 
                        onClick={deleteNoteHandler}    
                    />
                </div>      
            </div>

            <QuillEditor 
                placeholder="Note content goes here..."
                value={activeText}
                onChange={setActiveText}
                className="notes-quill mt-2"
            />
            
        </div>
    )
}

const mapDispatchToProps = (dispatch: any) => ({
    updateNote: (body: Note) => dispatch(UpdateNote.request(body)),
    createNote: (body: CreateNoteParams) => dispatch(AddNote.request(body)),
    deleteNote: (id: string) => dispatch(DeleteNote.request(id)),
});

export default connect(null, mapDispatchToProps)(NotesRightHalf)
