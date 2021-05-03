import React, { useState } from 'react';
import { Tooltip } from 'reactstrap';

interface sidbarIconProps {
    name: string;
    icon: string;
    description: string;
}

const SidebarIcon = (props: sidbarIconProps) => {

    const [tooltipOpen, setTooltipOpen] = useState(false);
    const toggle = () => setTooltipOpen(!tooltipOpen);

    return (
        <div className="sidebar-icon cursor-pointer unselectable" >
            <div className="sidebar-icon-inside mt-3">
                <img 
                    src={props.icon}
                    alt={props.name}
                    className="sidebar-icon-image py-1"
                    id={props.name}
                />
            </div>

            <Tooltip 
                placement="right"
                isOpen={tooltipOpen}
                toggle={toggle}
                target={props.name}
                hideArrow
                delay={ {show: 500, hide: 200} }
            >
                {props.description}
            </Tooltip>
        </div>
    )
}

export default SidebarIcon
