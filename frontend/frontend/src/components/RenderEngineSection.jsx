import { useState, useEffect, useRef } from 'react'
import './RenderEngineSection.css'

function RenderEngineSection() {
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
    <section id="why-editco" className="render-engine-section" ref={sectionRef}>
      <WhyThisCohort isInView={isInView} />
      <OurImpact isInView={isInView} />
    </section>
  )
}

function WhyThisCohort({ isInView }) {
  return (
    <section className={`why-cohort-section ${isInView ? 'visible' : ''}`}>
      <h2 className="cohort-heading">WHY Editco?</h2>

      <div className="flow-diagram">
        <svg 
          viewBox="0 0 800 220" 
          className="flow-svg"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <linearGradient id="glowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="hsl(64 100% 50% / 0)" />
              <stop offset="40%" stopColor="hsl(64 100% 50% / 0)" />
              <stop offset="50%" stopColor="hsl(64 100% 50% / 1)" />
              <stop offset="60%" stopColor="hsl(64 100% 50% / 0)" />
              <stop offset="100%" stopColor="hsl(64 100% 50% / 0)" />
            </linearGradient>
            
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="6" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>

            <linearGradient id="movingGlow1">
              <stop offset="0%" stopColor="hsl(64 100% 50% / 0)">
                <animate attributeName="offset" values="-0.3;1" dur="3s" repeatCount="indefinite" />
              </stop>
              <stop offset="5%" stopColor="hsl(64 100% 50% / 1)">
                <animate attributeName="offset" values="-0.2;1.1" dur="3s" repeatCount="indefinite" />
              </stop>
              <stop offset="10%" stopColor="hsl(64 100% 50% / 0)">
                <animate attributeName="offset" values="-0.1;1.2" dur="3s" repeatCount="indefinite" />
              </stop>
            </linearGradient>

            <linearGradient id="movingGlow2">
              <stop offset="0%" stopColor="hsl(64 100% 50% / 0)">
                <animate attributeName="offset" values="-0.3;1" dur="3s" repeatCount="indefinite" begin="1.5s" />
              </stop>
              <stop offset="5%" stopColor="hsl(64 100% 50% / 1)">
                <animate attributeName="offset" values="-0.2;1.1" dur="3s" repeatCount="indefinite" begin="1.5s" />
              </stop>
              <stop offset="10%" stopColor="hsl(64 100% 50% / 0)">
                <animate attributeName="offset" values="-0.1;1.2" dur="3s" repeatCount="indefinite" begin="1.5s" />
              </stop>
            </linearGradient>

            <linearGradient id="movingGlow3">
              <stop offset="0%" stopColor="hsl(64 100% 50% / 0)">
                <animate attributeName="offset" values="-0.3;1" dur="3s" repeatCount="indefinite" begin="0.75s" />
              </stop>
              <stop offset="5%" stopColor="hsl(64 100% 50% / 1)">
                <animate attributeName="offset" values="-0.2;1.1" dur="3s" repeatCount="indefinite" begin="0.75s" />
              </stop>
              <stop offset="10%" stopColor="hsl(64 100% 50% / 0)">
                <animate attributeName="offset" values="-0.1;1.2" dur="3s" repeatCount="indefinite" begin="0.75s" />
              </stop>
            </linearGradient>
          </defs>

          <path
            d="M 60 110 L 155 110 A 220 80 0 0 1 310 35"
            fill="none"
            stroke="hsl(0 0% 25%)"
            strokeWidth="1.5"
            opacity="0.6"
          />
          
          <path
            d="M 490 35 A 220 80 0 0 1 645 110 L 740 110"
            fill="none"
            stroke="hsl(0 0% 25%)"
            strokeWidth="1.5"
            opacity="0.6"
          />
          
          <path
            d="M 60 110 L 310 110"
            fill="none"
            stroke="hsl(0 0% 25%)"
            strokeWidth="1.5"
            opacity="0.6"
          />
          
          <path
            d="M 490 110 L 740 110"
            fill="none"
            stroke="hsl(0 0% 25%)"
            strokeWidth="1.5"
            opacity="0.6"
          />
          
          <path
            d="M 60 110 L 155 110 A 220 80 0 0 0 310 185"
            fill="none"
            stroke="hsl(0 0% 25%)"
            strokeWidth="1.5"
            opacity="0.6"
          />
          
          <path
            d="M 490 185 A 220 80 0 0 0 645 110 L 740 110"
            fill="none"
            stroke="hsl(0 0% 25%)"
            strokeWidth="1.5"
            opacity="0.6"
          />

          <path
            d="M 60 110 L 155 110 A 220 80 0 0 1 645 110 L 740 110"
            fill="none"
            stroke="url(#movingGlow1)"
            strokeWidth="4"
            filter="url(#glow)"
            opacity="0.9"
          />
          
          <path
            d="M 60 110 L 740 110"
            fill="none"
            stroke="url(#movingGlow3)"
            strokeWidth="4"
            filter="url(#glow)"
            opacity="0.9"
          />
          
          <path
            d="M 60 110 L 155 110 A 220 80 0 0 0 645 110 L 740 110"
            fill="none"
            stroke="url(#movingGlow2)"
            strokeWidth="4"
            filter="url(#glow)"
            opacity="0.9"
          />
        </svg>

        <div className="flow-label flow-left">
          <span className="flow-label-main">You Dream It</span>
        </div>

        <div className="flow-label flow-top">
          <span className="flow-label-main">We Plan</span>
        </div>

        <div className="flow-label flow-center">
          <span className="flow-label-main flow-lime">We Ship</span>
        </div>

        <div className="flow-label flow-bottom">
          <span className="flow-label-main">We Improve</span>
        </div>

        <div className="flow-label flow-right">
          <span className="flow-label-main">It Works</span>
        </div>
      </div>
    </section>
  )
}

// Icon Components
function RocketIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4.5 16.5c-1.5 1.5-1.5 4 0 5.5s4 1.5 5.5 0L21 7.5a3.536 3.536 0 0 0-5-5L4.5 16.5Z" />
      <path d="m15 9-3-3" />
      <path d="M9.5 14.5 5 19" />
      <path d="m14 19 5-5" />
      <path d="m19 9-1 1" />
    </svg>
  )
}

function UsersIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  )
}

function ClockIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  )
}

function TrophyIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
      <path d="M4 22h16" />
      <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
      <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
    </svg>
  )
}

function OurImpact({ isInView }) {
  const counterRefs = useRef([])

  useEffect(() => {
    const animateCounter = (element, target) => {
      let current = 0
      const duration = 2000
      const increment = target / (duration / 16)
      
      const timer = setInterval(() => {
        current += increment
        if (current >= target) {
          current = target
          clearInterval(timer)
        }
        element.textContent = Math.floor(current).toString()
      }, 16)
    }

    if (!isInView) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = parseInt(entry.target.getAttribute('data-target') || '0')
            animateCounter(entry.target, target)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.5 }
    )

    counterRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [isInView])

  const impacts = [
    { 
      number: 10, 
      suffix: '+', 
      title: 'Projects Shipped', 
      description: 'We get the brief, ask the right questions, and lock the direction before touching the keyboard.',
      icon: RocketIcon,
      align: 'right'
    },
    { 
      number: 5, 
      suffix: '+', 
      title: 'Happy Clients', 
      description: 'No copy-paste work. Every project is custom, on-brand, and built to solve real problems.',
      icon: UsersIcon,
      align: 'left'
    },
    { 
      number: 2, 
      suffix: '+', 
      title: 'Years in the Game', 
      description: 'This is where we cook. Websites, automations, AI, creatives — built fast, built right.',
      icon: ClockIcon,
      align: 'right'
    },
  ]

  return (
    <section className={`impact-section-new ${isInView ? 'visible' : ''}`}>
      <div className="impact-heading-new">
        {/* <h2 className="impact-title-main">Our Impact</h2> */}
        <h3 className="impact-title-sub">From idea to "damn, this works."</h3>
        <p className="impact-description-intro">
          Here's how Editco turns raw ideas into clean builds, smart systems, and results that actually matter.
        </p>
      </div>

      <div className="impact-vertical-line" />

      <div className="impact-cards-new">
        {impacts.map((impact, index) => {
          const IconComponent = impact.icon
          return (
            <div 
              key={index}
              className={`impact-card-new-wrapper impact-align-${impact.align}`}
            >
              <div className="impact-card-new">
                <div className="impact-icon-container">
                  <IconComponent />
                </div>

                <h4 className="impact-card-title">
                  <span 
                    ref={(el) => (counterRefs.current[index] = el)}
                    data-target={impact.number}
                    className="impact-number-new"
                  >
                    0
                  </span>
                  <span className="impact-suffix">{impact.suffix}</span>
                  <span className="impact-title-text">{impact.title}</span>
                </h4>

                <p className="impact-card-description-new">
                  {impact.description}
                </p>

                <div className={`impact-connector-dot impact-dot-${impact.align}`} />
                <div className={`impact-connector-line impact-line-${impact.align}`} />
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default RenderEngineSection

