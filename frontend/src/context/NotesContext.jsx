import { createContext, useContext, useState, useEffect } from 'react'
import { useAuth } from './AuthContext'
import * as api from '../services/api'

export const NotesContext = createContext()

export function NotesProvider({ children }) {
    const { token } = useAuth()

    const [notes, setNotes] = useState([])
    const [todos, setTodos] = useState([])
    const [loading, setLoading] = useState(true)
    const [filters, setFilters] = useState({
        sortBy: 'created',
        tags: [],
        todoOnly: null,
    })

    useEffect(() => {
        if (!token) return

        const fetchAll = async () => {
            try {
                const [fetchedNotes, fetchedTodos] = await Promise.all([
                    api.getNotes(token),
                    api.getTodos(token)
                ])
                setNotes(fetchedNotes.data)
                setTodos(fetchedTodos.data)
            } catch (err) {
                console.error('fetch error:', err.response?.status, err.response?.data)
            } finally {
                setLoading(false)
            }
        }

        fetchAll()
    }, [token])

    // notes actions
    const addNote = async (note) => {
        const res = await api.createNote(token, note)
        setNotes(prev => [res.data, ...prev])
    }

    const editNote = async (updated) => {
        setNotes(prev => prev.map(n => n.id === updated.id ? updated : n))
        await api.updateNote(token, updated)
    }

    const deleteNote = async (id) => {
        setNotes(prev => prev.filter(n => n.id !== id))
        await api.deleteNote(token, id)
    }

    const pinNote = async (id) => {
        const note = notes.find(n => n.id === id)
        const updated = { ...note, pinned: !note.pinned }
        setNotes(prev => prev.map(n => n.id === id ? updated : n))
        await api.updateNote(token, updated)
    }

    // todo actions
    const addTodo = async (todo) => {
        const res = await api.createTodo(token, todo)
        setTodos(prev => [res.data, ...prev])
    }

    const editTodo = async (updated) => {
        setTodos(prev => prev.map(t => t.id === updated.id ? updated : t))
        await api.updateTodo(token, updated)
    }

    const deleteTodo = async (id) => {
        setTodos(prev => prev.filter(t => t.id !== id))
        await api.deleteTodo(token, id)
    }

    const pinTodo = async (id) => {
        const todo = todos.find(t => t.id === id)
        const updated = { ...todo, pinned: !todo.pinned }
        setTodos(prev => prev.map(t => t.id === id ? updated : t))
        await api.updateTodo(token, updated)
    }

    // filter actions
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
            filters, setFilters,
            filteredNotes, filteredTodos,
        }}>
            {children}
        </NotesContext.Provider>
    )
}

export const useNotes = () => useContext(NotesContext)