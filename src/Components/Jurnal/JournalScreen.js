import React from 'react'
import { useSelector } from 'react-redux'
import { NoteScreen } from '../../notes/NoteScreen'
import { NothingSelector } from './NothingSelector'
import { Sidebar } from './Sidebar'

export const JournalScreen = () => {

    const state = useSelector(state => state.notesReducer);
    return (
        <div className="journal_main-content animate__animated animate__fadeIn animate_faster">
            <Sidebar />
            <main>
                {
                    (state.active == null)
                    ? <NothingSelector/>
                    : <NoteScreen/>                 
                 }
            </main>
        </div>
    )
}
