import * as Dialog from '@radix-ui/react-dialog'

import { X } from 'lucide-react'
import { useState } from 'react';
import { toast } from 'sonner';
import { Checkbox } from './Checkbox';

interface NewNoteCardProps {
    onNoteCreated: (content: string, categories: string[]) => void;
}

let speechRecognition: SpeechRecognition | null = null;  

export function NewNoteCard({ onNoteCreated }: NewNoteCardProps) {
    const [shouldShowsOnboarding, setShouldShowsOnboarding] = useState(true);
    const [content, setContent] = useState('');
    const [categories, setCategories] = useState<string[]>([]);
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
        
        onNoteCreated(content, categories);
        
        toast.success('Nota salva com sucesso!');

        setContent('');
        setCategories([]);
        setShouldShowsOnboarding(true);
    }

    function toggleCategory(category: string) {
        const isSelected = categories.includes(category);
        setCategories(isSelected ? categories.filter(cat => cat !== category) : [...categories, category]);
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
            console.log('Erro de gravação:', event.error);
        }        

        speechRecognition.start();
    }

    function handleStopRecording() {
        if (speechRecognition !== null) {
            speechRecognition.stop();
            setIsRecording(false);
            setShouldShowsOnboarding(true);
        }
    }

    return (
        <Dialog.Root>
        <Dialog.Trigger className='rounded-md flex flex-col bg-slate-600 p-5 gap-3 outline-none hover:ring-2 hover:ring-slate-600 focus-visible:ring-2 focus-visible:ring-yellow-400 text-left'>
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
                                Adicionar nota
                            </span>
                            <span className='text-sm text-slate-400'>
                                Escolha uma ou mais categorias:
                            </span>
                            <div className="grid grid-cols-3">
                                <Checkbox categories={categories} content='trabalho' toggleParam='#trabalho' checked='#trabalho' toggleCategory={toggleCategory} />
                                <Checkbox categories={categories} content='estudos' toggleParam='#estudos' checked='#estudos' toggleCategory={toggleCategory} />
                                <Checkbox categories={categories} content='pessoal' toggleParam='#pessoal' checked='#pessoal' toggleCategory={toggleCategory} />
                                <Checkbox categories={categories} content='lembrar' toggleParam='#lembrar' checked='#lembrar' toggleCategory={toggleCategory} />
                                <Checkbox categories={categories} content='to-do' toggleParam='#to-do' checked='#to-do' toggleCategory={toggleCategory} />
                            </div>
                                {shouldShowsOnboarding ? (
                                    <p className='text-sm leading-6 text-slate-400'>
                                        Comece a <button type='button' onClick={handleOnRecording} className='font-medium text-yellow-400 hover:underline'>gravar uma nota em áudio</button> ou se preferir, você pode <button type='button' onClick={handleStartEditor} className='font-medium text-yellow-400 hover:underline'>utilizar apenas texto</button>.
                                    </p>
                                ) : (
                                    <textarea
                                        autoFocus
                                        className='text-sm h-full w-full leading-4 text-slate-400 bg-transparent outline-none resize-none'
                                        onChange={handleContentChange}
                                        value={content}
                                    />
                                )}
                            </div>
                            {isRecording ? (
                                <button
                                    className='flex items-center justify-center gap-2 rounded-b-md w-full p-3 bg-slate-900 text-sm font-medium text-slate-300'
                                    type='button'
                                    onClick={handleStopRecording}
                                >
                                <div className='size-3 rounded-full bg-red-500 animate-pulse' />
                                Gravando...
                                <span className='ml-3 rounded-sm p-1 bg-slate-700 text-xs text-slate-400  hover:text-slate-300'>Clique para interromper</span>
                            </button>
                            ) : (
                            <button
                                className='rounded-b-md w-full p-3 bg-yellow-400 text-sm font-medium text-yellow-950 hover:bg-yellow-500'
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