import { useState } from 'react';
import { NewNoteCard } from './components/NewNoteCard';
import { NoteCard } from './components/NoteCard';
import { Toaster, toast } from 'sonner';
import { CategoryButton } from './components/CategoryButton';

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

  function handleNoteUpdated(id: string, content: string) {
    const updatedNotes = notes.map(note => {
        if (note.id === id) {
            return { ...note, content: content };
        }
        return note;
    });
    setNotes(updatedNotes);
    localStorage.setItem('notes', JSON.stringify(updatedNotes));
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
        <CategoryButton category='todas' toggleCategory={() => setCategoryFilter('')} active={categoryFilter === ''} />
        <CategoryButton category='trabalho' toggleCategory={() => setCategoryFilter('#trabalho')} active={categoryFilter === '#trabalho'} />
        <CategoryButton category='estudos' toggleCategory={() => setCategoryFilter('#estudos')} active={categoryFilter === '#estudos'} />
        <CategoryButton category='pessoal' toggleCategory={() => setCategoryFilter('#pessoal')} active={categoryFilter === '#pessoal'} />
        <CategoryButton category='lembrar' toggleCategory={() => setCategoryFilter('#lembrar')} active={categoryFilter === '#lembrar'} />
        <CategoryButton category='to-do' toggleCategory={() => setCategoryFilter('#to-do')} active={categoryFilter === '#to-do'} />
      </div>
      <div className='grid grid-1 md:grid-2 lg:grid-cols-3 gap-6 auto-rows-[250px]'>
        <NewNoteCard onNoteCreated={(content, category) => onNoteCreated(content, category)} />
        {notesToDisplay.map((note) => {
          return (
            <NoteCard key={note.id} note={note} onNoteDeleted={onNoteDeleted} onNoteUpdated={handleNoteUpdated} />
          )
        })}
      </div>
      <Toaster richColors />
    </div>
  )
}