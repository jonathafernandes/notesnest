import * as Dialog from '@radix-ui/react-dialog'

import { X } from 'lucide-react'
import { useState } from 'react';
import { toast } from 'sonner';

export function NewNoteCard() {
    const [shouldShowsOnboarding, setShouldShowsOnboarding] = useState(true);
    const [content, setContent] = useState('');

    function handleStartEditor() {
        setShouldShowsOnboarding(false);
    }

    function handleContentChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
        setContent(event.target.value);

        if (event.target.value === '') {
            setShouldShowsOnboarding(true);
        }
    }

    function handleSaveNote(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        
        console.log(content);
        
        toast.success('Nota salva com sucesso!');
    }

    return (
        <Dialog.Root>
            <Dialog.Trigger className='rounded-md flex flex-col bg-slate-700 p-5 gap-3 outline-none hover:ring-2 hover:ring-slate-600 focus-visible:ring-2 focus-visible:ring-lime-400 text-left'>
                <span className='text-sm font-medium text-slate-200'>Adicionar nota</span>
                <p className='text-sm leading-6 text-slate-400'>Grave uma nota em áudio que será convertida para texto automaticamente.</p>
            </Dialog.Trigger>

            <Dialog.Portal>
                <Dialog.Overlay className='inset-0 fixed bg-black/50'>
                    <Dialog.Content className='fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[640px] w-full h-[60vh] bg-slate-700 rounded-md flex flex-col outiline-none'>
                        <Dialog.Close className='absolute top-0 right-0 p-1.5 bg-slate-800 text-slate-400 hover:text-slate-100'>
                            <X className='size-5' />
                        </Dialog.Close>
                        <form onSubmit={handleSaveNote} className='flex-1 flex flex-col'>
                            <div className='flex flex-1 flex-col gap-3 p-5'>
                                <span className='text-sm font-medium text-slate-300'>
                                    Adiconar nota
                                </span>
                                {shouldShowsOnboarding ? (
                                    <p className='text-sm leading-6 text-slate-400'>
                                        Comece a <button className='font-medium text-lime-400 hover:underline'>gravar uma nota em áudio</button> ou se preferir, você pode <button onClick={handleStartEditor} className='font-medium text-lime-400 hover:underline'>utilizar apenas texto</button>.
                                    </p>
                                ) : (
                                    <textarea
                                        autoFocus
                                        className='text-sm leading-4 text-slate-400 bg-transparent outline-none resize-none'
                                        onChange={handleContentChange}
                                    />
                                )}
                            </div>
                            <button
                                className='rounded-b-md w-full p-3 bg-lime-400 text-sm font-medium text-lime-950 hover:bg-lime-500'
                                type='submit'
                            >
                                Salvar nota
                            </button>
                        </form>
                    </Dialog.Content>
                </Dialog.Overlay>
            </Dialog.Portal>
        </Dialog.Root>
    )
}