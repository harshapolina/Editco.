import { useState, useEffect, useRef } from 'react'
import './Hero.css'

function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const heroRef = useRef(null)

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect()
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        })
      }
    }

    const heroElement = heroRef.current
    if (heroElement) {
      heroElement.addEventListener('mousemove', handleMouseMove)
    }

    return () => {
      if (heroElement) {
        heroElement.removeEventListener('mousemove', handleMouseMove)
      }
    }
  }, [])

  return (
    <section id="home" className="hero" ref={heroRef}>
      <div 
        className="hero-glow" 
        style={{
          '--mouse-x': `${mousePosition.x}px`,
          '--mouse-y': `${mousePosition.y}px`
        }}
      />
      <div className="hero-nav">
        <div className="hero-logo">LoopAudit</div>
        <nav className="hero-nav-links">
          <a href="#home">Home</a>
          <a href="#features">Features</a>
          <a href="#how-it-works">How It Works</a>
          <a href="#pricing">Pricing</a>
          <a href="#docs">Docs</a>
        </nav>
        <button className="hero-join-btn">Join Now</button>
      </div>
      <div className="hero-container">
        <div className="hero-content">
          <h1 className="hero-heading">
            <span className="hero-heading-bold">We Build. We Automate. You Scale.</span>
          </h1>
          <p className="hero-description">
            Clean websites, smart automations, and creative systems that actually perform.
          </p>
          <div className="hero-buttons">
            <button className="btn-hero-primary" onClick={() => { window.location.hash = 'get-started' }}>Get Started</button>
            <button className="btn-hero-secondary" onClick={() => {
              const worksSection = document.getElementById('learn')
              if (worksSection) {
                worksSection.scrollIntoView({ behavior: 'smooth' })
              }
            }}>Explore Work</button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
