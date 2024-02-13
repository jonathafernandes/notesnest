import * as Dialog from '@radix-ui/react-dialog'

import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { ChevronLeft, SquarePen, X } from 'lucide-react'
import { useState, useEffect } from 'react'
import { toast } from 'sonner'

interface Note {
    id: string;
    date: Date;
    content: string;
    category: string[];
}

interface NoteCardProps {
    note: Note;
    onNoteDeleted: (id: string) => void;
    onNoteUpdated: (id: string, content: string) => void;
}

export function NoteCard({ note, onNoteDeleted, onNoteUpdated }: NoteCardProps) {
    const [editing, setEditing] = useState(false);
    const [content, setContent] = useState(note.content);

    useEffect(() => {
        const savedContent = localStorage.getItem(`note_${note.id}`);
        if (savedContent) {
            setContent(savedContent);
        }
    }, [note.id]);

    function handleEdit() {
        setEditing(true);
    }

    function handleStopEditor() {
        setEditing(false);
    }

    function handleContentChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
        setContent(event.target.value);
    }

    function handleSaveNote() {
        if (content === '') {
            toast.error('A nota não pode estar vazia.');
            return;
        }
        
        onNoteUpdated(note.id, content);
        
        localStorage.setItem(`note_${note.id}`, content);
        setEditing(false);
        
        toast.success('Nota salva com sucesso!');
    }

    return (
        <Dialog.Root>
            <Dialog.Trigger className='text-left rounded-md flex flex-col bg-slate-700 p-5 gap-3 overflow-hidden relative outline-none hover:ring-2 hover:ring-slate-600 focus-visible:ring-2 focus-visible:ring-yellow-400'>
                <span className='text-sm font-medium text-slate-300'>{formatDistanceToNow(note.date, { locale: ptBR, addSuffix: true })}</span>
                <span className='text-xs font-medium text-yellow-400'>{note.category.join(' ')}</span>
                <p className='text-sm leading-6 text-slate-400'>
                    {note.content}
                </p>
                <div className='absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/60 to-black/0 pointer-events-none'></div>
            </Dialog.Trigger>

            <Dialog.Portal>
                <Dialog.Overlay className='inset-0 fixed bg-black/50'>
                    <Dialog.Content className='fixed overflow-hidden inset-0 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-[640px] w-full md:h-[60vh] bg-slate-700 md:rounded-md flex flex-col outiline-none'>
                        {editing ? (
                            <button onClick={handleStopEditor} className='absolute top-0 left-0 p-1.5 bg-slate-800 text-slate-400 hover:text-slate-100 cursor-pointer'>
                                <ChevronLeft className='size-5' />
                            </button>
                        ) : (
                            <button onClick={handleEdit} className='absolute top-0 left-0 p-1.5 bg-slate-800 text-slate-400 hover:text-slate-100'>
                                <SquarePen className='size-5' />
                            </button>
                        )}
                        <Dialog.Close className='absolute top-0 right-0 p-1.5 bg-slate-800 text-slate-400 hover:text-slate-100'>
                            <X className='size-5' />
                        </Dialog.Close>
                        {editing ? (
                            <>
                            <div className='flex flex-1 flex-col gap-3 p-5 mt-7'>
                                <span className='text-sm font-medium text-yellow-400'>{note.category.join(' ')}</span>
                                <textarea
                                    autoFocus
                                    className='text-sm h-full w-full leading-4 text-slate-400 bg-transparent outline-none resize-none'
                                    onChange={handleContentChange}
                                    value={content} />
                            </div>
                            <button
                                className='rounded-b-md w-full p-3 bg-yellow-400 text-sm font-medium text-yellow-950 hover:bg-yellow-500'
                                onClick={handleSaveNote}
                                type='button'
                            >
                                Salvar nota
                            </button></>
                        ) : (
                            <>
                                <div className='flex flex-1 flex-col gap-3 p-5 mt-7'>
                                        <span className='text-sm font-medium text-slate-300'>{formatDistanceToNow(note.date, { locale: ptBR, addSuffix: true })}</span>
                                        <span className='text-sm font-medium text-yellow-400'>{note.category.join(' ')}</span>
                                        <p className='text-sm leading-6 text-slate-400'>
                                            {note.content}
                                        </p>
                                </div>
                                <button
                                    className='rounded-b-md w-full p-3 bg-slate-800 text-sm font-medium text-red-500 hover:bg-red-500 hover:text-slate-800'
                                    type='button'
                                    onClick={() => onNoteDeleted(note.id)}
                                >
                                    Deseja apagar esta nota?
                                </button>
                            </>
                        )}
                    </Dialog.Content>
                </Dialog.Overlay>
            </Dialog.Portal>

        </Dialog.Root>
    )
}