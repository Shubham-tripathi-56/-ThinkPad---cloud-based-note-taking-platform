import NoteContext from './noteContxt';
import { useState } from 'react'

const NoteState = (props) => {

  //********************* */
  const host = "http://localhost:5000"
  //********************* */
  const notesInitial = []


  const [notes, setNotes] = useState(notesInitial)


  //===================={  Get all Note   }==================================>
  const getNotes = async () => {
    //----> fetch all NOTE API CALL IN THUNDER CLIENT
    //---------> API Call                ------------{USING GOOGLE "SERCH"-- fetch with hedders }
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
    });



    /*************************** */
    const json = await response.json()
    // console.log(json);

    //------------->   to get all notes in Databaes and add notes in notesInitial
    setNotes(json)
  }

  //===================={  Add a Note   }==================================>
  const addNote = async (title, description, tag) => {
    //----> ADD NOTE API CALL IN THUNDER CLIENT
    //---------> API Call                ------------{USING GOOGLE "SERCH"-- fetch with hedders }
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify({title, description, tag})           // body data type must match "Content-Type" header
      
    });
    const note = await response.json();              // parses JSON response into native JavaScript objects
    setNotes(notes.concat(note))   //  concat returns an array where push update a array
  }
    // console.log(json);

    /*************************** */
    // console.log("Adding a new note")
    // const note = json ;
    // {
    //   "_id": "66d60d90d4fa0890f52d200ba",
    //   "user": "66d0b338c7e13874cbd8978f",
    //   "title": title,
    //   "description": description,
    //   "tag": tag,
    //   "date": "2024-09-02T19:07:57.390Z",
    //   "__v": 0
    // };

    // setNotes(notes.concat(note))   //  concat returns an array where push update a array
  // }

    //===================={  Delete a Note   }==================================>
  const deleteNote = async (id) => {
    
    //----> deletenote API CALL IN THUNDER CLIENT
    //---------> API Call                ------------{USING GOOGLE "SERCH"-- fetch with hedders }
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
    });
    const json = response.json();              // parses JSON response into native JavaScript objects
    console.log(json);

    /******************** */

    // console.log("Deleting the note with id" + id);
    const newNotes = notes.filter((note) => { return note._id !== id })
    setNotes(newNotes)
  }

  //===================={  Edit a Note   }==================================>
  const editNote = async (id, title, description, tag) => {
    //----> update NOTE API CALL IN THUNDER CLIENT
    //---------> API Call                ------------{USING GOOGLE "SERCH"-- fetch with hedders }
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify({title, description, tag})           // body data type must match "Content-Type" header
     
    });
    const json = await response.json();              // parses JSON response into native JavaScript objects
    console.log(json);
    //---------------- REACT ME DIRECT STATE CHANGE NAHI KAR SAKTE ISLIYE ------>

    let newNotes = JSON.parse(JSON.stringify(notes))    //   parse se iski  deep  copy ban jayegi
    
    //-----------> Logic to edit in client 

    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];

      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
  setNotes(newNotes );
  }

  //**************** */

  return (

    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }} >

      {props.children}

    </NoteContext.Provider>

  )

}

export default NoteState;