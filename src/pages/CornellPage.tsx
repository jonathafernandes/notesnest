import { useState, type ChangeEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { Toaster, toast } from 'sonner'
import { NewCornellNoteCard } from '../components/NewCornellNoteCard'
import { CornellNoteCard } from '../components/CornellNoteCard'
import { Button } from '../components/NavigationButton'
import {
    loadCornellNotes,
    upsertCornellNote,
    type CornellNote,
} from '../lib/cornell'

import logo from '../assets/logoipsum-225.svg'

export function CornellPage() {
    const navigate = useNavigate()
    const [search, setSearch] = useState('')
    const [notes, setNotes] = useState<CornellNote[]>(() => loadCornellNotes())

    function handleCreate(title: string) {
        const newNote: CornellNote = {
            id: crypto.randomUUID(),
            date: new Date().toISOString(),
            title,
            cues: '',
            notes: '',
            summary: '',
        }

        upsertCornellNote(newNote)
        setNotes([newNote, ...notes])
        toast.success('Anotação criada!')
        navigate(`/cornell/${newNote.id}`)
    }

    function handleSearch(event: ChangeEvent<HTMLInputElement>) {
        setSearch(event.target.value)
    }

    const filteredNotes =
        search !== ''
            ? notes.filter((note) =>
                (note.title + ' ' + note.cues + ' ' + note.notes + ' ' + note.summary)
                    .toLowerCase()
                    .includes(search.toLowerCase()),
            )
            : notes

    return (
        <div className='mx-auto max-w-7xl my-12 space-y-6 px-5'>
            <Button
                onClick={() => navigate('/')}
                icon={<ArrowLeft className='h-4 w-4' />}
                label='Voltar'
            />

            <div className='flex gap-1'>
                <img className='w-6' src={logo} alt='Notes Nest' />
                <span className='text-xl font-semibold'>Notes Nest</span>
            </div>

            <div className='space-y-1'>
                <h1 className='text-2xl font-semibold'>Anotações Cornell</h1>
                <p className='text-sm text-slate-400'>
                    Organize seus estudos em pistas, anotações e resumo.
                </p>
            </div>

            <form className='w-full'>
                <input
                    type='text'
                    placeholder='Busque por título ou conteúdo...'
                    className='w-full bg-transparent text-2xl font-semibold tracking-tight outline-none placeholder:text-slate-500'
                    onChange={handleSearch}
                />
            </form>
            <div className='h-px bg-slate-700' />

            <div className='grid grid-1 md:grid-2 lg:grid-cols-3 gap-6 auto-rows-[250px]'>
                <NewCornellNoteCard onCreate={handleCreate} />
                {filteredNotes.map((note) => (
                    <CornellNoteCard key={note.id} note={note} />
                ))}
            </div>

            <Toaster richColors />
        </div>
    )
}
