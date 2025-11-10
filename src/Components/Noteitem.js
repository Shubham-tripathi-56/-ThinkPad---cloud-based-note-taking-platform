import React , { useContext }  from 'react'
import noteContext from '../context/notes/noteContxt'



const Noteitem = (props) => {

  const { note , updateNote} = props;
/***************** */
  const context = useContext(noteContext)
  const { deleteNote } = context;
/*************** */




  return (
    
    <div className='col-md-3'/* style={{backgroundColor: 'green' , borderRadius:"55px"}}**/>
      <div className="card my-3">
        <div className="card-body">

          <div className="d-flex align-items-center">
            <h5 className="card-title" style={{color:"orangered"}}> {note.title}</h5>
            <i className="fa-solid fa-trash mx-2" onClick={() => {deleteNote(note._id);   props.showAlert("Deleted successfully" , "success")
} }></i>                { /*font awosem */}
            <i className="fa-solid fa-pen-to-square mx-2" onClick={() => {updateNote(note)}}></i>         { /*font awosem */}
          </div>

          <p className="card-text">{note.description}</p>

        </div>
      </div>

    </div>
  )
}

export default Noteitem