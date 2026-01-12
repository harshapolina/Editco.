import { useState, useEffect } from 'react'
import './AdminDashboard.css'

function AdminDashboard({ onLogout }) {
  const [loginHistory, setLoginHistory] = useState([])
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('overview')
  const [filterStatus, setFilterStatus] = useState('all')

  useEffect(() => {
    fetchData()
    // Refresh data every 30 seconds
    const interval = setInterval(fetchData, 30000)
    return () => clearInterval(interval)
  }, [filterStatus])

  const fetchData = async () => {
    try {
      setLoading(true)
      
      const [loginRes, projectsRes] = await Promise.all([
        fetch('http://localhost:5000/api/admin/login-history', {
          credentials: 'include'
        }),
        fetch(`http://localhost:5000/api/admin/projects${filterStatus !== 'all' ? `?status=${filterStatus}` : ''}`, {
          credentials: 'include'
        })
      ])

      if (loginRes.status === 401 || projectsRes.status === 401) {
        onLogout()
        return
      }

      const loginData = await loginRes.json()
      const projectsData = await projectsRes.json()

      if (loginData.success) {
        setLoginHistory(loginData.data || [])
      }

      if (projectsData.success) {
        setProjects(projectsData.data || [])
      }
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleStatusUpdate = async (projectId, newStatus) => {
    try {
      const response = await fetch(`http://localhost:5000/api/admin/projects/${projectId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ status: newStatus })
      })

      if (response.ok) {
        fetchData()
      }
    } catch (error) {
      console.error('Error updating status:', error)
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const newProjectsCount = projects.filter(p => p.status === 'new').length
  const totalLogins = loginHistory.length

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <div>
          <h1>Admin Dashboard</h1>
          <p>Editco.Media Administration Panel</p>
        </div>
        <button className="admin-logout-btn" onClick={onLogout}>
          Logout
        </button>
      </div>

      <div className="admin-tabs">
        <button
          className={`admin-tab ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button
          className={`admin-tab ${activeTab === 'logins' ? 'active' : ''}`}
          onClick={() => setActiveTab('logins')}
        >
          Login History ({totalLogins})
        </button>
        <button
          className={`admin-tab ${activeTab === 'projects' ? 'active' : ''}`}
          onClick={() => setActiveTab('projects')}
        >
          Projects ({projects.length})
        </button>
      </div>

      {loading ? (
        <div className="admin-loading">Loading...</div>
      ) : (
        <div className="admin-content">
          {activeTab === 'overview' && (
            <div className="admin-overview">
              <div className="stats-grid">
                <div className="stat-card">
                  <div className="stat-value">{totalLogins}</div>
                  <div className="stat-label">Total Logins</div>
                </div>
                <div className="stat-card">
                  <div className="stat-value">{projects.length}</div>
                  <div className="stat-label">Total Projects</div>
                </div>
                <div className="stat-card highlight">
                  <div className="stat-value">{newProjectsCount}</div>
                  <div className="stat-label">New Projects</div>
                </div>
                <div className="stat-card">
                  <div className="stat-value">
                    {projects.filter(p => p.status === 'in-progress').length}
                  </div>
                  <div className="stat-label">In Progress</div>
                </div>
              </div>

              <div className="recent-section">
                <h2>Recent Logins</h2>
                <div className="recent-list">
                  {loginHistory.slice(0, 5).map((login, idx) => (
                    <div key={idx} className="recent-item">
                      <div>
                        <strong>{login.firstName} {login.lastName}</strong>
                        <span className="recent-email">{login.email}</span>
                      </div>
                      <span className="recent-time">{formatDate(login.loginTime)}</span>
                    </div>
                  ))}
                  {loginHistory.length === 0 && (
                    <p className="no-data">No login history yet</p>
                  )}
                </div>
              </div>

              <div className="recent-section">
                <h2>Recent Projects</h2>
                <div className="recent-list">
                  {projects.slice(0, 5).map((project) => (
                    <div key={project._id} className="recent-item">
                      <div>
                        <strong>{project.firstName}</strong>
                        <span className="recent-email">{project.email}</span>
                        <span className={`status-badge status-${project.status}`}>
                          {project.status}
                        </span>
                      </div>
                      <span className="recent-time">{formatDate(project.createdAt)}</span>
                    </div>
                  ))}
                  {projects.length === 0 && (
                    <p className="no-data">No projects yet</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'logins' && (
            <div className="admin-table-container">
              <h2>Login History</h2>
              <div className="admin-table">
                <div className="table-header">
                  <div>Name</div>
                  <div>Email</div>
                  <div>Login Time</div>
                  <div>IP Address</div>
                </div>
                {loginHistory.map((login, idx) => (
                  <div key={idx} className="table-row">
                    <div>{login.firstName} {login.lastName}</div>
                    <div>{login.email}</div>
                    <div>{formatDate(login.loginTime)}</div>
                    <div>{login.ipAddress || 'N/A'}</div>
                  </div>
                ))}
                {loginHistory.length === 0 && (
                  <div className="no-data-row">No login history available</div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'projects' && (
            <div className="admin-projects">
              <div className="projects-header">
                <h2>Project Submissions</h2>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="status-filter"
                >
                  <option value="all">All Status</option>
                  <option value="new">New</option>
                  <option value="contacted">Contacted</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </div>

              <div className="projects-grid">
                {projects.map((project) => (
                  <div key={project._id} className="project-card">
                    <div className="project-header">
                      <div>
                        <h3>{project.firstName}</h3>
                        <p className="project-email">{project.email}</p>
                        {project.phone && <p className="project-phone">{project.phone}</p>}
                      </div>
                      <span className={`status-badge status-${project.status}`}>
                        {project.status}
                      </span>
                    </div>

                    <div className="project-details">
                      <div className="detail-item">
                        <strong>Type:</strong> {project.projectType}
                      </div>
                      <div className="detail-item">
                        <strong>Budget:</strong> {project.budget}
                      </div>
                      <div className="detail-item">
                        <strong>Timeline:</strong> {project.timeline}
                      </div>
                      {project.services.length > 0 && (
                        <div className="detail-item">
                          <strong>Services:</strong>
                          <div className="services-list">
                            {project.services.map((service, idx) => (
                              <span key={idx} className="service-tag">{service}</span>
                            ))}
                          </div>
                        </div>
                      )}
                      {project.projectDetails && (
                        <div className="detail-item">
                          <strong>Details:</strong>
                          <p className="project-details-text">{project.projectDetails}</p>
                        </div>
                      )}
                    </div>

                    <div className="project-actions">
                      <select
                        value={project.status}
                        onChange={(e) => handleStatusUpdate(project._id, e.target.value)}
                        className="status-select"
                      >
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="in-progress">In Progress</option>
                        <option value="completed">Completed</option>
                      </select>
                      <span className="project-date">{formatDate(project.createdAt)}</span>
                    </div>
                  </div>
                ))}
                {projects.length === 0 && (
                  <div className="no-data">No projects found</div>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default AdminDashboard

