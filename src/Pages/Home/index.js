import '../Home/Home.scss';
import { FaShare } from 'react-icons/fa';
import { BsFillChatDotsFill } from 'react-icons/bs';
import { AiFillHeart } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { BsCheckCircleFill } from 'react-icons/bs';
import { useEffect, useState } from 'react';
import {
    selectImgPostAll,
    test,
    follow,
    unFollow,
    deleteVideoById,
    likeVideoApi,
    unLikeVideoApi,
} from '../../utils/CallApiOverView';
import LoginForm from '../../Layout/Navbar/LoginForm';
import { BsThreeDotsVertical } from 'react-icons/bs';
function Home() {
    const [data, setData] = useState([]);
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
                const result = await selectImgPostAll(20, userId);
                setData(result);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);

    const ketthucFolow = async (number) => {
        let a = [...data];
        for (let i = 0; i < data.length; i++) {
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
                setData(a);
                return da.msg;
            })
            .catch((err) => {
                console.log(err);
            });
        console.log(xxx);
    };

    const batdauFolow = async (number) => {
        let a = [...data];
        for (let i = 0; i < data.length; i++) {
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
                setData(a);
                return da.msg;
            })
            .catch((err) => {
                console.log(err);
            });
        console.log(xxx);
    };
    const xoaBaiViet = async (number) => {
        let a = [];
        let j = 0;
        var x;
        for (let i = 0; i < data.length; i++) {
            if (number.video.id === data[i].video.id) {
                x = await deleteVideoById(number.video.id, sessionStorage.getItem('jwt'));
            } else {
                a[j] = data[i];
                j++;
            }
        }
        setData(a);
        console.log(x);
    };
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
                                            <Link className="HomeContentgachChan" to={'/' + number.user.userName}>
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
                                        {number.trangthai === 0 && (
                                            <button
                                                className="HomeContentSubjectFollower"
                                                onClick={() => setShowLogin(true)}
                                            >
                                                Follower
                                            </button>
                                        )}
                                        {number.trangthai === 1 && (
                                            <div className="ChaHomeContentSubjectDots">
                                                <BsThreeDotsVertical className="HomeContentSubjectDots" />
                                                <div
                                                    className="xoaHomeContentSubjectDots"
                                                    onClick={() => {
                                                        xoaBaiViet(number);
                                                    }}
                                                >
                                                    Delete
                                                </div>
                                            </div>
                                        )}
                                        {number.trangthai === 2 && (
                                            <button
                                                className="HomeContentSubjectFollower"
                                                onClick={() => batdauFolow(number)}
                                            >
                                                Follow
                                            </button>
                                        )}
                                        {number.trangthai === 3 && (
                                            <button
                                                className="HomeContentSubjectFollower1"
                                                onClick={() => ketthucFolow(number)}
                                            >
                                                Following
                                            </button>
                                        )}
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
                                                        <AiFillHeart style={{ height: '20px', width: '20px' }} />
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
                                                        <AiFillHeart style={{ height: '20px', width: '20px' }} />
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
                                                            style={{ height: '20px', width: '20px', color: '#fe2c55' }}
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
                                                        <BsFillChatDotsFill style={{ height: '20px', width: '20px' }} />
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
                                                <strong className="HomeContentContentIconButtonStrong">0</strong>
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
    );
}

export default Home;
