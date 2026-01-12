import { useState } from 'react'
import './GetStartedForm.css'

function GetStartedForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    email: '',
    phone: '',
    projectType: '',
    budget: '',
    timeline: '',
    services: [],
    projectDetails: '',
    termsAccepted: false
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    if (type === 'checkbox') {
      if (name === 'termsAccepted') {
        setFormData(prev => ({ ...prev, [name]: checked }))
      } else {
        // Handle service checkboxes
        setFormData(prev => ({
          ...prev,
          services: checked
            ? [...prev.services, value]
            : prev.services.filter(service => service !== value)
        }))
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Basic validation
    if (!formData.firstName || !formData.email || !formData.projectType || !formData.budget || !formData.timeline) {
      alert('Please fill in all required fields')
      return
    }

    if (!formData.termsAccepted) {
      alert('Please accept the terms & privacy')
      return
    }

    setIsSubmitting(true)

    try {
      // Save to database
      const response = await fetch('http://localhost:5000/api/auth/project-submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Failed to submit project')
      }

      // TODO: Add n8n webhook URL here (optional)
      // const n8nWebhookUrl = 'YOUR_N8N_WEBHOOK_URL'
      // await fetch(n8nWebhookUrl, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData)
      // })
      
      setIsSubmitted(true)
    } catch (error) {
      console.error('Error submitting form:', error)
      alert(error.message || 'Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    if (!isSubmitting) {
      window.location.hash = ''
      setIsSubmitted(false)
      setFormData({
        firstName: '',
        email: '',
        phone: '',
        projectType: '',
        budget: '',
        timeline: '',
        services: [],
        projectDetails: '',
        termsAccepted: false
      })
    }
  }

  return (
    <div className="get-started-page">
      <div className="form-page-container">
        {!isSubmitted ? (
          <>
            <div className="form-header">
              <h2>Let's Build Something</h2>
              <button className="form-close-btn" onClick={handleClose} disabled={isSubmitting}>
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit} className="get-started-form">
              <div className="form-section">
                <h3>Your Info</h3>
                
                <div className="form-group">
                  <label htmlFor="firstName">
                    First Name <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    placeholder="Your name"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">
                    Email <span className="required">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="you@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Phone</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    placeholder="(Optional)"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-section">
                <h3>Project Basics</h3>
                
                <div className="form-group">
                  <label htmlFor="projectType">
                    What are you building? <span className="required">*</span>
                  </label>
                  <select
                    id="projectType"
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select...</option>
                    <option value="Website">Website</option>
                    <option value="Automation">Automation</option>
                    <option value="Design">Design</option>
                    <option value="Marketing">Marketing</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="budget">
                    Budget (rough idea) <span className="required">*</span>
                  </label>
                  <select
                    id="budget"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Pick a range</option>
                    <option value="Under $1,000">Under $1,000</option>
                    <option value="$1,000 - $5,000">$1,000 - $5,000</option>
                    <option value="$5,000 - $10,000">$5,000 - $10,000</option>
                    <option value="$10,000 - $25,000">$10,000 - $25,000</option>
                    <option value="$25,000+">$25,000+</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="timeline">
                    Timeline <span className="required">*</span>
                  </label>
                  <select
                    id="timeline"
                    name="timeline"
                    value={formData.timeline}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select...</option>
                    <option value="ASAP">ASAP</option>
                    <option value="This month">This month</option>
                    <option value="Flexible">Flexible</option>
                  </select>
                </div>
              </div>

              <div className="form-section">
                <h3>What do you need?</h3>
                <p className="form-hint">(Select what applies)</p>
                
                <div className="checkbox-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="service"
                      value="Web Development"
                      checked={formData.services.includes('Web Development')}
                      onChange={handleChange}
                    />
                    <span>Web Development</span>
                  </label>

                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="service"
                      value="AI Automations / Chatbots"
                      checked={formData.services.includes('AI Automations / Chatbots')}
                      onChange={handleChange}
                    />
                    <span>AI Automations / Chatbots</span>
                  </label>

                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="service"
                      value="Design & Branding"
                      checked={formData.services.includes('Design & Branding')}
                      onChange={handleChange}
                    />
                    <span>Design & Branding</span>
                  </label>

                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="service"
                      value="Social Media / Marketing"
                      checked={formData.services.includes('Social Media / Marketing')}
                      onChange={handleChange}
                    />
                    <span>Social Media / Marketing</span>
                  </label>
                </div>
              </div>

              <div className="form-section">
                <h3>Tell us more</h3>
                
                <div className="form-group">
                  <label htmlFor="projectDetails">Project details</label>
                  <textarea
                    id="projectDetails"
                    name="projectDetails"
                    placeholder="What's the idea? What are you trying to achieve?"
                    value={formData.projectDetails}
                    onChange={handleChange}
                    rows="5"
                  />
                </div>
              </div>

              <div className="form-group checkbox-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="termsAccepted"
                    checked={formData.termsAccepted}
                    onChange={handleChange}
                    required
                  />
                  <span>I'm cool with the terms & privacy stuff</span>
                </label>
              </div>

              <button type="submit" className="form-submit-btn" disabled={isSubmitting}>
                {isSubmitting ? 'Sending...' : 'Send →'}
              </button>
            </form>
          </>
        ) : (
          <div className="form-success">
            <div className="success-icon">✓</div>
            <h2>We'll contact you soon</h2>
            <p>Thanks for reaching out! We've received your details and will get back to you shortly.</p>
            <button className="form-close-btn-success" onClick={handleClose}>
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default GetStartedForm

