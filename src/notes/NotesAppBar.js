import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { startSaveNote, starUpLoading } from '../actions/notes'

export const NotesAppBar = () => {
    const dispatch =  useDispatch()
    const {active} = useSelector(state => state.notesReducer)

    const handleSave = () => {
        // console.log(active);
        dispatch(startSaveNote(active));
    }
    const handlePictureClick = () => {
        document.querySelector('#buttonFile').click();
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if(file){
            dispatch(starUpLoading(file));  
        }
    }

    return (
        <div className="notes__appbar">
            <span>23 de febrero del 20121</span>
            <input name="file" id="buttonFile" type="file" style={{'display':'none'}} onChange={handleFileChange}></input>

            <div>
                <button className="btn" onClick={handlePictureClick}>
                    Picture
                </button>
                <button className="btn" onClick={handleSave}>
                    Save
                </button>
            </div>
        </div>
    )
}
