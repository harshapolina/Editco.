import { useState, useEffect } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import ServicesSection from './components/ServicesSection'
import WorksSection from './components/WorksSection'
import OurTeamSection from './components/OurTeamSection'
import RenderEngineSection from './components/RenderEngineSection'
import BuiltBySection from './components/BuiltBySection'
import LoginSection from './components/LoginSection'
import Footer from './components/Footer'
import GetStartedForm from './components/GetStartedForm'
import AdminLogin from './components/AdminLogin'
import AdminDashboard from './components/AdminDashboard'

function App() {
  const [currentHash, setCurrentHash] = useState(window.location.hash)
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false)

  useEffect(() => {
    const handleHashChange = () => {
      const newHash = window.location.hash
      setCurrentHash(newHash)
      
      // Check admin auth when hash changes to admin
      if (newHash === '#admin') {
        checkAdminAuth()
      } else {
        setIsAdminAuthenticated(false)
      }
    }

    // Check if admin is already authenticated
    const checkAdminAuth = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/admin/login-history', {
          credentials: 'include'
        })
        if (response.ok) {
          setIsAdminAuthenticated(true)
        } else {
          setIsAdminAuthenticated(false)
        }
      } catch (error) {
        setIsAdminAuthenticated(false)
      }
    }

    // Set initial hash and check if admin
    const initialHash = window.location.hash
    setCurrentHash(initialHash)
    if (initialHash === '#admin') {
      checkAdminAuth()
    }

    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  const handleAdminLogin = () => {
    setIsAdminAuthenticated(true)
    // Ensure hash is set
    if (window.location.hash !== '#admin') {
      window.location.hash = '#admin'
    }
  }

  const handleAdminLogout = async () => {
    try {
      await fetch('http://localhost:5000/api/admin/logout', {
        method: 'POST',
        credentials: 'include'
      })
    } catch (error) {
      console.error('Logout error:', error)
    }
    setIsAdminAuthenticated(false)
    window.location.hash = ''
  }

  if (currentHash === '#get-started') {
    return (
      <div className="app">
        <Navbar />
        <GetStartedForm />
        <Footer />
      </div>
    )
  }

  if (currentHash === '#admin') {
    if (!isAdminAuthenticated) {
      return (
        <div className="app">
          <Navbar />
          <AdminLogin onLoginSuccess={handleAdminLogin} />
        </div>
      )
    }
    return (
      <div className="app">
        <Navbar />
        <AdminDashboard onLogout={handleAdminLogout} />
      </div>
    )
  }

  return (
    <div className="app">
      <Navbar />
      <Hero />
      <ServicesSection />
      <WorksSection />
      <OurTeamSection />
      <RenderEngineSection />
      <BuiltBySection />
      <LoginSection />
      <Footer />
    </div>
  )
}
export default App