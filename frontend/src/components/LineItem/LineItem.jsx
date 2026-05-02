// component for each line in a note
function LineItem({ line, readOnly = true, onChange, onTypeChange }) {
    const handleCheck = (e) => {
        if (onChange) onChange({ ...line, done: e.target.checked })
    }

    const handleText = (e) => {
        if (onChange) onChange({ ...line, text: e.target.value })
    }

    // read mode
    if (readOnly) {
        if (line.type === 'check') {
            return (
                <div className="line-row">
                    <input type="checkbox" checked={line.done} onChange={handleCheck} />
                    <span style={{ textDecoration: line.done ? 'line-through' : 'none' }}>
                        {line.text}
                    </span>
                </div>
            )
        }
        if (line.type === 'bullet') {
            return (
                <div className="line-row">
                    <span className="bullet-dot" />
                    <span>{line.text}</span>
                </div>
            )
        }
        return (
            <div className="line-row">
                <span>{line.text}</span>
            </div>
        )
    }

    // edit mode
    return (
        <div className="line-row">
            <button className="type-btn" onClick={() => onTypeChange(line.id)}>
                {line.type === 'check' ? '☑' : line.type === 'bullet' ? '•' : 'T'}
            </button>
            {line.type === 'check' && <input type="checkbox" disabled />}
            {line.type === 'bullet' && <span className="bullet-dot" />}
            <button className="delete-btn" onClick={() => onRemove(line.id)}>
                ✕
            </button>
            <input
                type="text"
                value={line.text}
                onChange={handleText}
                placeholder="Type here..."
                className="line-input"
            />
        </div>
    )
}

export default LineItem