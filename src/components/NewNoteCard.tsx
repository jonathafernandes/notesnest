import * as Dialog from '@radix-ui/react-dialog'

import { X } from 'lucide-react'
import { useState } from 'react';
import { toast } from 'sonner';

interface NewNoteCardProps {
    onNoteCreated: (content: string) => void;
}

let speechRecognition: SpeechRecognition | null = null;  

export function NewNoteCard({ onNoteCreated }: NewNoteCardProps) {
    const [shouldShowsOnboarding, setShouldShowsOnboarding] = useState(true);
    const [content, setContent] = useState('');
    const [isRecording, setIsRecording] = useState(false);

    function handleStartEditor() {
        setShouldShowsOnboarding(false);
    }

    function handleContentChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
        setContent(event.target.value);

        if (event.target.value === '') {
            setShouldShowsOnboarding(true);
        }
    }

    function handleSaveNote(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        event.preventDefault();

        if (content === '') {
            toast.error('A nota não pode estar vazia.');
            return;
        }
        
        onNoteCreated(content);
        
        toast.success('Nota salva com sucesso!');

        setContent('');
        setShouldShowsOnboarding(true);
    }

    function handleOnRecording() {
        const isSpeechRecognitionAPIAvailable = 'SpeechRecognition' in window || 'webkitSpeechRecognition' in window;

        if (!isSpeechRecognitionAPIAvailable) {
            toast.error('Seu navegador não suporta a API de reconhecimento de voz.');
            return;
        }

        setIsRecording(true);
        setShouldShowsOnboarding(false);

        const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;

        speechRecognition = new SpeechRecognitionAPI();

        speechRecognition.continuous = true;
        speechRecognition.interimResults = true;
        speechRecognition.lang = 'pt-BR';
        speechRecognition.maxAlternatives = 1;
        
        speechRecognition.onresult = function(event) {
            const transcript = Array.from(event.results).reduce((text, result) => {
                return text.concat(result[0].transcript);
            }, '')

            setContent(transcript);
        }

        speechRecognition.onerror = function(event) {
            console.error(event.error);
        }

        speechRecognition.start();
    }

    function handleStopRecording() {
        if (speechRecognition !== null) {
            speechRecognition.stop();
        }
    }

    return (
        <Dialog.Root>
            <Dialog.Trigger className='rounded-md flex flex-col bg-slate-700 p-5 gap-3 outline-none hover:ring-2 hover:ring-slate-600 focus-visible:ring-2 focus-visible:ring-lime-400 text-left'>
                <span className='text-sm font-medium text-slate-200'>Adicionar nota</span>
                <p className='text-sm leading-6 text-slate-400'>Grave uma nota em áudio que será convertida para texto automaticamente.</p>
            </Dialog.Trigger>

            <Dialog.Portal>
                <Dialog.Overlay className='inset-0 fixed bg-black/50'>
                    <Dialog.Content className='fixed overflow-hidden inset-0 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-[640px] w-full md:h-[60vh] bg-slate-700 md:rounded-md flex flex-col outiline-none'>
                        <Dialog.Close className='absolute top-0 right-0 p-1.5 bg-slate-800 text-slate-400 hover:text-slate-100'>
                            <X className='size-5' />
                        </Dialog.Close>
                        <form className='flex-1 flex flex-col'>
                            <div className='flex flex-1 flex-col gap-3 p-5'>
                                <span className='text-sm font-medium text-slate-300'>
                                    Adiconar nota
                                </span>
                                {shouldShowsOnboarding ? (
                                    <p className='text-sm leading-6 text-slate-400'>
                                        Comece a <button type='button' onClick={handleOnRecording} className='font-medium text-lime-400 hover:underline'>gravar uma nota em áudio</button> ou se preferir, você pode <button type='button' onClick={handleStartEditor} className='font-medium text-lime-400 hover:underline'>utilizar apenas texto</button>.
                                    </p>
                                ) : (
                                    <textarea
                                        autoFocus
                                        className='text-sm leading-4 text-slate-400 bg-transparent outline-none resize-none'
                                        onChange={handleContentChange}
                                        value={content}
                                    />
                                )}
                            </div>
                            {isRecording ? (
                                <button
                                    className='flex items-center justify-center gap-2 rounded-b-md w-full p-3 bg-slate-900 text-sm font-medium text-slate-300'
                                type='button'
                                >
                                <div className='size-3 rounded-full bg-red-500 animate-pulse' />
                                Gravando...
                                <button onClick={handleStopRecording} type='button' className='ml-3 rounded-sm p-1 bg-slate-700 text-xs text-slate-400  hover:text-slate-300'>Clique para interromper</button>
                            </button>
                            ) : (
                            <button
                                className='rounded-b-md w-full p-3 bg-lime-400 text-sm font-medium text-lime-950 hover:bg-lime-500'
                                onClick={handleSaveNote}
                                type='button'
                            >
                                Salvar nota
                            </button>
                            )}
                        </form>
                    </Dialog.Content>
                </Dialog.Overlay>
            </Dialog.Portal>
        </Dialog.Root>
    )
}