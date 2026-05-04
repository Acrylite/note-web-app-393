import { useState, useRef, useEffect } from 'react'
import AddItem from '../AddItem/AddItem'
import '../AddItem/AddItem.css'
import FilterBar from '../FilterBar/FilterBar'
import '../FilterBar/FilterBar.css'

function Toolbar({ onAddNote }) {
    const [formOpen, setFormOpen] = useState(false)
    const [filterOpen, setFilterOpen] = useState(false)
    const filterRef = useRef(null)

    // close filter bar only when clicking outside the area
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (filterRef.current && !filterRef.current.contains(e.target)) {
                setFilterOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    return (
        <div className="toolbar-wrap" ref={filterRef}>
            {/* main toolbar */}
            <div className="toolbar">
                <button className="add-btn" onClick={onAddNote}>
                    + Add Note
                </button>
                <input
                    className="search-input"
                    type="text"
                    placeholder="Search a note..."
                    onFocus={() => setFilterOpen(true)}
                />
            </div>

            {/* filter bar */}
            {filterOpen && <FilterBar />}

            {/* add note form */}
            {formOpen && (
                <AddItem
                    defaultType={defaultType}
                    onClose={() => setFormOpen(false)}
                />
            )}
        </div>
    )
}

export default Toolbar