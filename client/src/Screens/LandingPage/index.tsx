import React, { useEffect, useState } from 'react'
import NavBar from '../../components/NavBar'
import SideBar from '../../components/SideBar'
import Window from '../../components/Window'
import Todo from "../Todo";
import Notes from "../Notes";
import { FetchTodos } from '../../actions/TodoAction';
import { FetchNotes } from '../../actions/NotesAction';
import { connect } from 'react-redux';
import Explorer from '../Explorer';
import Terminal from '../Terminal';
import TicTacToe from '../TicTacToe';

interface landingPageProps {
    fetchTodos: () => void;
    fetchNotes: () => void;
}

const LandingPage = (props: landingPageProps) => {

    const [open, setOpen] = useState({
        todos: false,
        notes: false,
        explorer: false,
        terminal: false,
        tictactoe: false,
    });

    useEffect(() => {
        props.fetchNotes();
        props.fetchTodos();
        // eslint-disable-next-line
    }, []);

    return (
        <div className="loading-page-container">

            <NavBar />

            <div className="d-flex flex-row h-100" style={{overflow: "hidden"}}>
                <SideBar setOpen={setOpen} />
                <Window component={Todo} isOpen={open.todos} setOpen={setOpen} />
                <Window component={Notes} isOpen={open.notes} setOpen={setOpen} />
                <Window component={Explorer} isOpen={open.explorer} setOpen={setOpen} />
                <Window component={Terminal} isOpen={open.terminal} setOpen={setOpen} />
                <Window component={TicTacToe} isOpen={open.tictactoe} setOpen={setOpen} />
            </div>


        </div>
    )
}

const mapDispatchToProps = (dispath: any) => ({
    fetchTodos: () => dispath(FetchTodos.request()),
    fetchNotes: () => dispath(FetchNotes.request()),
});

export default connect(null, mapDispatchToProps)(LandingPage);
