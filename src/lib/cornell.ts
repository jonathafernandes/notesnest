export interface CornellNote {
    id: string
    date: string
    title: string
    cues: string
    notes: string
    summary: string
}

const STORAGE_KEY = 'cornell-notes'

export function loadCornellNotes(): CornellNote[] {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    try {
        return JSON.parse(raw) as CornellNote[]
    } catch {
        return []
    }
}

export function saveCornellNotes(notes: CornellNote[]): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes))
}

export function getCornellNote(id: string): CornellNote | undefined {
    return loadCornellNotes().find((note) => note.id === id)
}

export function upsertCornellNote(note: CornellNote): void {
    const all = loadCornellNotes()
    const idx = all.findIndex((n) => n.id === note.id)
    if (idx >= 0) {
        all[idx] = note
    } else {
        all.unshift(note)
    }
    saveCornellNotes(all)
}

export function deleteCornellNote(id: string): void {
    const all = loadCornellNotes().filter((note) => note.id !== id)
    saveCornellNotes(all)
}
