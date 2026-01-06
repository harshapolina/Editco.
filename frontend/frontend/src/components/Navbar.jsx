import { useEffect } from 'react'
import './Navbar.css'

function Navbar() {
  useEffect(() => {
    // Smooth scroll handler for anchor links
    const handleSmoothScroll = (e) => {
      const href = e.target.getAttribute('href')
      if (href && href.startsWith('#')) {
        e.preventDefault()
        const targetId = href.substring(1)
        const targetElement = document.getElementById(targetId)
        
        if (targetElement) {
          const navbarHeight = 100 // Account for fixed navbar
          const targetPosition = targetElement.offsetTop - navbarHeight
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          })
        }
      }
    }

    // Add click listeners to all anchor links
    const links = document.querySelectorAll('.nav-link, .brand-link')
    links.forEach(link => {
      link.addEventListener('click', handleSmoothScroll)
    })

    return () => {
      links.forEach(link => {
        link.removeEventListener('click', handleSmoothScroll)
      })
    }
  }, [])

  const handleGetStarted = () => {
    window.location.hash = 'get-started'
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <a href="#home" className="brand-link">Editco.Media</a>
        </div>
        
        <div className="navbar-links">
          <a href="#why-editco" className="nav-link">Why Editco</a>
          <a href="#learn" className="nav-link">Works</a>
          <a href="#login" className="nav-link">Login</a>
        </div>
        
        <button className="navbar-cta" onClick={handleGetStarted}>Get Started</button>
      </div>
    </nav>
  )
}

export default Navbar
