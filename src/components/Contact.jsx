const Contact = () => {
    return (
        <footer id="contact" style={{ padding: '48px 24px', textAlign: 'center', marginTop: '2rem' }}>
            <div className="professional-card" style={{ padding: '32px' }}>
                <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem' }}>Get in Touch</h2>
                <p className="text-muted" style={{ marginBottom: '2rem' }}>
                    I am currently open to new opportunities and collaborations. Feel free to reach out via any of the platforms below.
                </p>
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                    <a href="#" className="btn-primary">Connect on LinkedIn</a>
                    <a href="#" style={{
                        padding: '0.5rem 1.5rem',
                        borderRadius: '50px',
                        border: '1px solid var(--corporate-blue)',
                        color: 'var(--corporate-blue)',
                        fontWeight: '600'
                    }}>GitHub Profile</a>
                    <a href="mailto:hello@xenia.dev" style={{
                        padding: '0.5rem 1.5rem',
                        borderRadius: '50px',
                        border: '1px solid var(--border-color)',
                        color: 'var(--text-primary)',
                        fontWeight: '600'
                    }}>Send Email</a>
                </div>
            </div>
            <div style={{ marginTop: '3rem', color: 'var(--text-secondary)', fontSize: '0.75rem' }}>
                <p>© 2024 Xenia Dimension • Built with React & Next.js</p>
            </div>
        </footer>
    )
}

export default Contact
