import * as Dialog from '@radix-ui/react-dialog'

import { X } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

interface NewCornellNoteCardProps {
    onCreate: (title: string) => void
}

export function NewCornellNoteCard({ onCreate }: NewCornellNoteCardProps) {
    const [open, setOpen] = useState(false)
    const [title, setTitle] = useState('')

    function handleSubmit(event: React.FormEvent) {
        event.preventDefault()
        const trimmed = title.trim()

        if (trimmed === '') {
            toast.error('O título é obrigatório.')
            return
        }

        onCreate(trimmed)
        setTitle('')
        setOpen(false)
    }

    return (
        <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger className='rounded-md flex flex-col bg-slate-600 p-5 gap-3 outline-none hover:ring-2 hover:ring-slate-600 focus-visible:ring-2 focus-visible:ring-yellow-400 text-left'>
                <span className='text-sm font-medium text-slate-200'>
                    Nova anotação Cornell
                </span>
                <p className='text-sm leading-6 text-slate-400'>
                    Crie uma anotação estruturada em pistas, notas e resumo.
                </p>
            </Dialog.Trigger>

            <Dialog.Portal>
                <Dialog.Overlay className='inset-0 fixed bg-black/50'>
                    <Dialog.Content className='fixed inset-0 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-[480px] w-full bg-slate-700 md:rounded-md flex flex-col outline-none'>
                        <Dialog.Close className='absolute top-0 right-0 p-1.5 bg-slate-800 text-slate-400 hover:text-slate-100'>
                            <X className='size-5' />
                        </Dialog.Close>
                        <form onSubmit={handleSubmit} className='flex flex-col gap-4 p-5 pt-8'>
                            <Dialog.Title className='text-base font-medium text-slate-200'>
                                Nova anotação Cornell
                            </Dialog.Title>
                            <label className='flex flex-col gap-2'>
                                <span className='text-sm text-slate-400'>Título</span>
                                <input
                                    autoFocus
                                    type='text'
                                    value={title}
                                    onChange={(event) => setTitle(event.target.value)}
                                    placeholder='Ex: Aula 03 — Sistema circulatório'
                                    className='rounded-md bg-slate-800 px-3 py-2 text-sm text-slate-100 outline-none focus:ring-2 focus:ring-yellow-400 placeholder:text-slate-500'
                                />
                            </label>
                            <button
                                type='submit'
                                className='rounded-md w-full p-3 bg-yellow-400 text-sm font-medium text-yellow-950 hover:bg-yellow-500'
                            >
                                Criar e abrir
                            </button>
                        </form>
                    </Dialog.Content>
                </Dialog.Overlay>
            </Dialog.Portal>
        </Dialog.Root>
    )
}
