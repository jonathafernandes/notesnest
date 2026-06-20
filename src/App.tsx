import { Routes, Route, Link } from 'react-router-dom'
import { NotesPage } from './pages/NotesPage'
import { BookOpen, Zap } from 'lucide-react'
import logo from './assets/logoipsum-225.svg'

function HomePage() {
  return (
    <div className='mx-auto flex min-h-screen max-w-5xl flex-col px-5 py-10'>
      <header className='flex items-center gap-2'>
        <img className='w-6' src={logo} alt='Notes Nest' />
        <span className='text-xl font-semibold'>Notes Nest</span>
      </header>

      <main className='flex flex-1 flex-col justify-center space-y-10 py-12'>
        <div className='space-y-3'>
          <h1 className='text-3xl md:text-4xl font-semibold tracking-tight'>
            Como você quer anotar hoje?
          </h1>
          <p className='max-w-xl text-slate-400'>
            Escolha um dos métodos abaixo para começar.
          </p>
        </div>

        <div className='grid gap-5 md:grid-cols-2'>
          <Link
            to='/cornell'
            className='group flex flex-col rounded-2xl border border-slate-700 bg-slate-900/60 p-6 transition hover:bg-slate-900'
          >
            <div className='flex h-10 w-10 items-center justify-center rounded-xl bg-yellow-400/10 text-yellow-400'>
              <BookOpen className='h-5 w-5' />
            </div>
            <h2 className='mt-5 text-lg font-semibold'>Método Cornell</h2>
            <p className='mt-2 flex-1 text-sm text-slate-400'>
              Estruture seus estudos em pistas, anotações e resumo.
            </p>
            <span className='mt-5 text-sm font-medium text-yellow-400'>
              Abrir
            </span>
          </Link>

          <Link
            to='/notes'
            className='group flex flex-col rounded-2xl border border-slate-700 bg-slate-900/60 p-6 transition hover:bg-slate-900'
          >
            <div className='flex h-10 w-10 items-center justify-center rounded-xl bg-yellow-400/10 text-yellow-400'>
              <Zap className='h-5 w-5' />
            </div>
            <h2 className='mt-5 text-lg font-semibold'>Anotações rápidas</h2>
            <p className='mt-2 flex-1 text-sm text-slate-400'>
              Capture ideias no momento em que elas surgem, por texto ou áudio.
            </p>
            <span className='mt-5 text-sm font-medium text-yellow-400'>
              Abrir
            </span>
          </Link>
        </div>
      </main>
    </div>
  )
}

export default function App() {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/notes' element={<NotesPage />} />
    </Routes>
  )
}
