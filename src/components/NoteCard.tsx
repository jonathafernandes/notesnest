export default function NoteCard() {
    return (
        <button className='text-left rounded-md bg-slate-800 p-5 space-y-3 overflow-hidden relative outline-none hover:ring-2 hover:ring-slate-600 focus-visible:ring-2 focus-visible:ring-lime-400'>
            <span className='text-sm font-medium text-slate-300'>Há 4 dias</span>
            <p className='text-sm leading-6 text-slate-400'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero veniam reprehenderit blanditiis corrupti aspernatur. Voluptatem mollitia dignissimos fugit, praesentium, magnam autem neque itaque reiciendis necessitatibus facere, ducimus at temporibus ab!
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda iste, quas tempora, nam in nostrum quo architecto veritatis vel eligendi voluptates maxime porro, dolor dignissimos ut? Id dignissimos quas error.
            </p>
            <div className='absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/60 to-black/0 pointer-events-none'></div>
        </button> 
    )
}