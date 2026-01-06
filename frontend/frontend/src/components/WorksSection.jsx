import { useMemo, useState, useEffect, useRef } from 'react'
import './WorksSection.css'

const projects = [
  {
    id: 1,
    name: 'Editco.media',
    category: 'This Website',
    type: 'websites',
    cloudinaryImage: 'https://res.cloudinary.com/dzn5zamaf/image/upload/v1767692173/Screenshot_2026-01-06_150440_vipiot.png',
    deployedLink: 'https://editcomedia.com',
    gallery: []
  },
  {
    id: 2,
    name: 'Veda AI Sahayak',
    category: 'Web Development',
    type: 'websites',
    cloudinaryImage: 'https://res.cloudinary.com/dzn5zamaf/image/upload/v1759316262/Screenshot_2025-10-01_145908_redpcj.png',
    deployedLink: 'https://masscoders123.netlify.app/',
    gallery: []
  },
  {
    id: 3,
    name: 'WeA',
    category: 'Workflow & Execution App',
    type: 'websites',
    cloudinaryImage: 'https://res.cloudinary.com/dzn5zamaf/image/upload/v1767689951/Screenshot_2026-01-06_142844_itpbpn.png',
    deployedLink: 'https://we-a-lac.vercel.app/',
    gallery: []
  },
  {
    id: 4,
    name: 'AI Automations',
    category: 'Automations',
    type: 'automations',
    cloudinaryImage: 'https://res.cloudinary.com/dzn5zamaf/image/upload/v1767691856/Screenshot_2026-01-06_145913_pgbbis.png',
    deployedLink: null,
    gallery: [
      'https://res.cloudinary.com/dzn5zamaf/image/upload/v1767682871/WhatsApp_Image_2026-01-03_at_9.21.05_PM_iosgbd.jpg',
      'https://res.cloudinary.com/dzn5zamaf/image/upload/v1767682870/WhatsApp_Image_2026-01-02_at_6.09.45_PM_hoagzi.jpg',
      'https://res.cloudinary.com/dzn5zamaf/image/upload/v1767682870/WhatsApp_Image_2026-01-02_at_6.09.46_PM_ardzfs.jpg',
      'https://res.cloudinary.com/dzn5zamaf/image/upload/v1767682870/WhatsApp_Image_2026-01-02_at_6.09.41_PM_tqijrq.jpg',
      'https://res.cloudinary.com/dzn5zamaf/image/upload/v1767682870/WhatsApp_Image_2026-01-02_at_6.09.47_PM_tojgkc.jpg',
      'https://res.cloudinary.com/dzn5zamaf/image/upload/v1767682870/WhatsApp_Image_2026-01-02_at_6.09.46_PM_1_u1crpy.jpg',
      'https://res.cloudinary.com/dzn5zamaf/image/upload/v1767682870/WhatsApp_Image_2026-01-02_at_6.09.38_PM_vemknv.jpg',
      'https://res.cloudinary.com/dzn5zamaf/image/upload/v1767682868/WhatsApp_Image_2026-01-02_at_6.09.37_PM_vdooed.jpg'
    ]
  },
  {
    id: 5,
    name: 'Nike Mobile Design',
    category: 'UI/UX Design',
    type: 'other',
    cloudinaryImage: 'https://res.cloudinary.com/dzn5zamaf/image/upload/v1759316519/Screenshot_2025-10-01_163138_kpr7qj.png',
    deployedLink: 'https://www.figma.com/design/5NbTKMldALdsqo0q64YjZI/project-one?node-id=0-1&p=f&t=HJv5HMGoAJRAVMy1-0',
    gallery: []
  },
  {
    id: 6,
    name: 'MediConnect',
    category: 'People × Opportunities',
    type: 'websites',
    cloudinaryImage: 'https://res.cloudinary.com/dzn5zamaf/image/upload/v1767689952/Screenshot_2026-01-06_142855_qofg57.png',
    deployedLink: 'https://mediconnect-editco.base44.app/',
    gallery: []
  },
  {
    id: 7,
    name: 'Furniture Concept',
    category: 'Web Development',
    type: 'websites',
    cloudinaryImage: 'https://res.cloudinary.com/dzn5zamaf/image/upload/v1767682665/Screenshot_2026-01-06_122729_t2yu9g.png',
    deployedLink: null,
    gallery: []
  },
  {
    id: 8,
    name: 'MovieVerse',
    category: 'Web Development',
    type: 'websites',
    cloudinaryImage: 'https://res.cloudinary.com/dzn5zamaf/image/upload/v1759317012/Screenshot_2025-10-01_163952_p5pdrs.png',
    deployedLink: 'https://hvsmovies.niat.tech/',
    gallery: []
  }
]

function WorksSection() {
  const [selectedProject, setSelectedProject] = useState(null)
  const [showMoreProjects, setShowMoreProjects] = useState(false)
  const [filter, setFilter] = useState('all')
  const modalRef = useRef(null)

  // Scroll to the inline modal when opened
  useEffect(() => {
    if (showMoreProjects && modalRef.current) {
      modalRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [showMoreProjects])

  const displayedProjects = useMemo(() => projects.slice(0, 6), [])
  const remainingProjects = useMemo(() => projects.slice(6), [])
  const allProjects = useMemo(() => projects, [])

  const filteredProjects = useMemo(() => {
    if (filter === 'all') return allProjects
    if (filter === 'ai automations') return allProjects.filter((p) => p.type === 'automations')
    if (filter === 'websites') return allProjects.filter((p) => p.type === 'websites')
    return allProjects.filter((p) => p.type !== 'automations' && p.type !== 'websites')
  }, [allProjects, filter])

  const handleCardClick = (project) => {
    if (project.gallery && project.gallery.length) {
      setSelectedProject(project)
    } else if (project.deployedLink) {
      window.open(project.deployedLink, '_blank', 'noopener,noreferrer')
    }
  }

  const handleCloseModal = () => setSelectedProject(null)

  return (
    <section id="learn" className="works-section">
      <div className="works-container">
        <h2 className="works-title">OUR WORKS</h2>
        
        <div className="works-grid">
          {/* Top row - large image spanning both columns */}
          <div className="work-card work-card-large" onClick={() => handleCardClick(displayedProjects[0])}>
            <div className="work-card-image">
              <img src={displayedProjects[0].cloudinaryImage} alt={displayedProjects[0].name} />
            </div>
            <div className="work-card-info">
              <div className="work-card-text">
                <span className="work-card-name">{displayedProjects[0].name}</span>
                <span className="work-card-category">{displayedProjects[0].category}</span>
              </div>
              {displayedProjects[0].deployedLink && (
                <a href={displayedProjects[0].deployedLink} target="_blank" rel="noopener noreferrer" className="work-card-arrow" onClick={(e) => e.stopPropagation()}>
                  →
                </a>
              )}
            </div>
          </div>

          {/* Middle row - 2 smaller images */}
          <div className="work-card" onClick={() => handleCardClick(displayedProjects[1])}>
            <div className="work-card-image">
              <img src={displayedProjects[1].cloudinaryImage} alt={displayedProjects[1].name} />
            </div>
            <div className="work-card-info">
              <div className="work-card-text">
                <span className="work-card-name">{displayedProjects[1].name}</span>
                <span className="work-card-category">{displayedProjects[1].category}</span>
              </div>
              {displayedProjects[1].deployedLink && (
                <a href={displayedProjects[1].deployedLink} target="_blank" rel="noopener noreferrer" className="work-card-arrow" onClick={(e) => e.stopPropagation()}>
                  →
                </a>
              )}
            </div>
          </div>

          <div className="work-card" onClick={() => handleCardClick(displayedProjects[2])}>
            <div className="work-card-image">
              <img src={displayedProjects[2].cloudinaryImage} alt={displayedProjects[2].name} />
            </div>
            <div className="work-card-info">
              <div className="work-card-text">
                <span className="work-card-name">{displayedProjects[2].name}</span>
                <span className="work-card-category">{displayedProjects[2].category}</span>
              </div>
              {displayedProjects[2].deployedLink && (
                <a href={displayedProjects[2].deployedLink} target="_blank" rel="noopener noreferrer" className="work-card-arrow" onClick={(e) => e.stopPropagation()}>
                  →
                </a>
              )}
            </div>
          </div>

          {/* Bottom row - large image */}
          <div className="work-card work-card-large" onClick={() => handleCardClick(displayedProjects[3])}>
            <div className="work-card-image">
              <img src={displayedProjects[3].cloudinaryImage} alt={displayedProjects[3].name} />
            </div>
            <div className="work-card-info">
              <div className="work-card-text">
                <span className="work-card-name">{displayedProjects[3].name}</span>
                <span className="work-card-category">{displayedProjects[3].category}</span>
              </div>
              {displayedProjects[3].deployedLink ? (
                <a href={displayedProjects[3].deployedLink} target="_blank" rel="noopener noreferrer" className="work-card-arrow" onClick={(e) => e.stopPropagation()}>
                  →
                </a>
              ) : displayedProjects[3].gallery && displayedProjects[3].gallery.length > 0 ? (
                <a href="#" className="work-card-arrow" onClick={(e) => e.stopPropagation()}>
                  →
                </a>
              ) : null}
            </div>
          </div>

          {/* Bottom row - 2 smaller images */}
          <div className="work-card" onClick={() => handleCardClick(displayedProjects[4])}>
            <div className="work-card-image">
              <img src={displayedProjects[4].cloudinaryImage} alt={displayedProjects[4].name} />
            </div>
            <div className="work-card-info">
              <div className="work-card-text">
                <span className="work-card-name">{displayedProjects[4].name}</span>
                <span className="work-card-category">{displayedProjects[4].category}</span>
              </div>
              {displayedProjects[4].deployedLink && (
                <a href={displayedProjects[4].deployedLink} target="_blank" rel="noopener noreferrer" className="work-card-arrow" onClick={(e) => e.stopPropagation()}>
                  →
                </a>
              )}
            </div>
          </div>

          <div className="work-card" onClick={() => handleCardClick(displayedProjects[5])}>
            <div className="work-card-image">
              <img src={displayedProjects[5].cloudinaryImage} alt={displayedProjects[5].name} />
            </div>
            <div className="work-card-info">
              <div className="work-card-text">
                <span className="work-card-name">{displayedProjects[5].name}</span>
                <span className="work-card-category">{displayedProjects[5].category}</span>
              </div>
              {displayedProjects[5].deployedLink && (
                <a href={displayedProjects[5].deployedLink} target="_blank" rel="noopener noreferrer" className="work-card-arrow" onClick={(e) => e.stopPropagation()}>
                  →
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="works-footer">
          <div className="works-divider"></div>
          <button className="works-more-btn" onClick={() => {
            setShowMoreProjects(true)
            // Smooth scroll to the opened section after a brief delay
            setTimeout(() => {
              const inlineSection = document.querySelector('.all-projects-inline')
              if (inlineSection) {
                inlineSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
              }
            }, 100)
          }}>
            View all projects
          </button>
        </div>

        {showMoreProjects && (
          <div className="all-projects-inline" ref={modalRef}>
            <div className="all-projects-content">
              <div className="all-projects-header">
                <h3>All Projects</h3>
                <div className="all-projects-filters">
                  {['all', 'ai automations', 'websites', 'other'].map((f) => (
                    <button
                      key={f}
                      className={`filter-pill ${filter === f ? 'active' : ''}`}
                      onClick={() => setFilter(f)}
                    >
                      {f}
                    </button>
                  ))}
                </div>
                <button className="all-projects-close" onClick={() => setShowMoreProjects(false)}>×</button>
              </div>
              <div className="more-projects-grid">
                {filteredProjects.map((project) => (
                  <div
                    key={project.id}
                    className="work-card"
                    onClick={() => handleCardClick(project)}
                  >
                    <div className="work-card-image">
                      <img src={project.cloudinaryImage} alt={project.name} />
                    </div>
                    <div className="work-card-info">
                      <div className="work-card-text">
                        <span className="work-card-name">{project.name}</span>
                        <span className="work-card-category">{project.category}</span>
                      </div>
                      {project.deployedLink && (
                        <a 
                          href={project.deployedLink} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="work-card-arrow"
                          onClick={(e) => e.stopPropagation()}
                        >
                          →
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {selectedProject && (
        <div className="work-modal">
          <div className="work-modal-content">
            <button className="work-modal-close" onClick={handleCloseModal}>×</button>
            <h3 className="work-modal-title">{selectedProject.name}</h3>
            <p className="work-modal-category">{selectedProject.category}</p>
            <div className="work-modal-gallery">
              {(selectedProject.gallery || []).map((src, idx) => (
                <div className="work-modal-image" key={idx}>
                  <img src={src} alt={`${selectedProject.name} ${idx + 1}`} />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default WorksSection

