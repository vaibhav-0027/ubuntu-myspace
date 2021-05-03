import React from 'react';
import ReactQuill from "react-quill";

const textToolbar = ["bold", "italic", "underline", "strike"]
const listToolbar = [{list: "ordered"}, {list: "bullet"}];
const linkToolbar = ["link"];

const formats = ["font", "header", "bold", "italic", "underline", "strike", "list", "link"];

type quillProps = {
    placeholder?: string;
    className?: string;
    value: string;
    onChange: (newValue: string) => void;
};

const styles = {
    quillStyles: {
        // height: "100%",
        width: "100%",
        // border: "none",
        height: "75%",
    }
};

const QuillEditor = ( { placeholder, className, value, onChange }: quillProps ) => {

    const moduleToolbar = [
        textToolbar,
        listToolbar,
        linkToolbar,
    ];
    
    const modules = {
        toolbar: {
            container: moduleToolbar
        },
    };
    
    return (
        <ReactQuill
            placeholder={placeholder}
            className={className}
            style={styles.quillStyles}
            theme="snow"
            value={value}
            onChange={onChange}
            modules={modules}
            formats={formats}
        />
    )
}

export default QuillEditor
