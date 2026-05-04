import { AuthProvider, useAuth } from './context/AuthContext'
import { NotesProvider } from './context/NotesContext'
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'

function AppContent() {
    const { user } = useAuth()
    return user ? <HomePage /> : <LoginPage />
}

function App() {
    return (
        <AuthProvider>
            <NotesProvider>
                <AppContent />
            </NotesProvider>
        </AuthProvider>
    )
}

export default App