import LineItem from "../LineItem/LineItem"
import { useNotes } from '../../context/NotesContext'
import './NoteCard.css'

// component for each note in the Notes panel
function NoteCard({ note, onPin, onEdit, onDelete }) {
    const { editNote } = useNotes()
    
    const handleCheckChange = (updatedLine) => {
        const updatedLines = note.lines.map(l => l.id === updatedLine.id ? updatedLine : l)
        editNote({ ...note, lines: updatedLines })
    }

    return (
        <div className={`note-card ${note.pinned ? 'pinned' : ''}`}>
            {/* HEADER - showing name, pin status, remove button */}
            <div className="card-header">
                <button className="pin-btn" onClick={() => onPin(note.id)}>
                    {note.pinned ? '📌' : '○'}
                </button>
                <span className="card-title">{note.title}</span>
                <button className="delete-btn" onClick={() => onDelete(note.id)}>
                    ✕
                </button>
            </div>

            {/* TAGS - showing tags for easy reminder and filtering */}
            {note.tags.length > 0 && (
                <div className="card-tags">
                    {note.tags.map(tag => (
                        <span key={tag} className="tag-chip">{tag}</span>
                    ))}
                </div>
            )}

            {/* BODY - note content */}
            <div className="card-body">
                {note.lines.map(line => (
                    <LineItem
                        key={line.id}
                        line={line}
                        type={line.type}
                        readOnly={true}
                        onChange={handleCheckChange}
                    />
                ))}
            </div>

            {/* FOOTER - edit status */}
            <div className="card-footer">
                <span className="card-timestamp">
                    edited {new Date(note.editedAt).toLocaleDateString()}
                </span>
                <button className="edit-btn" onClick={() => onEdit(note)}>
                    edit
                </button>
            </div>
        </div>
    )
}

export default NoteCard