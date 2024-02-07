import logo from './assets/logoipsum-225.svg';

import { NewNoteCard } from './components/NewNoteCard';
import { NoteCard } from './components/NoteCard';
import { Toaster } from 'sonner';

export default function App() {
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
        />
      </form>
      <div className='h-px bg-slate-700' />
      <div className='grid grid-cols-3 gap-6 auto-rows-[250px]'>
        <NewNoteCard />
        <NoteCard
          note={
            {
              date: new Date(),
              content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
            }
          }
        />
      </div>
      <Toaster richColors />
    </div>
  )
}