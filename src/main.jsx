import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import NotesApp from './notesApp'
import { TareasProvider } from './TareasContext'
import Form from './Components/Form'
import Table from './Components/Table'
// import './index.css'

createRoot(document.getElementById('root')).render(
  <TareasProvider>
    <NotesApp />
    <Form/>
    <Table/>
  </TareasProvider>,
)
