const Sidebar = () => {
    const recommendations = [
        { name: 'Sarah Jenkins', role: 'Head of Engineering at TechStream', mutual: 12 },
        { name: 'Mark Wu', role: 'Senior Product Designer', mutual: 5 },
        { name: 'Elena Rodriguez', role: 'CTO at InnovateX', mutual: 24 },
    ]

    return (
        <aside>
            <div className="professional-card" style={{ padding: '16px', marginBottom: '1rem' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '1rem' }}>People you may know</h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    {recommendations.map((p, i) => (
                        <li key={i} style={{ display: 'flex', gap: '12px', marginBottom: '1rem' }}>
                            <div style={{ width: '48px', height: '48px', background: '#e1e9ee', borderRadius: '50%', flexShrink: 0 }} />
                            <div>
                                <p style={{ fontWeight: '600', fontSize: '0.875rem' }}>{p.name}</p>
                                <p className="text-muted" style={{ margin: '2px 0' }}>{p.role}</p>
                                <button style={{
                                    background: 'transparent',
                                    border: '1px solid var(--text-secondary)',
                                    color: 'var(--text-secondary)',
                                    borderRadius: '50px',
                                    padding: '2px 12px',
                                    fontSize: '0.875rem',
                                    marginTop: '4px',
                                    fontWeight: '600',
                                    cursor: 'pointer'
                                }}>
                                    Connect
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="professional-card" style={{ padding: '16px' }}>
                <div style={{ padding: '12px', background: '#f9fafb', borderRadius: '4px', textAlign: 'center' }}>
                    <p className="text-muted" style={{ fontSize: '0.75rem' }}>Promoted</p>
                    <p style={{ fontWeight: '600', fontSize: '0.875rem', marginTop: '8px' }}>Level up your React skills</p>
                    <p className="text-muted" style={{ fontSize: '0.8125rem', marginTop: '4px' }}>Join the Advanced Web Engineering workshop.</p>
                    <button className="btn-primary" style={{ marginTop: '12px', width: '100%', fontSize: '0.875rem' }}>Learn More</button>
                </div>
            </div>
        </aside>
    )
}

export default Sidebar
