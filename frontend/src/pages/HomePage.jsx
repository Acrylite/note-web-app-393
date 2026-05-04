import { useState } from 'react'
import Background from '../components/Background/Background'
import Navbar from '../components/NavigationBar/Navbar'
import Toolbar from '../components/Toolbar/Toolbar'
import AddItem from '../components/AddItem/AddItem'
import NotesPanel from '../components/NotesPanel/NotesPanel'
import TodoPanel from '../components/TodoPanel/TodoPanel'
import '../components/NavigationBar/Navbar.css'
import '../components/Toolbar/Toolbar.css'
import '../components/NotesPanel/NotesPanel.css'
import '../components/TodoPanel/TodoPanel.css'
import './HomePage.css'

function HomePage() {
    const [formOpen, setFormOpen] = useState(false)
    const [editingItem, setEditingItem] = useState(null)
    const [defaultType, setDefaultType] = useState('note')

    const openNewForm = (type = 'note') => {
        setEditingItem(null)
        setDefaultType(type)
        setFormOpen(true)
    }

    const openEditForm = (item) => {
        setEditingItem(item)
        const detectedType = item.deadline ? 'todo' : 'note'
        setDefaultType(detectedType)
        setFormOpen(true)
    }

    const closeForm = () => {
        setFormOpen(false)
        setEditingItem(null)
    }
    return (
        <div className="home-page">
            <Background />
            <Navbar />
            <Toolbar onAddNote={() => openNewForm('note')} />

            {/* pushes panels down when open */}
            <div className="home-content">
                {formOpen && (
                    <AddItem
                        existingItem={editingItem}
                        defaultType={defaultType}
                        onClose={closeForm}
                    />
                )}

                <div className="panels-row">
                    <NotesPanel onEdit={openEditForm} />
                    <TodoPanel onEdit={openEditForm} />
                </div>
            </div>
        </div>
    )
}

export default HomePage