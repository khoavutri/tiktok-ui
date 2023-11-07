import '../success/success.scss';
import { useEffect, useState } from 'react';
function Success({ hien, subject, content }) {
    const [display, setDisplay] = useState('full2');
    useEffect(() => {
        if (hien) setDisplay('fulll');
        else setDisplay('fulll2');
    });
    useEffect(() => {
        setTimeout(() => {
            setDisplay('fulll');
        }, 3000);
    });
    return (
        <div className={display}>
            <div className="fulllCon"></div>
            <img
                src="https://icons.iconarchive.com/icons/custom-icon-design/flatastic-9/32/Accept-icon.png"
                width="32"
                height="32"
                className="imggl"
            />
            <div className="contentl">
                <h4>{subject}</h4>
                <p style={{ color: 'black' }}>{content}</p>
            </div>
        </div>
    );
}

export default Success;
