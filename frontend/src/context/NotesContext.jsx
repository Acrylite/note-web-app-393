import { createContext, useContext, useState, useEffect } from 'react'
import * as api from '../services/api'

export const NotesContext = createContext()

export function NotesProvider({ children }) {
    const [notes, setNotes] = useState([])
    const [todos, setTodos] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchAll = async () => {
            const [fetchedNotes, fetchedTodos] = await Promise.all([
                api.getNotes(),
                api.getTodos()
            ])
            setNotes(fetchedNotes)
            setTodos(fetchedTodos)
            setLoading(false)
        }
        fetchAll()
    }, [])

    // notes actions
    const { token } = useAuth()

    const addNote = async (note) => {
        const res = await api.createNote(token, note)
        setNotes(prev => [res.data, ...prev])
    }

    const editNote = async (updated) => {
        setNotes(prev => prev.map(n => n.id === updated.id ? updated : n))
        await api.updateNote(updated)
    }

    const deleteNote = async (id) => {
        setNotes(prev => prev.filter(n => n.id !== id))
        await api.deleteNote(id)
    }

    const pinNote = async (id) => {
        const note = notes.find(n => n.id === id)
        const updated = { ...note, pinned: !note.pinned }
        setNotes(prev => prev.map(n => n.id === id ? updated : n))
        await api.updateNote(updated)
    }

    // todo actions
    const addTodo = async (todo) => {
        const saved = await api.createTodo(todo)
        setTodos(prev => [saved, ...prev])
    }

    const editTodo = async (updated) => {
        setTodos(prev => prev.map(t => t.id === updated.id ? updated : t))
        await api.updateTodo(updated)
    }

    const deleteTodo = async (id) => {
        setTodos(prev => prev.filter(t => t.id !== id))
        await api.deleteTodo(id)
    }

    const pinTodo = async (id) => {
        const todo = todos.find(t => t.id === id)
        const updated = { ...todo, pinned: !todo.pinned }
        setTodos(prev => prev.map(t => t.id === id ? updated : t))
        await api.updateTodo(updated)
    }

    // filter actions
    const [filters, setFilters] = useState({
        sortBy: 'created',
        tags: [],
        todoOnly: null,
    })

    const filteredNotes = notes
        .filter(n => filters.tags.length === 0
            || filters.tags.some(t => n.tags.includes(t)))
        .sort((a, b) => filters.sortBy === 'edited'
            ? new Date(b.editedAt) - new Date(a.editedAt)
            : new Date(b.createdAt) - new Date(a.createdAt))

    const filteredTodos = todos
        .filter(t => {
            if (filters.tags.length > 0 && !filters.tags.some(tag => t.tags.includes(tag)))
                return false
            if (filters.todoOnly === 'overdue')
                return new Date(t.deadline) < new Date() && !t.lines.every(l => l.done)
            if (filters.todoOnly === 'completed')
                return t.lines.every(l => l.done)
            if (filters.todoOnly === 'due')
                return new Date(t.deadline) > new Date()
            return true
        })
        .sort((a, b) => filters.sortBy === 'edited'
            ? new Date(b.editedAt) - new Date(a.editedAt)
            : new Date(a.deadline) - new Date(b.deadline))

    return (
        <NotesContext.Provider value={{
            notes, todos, loading,
            addNote, editNote, deleteNote, pinNote,
            addTodo, editTodo, deleteTodo, pinTodo,
        }}>
            {children}
        </NotesContext.Provider>
    )
}

export const useNotes = () => useContext(NotesContext)