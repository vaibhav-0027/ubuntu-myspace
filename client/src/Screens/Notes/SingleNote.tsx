import React from 'react'

interface Note {
    id: string;
    title: string;
    text: string;
}

interface SingleNoteProps {
    info: Note;
    setActiveNote: (body: Note) => void;
}

const SingleNote = (props: SingleNoteProps) => {
    
    const { info, setActiveNote } = props;

    const clickHandler = () => {
        setActiveNote(info);
    }
    
    return (
        <div onClick={clickHandler} className="single-note border-bottom pb-1">
            <span className="font-weight-bold d-flex flex-row align-items-center">
                <i className="mr-3 ri-edit-circle-line text-orange" />
                {info.title}
            </span>

            <i className="ri-arrow-right-s-line fa-lg text-orange" />
        </div>
    )
}

export default SingleNote
