import { useState } from 'react';

import logo from './assets/logoipsum-225.svg';

import { NewNoteCard } from './components/NewNoteCard';
import { NoteCard } from './components/NoteCard';
import { Toaster } from 'sonner';

interface Note {
  id: string
  date: Date
  content: string
}

export default function App() {
  const [search, setSearch] = useState('');

  const [notes, setNotes] = useState<Note[]>(() => {
    const notesOnStorage = localStorage.getItem('notes');

    if (notesOnStorage) {
      return JSON.parse(notesOnStorage);
    }

    return [];
  })

  function onNoteCreated(content: string) {
    const newNote = {
      id: crypto.randomUUID(),
      date: new Date(),
      content
    }

    const notesArray = [newNote, ...notes]

    setNotes(notesArray)
    localStorage.setItem('notes', JSON.stringify(notesArray))
  }

  function handleSearch(event: React.ChangeEvent<HTMLInputElement>) {
    const query = event.target.value;

    setSearch(query);
  }

  const filteredNotes = search !== '' ? notes.filter((note) => {
      return note.content.toLowerCase().includes(search.toLowerCase())
    }) : notes;
    
  return (
    <div className='mx-auto max-w-6xl my-12 space-y-6'>
      <div className='flex gap-1'>
        <img className='w-6' src={logo} alt="" />
        <span className='text-xl font-semibold'>Expert Notes</span>
      </div>
      <form className='w-full'>
        <input
          type="text"
          placeholder='Busque em suas notas...'
          className='w-full bg-transparent text-2xl font-semibold tracking-tight outline-none placeholder:text-slate-500'
          onChange={handleSearch}
        />
      </form>
      <div className='h-px bg-slate-700' />
      <div className='grid grid-cols-3 gap-6 auto-rows-[250px]'>
        <NewNoteCard onNoteCreated={onNoteCreated} />

        {filteredNotes.map((note) => {
          return (
            <NoteCard key={note.id} note={note} />
          )
        })}
      </div>
      <Toaster richColors />
    </div>
  )
}