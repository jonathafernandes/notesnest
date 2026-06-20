import { Link } from 'react-router-dom'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import type { CornellNote } from '../lib/cornell'

interface CornellNoteCardProps {
    note: CornellNote
}

export function CornellNoteCard({ note }: CornellNoteCardProps) {
    return (
        <Link
            to={`/cornell/${note.id}`}
            className='text-left rounded-md flex flex-col bg-slate-700 p-5 gap-3 overflow-hidden relative outline-none hover:ring-2 hover:ring-slate-600 focus-visible:ring-2 focus-visible:ring-yellow-400'
        >
            <span className='text-sm font-medium text-slate-300'>
                {formatDistanceToNow(new Date(note.date), { locale: ptBR, addSuffix: true })}
            </span>
            <h3 className='text-sm font-semibold text-yellow-400 truncate'>{note.title}</h3>

            <div className='flex flex-1 flex-col gap-1 min-h-0'>
                <div className='flex flex-1 gap-1 overflow-hidden'>
                    <div className='w-1/3 rounded-sm bg-slate-800/60 p-2 overflow-hidden'>
                        <p className='text-[10px] uppercase tracking-wider text-slate-500'>Pistas</p>
                        <p className='text-xs text-slate-400 line-clamp-3'>{note.cues || '—'}</p>
                    </div>
                    <div className='flex-1 rounded-sm bg-slate-800/60 p-2 overflow-hidden'>
                        <p className='text-[10px] uppercase tracking-wider text-slate-500'>Notas</p>
                        <p className='text-xs text-slate-400 line-clamp-3'>{note.notes || '—'}</p>
                    </div>
                </div>
                <div className='rounded-sm bg-slate-800/60 p-2 overflow-hidden'>
                    <p className='text-[10px] uppercase tracking-wider text-slate-500'>Resumo</p>
                    <p className='text-xs text-slate-400 line-clamp-1'>{note.summary || '—'}</p>
                </div>
            </div>
            <div className='absolute bottom-0 left-0 right-0 h-1/4 bg-gradient-to-t from-black/60 to-black/0 pointer-events-none'></div>
        </Link>
    )
}
