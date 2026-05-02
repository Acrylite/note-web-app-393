import { useState } from 'react'
import AddItem from '../AddItem/AddItem'
import FilterBar from '../FilterBar/FilterBar'

function Toolbar() {
    const [formOpen, setFormOpen] = useState(false)
    const [defaultType, setDefaultType] = useState('note')
    const [filterOpen, setFilterOpen] = useState(false)

    const openForm = (type = 'note') => {
        setDefaultType(type)
        setFormOpen(true)
    }

    return (
        <div className="toolbar-wrap">
            {/* main toolbar */}
            <div className="toolbar">
                <button className="add-btn" onClick={() => openForm('note')}>
                    + Add Note
                </button>
                <input
                    className="search-input"
                    type="text"
                    placeholder="Search a note..."
                    onFocus={() => setFilterOpen(true)}
                    onBlur={() => setTimeout(() => setFilterOpen(false), 150)}
                />
            </div>

            {/* filter bar */}
            {filterOpen && <FilterBar />}

            {/* add note form */}
            {formOpen && (
                <AddItemForm
                    defaultType={defaultType}
                    onClose={() => setFormOpen(false)}
                />
            )}
        </div>
    )
}

export default Toolbar