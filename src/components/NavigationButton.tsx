import type { MouseEventHandler, ReactNode } from 'react'

interface NavigationButtonProps {
    onClick: MouseEventHandler<HTMLButtonElement>
    label: string
    icon: ReactNode
}

export function Button({ onClick, label, icon }: NavigationButtonProps) {
    return (
        <button
            type='button'
            onClick={onClick}
            className='flex gap-1 items-center rounded-full border border-slate-700 px-4 py-2 text-sm text-slate-100 hover:bg-slate-700'
        >
            {icon}
            {label}
        </button>
    )
}
