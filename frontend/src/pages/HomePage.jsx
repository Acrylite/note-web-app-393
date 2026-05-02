import { useState } from 'react'
import Background from '../components/Background/Background'
import Navbar from '../components/NavigationBar/Navbar'
import Toolbar from '../components/Toolbar/Toolbar'
import AddItem from '../components/AddItem/AddItem'
import NotesPanel from '../components/NotesPanel'
import TodoPanel from '../components/TodoPanel'
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
        setDefaultType(item.type)
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
            {formOpen && (
                <AddItemForm
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
    )
}

export default HomePage