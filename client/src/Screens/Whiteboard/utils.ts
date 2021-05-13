import {Tools} from "react-sketch";

interface SelectedTool {
    value: Tools.Select | Tools.Pencil | Tools.Line | Tools.Rectangle | Tools.Circle;
}

interface ToolProp {
    name: string;
    src: string;
    tool: SelectedTool;
}

export const tools: ToolProp[] = [
    {
        name: "Select",
        src: "ri-drag-move-2-line",
        tool: {value: Tools.Select},
    },
    {
        name: "Pencil",
        src: "ri-pencil-line",
        tool: {value: Tools.Pencil},
    },
    {
        name: "Straight Line",
        src: "ri-ruler-line",
        tool: {value: Tools.Line},
    },
    {
        name: "Rectangle",
        src: "ri-checkbox-blank-line",
        tool: {value: Tools.Rectangle},
    },
    {
        name: "Circle",
        src: "ri-checkbox-blank-circle-line",
        tool: {value: Tools.Circle},
    },
]