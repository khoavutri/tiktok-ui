import '../error/error.scss';
import { useEffect, useState } from 'react';
function Error({ hien, subject, content }) {
    const [display, setDisplay] = useState('full2');
    useEffect(() => {
        if (hien) setDisplay('full');
        else setDisplay('full2');
    });
    useEffect(() => {
        setTimeout(() => {
            setDisplay('full2');
        }, 3000);
    });
    return (
        <div className={display}>
            <div className="fullCon"></div>
            <img
                src="https://icons.iconarchive.com/icons/custom-icon-design/flatastic-1/32/delete-1-icon.png"
                width="32"
                height="32"
                className="imgg"
            />
            <div className="content">
                <h4>{subject}</h4>
                <p style={{ color: 'black' }}>{content}</p>
            </div>
        </div>
    );
}

export default Error;
