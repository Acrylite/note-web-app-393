import { useState } from 'react'
import { useNotes } from '../../context/NotesContext'
import LineItem from '../LineItem/LineItem'

// list of preset tags
const taglist = ['school', 'personal', 'work', 'urgent', 'ideas', 'shopping']

function AddItem({ existingItem = null, defaultType = 'note', onClose }) {

    const { addNote, editNote, addTodo, editTodo } = useNotes()

    // support both adding a new note or editing an existing one
    const isEditing = existingItem !== null
    const [type, setType] = useState(
        isEditing
            ? (existingItem.type ?? defaultType)
            : defaultType
    )

    const [title, setTitle] = useState(existingItem?.title ?? '')
    const [deadline, setDeadline] = useState(existingItem?.deadline ?? '')
    const [tags, setTags] = useState(existingItem?.tags ?? [])
    const [lines, setLines] = useState(
        existingItem?.lines ?? [{ id: crypto.randomUUID(), type: 'text', text: '', done: false }]
    )

    // line management
    const addLine = () => {
        setLines(prev => [
            ...prev,
            { id: crypto.randomUUID(), type: 'text', text: '', done: false }
        ])
    }

    const updateLine = (updatedLine) => {
        setLines(prev => prev.map(l => l.id === updatedLine.id ? updatedLine : l))
    }

    const cycleLineType = (id) => {
        const order = ['text', 'bullet', 'check']
        setLines(prev => prev.map(l => {
            if (l.id !== id) return l
            const next = order[(order.indexOf(l.type) + 1) % order.length]
            return { ...l, type: next }
        }))
    }

    const removeLine = (id) => {
        setLines(prev => prev.filter(l => l.id !== id))
    }

    // tag management
    const toggleTag = (tag) => {
        setTags(prev =>
            prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
        )
    }

    // save
    const handleSave = async () => {
        // a note needs to have a title
        // silently cancel the operation
        if (!title.trim()) return
        if (type === 'todo' && !deadline) return

        const payload = {
            title: title.trim(),
            tags,
            lines: type === 'todo'
                ? lines.map(l => ({ ...l, type: 'check' }))
                : lines
        }

        if (isEditing) {
            type === 'note'
                ? await editNote({ ...existingItem, ...payload })
                : await editTodo({ ...existingItem, ...payload, deadline })
        } else {
            type === 'note'
                ? await addNote({ ...payload, pinned: false })
                : await addTodo({ ...payload, deadline, pinned: false })
        }

        onClose()
    }

    const formTitle = isEditing
        ? `Edit ${type}`
        : `New ${type}`

    return (
        <div className="add-form">
            {/* HEADER - form title and note type toggle */}
            <div className="form-top">
                <span className="form-title">{formTitle}</span>

                <div className="toggle-wrap">
                    <span className="toggle-label">Note</span>
                    <label className="toggle">
                        <input
                            type="checkbox"
                            checked={type === 'todo'}
                            disabled={isEditing}
                            onChange={e => setType(e.target.checked ? 'todo' : 'note')}
                        />
                        <div className="toggle-track" />
                        <div className="toggle-thumb" />
                    </label>
                    <span className="toggle-label">To-do</span>
                </div>
            </div>

            {/* BODY */}
            {/* title input - a note needs to have a title */}
            <input
                className="title-input"
                type="text"
                placeholder="Title..."
                value={title}
                onChange={e => setTitle(e.target.value)}
            />

            {/* deadline - only appears if note type is to-do */}
            {type === 'todo' && (
                <div className="deadline-row">
                    <label>Deadline</label>
                    <input
                        type="datetime-local"
                        value={deadline}
                        onChange={e => setDeadline(e.target.value)}
                    />
                </div>
            )}

            {/* note content */}
            <div className="lines-area">
                {lines.map(line => (
                    <LineItem
                        key={line.id}
                        line={line}
                        readOnly={false}
                        onChange={updateLine}
                        onTypeChange={cycleLineType}
                        onRemove={removeLine}
                    />
                ))}
            </div>
            <button className="add-line-btn" onClick={addLine}>+ Add another line</button>

            {/* note tags */}
            <div className="tags-row">
                <span className="tag-label">Tag:</span>
                {taglist.map(tag => (
                    <div
                        key={tag}
                        className={`tag-chip ${tags.includes(tag) ? 'selected' : ''}`}
                        onClick={() => toggleTag(tag)}
                    >
                        {tag}
                    </div>
                ))}
            </div>

            {/* FOOTER - form actions */}
            <div className="form-actions">
                <button className="btn-cancel" onClick={onClose}>Cancel</button>
                <button className="btn-save" onClick={handleSave}>Save</button>
            </div>

        </div>
    )
}

export default AddItem