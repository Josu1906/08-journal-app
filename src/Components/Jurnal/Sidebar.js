import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startLogOut } from '../../actions/auth';
import { JournalEntries } from './JournalEntries';
import {startNewNote} from '../../actions/notes'

export const Sidebar = () => {
    const dispatch = useDispatch();
    const state = useSelector(state => state);
    console.log(state);
    const handleLogOut = () => {
        dispatch(startLogOut());
    }

    const handleAddNew = () => {
        dispatch(startNewNote());
    }

    return (
        <aside className="journal__sidebar">
            <div className="journal__sidebar-navbard">
                <h3 className="mt-5">
                    <i className="far fa-moon"></i>
                    <span className="ml-1">{state.auth.name}</span>
                </h3>
                <button className="btn" onClick={handleLogOut}>
                    Logout
                </button>
            </div>
            <div className="journal__new-entry" onClick={handleAddNew}>
                <i className="far fa-calendar-plus fa-5x"></i>
                <p className="mt-5"> 
                    New Entry
                </p>
            </div>
            <JournalEntries />
        </aside>
    )
}
