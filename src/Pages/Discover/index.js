import '../Discover/Discover.scss';
import { Link } from 'react-router-dom';
import { BsCheckCircleFill } from 'react-icons/bs';
import { AiOutlineHeart } from 'react-icons/ai';
import { useEffect, useState } from 'react';
import { selectImgPostAll } from '../../utils/CallApiOverView';
function Discover() {
    const [data, setData] = useState([]);
    const [userId, setUserId] = useState(
        localStorage.getItem('user') != null ? JSON.parse(localStorage.getItem('user')).id : 0,
    );
    useEffect(() => {
        if (localStorage.getItem('user') != null) {
            const milu = JSON.parse(localStorage.getItem('user'));
            setUserId(milu.id);
        } else {
            setUserId(0);
        }
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await selectImgPostAll(16, userId);
                setData(result);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);

    return (
        <>
            <div className="Discover">
                <div className="Discover_content">
                    {data.map((number) => (
                        <Link key={number.video.id} to={'/' + number.user.userName + '/video/' + number.video.id}>
                            <div className="Discover_Content-child">
                                <img src={number.video.link} alt="sai" className="Discover_Content-child_img" />
                                <p>{number.video.mota}</p>
                                <div className="Discover_Content-child_flex">
                                    <div className="Discover_Content-child_flex-user">
                                        <span
                                            style={{ display: 'flex', alignItems: 'center' }}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                                window.location.href = '/' + '3';
                                            }}
                                        >
                                            <img
                                                src={
                                                    number.user.avatar
                                                        ? number.user.avatar
                                                        : 'https://icons.iconarchive.com/icons/icons8/ios7/64/Users-Administrator-icon.png'
                                                }
                                                alt="đúng"
                                                className="Discover_Content-child_flex-user-img"
                                            />
                                        </span>
                                        <span
                                            style={{ fontWeight: '20', marginLeft: '5px' }}
                                            className="Discover_Content-child_flex-user-link"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                                window.location.href = '/' + number.user.userName;
                                            }}
                                        >
                                            {number.user.userName}
                                        </span>
                                        {number.user.famous && (
                                            <BsCheckCircleFill style={{ fontSize: '14px', color: '#20d5ec' }} />
                                        )}
                                    </div>
                                    <div className="Discover_Content-child_flex-like">
                                        <AiOutlineHeart
                                            style={{ margin: '0', padding: '0', marginRight: '4px', fontSize: '20px' }}
                                        />
                                        <span style={{ fontSize: '15px' }}>{number.likes}</span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </>
    );
}

export default Discover;
