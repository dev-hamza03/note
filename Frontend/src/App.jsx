import { useEffect, useState } from 'react'
import axios from "axios"

function App() {

  const [ notes, setNotes ] = useState([])

  function fetchNotes() {
    axios.get('http://localhost:3000/api/notes')
  .then((res)=>{
    setNotes(res.data.note)
  })
  }
 
  useEffect(() => {
    fetchNotes()
  }, [])

  function handleSubmit(e) {
    e.preventDefault()
    const title = e.target.title.value
    const description = e.target.description.value

    axios.post('http://localhost:3000/api/notes',{
      title:title,
      description:description
    })
     .then((res)=>{
      console.log(res.data);
      fetchNotes()
     })
  }

  function handleDeleteNote(id){
    axios.delete(`http://localhost:3000/api/notes/${id}`)
    .then((res)=>{
      fetchNotes()
    })
  }

  function handleUpdateNote(id){
    const newDescription = prompt("enter new description")
    axios.patch(`http://localhost:3000/api/notes/${id}`,{
      description:newDescription
    })
    .then((res)=>{
      fetchNotes()
    })
  }


  return (
    <>
    <h1>Notes</h1>
      <form
       onSubmit={handleSubmit}
       className='note-create-form'>
        <input name='title' type="text" placeholder='enter title' />
        <input name='description' type="text" placeholder='enter description' />
        <button>Add Note</button>
      </form>

      <div className="notes">
        {
          notes.map(note => {
          return <div className="note">
              <h1>{note.title}</h1>
              <p>{note.description}</p>
              <button onClick={()=>{
                handleDeleteNote(note._id)
              }}>delete note</button>
              <button onClick={()=>{
                handleUpdateNote(note._id)
              }}>update note</button>
            </div>
          })
        }

      </div>
    </>
  )
}

export default App