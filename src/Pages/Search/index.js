import { useEffect, useState } from 'react';
import '../Search/Search.scss';
import { BsCheckCircleFill } from 'react-icons/bs';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AiOutlineHeart } from 'react-icons/ai';
import { searchPostBynavBar, searchProfileByNavBar } from '../../utils/CallApiOverView';
import KoTimThay from './KoTimThay';
function Search() {
    const history = useNavigate();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get('q');
    const [searchType, setSearchType] = useState('all');
    const [gachChan, setGachChan] = useState([]);
    const [baiViet, setBaiViet] = useState([]);
    const [profiles, setProfiles] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log(query);
                const result = await searchPostBynavBar(
                    query,
                    24,
                    localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).id : 0,
                );
                console.log(result);
                setBaiViet(result);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);
    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log(query);
                const result = await searchProfileByNavBar(
                    query,
                    8,
                    localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).id : 0,
                );
                console.log(result);
                setProfiles(result);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);
    useEffect(() => {
        if (searchType === 'all') setGachChan([true, false, false]);
        if (searchType === 'user') setGachChan([false, true, false]);
        if (searchType === 'video') setGachChan([false, false, true]);
    }, [searchType]);
    const mousehovergachchan = (number) => {
        const n = 3;
        let a = [...gachChan];
        for (let i = 0; i < n; i++) {
            if (i === number) a[i] = true;
            else a[i] = false;
        }
        setGachChan(a);
    };
    const mouseoutgachchan = () => {
        if (searchType === 'all') setGachChan([true, false, false]);
        if (searchType === 'user') setGachChan([false, true, false]);
        if (searchType === 'video') setGachChan([false, false, true]);
    };

    useEffect(() => {
        if (query !== null && query !== '') {
            history(`/search${searchType !== 'all' ? '/' + searchType : ''}?q=${query}`);
        } else {
            history('/');
        }
    }, [searchType, history]);

    return (
        <div className="SearchPage">
            <div className="SearchPagefull">
                <div className="SearchPage_nav">
                    <div
                        className="SearchPage_nav-icon"
                        onMouseOver={() => mousehovergachchan(0)}
                        onMouseOut={() => mouseoutgachchan()}
                        onClick={() => {
                            setSearchType('all');
                            mouseoutgachchan();
                        }}
                    >
                        <div
                            className={`SearchPage_nav-icon--chu ${
                                searchType === 'all' ? 'SearchPage_nav-icon--dam' : ''
                            } ${gachChan[0] ? 'SearchPage_nav-icon--gachchan' : ''}`}
                        >
                            Top
                        </div>
                    </div>
                    <div
                        className="SearchPage_nav-icon"
                        onMouseOver={() => mousehovergachchan(1)}
                        onMouseOut={() => mouseoutgachchan()}
                        onClick={() => {
                            setSearchType('user');
                            mouseoutgachchan();
                        }}
                    >
                        <div
                            className={`SearchPage_nav-icon--chu ${
                                searchType === 'user' ? 'SearchPage_nav-icon--dam' : ''
                            } ${gachChan[1] ? 'SearchPage_nav-icon--gachchan' : ''}`}
                        >
                            Tài Khoản
                        </div>
                    </div>
                    <div
                        className="SearchPage_nav-icon"
                        onMouseOver={() => mousehovergachchan(2)}
                        onMouseOut={() => mouseoutgachchan()}
                        onClick={() => {
                            setSearchType('video');
                            mouseoutgachchan();
                        }}
                    >
                        <div
                            className={`SearchPage_nav-icon--chu ${
                                searchType === 'video' ? 'SearchPage_nav-icon--dam' : ''
                            } ${gachChan[2] ? 'SearchPage_nav-icon--gachchan' : ''}`}
                        >
                            Video
                        </div>
                    </div>
                    <div className="SearchPage_nav-icon" disabled>
                        <div className={'SearchPage_nav-icon--chu '}>LIVE</div>
                    </div>
                </div>
                {searchType === 'all' && (
                    <>
                        {profiles.length <= 0 && baiViet.length <= 0 && <KoTimThay />}
                        {profiles.length > 0 && (
                            <>
                                <div className="SearchPage_headline">
                                    <h4>Tài Khoản</h4>
                                    <p style={{ cursor: 'pointer' }} onClick={() => setSearchType('user')}>
                                        Xem Thêm {'>'}
                                    </p>
                                </div>
                                <Link to={profiles[0] && profiles[0].user ? '/' + profiles[0].user.userName : '/'}>
                                    <div className="SearchPage_Top-acc" style={{ marginBottom: '20px' }}>
                                        <img
                                            src={
                                                profiles[0] && profiles[0].user && profiles[0].user.avatar
                                                    ? profiles[0].user.avatar
                                                    : 'https://icons.iconarchive.com/icons/icons8/ios7/64/Users-Administrator-icon.png'
                                            }
                                            alt="ảnh người dùng"
                                            className="SearchPage_Top-acc--img"
                                        />

                                        <div className="SearchPage_Top-acc--nameAnd">
                                            <p style={{ fontWeight: '550' }}>
                                                {profiles[0] && profiles[0].user && profiles[0].user.userName}{' '}
                                                {profiles[0] && profiles[0].user && profiles[0].user.famous && (
                                                    <span>
                                                        <BsCheckCircleFill style={{ color: '#20d5ec' }} />
                                                    </span>
                                                )}
                                            </p>
                                            <p>
                                                {profiles[0] && profiles[0].user && profiles[0].user.name}
                                                {' . '}
                                                <span style={{ fontWeight: '540' }}>
                                                    {profiles[0] && profiles[0].follower}
                                                </span>{' '}
                                                <span>Follower</span>
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                            </>
                        )}
                        {baiViet.length > 0 && (
                            <>
                                <div className="SearchPage_headline">
                                    <h4>Video</h4>
                                    <p></p>
                                </div>
                                <div className="SearchPage_Top-video">
                                    {baiViet.map((number) => (
                                        <Link
                                            key={number.video.id}
                                            to={'/' + number.user.userName + '/video/' + number.video.id}
                                        >
                                            <div className="SearchPage_Top-video-child">
                                                <img
                                                    src={number.video.link}
                                                    alt="sai"
                                                    className="SearchPage_Top-video-child_img"
                                                />
                                                <div
                                                    style={{
                                                        display: 'flex',
                                                        flexDirection: 'row',
                                                        justifyContent: 'flex-start',
                                                    }}
                                                >
                                                    <p>{number.video.mota}</p>
                                                </div>

                                                <div className="SearchPage_Top-video-child_flex">
                                                    <div className="SearchPage_Top-video-child_flex-user">
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
                                                                className="SearchPage_Top-video-child_flex-user-img"
                                                            />
                                                        </span>
                                                        <span
                                                            style={{ fontWeight: '20', marginLeft: '5px' }}
                                                            className="SearchPage_Top-video-child_flex-user-link"
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                e.stopPropagation();
                                                            }}
                                                        >
                                                            {number.user.userName}
                                                        </span>

                                                        <BsCheckCircleFill
                                                            style={{ fontSize: '14px', color: '#20d5ec' }}
                                                        />
                                                    </div>
                                                    <div className="SearchPage_Top-video-child_flex-like">
                                                        <AiOutlineHeart
                                                            style={{
                                                                margin: '0',
                                                                padding: '0',
                                                                marginRight: '4px',
                                                                fontSize: '20px',
                                                            }}
                                                        />
                                                        <span style={{ fontSize: '15px' }}>{number.likes}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </>
                        )}
                    </>
                )}
                {searchType === 'video' && (
                    <>
                        {baiViet.length <= 0 && <KoTimThay />}
                        <div className="SearchPage_Top-video">
                            {baiViet.map((number) => (
                                <Link
                                    key={number.video.id}
                                    to={'/' + number.user.userName + '/video/' + number.video.id}
                                >
                                    <div className="SearchPage_Top-video-child">
                                        <img
                                            src={number.video.link}
                                            alt="sai"
                                            className="SearchPage_Top-video-child_img"
                                        />
                                        <div
                                            style={{
                                                display: 'flex',
                                                flexDirection: 'row',
                                                justifyContent: 'flex-start',
                                            }}
                                        >
                                            <p>{number.video.mota}</p>
                                        </div>

                                        <div className="SearchPage_Top-video-child_flex">
                                            <div className="SearchPage_Top-video-child_flex-user">
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
                                                        className="SearchPage_Top-video-child_flex-user-img"
                                                    />
                                                </span>
                                                <span
                                                    style={{ fontWeight: '20', marginLeft: '5px' }}
                                                    className="SearchPage_Top-video-child_flex-user-link"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        e.stopPropagation();
                                                    }}
                                                >
                                                    {number.user.userName}
                                                </span>

                                                <BsCheckCircleFill style={{ fontSize: '14px', color: '#20d5ec' }} />
                                            </div>
                                            <div className="SearchPage_Top-video-child_flex-like">
                                                <AiOutlineHeart
                                                    style={{
                                                        margin: '0',
                                                        padding: '0',
                                                        marginRight: '4px',
                                                        fontSize: '20px',
                                                    }}
                                                />
                                                <span style={{ fontSize: '15px' }}>{number.likes}</span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </>
                )}
                {searchType === 'user' && (
                    <>
                        {profiles.length <= 0 && <KoTimThay />}
                        <div className="SearchPage_user">
                            {profiles.map((number) => (
                                <Link to={'/' + number.user.userName}>
                                    <div className="SearchPage_Top-acc">
                                        <img
                                            src={
                                                number.user.avatar
                                                    ? number.user.avatar
                                                    : 'https://icons.iconarchive.com/icons/icons8/ios7/64/Users-Administrator-icon.png'
                                            }
                                            alt="ảnh người dùng"
                                            className="SearchPage_Top-acc--img"
                                        />

                                        <div className="SearchPage_Top-acc--nameAnd">
                                            <p style={{ fontWeight: '550' }}>
                                                {number.user.userName}{' '}
                                                {number.user.famous && (
                                                    <span>
                                                        <BsCheckCircleFill style={{ color: '#20d5ec' }} />
                                                    </span>
                                                )}
                                            </p>
                                            <p>
                                                {number.user.name}{' '}
                                                <span style={{ fontWeight: '540' }}>{number.follower}</span>{' '}
                                                <span>Follower</span>
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default Search;
