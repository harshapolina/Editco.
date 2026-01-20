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

function App() {
  const [currentHash, setCurrentHash] = useState(window.location.hash)

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentHash(window.location.hash)
    }

    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  if (currentHash === '#get-started') {
    return (
      <div className="app">
        <Navbar />
        <GetStartedForm />
        <Footer />
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