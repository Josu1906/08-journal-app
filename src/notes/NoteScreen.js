import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NotesAppBar } from './NotesAppBar'
import {useForm} from '../hooks/useForm'
import { activeNote, startDeleting } from '../actions/notes'

export const NoteScreen = () => {
    const dispatch = useDispatch()
    const {active: note} = useSelector(state => state.notesReducer)
    
    const [formV, handleInputChange, reset] = useForm(note);
    console.log(formV)

    const activeId = useRef(note.id);
    
    useEffect(() => {
        if(note.id !== activeId.current){
            reset(note);
            activeId.current = note.id
        }
        
    }, [note, reset])

    useEffect(() => {
        dispatch(activeNote(formV.id, {
            ...formV
        }))
    
    }, [formV, dispatch])


    const {body, tittle, id} = formV;

    const handleDelete = () => {
        // console.log(id);
        dispatch(startDeleting(id))
    }

    return (
        <div className="notes__main-content">
             <NotesAppBar/>
             <div className="notes__content">
                        <input 
                        type="text"
                        placeholder="Some awesome tittle"
                        className="notes_tittle-input"
                        autoComplete="off"
                        onChange={handleInputChange}
                        value={tittle}
                        name="tittle"
                        ></input>
                        <textarea
                        placeholder="What happend today"
                        className="notes__textarea"
                        onChange={handleInputChange}
                        value={body}
                        name="body"
                        ></textarea>
                        {
                            (note.url) 
                            &&
                            (                        
                            <div className="notes__images">
                                <img src={note.url} alt="xd"></img>
                            </div>)
                        }
                    </div>
                    <button className="btn btn-danger" onClick={handleDelete}>
                        Delete
                    </button>
        </div>
    )
}
