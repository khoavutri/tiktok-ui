import Navbar from '../Navbar';
import SlideBar from '../SlideBar';

function DefaultLayout({ Children }) {
    return (
        <div>
            <Navbar />
            <div style={{ display: 'flex' }}>
                <SlideBar />
                {Children}
            </div>
        </div>
    );
}

export default DefaultLayout;
