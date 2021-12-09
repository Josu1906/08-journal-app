import { db } from "../firebase/config";
import { loadNotes } from "../helpers/loadNotes";
import { types } from "../types/types";
import Swal from 'sweetalert2';
import { fileUpload } from "../helpers/fileUpload";

export const startNewNote = () => {
    return async (dispatch, getState) => {
        const state = getState().auth.uid;
        const newNote = {
            tittle: '',
            body: '',
            date: new Date().getTime()
        }
        const doc = await db.collection(`${state}/journal/notes`).add(newNote);
        
        dispatch(activeNote(doc.id, newNote));
        dispatch(addNewNote(doc.id, newNote));
    }
}

//journal
export const activeNote = (id, note) => ({
    type: types.notesActive,
    payload: {
        id,
        ...note
    }
})

export const starLoadingNotes = (uid) => {
    return async (dispatch) => {
        const notes = await loadNotes(uid);    
        dispatch( setNotes(notes) );
    }
}


export const setNotes = (notes) => ({
    type: types.notesLoad, 
    payload: notes
});


export const startSaveNote = (note) => {
    return async (dispatch, getState) => {
        const {uid} = getState().auth;

        if(!note.url){
            delete note.url;
        }

        const noteToFireStore = {...note};
        delete noteToFireStore.id;

        await db.doc(`/${uid}/journal/notes/${note.id}`).update(noteToFireStore);
        console.log(note.id);
        dispatch(refreshNote(note.id, noteToFireStore));
        Swal.fire('Saved', note.tittle, 'success')
    }
}

export const refreshNote = (id, note) => ({
    type: types.notesUpdate,
    payload: {
        id, 
        note:{
            id,
            ...note
        }
    }
})

export const starUpLoading = (file) => {
    return async (dispatch, getState) => {
        const active = getState().notesReducer.active;
        Swal.fire({
            tittle: 'Uploading...',
            text: 'Please Wait...',
            allowOutsideClick: false,
            onBeforeOpen: () => {
                Swal.showLoading()
            }
        })
        const fileUrl = await fileUpload(file);

        active.url = fileUrl;
        dispatch(startSaveNote(active))
        console.log(fileUrl)
        Swal.close();
    }
}

export const startDeleting = (id) => {
    return async (dispatch, getState) => {
        const uid = getState().auth.uid;
        await db.doc(`${uid}/journal/notes/${id}`).delete();

        dispatch(deleteNote(id));
    }
}

export const deleteNote = (id) => ({
    type: types.notesDelete,
    payload: id
})

export const notesLogOut = () => ({
    type: types.notesLoggoutCleaning
})


export const addNewNote = (id, note) => ({
    type: types.notesAddNew,
    payload: {
        id, ...note
    }})
