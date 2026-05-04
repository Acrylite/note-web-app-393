import LineItem from "../LineItem/LineItem"
import { useNotes } from '../../context/NotesContext'
import './TodoCard.css'

// component for each note in the To-do panel
function TodoCard({ todo, onPin, onEdit, onDelete }) {

    if (!todo || !todo.lines) return null

    const completionCount = todo.lines.filter(l => l.done).length
    const totalCount = todo.lines.length

    // to-do status
    const hoursLeft = (new Date(todo.deadline) - new Date()) / 36e5
    const allDone = todo.lines.length > 0 && todo.lines.every(l => l.done)
    const status = allDone ? 'done'
        : hoursLeft < 0 ? 'overdue'
            : hoursLeft < 24 ? 'urgent'
                : hoursLeft < 72 ? 'soon'
                    : 'upcoming'

    // deadline badge color    
    const badgeStyles = {
        overdue: { background: '#FCEBEB', color: '#A32D2D' },
        urgent: { background: '#FAEEDA', color: '#633806' },
        soon: { background: '#FAEEDA', color: '#854F0B' },
        upcoming: { background: '#EAF3DE', color: '#3B6D11' },
        done: { background: '#EAF3DE', color: '#27500A' },
    }

    // deadline badge
    const badgeText = {
        overdue: 'overdue',
        urgent: `${Math.floor(hoursLeft)}h left`,
        soon: `${Math.floor(hoursLeft / 24)}d left`,
        upcoming: `${Math.floor(hoursLeft / 24)}d left`,
        done: 'completed',
    }

    // note border color
    const borderColors = {
        overdue: '#F09595',
        urgent: '#EF9F27',
        soon: '#FAC775',
        upcoming: 'var(--color-border-tertiary)',
        done: '#97C459',
    }

    const { editTodo } = useNotes()

    const handleCheckChange = (updatedLine) => {
        const updatedLines = todo.lines.map(l => l.id === updatedLine.id ? updatedLine : l)
        editTodo({ ...todo, lines: updatedLines })
    }

    return (
        <div className={`todo-card ${todo.pinned ? 'pinned' : ''}`} style={{ border: `1.5px solid ${borderColors[status]}`, borderRadius: 8 }}>
            {/* HEADER - showing name, pin status, remove button, deadline badge */}
            <div className="card-header">
                <button className="pin-btn" onClick={() => onPin(todo.id)}>
                    {todo.pinned ? '📌' : '○'}
                </button>
                <span className="card-title">{todo.title}</span>
                <span className="deadline-badge" style={badgeStyles[status]}>
                    {badgeText[status]}
                </span>
                <button className="delete-btn" onClick={() => onDelete(todo.id)}>
                    ✕
                </button>
            </div>

            {/* TAGS - showing tags for easy reminder and filtering */}
            {todo.tags.length > 0 && (
                <div className="card-tags">
                    {todo.tags.map(tag => (
                        <span key={tag} className="tag-chip">{tag}</span>
                    ))}
                </div>
            )}

            {/* BODY - note content */}
            <div className="card-body">
                {todo.lines.map(line => (
                    <LineItem
                        key={line.id}
                        line={{ ...line, type: 'check' }}
                        readOnly={true}
                        onChange={handleCheckChange}
                    />
                ))}
            </div>

            {/* FOOTER - edit status, task completion count */}
            <div className="card-footer">
                <span className="card-timestamp">
                    edited {new Date(todo.editedAt).toLocaleDateString()}
                </span>
                <button className="edit-btn" onClick={() => onEdit(todo)}>
                    edit
                </button>
                {totalCount > 0 && (
                    <span className="completion-count">
                        {completionCount} / {totalCount} tasks done
                    </span>
                )}
            </div>
        </div>
    )
}

export default TodoCard