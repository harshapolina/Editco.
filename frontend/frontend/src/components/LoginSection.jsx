import { useState } from 'react'
import './LoginSection.css'

function LoginSection() {
  const [form, setForm] = useState({ email: '', password: '', name: '' })
  const [status, setStatus] = useState({ loading: false, message: '', variant: '' })
  const [mode, setMode] = useState('login') // 'login' | 'register'

  const apiBase = import.meta.env.VITE_API_URL || 'http://localhost:5000'

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus({ loading: true, message: '', variant: '' })

    const endpoint = mode === 'login' ? '/api/auth/login' : '/api/auth/register'
    const payload =
      mode === 'login'
        ? { email: form.email, password: form.password }
        : { name: form.name, email: form.email, password: form.password }

    try {
      const res = await fetch(`${apiBase}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || `${mode} failed`)

      if (mode === 'login') {
        setStatus({ loading: false, message: 'Login successful', variant: 'success' })
        const home = document.getElementById('home')
        if (home) home.scrollIntoView({ behavior: 'smooth' })
      } else {
        setStatus({ loading: false, message: 'Registered successfully. Please log in.', variant: 'success' })
        setMode('login')
      }
    } catch (err) {
      setStatus({ loading: false, message: err.message || 'Something went wrong', variant: 'error' })
    }
  }

  const toggleMode = () => {
    setStatus({ loading: false, message: '', variant: '' })
    setMode((prev) => (prev === 'login' ? 'register' : 'login'))
  }

  return (
    <section id="login" className="login-section">
      <div className="login-container">
        <div className="login-copy">
          <h2>Let’s get to work.</h2>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          {mode === 'register' && (
            <label className="login-label">
              Name
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Your name"
                required
              />
            </label>
          )}
          <label className="login-label">
            Email
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@email.com"
              required
            />
          </label>
          <label className="login-label">
            Password
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
            />
          </label>

          <div className="login-actions">
            <button type="submit" className="login-btn primary" disabled={status.loading}>
              {status.loading ? 'Loading…' : mode === 'login' ? 'Login' : 'Register'}
            </button>
            <button type="button" className="login-btn ghost" onClick={toggleMode} disabled={status.loading}>
              {mode === 'login' ? 'Need an account? Register' : 'Have an account? Login'}
            </button>
          </div>

          {status.message && (
            <div className={`login-status ${status.variant}`}>
              {status.message}
            </div>
          )}
        </form>
      </div>
    </section>
  )
}

export default LoginSection

