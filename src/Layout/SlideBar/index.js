import '../SlideBar/SlideBar.scss';
import SlideBar1 from './SlideBar1';
import SlideBar2 from './SlideBar2';
import SlideBar3 from './SlideBar3';
import SlideBar4 from './SlideBar4';
import LoginForm from '../Navbar/LoginForm';
import { useState, useEffect } from 'react';

function SlideBar() {
    const [showLoginForm, setShowLoginForm] = useState(false);
    const total = () => {
        setShowLoginForm(true);
    };

    return (
        <>
            {showLoginForm && (
                <img
                    src="https://icons.iconarchive.com/icons/icons8/ios7/32/User-Interface-Delete-Sign-icon.png"
                    width="32"
                    height="32"
                    style={{ zIndex: '101', position: 'fixed', top: '15vh', right: '39vw' }}
                    className="oloso"
                    onClick={() => setShowLoginForm(false)}
                ></img>
            )}
            <LoginForm showLoginForm={showLoginForm} />
            <div className="SlideBar">
                <SlideBar1 />
                <hr style={{ width: '15vw', opacity: '0.2' }} />
                {!localStorage.getItem('user') && <SlideBar2 total={total} />}
                {localStorage.getItem('user') && <SlideBar4 />}
                <hr style={{ width: '15vw', opacity: '0.2' }} />
                <SlideBar3 />
            </div>
        </>
    );
}

export default SlideBar;
