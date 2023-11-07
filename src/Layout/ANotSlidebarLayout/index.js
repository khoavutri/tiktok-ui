import Navbar from '../Navbar';
function ANotSlidebarLayout({ children }) {
    return (
        <div>
            <Navbar />
            {children}
        </div>
    );
}

export default ANotSlidebarLayout;
