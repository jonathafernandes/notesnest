import { useState, useEffect, useMemo } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Trash2 } from 'lucide-react'
import { Toaster, toast } from 'sonner'
import { Button } from '../components/NavigationButton'
import {
    getCornellNote,
    upsertCornellNote,
    deleteCornellNote,
    type CornellNote,
} from '../lib/cornell'

import logo from '../assets/logoipsum-225.svg'

export function CornellNotePage() {
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()
    const initial = useMemo(() => (id ? getCornellNote(id) : undefined), [id])

    const [note, setNote] = useState<CornellNote | undefined>(initial)

    useEffect(() => {
        setNote(initial)
    }, [initial])

    if (!note) {
        return (
            <div className='mx-auto max-w-6xl my-12 space-y-6 px-5'>
                <Button
                    onClick={() => navigate('/cornell')}
                    icon={<ArrowLeft className='h-4 w-4' />}
                    label='Voltar'
                />
                <p className='text-slate-400'>Anotação não encontrada.</p>
            </div>
        )
    }

    function updateField<K extends keyof CornellNote>(key: K, value: CornellNote[K]) {
        if (!note) return
        const updated = { ...note, [key]: value }
        setNote(updated)
        upsertCornellNote(updated)
    }

    function handleDelete() {
        if (!note) return
        deleteCornellNote(note.id)
        toast.success('Anotação apagada!')
        navigate('/cornell')
    }

    function handleTitleBlur() {
        if (note && note.title.trim() === '') {
            toast.error('O título é obrigatório.')
        }
    }

    return (
        <div className='mx-auto max-w-6xl my-12 space-y-6 px-5'>
            <div className='flex items-center justify-between gap-2'>
                <Button
                    onClick={() => navigate('/cornell')}
                    icon={<ArrowLeft className='h-4 w-4' />}
                    label='Voltar'
                />
                <button
                    type='button'
                    onClick={handleDelete}
                    className='flex gap-1 items-center rounded-full border border-red-900 px-4 py-2 text-sm text-red-400 hover:bg-red-900/30'
                >
                    <Trash2 className='h-4 w-4' />
                    Apagar
                </button>
            </div>

            <div className='flex gap-1'>
                <img className='w-6' src={logo} alt='Notes Nest' />
                <span className='text-xl font-semibold'>Notes Nest</span>
            </div>

            <input
                type='text'
                value={note.title}
                onChange={(event) => updateField('title', event.target.value)}
                onBlur={handleTitleBlur}
                placeholder='Título da anotação'
                className='w-full bg-transparent text-3xl font-semibold tracking-tight outline-none placeholder:text-slate-600'
            />

            <div className='grid gap-4 md:grid-cols-[1fr_2fr]'>
                <div className='flex flex-col rounded-md border border-slate-700 bg-slate-900/60'>
                    <span className='border-b border-slate-700 px-4 py-2 text-xs uppercase tracking-wider text-slate-400'>
                        Pistas
                    </span>
                    <textarea
                        value={note.cues}
                        onChange={(event) => updateField('cues', event.target.value)}
                        placeholder='Palavras-chave, perguntas, lembretes...'
                        className='min-h-[60vh] flex-1 resize-none bg-transparent p-4 text-sm leading-6 text-slate-200 outline-none placeholder:text-slate-600'
                    />
                </div>
                <div className='flex flex-col rounded-md border border-slate-700 bg-slate-900/60'>
                    <span className='border-b border-slate-700 px-4 py-2 text-xs uppercase tracking-wider text-slate-400'>
                        Anotações
                    </span>
                    <textarea
                        value={note.notes}
                        onChange={(event) => updateField('notes', event.target.value)}
                        placeholder='Suas anotações principais durante o estudo...'
                        className='min-h-[60vh] flex-1 resize-none bg-transparent p-4 text-sm leading-6 text-slate-200 outline-none placeholder:text-slate-600'
                    />
                </div>
            </div>

            <div className='flex flex-col rounded-md border border-slate-700 bg-slate-900/60'>
                <span className='border-b border-slate-700 px-4 py-2 text-xs uppercase tracking-wider text-slate-400'>
                    Resumo
                </span>
                <textarea
                    value={note.summary}
                    onChange={(event) => updateField('summary', event.target.value)}
                    placeholder='Resuma os pontos principais da sessão de estudo...'
                    className='min-h-[20vh] resize-none bg-transparent p-4 text-sm leading-6 text-slate-200 outline-none placeholder:text-slate-600'
                />
            </div>

            <Toaster richColors />
        </div>
    )
}
