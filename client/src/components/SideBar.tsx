import React, { Dispatch, SetStateAction } from 'react'
import SidebarIcon from './SidebarIcon';

import chromeIcon from "../assets/images/chrome-icon.png";
import todoIcon from "../assets/images/todo-icon.png";
import notesIcon from "../assets/images/notes-icon.png";
import explorerIcon from "../assets/images/explorer-icon.png";
import terminalIcon from "../assets/images/terminal-icon.png";

interface sidebarIcon {
    name: string;
    icon: string;
    description: string;
}

interface sidebarApps {
    todos: boolean; 
    notes: boolean; 
    explorer: boolean; 
    terminal: boolean;
}

interface sidebarProps {
    setOpen: Dispatch<SetStateAction<sidebarApps>>;
}

const SideBar = ({setOpen}: sidebarProps) => {

    const icons: Array<sidebarIcon> = [
        { name: "Chrome", icon: chromeIcon, description: "Search something interesting" },
        { name: "todos", icon: todoIcon, description: "Keep your tasks organized" },
        { name: "notes", icon: notesIcon, description: "Jot down your amazing thoughts" },
        { name: "explorer", icon: explorerIcon, description: "Explore your files" },
        { name: "terminal", icon: terminalIcon, description: "Terminal" },
    ];

    return (
        <div className="sidebar-container">
            {
                icons.map((_current: sidebarIcon) => {

                    const clickHandler = () => {
                        setOpen((prev: any) => {
                            let res = {
                                todos: false,
                                notes: false,
                                explorer: false,
                                terminal: false,
                            };
                            let name: string = _current.name
                            if(name === "todos") res['todos'] = true;
                            if(name === "notes") res['notes'] = true;
                            if(name === "explorer") res['explorer'] = true;
                            if(name === "terminal") res['terminal'] = true;
                            return res;
                        })
                    }

                    return (
                        <div 
                            key={_current.name} 
                            onClick={clickHandler}
                        >
                            <SidebarIcon 
                                name={_current.name}
                                icon={_current.icon}
                                description={_current.description}
                            />
                        </div>
                    )
                })
            }
        </div>
    )
}

export default SideBar
