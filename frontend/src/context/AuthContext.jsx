import { createContext, useContext, useState, useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../services/firebase'
import {
	loginWithEmail,
	signupWithEmail,
	loginWithGoogle,
	logout,
	getToken,
} from '../services/auth'

export const AuthContext = createContext()

export function AuthProvider({ children }) {
	const [user, setUser] = useState(null)
	const [token, setToken] = useState(null)
	const [loading, setLoading] = useState(true)

	const [theme, setTheme] = useState(() => {
		return localStorage.getItem('theme') || 'light'
	})

	useEffect(() => {
		document.documentElement.classList.toggle('dark', theme === 'dark')
		localStorage.setItem('theme', theme)
	}, [theme])

	const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light')

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
			if (firebaseUser) {
				const idToken = await getToken()
				setUser(firebaseUser)
				setToken(idToken)
			} else {
				setUser(null)
				setToken(null)
			}
			setLoading(false)
		})

		return () => unsubscribe()
	}, [])

	useEffect(() => {
		if (!user) return
		const interval = setInterval(async () => {
			const fresh = await getToken(true)
			setToken(fresh)
		}, 55 * 60 * 1000)
		return () => clearInterval(interval)
	}, [user])

	return (
		<AuthContext.Provider value={{
			user,
			token,
			loading,
			theme,
			toggleTheme,
			loginWithEmail,
			signupWithEmail,
			loginWithGoogle,
			logout,
		}}>
			{!loading && children}
		</AuthContext.Provider>
	)
}

export const useAuth = () => useContext(AuthContext)