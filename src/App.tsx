import React, { useState } from 'react';
import { NewNoteCard } from './components/NewNoteCard';
import { NoteCard } from './components/NoteCard';
import { Toaster, toast } from 'sonner';
import logo from './assets/logoipsum-225.svg';

interface Note {
  id: string;
  date: Date;
  content: string;
  category: string[];
}

export default function App() {
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

  const [notes, setNotes] = useState<Note[]>(() => {
    const notesOnStorage = localStorage.getItem('notes');

    if (notesOnStorage) {
      return JSON.parse(notesOnStorage);
    }

    return [];
  })

  function onNoteCreated(content: string, categories: string[]) {
    const newNote = {
      id: crypto.randomUUID(),
      date: new Date(),
      content,
      category: categories
    }

    const notesArray = [newNote, ...notes]

    setNotes(notesArray)
    localStorage.setItem('notes', JSON.stringify(notesArray))
  }

  function onNoteDeleted(id: string) {
    const notesArray = notes.filter((note) => {
      return note.id !== id
    });

    setNotes(notesArray)
    localStorage.setItem('notes', JSON.stringify(notesArray))

    toast.success('Nota apagada com sucesso!')
  }

  function handleSearch(event: React.ChangeEvent<HTMLInputElement>) {
    const query = event.target.value;
    setSearch(query);
  }

  function handleCategoryFilter(category: string) {
    setCategoryFilter(category);
  }

  const filteredNotes = search !== '' ? notes.filter((note) => {
    return note.content.toLowerCase().includes(search.toLowerCase())
  }) : notes;

  const notesToDisplay = categoryFilter !== '' ? filteredNotes.filter(note => note.category.includes(categoryFilter)) : filteredNotes;

  return (
    <div className='mx-auto max-w-6xl my-12 space-y-6 px-5'>
      <div className='flex gap-1'>
        <img className='w-6' src={logo} alt="" />
        <span className='text-xl font-semibold'>Notes Nest</span>
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
      <div className='flex gap-4 flex-wrap'>
        <button onClick={() => setCategoryFilter('')} className={`text-xm font-semibold ${categoryFilter === '' ? 'text-yellow-400' : 'text-slate-500'}`}>todas</button>
        <button onClick={() => handleCategoryFilter('#trabalho')} className={`text-xm font-semibold ${categoryFilter === '#trabalho' ? 'text-yellow-400' : 'text-slate-500'}`}>trabalho</button>
        <button onClick={() => handleCategoryFilter('#estudos')} className={`text-xm font-semibold ${categoryFilter === '#estudos' ? 'text-yellow-400' : 'text-slate-500'}`}>estudos</button>
        <button onClick={() => handleCategoryFilter('#anotações-rápidas')} className={`text-xm font-semibold ${categoryFilter === '#anotações-rápidas' ? 'text-yellow-400' : 'text-slate-500'}`}>anotações-rápidas</button>
        <button onClick={() => handleCategoryFilter('#lembrar')} className={`text-xm font-semibold ${categoryFilter === '#lembrar' ? 'text-yellow-400' : 'text-slate-500'}`}>lembrar</button>
        <button onClick={() => handleCategoryFilter('#to-do')} className={`text-xm font-semibold ${categoryFilter === '#to-do' ? 'text-yellow-400' : 'text-slate-500'}`}>to-do</button>
      </div>
      <div className='grid grid-1 md:grid-2 lg:grid-cols-3 gap-6 auto-rows-[250px]'>
        <NewNoteCard onNoteCreated={(content, category) => onNoteCreated(content, category)} />
        {notesToDisplay.map((note) => {
          return (
            <NoteCard key={note.id} note={note} onNoteDeleted={onNoteDeleted} />
          )
        })}
      </div>
      <Toaster richColors />
    </div>
  )
}