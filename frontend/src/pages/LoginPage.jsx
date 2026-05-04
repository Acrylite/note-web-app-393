import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import Background from '../components/Background/Background'
import logo from '../assets/hcmus_logo.png'
import './LoginPage.css'

function LoginPage() {
    const { loginWithEmail, signupWithEmail, loginWithGoogle } = useAuth()

    const [isSignup, setIsSignup] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    // translate Firebase error messages
    const parseError = (code) => {
        switch (code) {
            case 'auth/invalid-credential':
            case 'auth/wrong-password':
            case 'auth/user-not-found':
                return 'Incorrect email or password'
            case 'auth/email-already-in-use':
                return 'An account with this email already exists'
            case 'auth/weak-password':
                return 'Password must be at least 6 characters'
            case 'auth/invalid-email':
                return 'Please enter a valid email address'
            case 'auth/popup-closed-by-user':
                return 'Google Sign-in was cancelled'
            case 'auth/too-many-requests':
                return 'Too many attempts - Please try again later'
            default:
                return 'Something went wrong — Please try again'
        }
    }

    const handleEmailAuth = async () => {
        setError('')

        if (isSignup && password !== confirmPassword) {
            setError('Passwords do not match')
            return
        }

        setLoading(true)
        try {
            isSignup
                ? await signupWithEmail(email, password)
                : await loginWithEmail(email, password)
        } catch (err) {
            setError(parseError(err.code))
        } finally {
            setLoading(false)
        }
    }

    const handleGoogle = async () => {
        setError('')
        setLoading(true)
        try {
            await loginWithGoogle()
        } catch (err) {
            setError(parseError(err.code))
        } finally {
            setLoading(false)
        }
    }

    const handleToggleMode = () => {
        setIsSignup(prev => !prev)
        setError('')
        setConfirmPassword('')
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') handleEmailAuth()
    }
    return (
        <>
            <Background />

            <div className="login-page">
                <div className="login-card">

                    {/* app icon and name */}
                    <div className="login-header">
                        
                        <div className="login-icon-wrap">
                            <img src={logo} alt="HCMUS Logo" className="login-icon-img" />
                        </div>
                        <h1 className="login-title">Personal Note Webapp</h1>
                        <p className="login-subtitle">
                            {isSignup ? 'Create an account' : 'Welcome back'}
                        </p>
                    </div>

                    {/* login fields input */}
                    <div className="login-fields">
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            onKeyDown={handleKeyDown}
                            disabled={loading}
                            className="login-input"
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            onKeyDown={handleKeyDown}
                            disabled={loading}
                            className="login-input"
                        />
                        {isSignup && (
                            <input
                                type="password"
                                placeholder="Confirm password"
                                value={confirmPassword}
                                onChange={e => setConfirmPassword(e.target.value)}
                                onKeyDown={handleKeyDown}
                                disabled={loading}
                                className="login-input"
                            />
                        )}
                    </div>

                    {error && (
                        <p className="login-error">{error}</p>
                    )}

                    {/* login buttons */}
                    <div className="login-actions">
                        <button
                            className="btn-primary"
                            onClick={handleEmailAuth}
                            disabled={loading}
                        >
                            {loading
                                ? '...'
                                : isSignup ? 'Create account' : 'Log in'}
                        </button>

                        <div className="login-divider">
                            <span>or</span>
                        </div>

                        <button
                            className="btn-google"
                            onClick={handleGoogle}
                            disabled={loading}
                        >
                            Continue with Google
                        </button>
                    </div>

                    {/* switch between login and sign up */}
                    {!loading && (
                        <p className="login-toggle">
                            {isSignup ? 'Already have an account? ' : 'Need an account? '}
                            <span onClick={handleToggleMode}>
                                {isSignup ? 'Log in' : 'Sign up'}
                            </span>
                        </p>
                    )}

                </div>
            </div>
        </>
    )
}

export default LoginPage