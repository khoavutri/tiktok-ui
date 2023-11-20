import '../Home/Home.scss';
import '../Folowing/Folowing.scss';
import { FaShare } from 'react-icons/fa';
import { BsFillChatDotsFill } from 'react-icons/bs';
import { AiFillHeart } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { BsCheckCircleFill } from 'react-icons/bs';
import { useEffect, useState } from 'react';
import {
    selectImgPostAllFollowing,
    likeVideoApi,
    unLikeVideoApi,
    autoLogin,
    follow,
    unFollow,
    selectRandomNotLogin,
} from '../../utils/CallApiOverView';
import LoginForm from '../../Layout/Navbar/LoginForm';
import { BsThreeDotsVertical } from 'react-icons/bs';
function Following() {
    const [data, setData] = useState([]);
    const [data1, setData1] = useState([]);
    const [userId, setUserId] = useState(
        localStorage.getItem('user') != null ? JSON.parse(localStorage.getItem('user')).id : 0,
    );

    const [showLogin, setShowLogin] = useState(false);

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
                var codeeee;
                if (sessionStorage.getItem('jwt') !== null) {
                    codeeee = sessionStorage.getItem('jwt');
                } else {
                    codeeee = await autoLogin({
                        username: JSON.parse(localStorage.getItem('user')).userName,
                        password: JSON.parse(localStorage.getItem('user')).passWord,
                    });
                }
                const result = await selectImgPostAllFollowing(userId, codeeee);
                setData(result);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);
    function limitCharacters(str, maxLength) {
        if (str && str.length > maxLength) {
            return str.substring(0, maxLength) + '...';
        }
        return str;
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await selectRandomNotLogin(
                    localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).id : 0,
                );

                if (result && result.length > 0) {
                    let xx = [...result];
                    for (let i = 0; i < xx.length; i++) {
                        xx[i].user.name = limitCharacters(xx[i].user.name, 12);
                    }
                    setData1(xx);
                }
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);

    const likeVideo = async (number) => {
        let a = [...data];
        for (let i = 0; i < data.length; i++) {
            if (a[i].video.id === number.video.id) {
                a[i].daLike = 2;
                a[i].likes++;
            }
        }
        const xxx = await likeVideoApi(
            JSON.parse(localStorage.getItem('user')).id,
            number.video.id,
            sessionStorage.getItem('jwt'),
        )
            .then((da) => {
                setData(a);
                return da.msg;
            })
            .catch((err) => {
                console.log(err);
            });
        console.log(xxx);
    };
    const xoaLike = async (number) => {
        let a = [...data];
        for (let i = 0; i < data.length; i++) {
            if (a[i].user.id === number.user.id) {
                a[i].daLike = 1;
                a[i].likes--;
            }
        }
        const xxx = await unLikeVideoApi(
            JSON.parse(localStorage.getItem('user')).id,
            number.video.id,
            sessionStorage.getItem('jwt'),
        )
            .then((da) => {
                setData(a);
                return da.msg;
            })
            .catch((err) => {
                console.log(err);
            });
        console.log(xxx);
    };
    const ketthucFolow = async (number) => {
        let a = [...data1];
        for (let i = 0; i < data1.length; i++) {
            if (a[i].user.id === number.user.id) {
                a[i].trangthai = 2;
            }
        }
        const xxx = await unFollow(
            JSON.parse(localStorage.getItem('user')).id,
            number.user.id,
            sessionStorage.getItem('jwt'),
        )
            .then((da) => {
                setData1(a);
                return da.msg;
            })
            .catch((err) => {
                console.log(err);
            });
        console.log(xxx);
    };

    const batdauFolow = async (number) => {
        let a = [...data1];
        for (let i = 0; i < data1.length; i++) {
            if (a[i].user.id === number.user.id) {
                a[i].trangthai = 3;
            }
        }
        const xxx = await follow(
            JSON.parse(localStorage.getItem('user')).id,
            number.user.id,
            sessionStorage.getItem('jwt'),
        )
            .then((da) => {
                setData1(a);
                return da.msg;
            })
            .catch((err) => {
                console.log(err);
            });
        console.log(xxx);
    };
    return (
        <>
            {' '}
            {showLogin && (
                <img
                    src="https://icons.iconarchive.com/icons/icons8/ios7/32/User-Interface-Delete-Sign-icon.png"
                    width="32"
                    height="32"
                    style={{ zIndex: '101', position: 'fixed', top: '15vh', right: '39vw' }}
                    className="oloso"
                    onClick={() => setShowLogin(false)}
                ></img>
            )}
            <LoginForm showLoginForm={showLogin} />
            {localStorage.getItem('user') && data.length > 0 ? (
                <>
                    <div className="Home">
                        {data.map((number) => (
                            <div key={number.video.id}>
                                <>
                                    <div className="HomeE">
                                        <Link to={'/' + number.user.userName}>
                                            <div className="HomeAvatar">
                                                <img
                                                    src={
                                                        number.user.avatar
                                                            ? number.user.avatar
                                                            : 'https://icons.iconarchive.com/icons/icons8/ios7/64/Users-Administrator-icon.png'
                                                    }
                                                    className="HomeAvatarImg1"
                                                />
                                            </div>
                                        </Link>
                                        <div className="HomeContent">
                                            <div className="HomeContentSubject">
                                                <div className="HomeContentSubjectOther">
                                                    <Link
                                                        className="HomeContentgachChan"
                                                        to={'/' + number.user.userName}
                                                    >
                                                        {' '}
                                                        <h3
                                                            style={{ color: 'black', fontWeight: 'bold' }}
                                                            className="HomeContentSubjectOtherH4"
                                                        >
                                                            {number.user.userName}{' '}
                                                            {number.user.famous && (
                                                                <BsCheckCircleFill
                                                                    style={{ fontSize: '14px', color: '#20d5ec' }}
                                                                />
                                                            )}
                                                        </h3>
                                                    </Link>
                                                    <p
                                                        style={{
                                                            color: 'black',
                                                            textAlign: 'left',
                                                        }}
                                                    >
                                                        {number.video.mota}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="HomeContentContent">
                                                <Link to={'/' + number.user.userName + '/video/' + number.video.id}>
                                                    <img src={number.video.link} className="HomeContentContentImg" />
                                                </Link>
                                                <div className="HomeContentContentIcon">
                                                    {number.daLike === 0 && (
                                                        <button
                                                            className="HomeContentContentIconButton"
                                                            onClick={() => setShowLogin(true)}
                                                        >
                                                            <span className="HomeContentContentIconButtonSpan">
                                                                <AiFillHeart
                                                                    style={{ height: '20px', width: '20px' }}
                                                                />
                                                            </span>
                                                            <strong className="HomeContentContentIconButtonStrong">
                                                                {number.likes}
                                                            </strong>
                                                        </button>
                                                    )}
                                                    {number.daLike === 1 && (
                                                        <button
                                                            className="HomeContentContentIconButton"
                                                            onClick={() => likeVideo(number)}
                                                        >
                                                            <span className="HomeContentContentIconButtonSpan">
                                                                <AiFillHeart
                                                                    style={{ height: '20px', width: '20px' }}
                                                                />
                                                            </span>
                                                            <strong className="HomeContentContentIconButtonStrong">
                                                                {number.likes}
                                                            </strong>
                                                        </button>
                                                    )}
                                                    {number.daLike === 2 && (
                                                        <button
                                                            className="HomeContentContentIconButton"
                                                            onClick={() => xoaLike(number)}
                                                        >
                                                            <span className="HomeContentContentIconButtonSpan">
                                                                <AiFillHeart
                                                                    style={{
                                                                        height: '20px',
                                                                        width: '20px',
                                                                        color: '#fe2c55',
                                                                    }}
                                                                />
                                                            </span>
                                                            <strong className="HomeContentContentIconButtonStrong">
                                                                {number.likes}
                                                            </strong>
                                                        </button>
                                                    )}
                                                    <Link to={'/' + number.user.userName + '/video/' + number.video.id}>
                                                        <button className="HomeContentContentIconButton">
                                                            <span className="HomeContentContentIconButtonSpan">
                                                                <BsFillChatDotsFill
                                                                    style={{ height: '20px', width: '20px' }}
                                                                />
                                                            </span>
                                                            <strong className="HomeContentContentIconButtonStrong">
                                                                {number.cmts}
                                                            </strong>
                                                        </button>
                                                    </Link>
                                                    <button className="HomeContentContentIconButton">
                                                        <span className="HomeContentContentIconButtonSpan">
                                                            <FaShare style={{ height: '20px', width: '20px' }} />
                                                        </span>
                                                        <strong className="HomeContentContentIconButtonStrong">
                                                            0
                                                        </strong>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <hr style={{ width: '600px', color: '#e9e9ea' }} />
                                </>
                            </div>
                        ))}
                    </div>
                </>
            ) : (
                <>
                    <div className="Following">
                        <div className="Following_Content">
                            {data1.map((number) => (
                                <Link to={'/' + number.user.userName} target="_blank" key={number.video.id}>
                                    <div
                                        className="Following_Content-img"
                                        style={{
                                            backgroundImage: 'url(' + number.video.link + ')',
                                        }}
                                    >
                                        <img
                                            src={
                                                number.user.avatar
                                                    ? number.user.avatar
                                                    : 'https://icons.iconarchive.com/icons/icons8/ios7/64/Users-Administrator-icon.png'
                                            }
                                            alt="x"
                                            className="Following_Content-img--img"
                                        />
                                        <h3>
                                            {number.user.name}{' '}
                                            {number.user.famous && (
                                                <BsCheckCircleFill style={{ fontSize: '14px', color: '#20d5ec' }} />
                                            )}
                                        </h3>

                                        <h5>{number.user.userName}</h5>
                                        {number.trangthai === 0 && (
                                            <button
                                                className="Following_Content-img--button"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                    setShowLogin(true);
                                                }}
                                            >
                                                <h3>Follow</h3>
                                            </button>
                                        )}
                                        {number.trangthai === 2 && (
                                            <button
                                                className="Following_Content-img--button"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                    batdauFolow(number);
                                                }}
                                            >
                                                <h3>Follow</h3>
                                            </button>
                                        )}
                                        {number.trangthai === 3 && (
                                            <button
                                                className="Following_Content-img--button-hong"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                    ketthucFolow(number);
                                                }}
                                            >
                                                <h3>Following</h3>
                                            </button>
                                        )}
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </>
            )}
        </>
    );
}

export default Following;
