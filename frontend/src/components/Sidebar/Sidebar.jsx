import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import './Sidebar.css'

function Sidebar({ isOpen, onClose }) {
    const { user, logout, theme, toggleTheme } = useContext(AuthContext)

    const handleLogout = async () => {
        await logout()
        onClose()
    }

    return (
        <>
            {/* dark overlay behind sidebar */}
            {isOpen && (
                <div className="sidebar-overlay" onClick={onClose} />
            )}

            <div className={`sidebar ${isOpen ? 'open' : ''}`}>

                <button className="sidebar-close" onClick={onClose}>✕</button>

                {/* user info */}
                <div className="sidebar-user">
                    <div className="user-avatar">
                        {user?.email?.[0].toUpperCase()}
                    </div>
                    <span className="user-email">{user?.email}</span>
                </div>

                <div className="sidebar-divider" />

                {/* settings */}
                <div className="sidebar-links">
                    <button className="sidebar-link">settings</button>
                    <button className="sidebar-link" onClick={toggleTheme}>
                        {theme === 'light' ? '🌙 dark mode' : '☀️ light mode'}
                    </button>
                    <button className="sidebar-link logout" onClick={handleLogout}>
                        log out
                    </button>
                </div>

            </div>
        </>
    )
}

export default Sidebar