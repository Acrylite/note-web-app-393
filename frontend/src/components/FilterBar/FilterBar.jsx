import { useNotes } from '../../context/NotesContext'

// list of preset tags
const taglist = ['school', 'personal', 'work', 'urgent', 'ideas', 'shopping']

function FilterBar() {
    
    const { filters, setFilters } = useNotes()

    const toggleTag = (tag) => {
        setFilters(prev => ({
            ...prev,
            tags: prev.tags.includes(tag)
                ? prev.tags.filter(t => t !== tag)
                : [...prev.tags, tag]
        }))
    }

    const setSortBy = (val) => {
        setFilters(prev => ({ ...prev, sortBy: val }))
    }

    const setTodoOnly = (val) => {
        // clicking the active one deselects it
        setFilters(prev => ({
            ...prev,
            todoOnly: prev.todoOnly === val ? null : val
        }))
    }

    return (
        <div className="filter-bar">
            <div className='filter-bar-inner'>
                <div className="filter-groups">
                    {/* sort notes */}
                    <div className="filter-group">
                        <span className="fg-label">Sort by</span>
                        <div className="fg-opts">
                            {['created', 'edited'].map(opt => (
                                <div
                                    key={opt}
                                    className={`filter-chip ${filters.sortBy === opt ? 'active' : ''}`}
                                    onClick={() => setSortBy(opt)}
                                >
                                    {opt}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* filter by tags */}
                    <div className="filter-group">
                        <span className="fg-label">Tag</span>
                        <div className="fg-opts">
                            {taglist.map(tag => (
                                <div
                                    key={tag}
                                    className={`filter-chip ${filters.tags.includes(tag) ? 'active' : ''}`}
                                    onClick={() => toggleTag(tag)}
                                >
                                    {tag}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* filters only applies to to-do notes */}
                    <div className="filter-group">
                        <span className="fg-label">Deadline</span>
                        <div className="fg-opts">
                            {['due', 'overdue', 'completed'].map(opt => (
                                <div
                                    key={opt}
                                    className={`filter-chip todo-only ${filters.todoOnly === opt ? 'active' : ''}`}
                                    onClick={() => setTodoOnly(opt)}
                                >
                                    {opt}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FilterBar