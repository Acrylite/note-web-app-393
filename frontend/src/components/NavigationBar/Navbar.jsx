import { useState } from 'react'
import Sidebar from '../Sidebar/Sidebar'

function Navbar() {
    const [sidebarOpen, setSidebarOpen] = useState(false)

    return (
        <>
            <nav className="navbar">

                {/* school logo */}
                <div className="navbar-left">
                    <div className="app-icon">
                        {/* swap this for an actual <img> later */}
                        icon
                    </div>
                    <span className="app-name">your app name</span>
                </div>

                {/* sidebar burger menu */}
                <button
                    className="burger-btn"
                    onClick={() => setSidebarOpen(true)}
                >
                    <span /><span /><span />
                </button>

            </nav>

            <Sidebar
                isOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
            />
        </>
    )
}

export default Navbar