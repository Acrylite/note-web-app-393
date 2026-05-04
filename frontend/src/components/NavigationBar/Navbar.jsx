import { useState } from 'react'
import Sidebar from '../Sidebar/Sidebar'
import logo from '../../assets/hcmus_logo.png'

function Navbar() {
    const [sidebarOpen, setSidebarOpen] = useState(false)

    return (
        <>
            <nav className="navbar">
                <div className="navbar-inner">
                    <div className="navbar-left">
                        <div className="app-icon-wrap">
                            <img src={logo} alt="HCMUS Logo" className="login-icon-img" />
                        </div>
                        <span className="app-name">Personal Note Webapp</span>
                    </div>
                    <button className="burger-btn" onClick={() => setSidebarOpen(true)}>
                        <span /><span /><span />
                    </button>
                </div>
            </nav>
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        </>
    )
}

export default Navbar