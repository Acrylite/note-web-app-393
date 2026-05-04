import { useContext } from 'react'
import NoteCard from '../NoteCard/NoteCard'
import { NotesContext } from '../../context/NotesContext'

// component for notes panel
function NotesPanel({ onEdit }) {
    
    const { filteredNotes, pinNote, deleteNote } = useContext(NotesContext)

    // prioritize pinned notes over unpinned ones
    const pinnedNotes = filteredNotes.filter(n => n.pinned)
    const unpinnedNotes = filteredNotes.filter(n => !n.pinned)
    const sortedNotes = [...pinnedNotes, ...unpinnedNotes]

    return (
        <div className="panel">
            {/* HEADER - track the number of notes */}
            <div className="panel-header">
                Your Notes
                <span className="panel-count">{filteredNotes.length}</span>
            </div>

            {/* BODY - show notes in a list with visible scroll bar on demand */}
            <div className="panel-body">
                {sortedNotes.length === 0 && (
                    <p className="panel-empty">No notes yet...</p>
                )}

                {pinnedNotes.length > 0 && unpinnedNotes.length > 0 && (
                    <>
                        {pinnedNotes.map(note => (
                            <NoteCard
                                key={note.id}
                                note={note}
                                onPin={pinNote}
                                onEdit={onEdit}
                                onDelete={deleteNote}
                            />
                        ))}

                        <div className="panel-divider" />

                        {unpinnedNotes.map(note => (
                            <NoteCard
                                key={note.id}
                                note={note}
                                onPin={pinNote}
                                onEdit={onEdit}
                                onDelete={deleteNote}
                            />
                        ))}
                    </>
                )}

                {(pinnedNotes.length === 0 || unpinnedNotes.length === 0) &&
                    sortedNotes.map(note => (
                        <NoteCard
                            key={note.id}
                            note={note}
                            onPin={pinNote}
                            onEdit={onEdit}
                            onDelete={deleteNote}
                        />
                    ))
                }
            </div>
        </div>
    )
}

export default NotesPanel