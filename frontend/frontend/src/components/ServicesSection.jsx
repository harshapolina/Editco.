import { useState, useEffect, useRef } from 'react'
import './ServicesSection.css'
import ServiceCard from './ServiceCard'

const services = [
  {
    id: 0,
    title: 'What We Ship',
    description: 'Built to work. Built to scale.\nWeb, AI, and creative — done right.',
    isIntro: true
  },
  {
    id: 1,
    title: 'AI Automations',
    description: 'We automate your daily work using AI.\nFrom WhatsApp replies to emails and CRM updates, everything runs on auto.\nSave time. Reduce manual work. Get faster results.'
  },
  {
    id: 2,
    title: 'Websites using MERN',
    description: 'We build fast and scalable websites using MERN stack.\nPerfect for startups, platforms, and custom products.\nSecure, modern, and built for growth.'
  },
  {
    id: 3,
    title: 'Websites using WordPress',
    description: 'We create clean and powerful WordPress websites.\nEasy to manage, mobile-friendly, and SEO-ready.\nBest for businesses, portfolios, and blogs.'
  },
  {
    id: 4,
    title: 'Digital Marketing',
    description: 'We help your brand reach the right audience.\nAds, content, and growth strategies that actually work.\nFocus on results, not just likes.'
  },
  {
    id: 5,
    title: 'Video Editing',
    description: 'We edit videos that grab attention.\nReels, YouTube videos, ads, and promos.\nSmooth cuts, clean visuals, and strong storytelling.'
  },
  {
    id: 6,
    title: 'Graphic Designing',
    description: 'We design visuals that speak your brand.\nPosters, banners, creatives, and thumbnails.\nSimple, bold, and eye-catching designs.'
  },
  {
    id: 7,
    title: 'AI Chatbots',
    description: 'We build smart AI chatbots for your business.\n24/7 customer support on WhatsApp or website.\nInstant replies, lead capture, and better conversions.'
  },
  {
    id: 8,
    title: 'AI Websites',
    description: 'We create AI-powered websites that do more than just look good.\nSmart forms, AI chat, and automated actions.\nFuture-ready websites for modern businesses.'
  },
  {
    id: 9,
    title: 'Social Media Management',
    description: 'We manage your social media end-to-end.\nContent, posting, engagement, and growth.\nYou focus on business, we handle the socials.'
  },
  {
    id: 10,
    title: 'Logo & Brand Identity',
    description: 'We build your brand from scratch.\nLogo, colors, fonts, and brand style.\nA clear identity that people remember.'
  },
  {
    id: 11,
    title: 'SEO Services',
    description: 'We optimize your website for Google.\nBetter ranking, more traffic, real growth.\nLong-term results, not shortcuts.'
  }
]

function ServicesSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isSectionActive, setIsSectionActive] = useState(false)
  const sectionRef = useRef(null)
  const cardRefs = useRef([])
  const animationFrameRef = useRef(null)
  const lastScrollTimeRef = useRef(0)
  const scrollLockedRef = useRef(false)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const cardCount = services.length
    const viewportHeight = window.innerHeight
    
    // Set section height to accommodate all cards
    const sectionHeight = cardCount * viewportHeight
    section.style.height = `${sectionHeight}px`

    // Smooth interpolation function
    const lerp = (start, end, factor) => {
      return start + (end - start) * factor
    }

    // Store current values for smooth interpolation
    const currentValues = cardRefs.current.map(() => ({
      scale: 1,
      translateY: 0,
      opacity: 1,
      blur: 0
    }))

    const updateCards = () => {
      const scrollTop = window.scrollY || window.pageYOffset
      const sectionRect = section.getBoundingClientRect()
      
      const sectionTop = section.offsetTop
      const scrollIntoSection = Math.max(0, scrollTop - sectionTop)
      const cardHeight = viewportHeight

      let newActiveIndex = 0
      if (sectionRect.top <= viewportHeight && sectionRect.bottom >= 0) {
        if (scrollIntoSection > 0) {
          newActiveIndex = Math.floor(scrollIntoSection / cardHeight)
        }
        newActiveIndex = Math.max(0, Math.min(newActiveIndex, cardCount - 1))
      }

      const cardStart = newActiveIndex * cardHeight
      const cardProgress = (scrollIntoSection - cardStart) / cardHeight
      const clampedProgress = Math.max(0, Math.min(1, cardProgress))

      if (newActiveIndex !== activeIndex) {
        setActiveIndex(newActiveIndex)
      }

      // Update card transforms with smooth interpolation
      cardRefs.current.forEach((card, index) => {
        if (!card) return

        const isActive = index === newActiveIndex
        const isBefore = index < newActiveIndex
        const isAfter = index > newActiveIndex

        let targetScale = 1
        let targetTranslateY = 0
        let targetOpacity = 1
        let targetZIndex = cardCount - index
        let targetBlur = 0

        if (isActive) {
          // Active card: minimal movement for smoothness
          const progressOffset = (clampedProgress - 0.5) * 10 // Reduced from 30
          targetScale = 1 - Math.abs(clampedProgress - 0.5) * 0.04 // Reduced from 0.08
          targetTranslateY = progressOffset
          targetOpacity = 1
          targetZIndex = cardCount + 1
          targetBlur = 0
        } else if (isBefore) {
          const distance = newActiveIndex - index
          targetScale = Math.max(0.75, 0.85 - (distance - 1) * 0.05)
          targetTranslateY = 60 + Math.max(0, (distance - 1)) * 30 // Reduced movement
          targetOpacity = Math.max(0.4, 0.65 - Math.max(0, (distance - 1)) * 0.15)
          targetBlur = 3 + Math.max(0, (distance - 1)) * 1.5 // Reduced blur
        } else if (isAfter) {
          const distance = index - newActiveIndex
          targetScale = Math.max(0.75, 0.85 - (distance - 1) * 0.05)
          targetTranslateY = -60 - Math.max(0, (distance - 1)) * 30 // Reduced movement
          targetOpacity = Math.max(0.4, 0.65 - Math.max(0, (distance - 1)) * 0.15)
          targetBlur = 3 + Math.max(0, (distance - 1)) * 1.5 // Reduced blur
        }

        // Smooth interpolation (lerp) for buttery smooth animation
        const lerpFactor = 0.15 // Adjust for smoothness (higher = faster, lower = smoother)
        currentValues[index].scale = lerp(currentValues[index].scale, targetScale, lerpFactor)
        currentValues[index].translateY = lerp(currentValues[index].translateY, targetTranslateY, lerpFactor)
        currentValues[index].opacity = lerp(currentValues[index].opacity, targetOpacity, lerpFactor)
        currentValues[index].blur = lerp(currentValues[index].blur, targetBlur, lerpFactor)

        // Apply transforms using transform3d for hardware acceleration
        card.style.transform = `translate3d(0, ${currentValues[index].translateY}px, 0) scale(${currentValues[index].scale})`
        card.style.opacity = Math.max(0.2, currentValues[index].opacity)
        card.style.zIndex = targetZIndex
        card.style.filter = `blur(${currentValues[index].blur}px)`
        card.style.transformOrigin = 'center center'
      })
    }

    // Smooth animation loop using requestAnimationFrame
    const animate = () => {
      updateCards()
      animationFrameRef.current = requestAnimationFrame(animate)
    }

    // Scroll locking handler
    const handleWheel = (e) => {
      const sectionRect = section.getBoundingClientRect()
      const isInSection = sectionRect.top <= viewportHeight && sectionRect.bottom >= 0
      
      if (!isInSection) {
        scrollLockedRef.current = false
        setIsSectionActive(false)
        return
      }

      const scrollTop = window.scrollY || window.pageYOffset
      const sectionTop = section.offsetTop
      const scrollIntoSection = Math.max(0, scrollTop - sectionTop)
      
      // Calculate current card index
      let currentCardIndex = 0
      if (scrollIntoSection > 0) {
        currentCardIndex = Math.floor(scrollIntoSection / viewportHeight)
      }
      currentCardIndex = Math.max(0, Math.min(currentCardIndex, cardCount - 1))
      
      const maxScroll = (cardCount - 1) * viewportHeight
      // More lenient threshold for last card detection - allows smooth transition
      const isAtLastCard = currentCardIndex >= cardCount - 1 && scrollIntoSection >= maxScroll - 50
      const isAtFirstCard = currentCardIndex === 0 && scrollIntoSection <= 50

      // If at first card and scrolling up, allow smooth scroll to previous section (hero)
      if (isAtFirstCard && e.deltaY < 0) {
        scrollLockedRef.current = false
        setIsSectionActive(false)
        // Don't prevent default - allow natural smooth scroll back to hero
        return // Allow normal scroll
      }

      // If at last card and scrolling down, allow smooth scroll to next section
      if (isAtLastCard && e.deltaY > 0) {
        scrollLockedRef.current = false
        setIsSectionActive(false)
        // Don't prevent default - allow natural smooth scroll to next section
        return // Allow normal scroll
      }

      // When entering from hero section (first card, scrolling down), allow smooth transition
      if (isAtFirstCard && e.deltaY > 0 && scrollIntoSection < 100) {
        // Allow initial smooth scroll into the section
        setIsSectionActive(true)
        scrollLockedRef.current = false
        return // Don't lock yet, allow smooth entry
      }

      setIsSectionActive(true)
      scrollLockedRef.current = true

      // Only lock scroll when we're in the middle of the section
      setIsSectionActive(true)
      scrollLockedRef.current = true

      // If scrolling down and not at last card, prevent default and scroll to next card
      if (e.deltaY > 0 && !isAtLastCard) {
        e.preventDefault()
        e.stopPropagation()
        
        // Calculate next card position
        const nextCardIndex = Math.min(currentCardIndex + 1, cardCount - 1)
        const targetScroll = sectionTop + (nextCardIndex * viewportHeight)
        
        window.scrollTo({
          top: targetScroll,
          behavior: 'smooth'
        })
        return false
      }

      // If scrolling up within section, allow scroll to previous card
      if (e.deltaY < 0 && currentCardIndex > 0 && !isAtFirstCard) {
        e.preventDefault()
        e.stopPropagation()
        
        const prevCardIndex = Math.max(currentCardIndex - 1, 0)
        const targetScroll = sectionTop + (prevCardIndex * viewportHeight)
        
        window.scrollTo({
          top: targetScroll,
          behavior: 'smooth'
        })
        return false
      }
    }

    // Throttled scroll handler
    const handleScroll = () => {
      const now = performance.now()
      // Throttle to ~60fps
      if (now - lastScrollTimeRef.current >= 16) {
        lastScrollTimeRef.current = now
      }
    }

    // Start animation loop
    animationFrameRef.current = requestAnimationFrame(animate)

    // Also listen to resize to recalculate on viewport changes
    const handleResize = () => {
      const sectionHeight = cardCount * window.innerHeight
      section.style.height = `${sectionHeight}px`
      updateCards()
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleResize, { passive: true })
    window.addEventListener('wheel', handleWheel, { passive: false })
    updateCards() // Initial call

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('wheel', handleWheel)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [activeIndex])

  return (
    <section id="why-us" className="services-section" ref={sectionRef}>
      <div className="services-container">
        <div className="services-cards-wrapper">
          {services.map((service, index) => (
            <div
              key={service.id}
              ref={(el) => (cardRefs.current[index] = el)}
              className={`service-card-wrapper ${index === activeIndex ? 'active' : ''}`}
            >
              <ServiceCard
                title={service.title}
                description={service.description}
                index={index}
                isIntro={service.isIntro}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ServicesSection
