import React, { useEffect, useState } from 'react';
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Navbar } from 'reactstrap';
import { DateTime } from 'luxon';
import { getUserAccessName, setUserAccessToken } from '../helpers/authentication';

const NavBar = () => {

    const [currentTime, setCurrentTime] = useState(DateTime.now().toLocaleString(DateTime.DATETIME_MED_WITH_WEEKDAY));
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    useEffect(() => {
        setInterval(() => {
            const currentDate = DateTime.now().toLocaleString(DateTime.DATETIME_MED_WITH_WEEKDAY);
            setCurrentTime(currentDate);
        }, 5000);
    }, []);

    const logoutHandler = () => {
        setUserAccessToken('');
        return window.location.href = '/login';
    }

    const _renderDropdown = () => {
        return (
            <Dropdown isOpen={isOpen} toggle={toggle} className="navbar-dropdown">
                
                <DropdownToggle>                
                    <i 
                        className="mr-3 ml-2 ri-loader-2-fill text-white cursor-pointer" 
                    />
                </DropdownToggle>

                <DropdownMenu>
                    <DropdownItem header>
                        <span>Hi, <strong>{getUserAccessName()}</strong></span>
                    </DropdownItem>

                    <DropdownItem onClick={logoutHandler}>
                        Logout
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>
        )
    }

    return (
        <Navbar className="navbar-container d-flex align-items-center p-0 unselectable">

            <span className="font-weight-bolder text-white ml-3 fa-sm">
                Ubuntu My-Space
            </span>

            <div className="d-flex align-items-center">
                <span className="mr-3 text-white fa-sm full-date-navbar">
                    {currentTime}
                </span>

                <span className="mr-3 text-white fa-sm only-time-navbar">
                    {currentTime.substr(currentTime.lastIndexOf(',')+1)}
                </span>

                {_renderDropdown()}
            </div>

        </Navbar>
    )
}

export default NavBar
