import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import * as Dialog from '@radix-ui/react-dialog'
import { ArrowLeft, ChevronsDownUp, ChevronsUpDown, Trash2, X } from 'lucide-react'
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
    const [isCuesCollapsed, setIsCuesCollapsed] = useState(true)
    const [isSummaryCollapsed, setIsSummaryCollapsed] = useState(true)
    const notesTextareaRef = useRef<HTMLTextAreaElement | null>(null)
    const summaryTextareaRef = useRef<HTMLTextAreaElement | null>(null)

    useEffect(() => {
        setNote(initial)
    }, [initial])

    useEffect(() => {
        const textarea = notesTextareaRef.current

        if (!textarea) return

        textarea.style.height = '0px'
        textarea.style.height = `${textarea.scrollHeight}px`
    }, [note?.notes])

    useEffect(() => {
        const textarea = summaryTextareaRef.current

        if (!textarea || isSummaryCollapsed) return

        textarea.style.height = '0px'
        textarea.style.height = `${textarea.scrollHeight}px`
    }, [isSummaryCollapsed, note?.summary])

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

    const bottomPadding = isSummaryCollapsed ? '6rem' : 'calc(35vh + 0.5rem)'

    return (
        <div
            className='mx-auto max-w-7xl px-5 pt-12'
            style={{ paddingBottom: bottomPadding }}>
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

            <div className='mt-6 flex flex-col gap-2'>
                <div className='flex gap-1'>
                    <img className='w-6' src={logo} alt='Notes Nest' />
                    <span className='text-xl font-semibold'>Anotação Cornell</span>
                </div>
                <Dialog.Root>
                    <Dialog.Trigger className='text-left text-sm text-slate-400 underline-offset-4 hover:text-slate-200 focus:outline-none focus:ring-2 focus:ring-yellow-400'>
                        Saiba mais
                    </Dialog.Trigger>
                    <Dialog.Portal>
                        <Dialog.Overlay className='inset-0 fixed bg-black/50' />
                        <Dialog.Content className='fixed inset-0 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-[560px] w-full max-h-[90vh] overflow-y-auto bg-slate-800 md:rounded-md border border-slate-700 p-5 outline-none'>
                            <Dialog.Close className='absolute top-4 right-4 rounded-full bg-slate-700 p-2 text-slate-300 hover:bg-slate-600 hover:text-white'>
                                <X className='h-4 w-4' />
                            </Dialog.Close>
                            <Dialog.Title className='text-lg font-semibold text-slate-100'>Como usar o método Cornell</Dialog.Title>
                            <div className='mt-4 space-y-4 text-sm leading-6 text-slate-300'>
                                <p>O método Cornell organiza sua revisão em três áreas:</p>
                                <ul className='list-disc list-inside space-y-2'>
                                    <li><strong>Pistas:</strong> registre palavras-chave, perguntas e lembretes que ajudam a revisar depois.</li>
                                    <li><strong>Anotações:</strong> escreva os detalhes principais e ideias enquanto estuda ou assiste à aula.</li>
                                    <li><strong>Resumo:</strong> sintetize os pontos mais importantes após a sessão para fixar o conteúdo.</li>
                                </ul>
                                <p>Use as pistas para guiar a leitura das anotações e o resumo para revisar rapidamente o conteúdo.</p>
                                <p>Quando quiser, abra esse modal novamente para relembrar a estrutura do método.</p>
                            </div>
                        </Dialog.Content>
                    </Dialog.Portal>
                </Dialog.Root>
            </div>

            <input
                type='text'
                value={note.title}
                onChange={(event) => updateField('title', event.target.value)}
                onBlur={handleTitleBlur}
                placeholder='Título da anotação'
                className='mt-6 w-full bg-transparent text-3xl font-semibold tracking-tight outline-none placeholder:text-slate-600'
            />

            <div
                className={`mt-4 grid gap-4 ${isCuesCollapsed ? 'md:grid-cols-[64px_minmax(0,1fr)]' : 'md:grid-cols-[220px_minmax(0,1fr)]'
                    }`}
            >
                <div
                    className={`flex self-start rounded-md bg-slate-950/60 md:sticky md:top-12 ${isCuesCollapsed ? 'flex-row md:min-h-[80vh]' : 'flex-col'
                        }`}
                >
                    <button
                        type='button'
                        onClick={() => setIsCuesCollapsed((current) => !current)}
                        className={`flex gap-3 text-left ${isCuesCollapsed
                            ? 'w-full flex-col items-center justify-center px-1.5 py-3'
                            : 'items-center justify-between px-3 py-3'
                            }`}
                    >
                        <span className='text-xs uppercase tracking-wider text-slate-400'>
                            Pistas
                        </span>
                        {isCuesCollapsed ? (
                            <ChevronsDownUp className='h-4 w-4 text-slate-400' />
                        ) : (
                            <ChevronsUpDown className='h-4 w-4 text-slate-400' />
                        )}
                    </button>
                    {isCuesCollapsed ? (
                        <div className='hidden' />
                    ) : (
                        <textarea
                            value={note.cues}
                            onChange={(event) => updateField('cues', event.target.value)}
                            placeholder='Palavras-chave, perguntas, lembretes...'
                            className='min-h-[75vh] flex-1 resize-none bg-transparent p-3 text-sm leading-6 text-slate-200 outline-none placeholder:text-slate-600'
                        />
                    )}
                </div>
                <div className='flex flex-col rounded-md bg-slate-900/60'>
                    <span className='px-4 py-2 text-xs uppercase tracking-wider text-slate-400'>
                        Anotações
                    </span>
                    <textarea
                        ref={notesTextareaRef}
                        value={note.notes}
                        onChange={(event) => updateField('notes', event.target.value)}
                        placeholder='Suas anotações principais durante o estudo...'
                        rows={1}
                        className={`overflow-hidden resize-none bg-transparent p-4 text-sm leading-6 text-slate-200 outline-none placeholder:text-slate-600 ${isCuesCollapsed ? 'min-h-[72vh]' : 'min-h-[60vh]'
                            }`}
                    />
                </div>
            </div>

            <div className='fixed inset-x-0 bottom-0 z-20 bg-slate-950/90 backdrop-blur-sm'>
                <div className='mx-auto max-w-6xl px-5 pb-5 pt-3'>
                    <div className='flex flex-col rounded-md'>
                        <button
                            type='button'
                            onClick={() => setIsSummaryCollapsed((current) => !current)}
                            className="flex items-center justify-between gap-3 px-4 pt-2 text-left"
                        >
                            <span className='text-xs uppercase tracking-wider text-slate-400'>
                                Resumo
                            </span>
                            {isSummaryCollapsed ? (
                                <ChevronsDownUp className='h-4 w-4 text-slate-400' />
                            ) : (
                                <ChevronsUpDown className='h-4 w-4 text-slate-400' />
                            )}
                        </button>
                        {isSummaryCollapsed ? (
                            <div className='h-0 overflow-hidden' />
                        ) : (
                            <textarea
                                ref={summaryTextareaRef}
                                value={note.summary}
                                onChange={(event) => updateField('summary', event.target.value)}
                                placeholder='Resuma os pontos principais da sessão de estudo...'
                                rows={1}
                                className='max-h-[35vh] min-h-[120px] resize-y bg-transparent p-4 text-sm leading-6 text-slate-200 outline-none placeholder:text-slate-600'
                            />
                        )}
                    </div>
                </div>
            </div>

            <Toaster richColors />
        </div>
    )
}
