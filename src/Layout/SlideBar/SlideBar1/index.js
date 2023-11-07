import SlideBar1Button from './SlideBar1Button';
import '../SlideBar1/SlideBar1.scss';
import { BsFillHouseHeartFill, BsFillPeopleFill, BsCompass, BsFillCameraVideoFill } from 'react-icons/bs';
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

function SlideBar1() {
    const [color, setColor] = useState(['#fe2c55', 'black', 'black']);
    const location = useLocation();
    useEffect(() => {
        if (location.pathname !== '/' && location.pathname !== '/Following' && location.pathname !== '/Discover') {
            setColor(['black', 'black', 'black']);
        } else if (location.pathname === '/') {
            setColor(['#fe2c55', 'black', 'black']);
        } else if (location.pathname === '/Following') {
            setColor(['black', '#fe2c55', 'black']);
        } else if (location.pathname === '/Discover') {
            setColor(['black', 'black', '#fe2c55']);
        }
    }, [location]);

    function clickColor(i) {
        let t = [...color];
        for (let j = 0; j < 3; j++) {
            t[j] = 'black';
        }
        t[i] = '#fe2c55';
        setColor(t);
    }

    return (
        <>
            <div className="SlideBar1">
                <Link to="/">
                    <SlideBar1Button
                        img={<BsFillHouseHeartFill fontSize="24px" />}
                        content="Dành cho bạn"
                        color={color[0]}
                        onClick={() => clickColor(0)}
                    />
                </Link>
                <Link to="/Following">
                    <SlideBar1Button
                        img={<BsFillPeopleFill fontSize="24px" />}
                        content="Đang Follow"
                        color={color[1]}
                        onClick={() => clickColor(1)}
                    />
                </Link>
                <Link to="/Discover">
                    <SlideBar1Button
                        img={<BsCompass fontSize="24px" />}
                        content="Khám phá"
                        color={color[2]}
                        onClick={() => clickColor(2)}
                    />
                </Link>
                <Link>
                    <SlideBar1Button
                        img={<BsFillCameraVideoFill fontSize="24px" />}
                        content="LIVE"
                        color="rgba(0,0,0,0.3)"
                    />
                </Link>
            </div>
        </>
    );
}

export default SlideBar1;
