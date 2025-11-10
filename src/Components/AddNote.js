import React, { useContext ,useState} from 'react'
import noteContext from '../context/notes/noteContxt'



const AddNote = (props) => {
          /*********** */
  const context = useContext(noteContext)
  const { addNote } = context;

  /*********** */

  const [note, setNote] = useState({"title":"" , "description":"" , "tag": ""})
  /*********** */

 const handleClick = (e) => {
         e.preventDefault();                //  page not reload
         
         //give tilte, desc and tag to noteState addnote api function
     addNote(note.title , note.description , note.tag);
     
     setNote({"title":"" , "description":"" , "tag": ""})
     
    //  -----> for alert
    props.showAlert("Added successfully" , "success")

  }
  /*********** */
  
 const onChange = (e) => {
setNote({...note , [e.target.name]: e.target.value})
 }
 /*********** */
    return (
        <div className="container my-5">
            <h1>  Add a Note </h1>
            {/**********/}
            <form className='my-3'>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name="title"  aria-describedby="emailHelp" onChange = {onChange}  minLength={3} required value={note.title} />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="description" name ="description"   onChange = {onChange}  minLength={5} required value={note.description}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="tag" name ="tag"   onChange = {onChange} />
                </div>
              
                <button disabled = {note.title.length<3 || note.description.length<5 } type="submit" className="btn btn-primary" onClick={handleClick} value={note.tag} >Add Note</button>
            </form>
            {/*********/}
        </div>
    )
}

export default AddNote















//========================================================
  //  chat gpt //

  // import React, { useContext, useState } from 'react';
  // import noteContext from '../context/notes/noteContxt' ;
  
  // const AddNote = () => {
  //   const context = useContext(noteContext);
  //   const { addNote } = context;
  
  //   const [note, setNote] = useState({ title: "", description: "", tag: "default" });
  
  //   const handleClick = (e) => {
  //     e.preventDefault(); // Prevent page reload
  //     // Call addNote with string values from state
  //     addNote(note.title, note.description, note.tag);
  //     // Optionally clear the form
  //     setNote({ title: "", description: "", tag: "default" });
  //   };
  
  //   const onChange = (e) => {
  //     setNote({
  //       ...note,
  //       [e.target.name]: e.target.value // Directly assign the value, not an array
  //     });
  //   };
  
  //   return (
  //     <div className="container my-5">
  //       <h1>Add a Note</h1>
  //       <form className='my-3'>
  //         <div className="mb-3">
  //           <label htmlFor="title" className="form-label">Title</label>
  //           <input
  //             type="text"
  //             className="form-control"
  //             id="title"
  //             name="title"
  //             aria-describedby="emailHelp"
  //             value={note.title} // Bind value to state
  //             onChange={onChange}
  //           />
  //         </div>
  //         <div className="mb-3">
  //           <label htmlFor="description" className="form-label">Description</label>
  //           <input
  //             type="text"
  //             className="form-control"
  //             id="description"
  //             name="description"
  //             value={note.description} // Bind value to state
  //             onChange={onChange}
  //           />
  //         </div>
  //         <div className="mb-3">
  //           <label htmlFor="tag" className="form-label">Tag</label>
  //           <input
  //             type="text"
  //             className="form-control"
  //             id="tag"
  //             name="tag"
  //             value={note.tag} // Bind value to state
  //             onChange={onChange}
  //           />
  //         </div>
  //         <button type="submit" className="btn btn-primary" onClick={handleClick}>Submit</button>
  //       </form>
  //     </div>
  //   );
  // };
  
  // export default AddNote;
  
