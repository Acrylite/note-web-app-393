import { useContext } from 'react'
import TodoCard from '../TodoCard/TodoCard'
import { NotesContext } from '../../context/NotesContext'

// component for to-do panel
function TodoPanel({ onEdit }) {
    
    const { filteredTodos, pinTodo, deleteTodo } = useContext(NotesContext)

    // prioritize pinned to-do notes over unpinned ones
    const pinnedTodos = filteredTodos.filter(t => t.pinned)
    const unpinnedTodos = filteredTodos
        .filter(t => !t.pinned)
        .sort((a, b) => new Date(a.deadline) - new Date(b.deadline))
    const sortedTodos = [...pinnedTodos, ...unpinnedTodos]

    return (
        <div className="panel">
            {/* HEADER - track the number of to-do notes */}
            <div className="panel-header">
                Your To-do List
                <span className="panel-count">{filteredTodos.length}</span>
            </div>

            {/* BODY - show to-do notes in a list with visible scroll bar on demand */}
            <div className="panel-body">
                {sortedTodos.length === 0 && (
                    <p className="panel-empty">No to-do notes yet...</p>
                )}

                {pinnedTodos.length > 0 && unpinnedTodos.length > 0 && (
                    <>
                        {pinnedTodos.map(todo => (
                            <TodoCard
                                key={todo.id}
                                todo={todo}
                                onPin={pinTodo}
                                onEdit={onEdit}
                                onDelete={deleteTodo}
                            />
                        ))}

                        <div className="panel-divider" />

                        {unpinnedTodos.map(todo => (
                            <TodoCard
                                key={todo.id}
                                todo={todo}
                                onPin={pinTodo}
                                onEdit={onEdit}
                                onDelete={deleteTodo}
                            />
                        ))}
                    </>
                )}

                {(pinnedTodos.length === 0 || unpinnedTodos.length === 0) &&
                    sortedTodos.map(todo => (
                        <TodoCard
                            key={todo.id}
                            todo={todo}
                            onPin={pinTodo}
                            onEdit={onEdit}
                            onDelete={deleteTodo}
                        />
                    ))
                }
            </div>
        </div>
    )
}

export default TodoPanel