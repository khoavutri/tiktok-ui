import '../Navbar.scss';
import { useState } from 'react';
import { Link } from 'react-router-dom';

function MenuNavbar({ itemss = [] }) {
    const [Historyy, setHistoryy] = useState([itemss]);
    const [Current, setCurrent] = useState(itemss);
    const [Title, setTitle] = useState([]);

    const Xuly = (ite) => {
        setHistoryy([...Historyy, ite.children]);
        setCurrent(ite.children);
        setTitle([...Title, ite.data]);
    };

    const reset = () => {
        setHistoryy([itemss]);
        setCurrent(itemss);
        setTitle([]);
    };
    function quaylui() {
        let xxx = [...Title];
        xxx.pop();
        setTitle(xxx);
        let yyy = [...Historyy];
        yyy.pop();
        setHistoryy(yyy);
        setCurrent(Historyy[yyy.length - 1]);
    }
    function bunlet() {
        setTimeout(() => {
            reset();
        }, 2000);
    }
    return (
        <div>
            <div className="tuychon1">
                {Title.length !== 0 && (
                    <div
                        className="tuychon1_icon sai_sai"
                        style={{
                            borderBottom: 'solid 0.5px',
                        }}
                        onClick={() => quaylui()}
                    >
                        <img
                            src="https://icons.iconarchive.com/icons/aniket-suvarna/box-regular/24/bx-left-arrow-alt-icon.png"
                            width="24"
                            height="24"
                            alt="back-icon"
                        />
                        <div style={{ paddingLeft: '10px' }}>{Title[Title.length - 1]}</div>
                    </div>
                )}
                {Current.map((ite) => (
                    <div key={ite.data} className="tuychon1_icon">
                        {ite.icon !== '' && <img src={ite.icon} width="24" height="24" alt="icon" />}
                        <div style={{ paddingLeft: '10px' }}>
                            {ite.to ? (
                                <Link to={ite.to}>{ite.data}</Link>
                            ) : ite.children.length > 0 ? (
                                <div onClick={() => Xuly(ite)}>{ite.data}</div>
                            ) : (
                                <div onClick={() => reset()}>{ite.data}</div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MenuNavbar;
