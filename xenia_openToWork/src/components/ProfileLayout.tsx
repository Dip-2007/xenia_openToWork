const ProfileLayout = ({ children }) => {
    return (
        <div className="relative grid grid-cols-1 lg:grid-cols-[230px_minmax(0,1fr)] xl:grid-cols-[230px_minmax(0,1fr)_310px] gap-8 items-stretch max-w-[1400px] mx-auto pt-6 h-full">
            {children}
        </div>
    )
}

export default ProfileLayout

