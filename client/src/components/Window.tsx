import classnames from 'classnames';
import React, { Dispatch, SetStateAction, useState } from 'react'
// import { Rnd } from "react-rnd";

interface sidebarApps {
    todos: boolean;
    notes: boolean;
    explorer: boolean;
    terminal: boolean;
    tictactoe: boolean;
    calculator: boolean;
    whiteboard: boolean;
}

interface windowProps {
    component: any;
    isOpen: boolean;
    setOpen: Dispatch<SetStateAction<sidebarApps>>;
}

const Window = (props: windowProps) => {

    const [fullScreen, setFullScreen] = useState(true);

    // const [height, setHeight] = useState(window.innerHeight-100);
    // const [width, setWidth] = useState(window.innerWidth-90);
    // const rndRef = React.useRef(null);

    // useEffect(() => {
    //     const handleWindowResize = () => {
    //         setHeight(window.innerHeight);
    //         setWidth(window.innerWidth);
    //     }

    //     window.addEventListener('resize', handleWindowResize)
    // });

    // console.log(height, width);

    // const resizeHandler = (e: any, direction: any, ref: any) => {
    //     setHeight(ref.style.height.slice(0,-2));
    //     setWidth(ref.style.width.slice(0,-2));
    // }

    const getFirstIcon = () => {
        return "ri-checkbox-blank-line"
    }

    const closeWindowHandler = () => {
        return props.setOpen({
            todos: false,
            notes: false,
            explorer: false,
            terminal: false,
            tictactoe: false,
            calculator: false,
            whiteboard: false,
        });
    }

    const windowSizeHandler = () => {
        // setHeight(window.innerHeight);
        // setWidth(window.innerWidth);
        // rndRef?.current?.updateSize({ width: window.innerWidth, height: window.innerHeight });
        setFullScreen(fullScreen);
        return ;
    }

    const _renderTopbar = () => {
        return (
            <div className="drag draggable-topbar unselectable bg-dark-gray">
                <i 
                    className={`${getFirstIcon()} cursor-pointer`}
                    onClick={windowSizeHandler}
                />

                <i
                    className="ri-close-line text-danger mr-3 ml-2 cursor-pointer"
                    onClick={closeWindowHandler}
                />
            </div>
        )
    }

    const _renderContent = () => {
        return (
            <div className="h-100 w-100">
                {_renderTopbar()}

                <props.component />
            </div>
        )
    }

    if(!props.isOpen) {
        return (<></>)
    }

    // return (
    //     <Rnd
    //         default={{
    //             x: 80,
    //             y: 10,
    //             width: width,
    //             height: height,
    //         }}
    //         ref={rndRef}
    //         className="resizable-box"
    //         dragHandleClassName="drag"
    //         onResizeStop={resizeHandler}
    //         disableDragging={true}
    //         resizeGrid={[0,0]}
    //     >
    //         {_renderContent()}
    //     </Rnd>
    // );

    return (
        <div className="h-100 w-100 d-flex align-items-center justify-content-center">

        <div className={classnames({"h-100 w-100": fullScreen}, {"w-75 h-75": !fullScreen})}>
            <div className="d-flex align-items-center justify-content-center h-100 w-100">
                {_renderContent()}
            </div>
        </div>
        </div>
    )

}

export default Window
