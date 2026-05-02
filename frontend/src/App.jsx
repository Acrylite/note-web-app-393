// src/App.jsx
import { AuthProvider, useAuth } from './context/AuthContext'
import { NotesProvider }         from './context/NotesContext'
import LoginPage                 from './pages/LoginPage'
import HomePage                  from './pages/HomePage'

// inner component so it can access AuthContext via useAuth
function AppContent() {
  const { user } = useAuth()

  // user is null  → not logged in → show login
  // user is set   → logged in     → show app
  return user ? <HomePage /> : <LoginPage />
}

function App() {
  return (
    <AuthProvider>
      {/* NotesProvider is inside AuthProvider so it can read the token */}
      <NotesProvider>
        <AppContent />
      </NotesProvider>
    </AuthProvider>
  )
}

export default App