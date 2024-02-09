import * as Dialog from '@radix-ui/react-dialog'

import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { X } from 'lucide-react'

interface NoteCardProps {
    note: {
        date: Date;
        content: string;
    }
}

export function NoteCard({note}: NoteCardProps) {
    return (
        <Dialog.Root>
            <Dialog.Trigger className='text-left rounded-md flex flex-col bg-slate-800 p-5 gap-3 overflow-hidden relative outline-none hover:ring-2 hover:ring-slate-600 focus-visible:ring-2 focus-visible:ring-lime-400'>
                <span className='text-sm font-medium text-slate-300'>{formatDistanceToNow(note.date, { locale: ptBR, addSuffix: true })}</span>
                <p className='text-sm leading-6 text-slate-400'>
                    {note.content}
                </p>
                <div className='absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/60 to-black/0 pointer-events-none'></div>
            </Dialog.Trigger>

            <Dialog.Portal>
                <Dialog.Overlay className='inset-0 fixed bg-black/50'>
                    <Dialog.Content className='fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[640px] w-full h-[60vh] bg-slate-700 rounded-md flex flex-col outiline-none'>
                        <Dialog.Close className='absolute top-0 right-0 p-1.5 bg-slate-800 text-slate-400 hover:text-slate-100'>
                            <X className='size-5' />
                        </Dialog.Close>
                        <div className='flex flex-1 flex-col gap-3 p-5'>
                            <span className='text-sm font-medium text-slate-300'>{formatDistanceToNow(note.date, { locale: ptBR, addSuffix: true })}</span>
                            <p className='text-sm leading-6 text-slate-400'>
                                {note.content}
                            </p>
                        </div>
                        <button
                            className='rounded-b-md w-full p-3 bg-slate-800 text-sm font-medium text-red-500 hover:bg-red-500 hover:text-slate-800'
                            type='button'
                        >
                            Deseja apaga essa nota?
                        </button>
                    </Dialog.Content>
                </Dialog.Overlay>
            </Dialog.Portal>
                
        </Dialog.Root>
    )
}