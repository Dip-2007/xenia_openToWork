const history = [
    {
        role: 'Senior Frontend Engineer',
        company: 'GlobalTech Solutions',
        date: 'Jan 2023 - Present',
        desc: 'Leading the development of a large-scale enterprise dashboard, optimizing performance by 40% and implementing a comprehensive design system.'
    },
    {
        role: 'UI Developer',
        company: 'Creative Studio 7',
        date: '2021 - 2022',
        desc: 'Collaborated with design teams to translate complex Figma prototypes into interactive, highly responsive web interfaces using React and Framer Motion.'
    },
    {
        role: 'Full Stack Intern',
        company: 'Code Foundry',
        date: '2020',
        desc: 'Assisted in the development of core API features and improved testing coverage for critical user authentication flows.'
    }
]

const Experience = () => {
    return (
        <div className="professional-card" style={{ padding: '24px', marginBottom: '1rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1.5rem' }}>Experience</h2>

            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {history.map((item, index) => (
                    <li key={index} style={{
                        marginBottom: '1.5rem',
                        paddingBottom: '1.5rem',
                        borderBottom: index === history.length - 1 ? 'none' : '1px solid var(--border-color)',
                        display: 'flex',
                        gap: '12px'
                    }}>
                        <div style={{ width: '48px', height: '48px', background: '#e1e9ee', borderRadius: '4px', flexShrink: 0 }} />
                        <div>
                            <h3 style={{ fontSize: '1rem', fontWeight: '600', color: 'var(--text-primary)' }}>{item.role}</h3>
                            <p style={{ fontSize: '0.875rem', color: 'var(--text-primary)' }}>{item.company}</p>
                            <p className="text-muted" style={{ margin: '4px 0' }}>{item.date}</p>
                            <p style={{ fontSize: '0.875rem', color: 'var(--text-primary)', marginTop: '8px' }}>{item.desc}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Experience
