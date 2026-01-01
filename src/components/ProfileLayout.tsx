const ProfileLayout = ({ children }) => {
    return (
        <div className="section-container" style={{
            paddingTop: '24px',
            display: 'grid',
            gridTemplateColumns: '250px minmax(0, 1fr) 300px',
            gap: '24px',
            alignItems: 'start',
            maxWidth: '1280px',
            margin: '0 auto'
        }}>
            {children}
            <style jsx>{`
                @media (max-width: 1024px) {
                    div {
                        grid-template-columns: 225px 1fr !important;
                    }
                }
                @media (max-width: 768px) {
                    div {
                        grid-template-columns: 1fr !important;
                    }
                }
            `}</style>
        </div>
    )
}

export default ProfileLayout

