import '../Video/Video.scss';
import { AiOutlineClose } from 'react-icons/ai';
import { HiDotsHorizontal } from 'react-icons/hi';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { HiSpeakerWave, HiSpeakerXMark } from 'react-icons/hi2';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { FaShare, FaHeart } from 'react-icons/fa';

import {
    BsFillChatDotsFill,
    BsFacebook,
    BsFillSendFill,
    BsWhatsapp,
    BsThreeDots,
    BsThreeDotsVertical,
    BsCheckCircleFill,
} from 'react-icons/bs';
import { AiFillHeart, AiOutlineTwitter, AiOutlineHeart } from 'react-icons/ai';
import { ImEmbed2 } from 'react-icons/im';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../../Layout/Navbar/LoginForm';
import '../Home/Home.scss';
import {
    searchAllCmtsByVideoId,
    searchBaiVietByVideoId,
    likeVideoApi,
    unLikeVideoApi,
    follow,
    unFollow,
    createCmt,
    autoLogin,
    deleteCmt,
} from '../../utils/CallApiOverView';
function Video() {
    const [showLogin, setShowLogin] = useState(false);
    const [haveSound, setHaveSound] = useState(true);
    const [gachChan, setGachChan] = useState('');
    const [myCmt, setMyCmt] = useState('');
    const [baiViet, setBaiViet] = useState({});
    const [cmts, setCmts] = useState([]);
    const path = window.location.pathname.slice(1, window.location.pathname.length);
    const [showHeart, setShowHeart] = useState(false);
    const [xHeart, setXHeart] = useState('0px');
    const [yHeart, setYHeart] = useState('0px');
    const history = useNavigate();
    useEffect(() => {
        const aicall = async ({ username, password }) => {
            try {
                const response = await autoLogin({ username: username, password: password });
                return response;
            } catch (error) {
                return null;
            }
        };

        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) {
            aicall({ username: storedUser.userName, password: storedUser.passWord })
                .then((jwt) => {
                    sessionStorage.setItem('jwt', jwt);
                })
                .catch((error) => {
                    console.error(error);
                });

            const intervalId = setInterval(async () => {
                try {
                    const jwt = await aicall({ username: storedUser.userName, password: storedUser.passWord });
                    sessionStorage.setItem('jwt', jwt);
                } catch (error) {
                    console.error(error);
                }
            }, 30 * 60 * 1000);

            return () => clearInterval(intervalId);
        }
    }, []);
    const likeVideo = async (number) => {
        let a = { ...number };
        a.daLike = 2;
        a.likes++;
        const xxx = await likeVideoApi(
            JSON.parse(localStorage.getItem('user')).id,
            number.video.id,
            sessionStorage.getItem('jwt'),
        )
            .then((da) => {
                setBaiViet(a);
                return da.msg;
            })
            .catch((err) => {
                console.log(err);
            });
        console.log(xxx);
    };
    const xoaLike = async (number) => {
        let a = { ...number };
        a.daLike = 1;
        a.likes--;
        const xxx = await unLikeVideoApi(
            JSON.parse(localStorage.getItem('user')).id,
            number.video.id,
            sessionStorage.getItem('jwt'),
        )
            .then((da) => {
                setBaiViet(a);
                return da.msg;
            })
            .catch((err) => {
                console.log(err);
            });
        console.log(xxx);
    };
    const ketthucFolow = async (number) => {
        const updatedData = { ...number, trangthai: 2 };
        const xxx = await unFollow(
            JSON.parse(localStorage.getItem('user')).id,
            number.user.id,
            sessionStorage.getItem('jwt'),
        )
            .then((da) => {
                setBaiViet(updatedData);
                return da.msg;
            })
            .catch((err) => {
                console.log(err);
            });
        console.log(xxx);
    };
    const batdauFolow = async (number) => {
        const updatedData = { ...number, trangthai: 3 };

        const xxx = await follow(
            JSON.parse(localStorage.getItem('user')).id,
            number.user.id,
            sessionStorage.getItem('jwt'),
        )
            .then((da) => {
                setBaiViet(updatedData);
                return da.msg;
            })
            .catch((err) => {
                console.log(err);
            });
        console.log(xxx);
    };
    const xoaCmt = (id) => {
        const fetchData = async () => {
            try {
                const result = await deleteCmt(id, sessionStorage.getItem('jwt'))
                    .then((da) => {
                        return da;
                    })
                    .catch((err) => console.log(err));
                const sult = await searchAllCmtsByVideoId(
                    baiViet.video.id,
                    localStorage.getItem('user') !== null ? JSON.parse(localStorage.getItem('user')).id : 0,
                );
                let xxx = { ...baiViet };
                xxx.cmts--;
                setBaiViet(xxx);
                setCmts(sult.data);
                console.log(result.msg);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (isNaN(parseInt(path.slice(path.lastIndexOf('/') + 1, path.length)))) {
                    window.location.href = '/NotFound';
                } else {
                    const result = await searchAllCmtsByVideoId(
                        path.slice(path.lastIndexOf('/') + 1, path.length),
                        localStorage.getItem('user') !== null ? JSON.parse(localStorage.getItem('user')).id : 0,
                    );

                    if (result.status === 200) {
                        const sult = await searchBaiVietByVideoId(
                            path.slice(path.lastIndexOf('/') + 1, path.length),
                            localStorage.getItem('user') !== null ? JSON.parse(localStorage.getItem('user')).id : 0,
                        );
                        if (sult.data.user.userName !== path.slice(0, path.indexOf('/'))) {
                            window.location.href = '/' + sult.data.user.userName + '/video/' + sult.data.video.id;
                        }
                        setBaiViet(sult.data);
                        setCmts(result.data);
                    } else {
                        window.location.href = '/NotFound';
                    }
                }
            } catch (error) {
                console.error(error, 'ngu');
            }
        };
        fetchData();
    }, []);
    function handleClickCopy() {
        const textToCopy = 'http://localhost:3000/' + path;

        navigator.clipboard
            .writeText(textToCopy)
            .then(() => {
                alert('Đã sao chép thành công');
            })
            .catch((err) => {
                alert('Lỗi khi sao chép:', err);
            });
    }

    const dangCmt = (abc) => {
        const fetchData = async () => {
            try {
                const result = await createCmt(
                    JSON.parse(localStorage.getItem('user')).id,
                    baiViet.video.id,
                    abc,
                    sessionStorage.getItem('jwt'),
                )
                    .then((da) => {
                        setMyCmt('');
                        return da;
                    })
                    .catch((err) => console.log(err));
                const sult = await searchAllCmtsByVideoId(
                    baiViet.video.id,
                    localStorage.getItem('user') !== null ? JSON.parse(localStorage.getItem('user')).id : 0,
                );
                let xxx = { ...baiViet };
                xxx.cmts++;
                setBaiViet(xxx);
                setCmts(sult.data);
                console.log(result.msg);
            } catch (error) {
                console.error(error);
            }
        };
        if (localStorage.getItem('user')) {
            fetchData();
        }
    };
    const handleDoubleClick = (event) => {
        if (baiViet.daLike === 0) {
            setShowLogin(true);
        } else if (!showHeart) {
            const iconSize = 100;
            setXHeart(event.clientX - iconSize / 2 + 'px');
            setYHeart(event.clientY - iconSize / 2 + 'px');
            setShowHeart(true);
            setTimeout(() => {
                setShowHeart(false);
            }, 500);
            if (baiViet.daLike === 1) {
                likeVideo(baiViet);
            }
        }
    };
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            if (localStorage.getItem('user') === null) {
                setShowLogin(true);
            } else {
                if (myCmt.length > 0) {
                    dangCmt(myCmt);
                }
            }
            event.preventDefault();
        }
    };
    return (
        <>
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
            <div className="Video">
                <div
                    className="Video_left"
                    style={{
                        backgroundImage: baiViet && baiViet.video ? `url(${baiViet.video.link})` : 'none',
                    }}
                    onDoubleClick={handleDoubleClick}
                >
                    {showHeart && (
                        <FaHeart style={{ color: 'fe2c55', top: yHeart, left: xHeart }} className="DoubleClickToLike" />
                    )}
                    <div
                        className="Video_left-icon Video_left-icon-close"
                        onClick={() => {
                            history(-1);
                        }}
                    >
                        <AiOutlineClose style={{ fontSize: '24px' }} />
                    </div>
                    <div className="Video_left-icon Video_left-icon-dots">
                        <HiDotsHorizontal style={{ fontSize: '24px' }} />
                    </div>
                    <div className="Video_left-topRight">
                        <div className="Video_left-icon Video_left-icon-to">
                            <IoIosArrowUp style={{ fontSize: '24px' }} />
                        </div>
                        <div className="Video_left-icon Video_left-icon-to">
                            <IoIosArrowDown style={{ fontSize: '24px' }} />
                        </div>
                    </div>
                    <div
                        className="Video_left-icon  Video_left-icon-speaker"
                        onClick={() => {
                            if (haveSound) {
                                setHaveSound(false);
                            } else setHaveSound(true);
                        }}
                    >
                        {haveSound && <HiSpeakerWave style={{ fontSize: '24px' }} />}
                        {!haveSound && <HiSpeakerXMark style={{ fontSize: '24px' }} />}
                    </div>
                    <div className="Video_left-content">
                        <img
                            src={baiViet && baiViet.video && baiViet.video.link}
                            alt="img-content"
                            className="Video_left-content--img"
                        />
                    </div>
                </div>
                <div className="Video_right Video_right-cuon">
                    <div className="Video_right-top">
                        <div className="Video_right-top_flex">
                            <div style={{ display: 'flex' }}>
                                <Link
                                    onMouseOver={() => {
                                        setGachChan('gachChan');
                                    }}
                                    onMouseOut={() => {
                                        setGachChan('');
                                    }}
                                    className="point"
                                    style={{ marginBottom: '0' }}
                                    to={baiViet && baiViet.user && '/' + baiViet.user.userName}
                                >
                                    <img
                                        alt="avatar-nguoidang"
                                        src={
                                            baiViet && baiViet.user && baiViet.user.avatar
                                                ? baiViet.user.avatar
                                                : 'https://icons.iconarchive.com/icons/icons8/ios7/64/Users-Administrator-icon.png'
                                        }
                                        style={{
                                            height: '48px',
                                            width: '48px',
                                            borderRadius: '50%',
                                            marginRight: '10px',
                                        }}
                                    />
                                </Link>
                                <Link
                                    onMouseOver={() => {
                                        setGachChan('gachChan');
                                    }}
                                    onMouseOut={() => {
                                        setGachChan('');
                                    }}
                                    to={baiViet && baiViet.user && '/' + baiViet.user.userName}
                                >
                                    <div
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'center',
                                            alignItems: 'start',
                                        }}
                                    >
                                        <h4 className={gachChan}>
                                            {baiViet && baiViet.user && baiViet.user.userName}
                                            {baiViet && baiViet.user && baiViet.user.famous && (
                                                <BsCheckCircleFill style={{ fontSize: '14px', color: '#20d5ec' }} />
                                            )}
                                        </h4>

                                        <p style={{ margin: '0', padding: '0', color: 'black' }}>
                                            {baiViet && baiViet.user && baiViet.user.name}
                                        </p>
                                    </div>
                                </Link>
                            </div>
                            {baiViet.trangthai === 0 && (
                                <button className="VideoContentSubjectFollower" onClick={() => setShowLogin(true)}>
                                    Follow
                                </button>
                            )}
                            {baiViet.trangthai === 1 && (
                                <div className="ChaHomeContentSubjectDots">
                                    <BsThreeDotsVertical className="HomeContentSubjectDots" />
                                    <div className="xoaHomeContentSubjectDots" onClick={() => {}}>
                                        Delete
                                    </div>
                                </div>
                            )}
                            {baiViet.trangthai === 2 && (
                                <button className="VideoContentSubjectFollower" onClick={() => batdauFolow(baiViet)}>
                                    Follow
                                </button>
                            )}
                            {baiViet.trangthai === 3 && (
                                <button className="VideoContentSubjectFollower1" onClick={() => ketthucFolow(baiViet)}>
                                    Following
                                </button>
                            )}
                        </div>
                        <p
                            className=""
                            style={{
                                width: '90%',
                                color: 'black',
                                marginBottom: '20px',
                                display: 'block',
                                wordWrap: 'break-word',
                            }}
                        >
                            {baiViet && baiViet.video && baiViet.video.mota}
                        </p>
                    </div>
                    <div className="Video_right-function">
                        <div className="Video_right-function-left">
                            <div className="Video_right-function--div_giua point">
                                {baiViet.daLike === 0 && (
                                    <div
                                        className="Video_right-function--div"
                                        onClick={() => {
                                            setShowLogin(true);
                                        }}
                                    >
                                        <AiFillHeart />
                                    </div>
                                )}
                                {baiViet.daLike === 2 && (
                                    <div
                                        className="Video_right-function--div"
                                        onClick={() => {
                                            xoaLike(baiViet);
                                        }}
                                    >
                                        <AiFillHeart style={{ color: '#fe2c55' }} />
                                    </div>
                                )}
                                {baiViet.daLike === 1 && (
                                    <div
                                        className="Video_right-function--div"
                                        onClick={() => {
                                            likeVideo(baiViet);
                                        }}
                                    >
                                        <AiFillHeart />
                                    </div>
                                )}
                                <p>{baiViet.likes}</p>
                            </div>
                            <div className="Video_right-function--div_giua">
                                <div className="Video_right-function--div">
                                    <BsFillChatDotsFill />
                                </div>
                                <p>{baiViet && baiViet.cmts ? baiViet.cmts : 0}</p>
                            </div>
                        </div>
                        <div className="Video_right-function-right">
                            <div
                                className="point Video_right-function-right--icon"
                                style={{ backgroundColor: '#51525a' }}
                            >
                                <ImEmbed2 style={{ fontSize: '15px', color: 'white' }} />
                            </div>
                            <div
                                className="point Video_right-function-right--icon"
                                style={{ backgroundColor: '#fe2c55' }}
                            >
                                <BsFillSendFill
                                    style={{
                                        color: 'white',
                                        borderRadius: '50%',
                                    }}
                                />
                            </div>

                            <div className="point Video_right-function-right--icon" style={{}}>
                                <BsFacebook
                                    style={{
                                        height: '100%',
                                        width: '100%',
                                        backgroundColor: 'white',
                                        color: ' #0075fa',
                                        borderRadius: '50%',
                                    }}
                                />
                            </div>
                            <div
                                className="point Video_right-function-right--icon"
                                style={{ backgroundColor: '#25d366' }}
                            >
                                <BsWhatsapp
                                    style={{
                                        color: 'white',
                                        borderRadius: '50%',
                                    }}
                                />
                            </div>
                            <div
                                className="point Video_right-function-right--icon"
                                style={{ backgroundColor: '#1da1f2' }}
                            >
                                <AiOutlineTwitter
                                    style={{
                                        color: 'white',
                                        borderRadius: '50%',
                                    }}
                                />
                            </div>

                            <div className="point Video_right-function-right--icon Video_right-function-right--share">
                                <FaShare style={{ fontSize: '14px' }} />
                            </div>
                        </div>
                    </div>
                    <div className="Video_right-copyLink">
                        <p className="Video_right-copyLink--p">{'http://localhost:3000/' + path}</p>
                        <button className="Video_right-copyLink--button" onClick={() => handleClickCopy()}>
                            Sao Chép
                        </button>
                    </div>
                    <div className="Video_right-headline--sticky">
                        <div className="Video_right-headline">
                            <div className="Video_right-headline--left Video_right-headline--dam">
                                Bình Luận {'(' + baiViet.cmts + ')'}
                            </div>
                            <div className="Video_right-headline--right Video_right-headline--mo">
                                Video nhà sáng tạo
                            </div>
                        </div>
                    </div>
                    <div className="Video_right-cmts">
                        {cmts.map((number) => (
                            <div className="Video_right-cmt" key={number.cmt.id}>
                                <div className="Video_right-cmt_left">
                                    <div className="Video_right-cmt_left-divImg">
                                        <Link to={'/' + number.user.userName}>
                                            <img
                                                src={
                                                    number.user.avatar
                                                        ? number.user.avatar
                                                        : 'https://icons.iconarchive.com/icons/icons8/ios7/64/Users-Administrator-icon.png'
                                                }
                                                alt="avatar-cmt"
                                                className="Video_right-cmt_left-img"
                                            />
                                        </Link>
                                    </div>
                                    <div className="Video_right-cmt_left-content">
                                        <Link
                                            className="Video_right-cmt_left-content--Link"
                                            to={'/' + number.user.userName}
                                        >
                                            <h5>
                                                {number.user.userName}{' '}
                                                {number.user && number.user.famous && (
                                                    <BsCheckCircleFill style={{ fontSize: '12px', color: '#20d5ec' }} />
                                                )}
                                            </h5>
                                        </Link>
                                        <p className="Video_right-cmt_left-content--p">{number.cmt.content}</p>
                                        <div className="Video_right-cmt_left-content--flex">
                                            <p style={{ marginRight: '8px', color: 'gray' }}>{number.cmt.date}</p>
                                            <p style={{ fontSize: '12px', color: 'gray' }} className="point">
                                                Trả lời
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="Video_right-cmt_right">
                                    <div className="Video_right-cmt_right-div">
                                        <BsThreeDots
                                            style={{ fontSize: '24px', marginBottom: '5px', opacity: '0' }}
                                            className="Video_right-cmt_right-dots"
                                        />
                                        {localStorage.getItem('user') &&
                                        JSON.parse(localStorage.getItem('user')).id === number.user.id ? (
                                            <button
                                                className="Video_right-cmt_right-xoa"
                                                onClick={() => {
                                                    xoaCmt(number.cmt.id);
                                                }}
                                            >
                                                Xóa Cmt
                                            </button>
                                        ) : (
                                            <button className="Video_right-cmt_right-xoa">Báo cáo</button>
                                        )}
                                    </div>
                                    <AiOutlineHeart style={{ color: 'gray', fontSize: '18px' }} />
                                    <p style={{ color: 'gray', fontSize: '14px' }}>0</p>
                                </div>
                            </div>
                        ))}

                        <div style={{ marginBottom: '100px' }}></div>
                    </div>
                    <div className="Video_right-bottom">
                        <input
                            placeholder="Thêm Bình Luận"
                            className="Video_right-bottom_input"
                            value={myCmt}
                            onChange={(e) => {
                                if (e.target.value.length <= 150) {
                                    setMyCmt(e.target.value);
                                }
                            }}
                            onKeyDown={handleKeyDown}
                        />

                        <p
                            style={{
                                fontSize: '10px',
                                position: 'absolute',
                                right: '16%',
                                bottom: '2%',
                                color: 'gray',
                            }}
                        >
                            {myCmt.length}/150
                        </p>
                        <div
                            className="Video_right-bottom_div"
                            onClick={() => {
                                if (localStorage.getItem('user') === null) {
                                    setShowLogin(true);
                                } else {
                                    if (myCmt.length > 0) {
                                        dangCmt(myCmt);
                                    }
                                }
                            }}
                            disabled={myCmt.length <= 0}
                        >
                            Đăng
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Video;
