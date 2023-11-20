import React, { useEffect, useState } from 'react';
import '../Profile/Profile.scss';
import { useParams, Link } from 'react-router-dom';
import { BsCheckCircleFill } from 'react-icons/bs';
import { AiFillLock } from 'react-icons/ai';
import { searchProfile, follow, unFollow, autoLogin } from '../../utils/CallApiOverView';
import LoginForm from '../../Layout/Navbar/LoginForm';
import { FiEdit } from 'react-icons/fi';
import EditProfile from './EditProfile';
const Profile = () => {
    const [showLogin, setShowLogin] = useState(false);
    const { profile } = useParams();
    const [showSua, setShowSua] = useState(false);
    const [userId, setUserId] = useState(
        localStorage.getItem('user') != null ? JSON.parse(localStorage.getItem('user')).id : 0,
    );

    const [data, setData] = useState();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await searchProfile(userId, profile);
                setData(result);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    const ketthucFolow = async (number) => {
        const updatedData = { ...number, trangthai: 2 };
        const xxx = await unFollow(
            JSON.parse(localStorage.getItem('user')).id,
            number.user.id,
            sessionStorage.getItem('jwt'),
        )
            .then((da) => {
                setData(updatedData);
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
                setData(updatedData);
                return da.msg;
            })
            .catch((err) => {
                console.log(err);
            });
        console.log(xxx);
    };
    function close() {
        setShowSua(false);
    }
    return (
        <>
            {showSua && (
                <EditProfile
                    onClick={() => close()}
                    LinkAnh={
                        data.user.avatar
                            ? data.user.avatar
                            : 'https://icons.iconarchive.com/icons/icons8/ios7/64/Users-Administrator-icon.png'
                    }
                    UserName={data.user.userName}
                    Name={data.user.name}
                    Bio={data.user.bio}
                />
            )}

            <LoginForm showLoginForm={showLogin} />
            <div className="Profile">
                <div className="ProfileHead1">
                    {data && data.user && (
                        <img
                            src={
                                data.user.avatar
                                    ? data.user.avatar
                                    : 'https://icons.iconarchive.com/icons/icons8/ios7/64/Users-Administrator-icon.png'
                            }
                            alt="lỗi"
                            className="ProfileHead1Img"
                        />
                    )}
                    <div className="ProfileHead1Div">
                        {data && data.user && (
                            <div style={{ marginBottom: '20px' }}>
                                <p style={{ fontSize: '36px', lineHeight: '36px', marginBottom: '4px' }}>
                                    {data.user.userName}{' '}
                                    {data.user.famous && (
                                        <BsCheckCircleFill style={{ fontSize: '27px', color: '#20d5ec' }} />
                                    )}
                                </p>
                                <p style={{ fontSize: '20px', lineHeight: '20px' }}>{data.user.name}</p>
                            </div>
                        )}
                        {data && (
                            <>
                                {data.trangthai === 0 && (
                                    <button className="ProfileHead1DivButton" onClick={() => setShowLogin(true)}>
                                        <h3>Follow</h3>
                                    </button>
                                )}
                                {data.trangthai === 1 && (
                                    <button className="ProfileHead1DivButton1" onClick={() => setShowSua(true)}>
                                        <h3>
                                            <FiEdit /> Sửa Hồ Sơ
                                        </h3>
                                    </button>
                                )}
                                {data.trangthai === 2 && (
                                    <button
                                        className="ProfileHead1DivButton"
                                        onClick={() => {
                                            batdauFolow(data);
                                        }}
                                    >
                                        <h3>Follow</h3>
                                    </button>
                                )}
                                {data.trangthai === 3 && (
                                    <button
                                        className="ProfileHead1DivButton1"
                                        onClick={() => {
                                            ketthucFolow(data);
                                        }}
                                    >
                                        <h3>Following</h3>
                                    </button>
                                )}
                            </>
                        )}
                    </div>
                </div>
                <div className="ProfileHead2">
                    {data && (
                        <div>
                            <span style={{ fontWeight: '700', color: 'black', fontSize: '20px' }}>
                                {data.dangFollow}
                            </span>
                            <span style={{ opacity: '0.7', marginRight: '20px' }} className="ProfileHead2Span">
                                {' '}
                                Đang Follow
                            </span>
                            <span style={{ fontWeight: '700', color: 'black', fontSize: '20px' }}>{data.follower}</span>
                            <span style={{ opacity: '0.7' }} className="ProfileHead2Span">
                                {' '}
                                Follower
                            </span>
                        </div>
                    )}
                </div>
                <div className="ProfileMota">{data && data.user && <p>{data.user.bio}</p>}</div>
                <div className="ProfilePhanTrang">
                    <p className="ProfilePhanTrangP ProfilePhanTrangP1" id="profile1">
                        <span>Bài Viết</span>
                    </p>
                    <p className="ProfilePhanTrangP ProfilePhanTrangP2" id="profile2" disabled>
                        <AiFillLock style={{ fontSize: '20px' }} />
                        <span>Đã Thích</span>
                    </p>
                </div>
                <div className="ProfileBaiViet">
                    {data &&
                        data.videos &&
                        data.videos.map((number, index) => (
                            <Link
                                key={index}
                                className="ProfileBaiVietImg"
                                to={'/' + data.user.userName + '/video/' + number.id}
                            >
                                <img src={number.link} alt="a" className="ProfileBaiVietImgContent" />
                            </Link>
                        ))}
                </div>
            </div>
        </>
    );
};

export default Profile;
