'use client';

const ProfileHeader = () => {
    return (
        <div className="professional-card" style={{ marginBottom: '1rem' }}>
            {/* Banner */}
            <div style={{
                height: '200px',
                background: 'linear-gradient(135deg, #a0b4c8 0%, #708498 100%)',
                position: 'relative'
            }}>
                {/* Subtle Geometric Overlay */}
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    opacity: 0.1,
                    backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)',
                    backgroundSize: '20px 20px'
                }} />
            </div>

            {/* Profile Info Area */}
            <div style={{ padding: '0 24px 24px', position: 'relative' }}>
                {/* Profile Picture (Rounded) */}
                <div style={{
                    width: '152px',
                    height: '152px',
                    borderRadius: '50%',
                    background: '#e1e9ee',
                    marginTop: '-110px',
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '4px solid white',
                    boxShadow: '0 0 0 1px rgba(0,0,0,0.1)',
                    overflow: 'hidden'
                }}>
                    <span style={{ fontSize: '5rem' }}>👩‍💻</span>
                </div>

                <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'space-between' }}>
                    <div style={{ flex: 1 }}>
                        <h1 style={{ fontSize: '1.5rem', fontWeight: '600', color: 'var(--text-primary)' }}>
                            Xenia Dimension
                        </h1>
                        <p style={{ fontSize: '1rem', color: 'var(--text-primary)', marginTop: '4px' }}>
                            Creative Developer & UI Engineer | Specialist in Interactive Web Experiences
                        </p>
                        <p className="text-muted" style={{ marginTop: '4px' }}>
                            San Francisco Bay Area • <a href="#contact" style={{ fontWeight: '600' }}>Contact info</a>
                        </p>
                        <p style={{ color: 'var(--corporate-blue)', fontWeight: '600', marginTop: '8px', fontSize: '0.875rem' }}>
                            500+ connections
                        </p>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'flex-start' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <div style={{ width: '32px', height: '32px', background: '#ccc', borderRadius: '4px' }} />
                            <span style={{ fontWeight: '600', fontSize: '0.875rem' }}>Xeno-Solutions Inc.</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <div style={{ width: '32px', height: '32px', background: '#ccc', borderRadius: '4px' }} />
                            <span style={{ fontWeight: '600', fontSize: '0.875rem' }}>University of the Void</span>
                        </div>
                    </div>
                </div>

                {/* Profile Buttons */}
                <div style={{ display: 'flex', gap: '8px', marginTop: '1rem' }}>
                    <button className="btn-primary">Open to</button>
                    <button style={{
                        padding: '0.5rem 1rem',
                        borderRadius: '50px',
                        border: '1px solid var(--corporate-blue)',
                        color: 'var(--corporate-blue)',
                        background: 'transparent',
                        fontWeight: '600',
                        cursor: 'pointer'
                    }}>
                        Add profile section
                    </button>
                    <button style={{
                        padding: '0.5rem 1rem',
                        borderRadius: '50px',
                        border: '1px solid var(--text-secondary)',
                        color: 'var(--text-secondary)',
                        background: 'transparent',
                        fontWeight: '600',
                        cursor: 'pointer'
                    }}>
                        More
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ProfileHeader
