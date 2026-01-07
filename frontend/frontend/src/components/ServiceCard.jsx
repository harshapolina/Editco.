import './ServiceCard.css'

function ServiceCard({ title, description, index, isIntro }) {
  // Split description by newlines and create paragraphs
  const descriptionLines = description.split('\n').filter(line => line.trim())
  
  return (
    <div className={`service-card ${isIntro ? 'intro-card' : ''}`} data-index={index}>
      <div className="service-card-content">
        {!isIntro && (
          <div className="service-card-header">
            <div className="card-number">{String(index).padStart(2, '0')}</div>
            <div className="card-accent-line"></div>
          </div>
        )}
        <h2 className="service-card-title">{title}</h2>
        {descriptionLines.length > 0 && (
          <div className="service-card-description">
            {descriptionLines.map((line, idx) => (
              <p key={idx} className="description-line">
                <span className="description-bullet">•</span>
                {line}
              </p>
            ))}
          </div>
        )}
        {isIntro && (
          <div className="scroll-indicator">
            <span className="scroll-text">Keep scrolling</span>
          </div>
        )}
        {!isIntro && (
          <div className="card-footer">
            <div className="card-footer-line"></div>
            {/* <span className="card-footer-text">Learn more</span> */}
          </div>
        )}
      </div>
    </div>
  )
}

export default ServiceCard

