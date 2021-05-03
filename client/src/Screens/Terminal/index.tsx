import React from 'react';
import Terminal from 'terminal-in-react';
import { getUserAccessName } from '../../helpers/authentication';

const TerminalApp = () => {

    const aboutDeveloper = () =>  {
        return `
        𝓒𝓻𝓮𝓪𝓽𝓮𝓭 𝓑𝔂 :-

        ██╗░░░██╗░█████╗░██╗██████╗░██╗░░██╗░█████╗░██╗░░░██╗
        ██║░░░██║██╔══██╗██║██╔══██╗██║░░██║██╔══██╗██║░░░██║
        ╚██╗░██╔╝███████║██║██████╦╝███████║███████║╚██╗░██╔╝
        ░╚████╔╝░██╔══██║██║██╔══██╗██╔══██║██╔══██║░╚████╔╝░
        ░░╚██╔╝░░██║░░██║██║██████╦╝██║░░██║██║░░██║░░╚██╔╝░░
        ░░░╚═╝░░░╚═╝░░╚═╝╚═╝╚═════╝░╚═╝░░╚═╝╚═╝░░╚═╝░░░╚═╝░░░

        𝗚𝗜𝗧𝗛𝗨𝗕 -> https://github.com/vaibhav-0027

        𝗟𝗜𝗡𝗞𝗘𝗗𝗜𝗡 -> https://www.linkedin.com/in/vaibhav-0027/

        𝗘𝗠𝗔𝗜𝗟 -> vaibhavdhingra10@gmail.com
        `
    }

    const descriptions = {
        about: 'About the developer'
    }

    return (
        <div className="terminal-window">
            <Terminal 
                color="green"
                backgroundColor="black"
                hideTopBar={true}
                style={{maxWidth: "100%", lineHeight: "0.7em", fontSize: "1em"}}
                msg={`Welcome ${getUserAccessName()}, you can use some commands here!`}
                
                description={descriptions}

                commands={{
                    // 'open-new-tab': () => window.open('https://www.google.com/', '_blank'),
                    'about': aboutDeveloper
                }}
            />
        </div>
    );
}

export default TerminalApp
