import './BuiltBySection.css'

const links = [
  {
    name: 'editcomedia',
    badge: 'Our main agency platform',
    description: 'Websites, automations, AI systems, and client work — all under one roof.',
    href: 'https://editcomedia.com'
  },
  {
    name: 'WeA',
    badge: 'Workflow & Execution App',
    description: 'Manage tasks, processes, and internal systems built for speed and clarity.',
    href: 'https://we-a-lac.vercel.app/'
  },
  {
    name: 'MediConnect',
    badge: 'People × Opportunities',
    description: "MediConnect is an AI-based system that simplifies clinic queues and patient management.",
    href: 'https://mediconnect-editco.base44.app/'
  }
]

function BuiltBySection() {
  return (
    <section className="builtby-section">
      <div className="builtby-header">
        <div className="builtby-eyebrow">Built by Editco</div>
        <h2 className="builtby-title">Products that keep the work flowing</h2>
      </div>

      <div className="builtby-grid">
        {links.map((item) => (
          <a key={item.name} className="builtby-card" href={item.href} target="_blank" rel="noreferrer">
            <div className="builtby-card-top">
              <div className="builtby-dot" />
              <div className="builtby-name">{item.name}</div>
            </div>
            <div className="builtby-badge">{item.badge}</div>
            <div className="builtby-description">{item.description}</div>
            <div className="builtby-link">Visit →</div>
          </a>
        ))}
      </div>
    </section>
  )
}

export default BuiltBySection

