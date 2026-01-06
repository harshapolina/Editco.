import './TeamCard.css'

function TeamCard({ member, isMain, isInView, delay }) {
  return (
    <div
      className={`team-card ${isMain ? 'main-card' : ''} ${isInView ? 'visible' : ''}`}
      style={{
        '--delay': `${delay}s`
      }}
    >
      <div className="team-card-image">
        <img src={member.image} alt={member.name} />
      </div>
      
      <div className="team-card-overlay">
        <div className="team-card-content">
          <a 
            href={member.linkedin} 
            target="_blank" 
            rel="noopener noreferrer"
            className="social-link linkedin-link" 
            aria-label="LinkedIn"
            onClick={(e) => e.stopPropagation()}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
              <rect x="2" y="9" width="4" height="12"/>
              <circle cx="4" cy="4" r="2"/>
            </svg>
          </a>
          <h3 className="team-card-name">{member.name}</h3>
          <p className="team-card-role">{member.role}</p>
        </div>
      </div>
    </div>
  )
}

export default TeamCard

