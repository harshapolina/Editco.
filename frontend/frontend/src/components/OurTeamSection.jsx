import { useState, useEffect, useRef } from 'react'
import './OurTeamSection.css'
import TeamCard from './TeamCard'

const members = [
  {
    id: 1,
    name: 'Tej Balam',
    role: 'Co-founder',
    image: 'https://res.cloudinary.com/dqataciy5/image/upload/v1759494875/IMG_7173_fuk9wf.jpg',
    linkedin: 'https://www.linkedin.com/in/sripavantejbalam/'
  },
  {
    id: 2,
    name: 'Deepika Mundla',
    role: 'Co-founder',
    image: 'https://res.cloudinary.com/dqataciy5/image/upload/v1759729626/deepika_JPG_ylslw4.jpg',
    linkedin: 'https://www.linkedin.com/in/deepika-mundla/'
  },
  {
    id: 3,
    name: 'Harsha Polina',
    role: 'Co-founder',
    image: 'https://res.cloudinary.com/dqataciy5/image/upload/v1759729526/harsha_png_j8dd1t.jpg',
    linkedin: 'https://www.linkedin.com/in/harsha-polina/'
  }
]

function OurTeamSection() {
  const [isInView, setIsInView] = useState(false)
  const sectionRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
            setIsInView(true)
          }
        })
      },
      { threshold: 0.3 }
    )

    observer.observe(section)

    return () => {
      observer.disconnect()
    }
  }, [])

  return (
    <section id="hire" className="our-team-section" ref={sectionRef}>
      <div className="team-container">
        {/* Left Side - Text Content */}
        <div className={`team-content ${isInView ? 'visible' : ''}`}>
          <h2 className="team-heading">The minds behind <span className='editco'>Editco.</span></h2>
          <p className="team-description">
          At Editco, we are a small but focused team of designers, developers, and creators who love building things that work. We believe in clear ideas, clean execution, and real results. Every project we take on is handled with care, speed, and attention to detail, making sure our clients get work that actually helps their business grow.
          </p>
          <button 
            className="team-join-btn"
            onClick={() => {
              const loginSection = document.getElementById('login')
              if (loginSection) {
                loginSection.scrollIntoView({ behavior: 'smooth' })
              }
            }}
          >
            Meet Team
          </button>
        </div>

        {/* Right Side - Team Cards */}
        <div className="team-cards-wrapper">
          {members.map((member, index) => (
            <TeamCard
              key={member.id}
              member={member}
              isMain={index === 1} // Center card (Deepika) is main
              isInView={isInView}
              delay={index * 0.15}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default OurTeamSection

