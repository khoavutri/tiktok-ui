import './Navbar.scss';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import MenuNavbar from './MenuNavbar';
import LoginForm from './LoginForm';
import request from '../../utils/request';
import { autoLogin } from '../../utils/CallApiOverView';
import { RiAdminLine } from 'react-icons/ri';
import SearchForm from './SearchForm';
import { useTranslation } from 'react-i18next';
const MENUBAR_1 = [
    {
        icon: 'https://icons.iconarchive.com/icons/simpleicons-team/simple/24/google-translate-icon.png',
        data: ' Ngôn Ngữ',
        to: '',
        children: [
            {
                icon: '',
                data: ' English',
                to: '',
                children: [],
            },
            {
                icon: '',
                data: ' Tiếng Việt',
                to: '',
                children: [
                    {
                        icon: '',
                        data: ' Việt Đểu',
                        to: '',
                        children: [],
                    },
                    {
                        icon: '',
                        data: ' Việt Xịn',
                        to: '',
                        children: [],
                    },
                ],
            },
        ],
    },
    {
        icon: 'https://icons.iconarchive.com/icons/github/octicons/24/question-24-icon.png',
        data: ' Phản Hồi',
        to: '',
        children: [],
    },
    {
        icon: 'https://icons.iconarchive.com/icons/pictogrammers/material/24/keyboard-close-outline-icon.png',
        data: ' Phím Tắt',
        to: 'https://www.facebook.com/khoa.tri.365.org',
        children: [],
    },
];
function Navbar() {
    const [ShowLoginForm, setShowLoginForm] = useState(false);
    const { t } = useTranslation();
    const Avatar = ({ link }) => {
        return (
            <>
                <div className="navBarMenuAvatar">
                    <img style={{ borderRadius: '50%', marginLeft: '10px' }} src={link} width="24" height="24"></img>
                    <div
                        style={{
                            height: 'auto',
                            width: '250px',
                            position: 'absolute',
                            top: '30px',
                            right: '-20px',
                        }}
                        className="navBarMenuAvatarIcon"
                    >
                        <div>
                            <div
                                className="navBarMenuAvatarIconCon"
                                style={{ marginTop: '6px' }}
                                onClick={() => {
                                    window.location.href = '/' + JSON.parse(localStorage.getItem('user')).userName;
                                }}
                            >
                                <img
                                    src="https://icons.iconarchive.com/icons/custom-icon-design/silky-line-user/16/user-icon.png"
                                    width="16"
                                    height="16"
                                    style={{ marginLeft: '20px', marginRight: '20px' }}
                                ></img>
                                <p className="navBarMenuAvatarIconConP">Xem hồ sơ</p>
                            </div>

                            <div className="navBarMenuAvatarIconCon">
                                <img
                                    src="https://icons.iconarchive.com/icons/iconsmind/outline/16/Bookmark-icon.png"
                                    width="16"
                                    height="16"
                                    style={{ marginLeft: '20px', marginRight: '20px' }}
                                ></img>
                                <p className="navBarMenuAvatarIconConP">Yêu thích</p>
                            </div>
                            <div className="navBarMenuAvatarIconCon">
                                <img
                                    src="https://icons.iconarchive.com/icons/ionic/ionicons/16/logo-tiktok-icon.png"
                                    width="16"
                                    height="16"
                                    style={{ marginLeft: '20px', marginRight: '20px' }}
                                ></img>
                                <p className="navBarMenuAvatarIconConP">Nhận xu</p>
                            </div>
                            <div className="navBarMenuAvatarIconCon">
                                <img
                                    src="https://icons.iconarchive.com/icons/iconsmind/outline/16/Idea-3-icon.png"
                                    width="16"
                                    height="16"
                                    style={{ marginLeft: '20px', marginRight: '20px' }}
                                ></img>
                                <p className="navBarMenuAvatarIconConP">Creator Center</p>
                            </div>
                            <div className="navBarMenuAvatarIconCon">
                                <img
                                    src="https://icons.iconarchive.com/icons/pictogrammers/material-light/16/settings-icon.png"
                                    width="16"
                                    height="16"
                                    style={{ marginLeft: '20px', marginRight: '20px' }}
                                ></img>
                                <p className="navBarMenuAvatarIconConP">Cài đặt</p>
                            </div>
                            <div className="navBarMenuAvatarIconCon">
                                <img
                                    src="https://icons.iconarchive.com/icons/ionic/ionicons/16/language-icon.png"
                                    width="16"
                                    height="16"
                                    style={{ marginLeft: '20px', marginRight: '20px' }}
                                ></img>
                                <p className="navBarMenuAvatarIconConP">{t('handleLanguage')}</p>
                            </div>
                            <div className="navBarMenuAvatarIconCon">
                                <img
                                    src="https://icons.iconarchive.com/icons/iconoir-team/iconoir/16/question-mark-icon.png"
                                    width="16"
                                    height="16"
                                    style={{ marginLeft: '20px', marginRight: '20px' }}
                                ></img>
                                <p className="navBarMenuAvatarIconConP">Phản hồi và trợ giúp</p>
                            </div>
                            <div className="navBarMenuAvatarIconCon">
                                <img
                                    src="https://icons.iconarchive.com/icons/pictogrammers/material/16/keyboard-variant-icon.png"
                                    width="16"
                                    height="16"
                                    style={{ marginLeft: '20px', marginRight: '20px' }}
                                ></img>
                                <p className="navBarMenuAvatarIconConP">Phím tắt</p>
                            </div>
                            <div className="navBarMenuAvatarIconCon">
                                <img
                                    src="https://icons.iconarchive.com/icons/colebemis/feather/16/moon-icon.png"
                                    width="16"
                                    height="16"
                                    style={{ marginLeft: '20px', marginRight: '20px' }}
                                ></img>
                                <p className="navBarMenuAvatarIconConP">Chế độ tối</p>
                            </div>
                            <hr style={{ color: 'rgba(229, 229, 229, 1)', opacity: '0.5' }} />

                            <div
                                className="navBarMenuAvatarIconCon"
                                style={{ marginBottom: '6px' }}
                                onClick={() => {
                                    localStorage.removeItem('user');
                                    sessionStorage.removeItem('jwt');
                                    window.location.href = '/';
                                }}
                            >
                                <img
                                    src="https://icons.iconarchive.com/icons/pictogrammers/material-light/16/logout-icon.png"
                                    width="16"
                                    height="16"
                                    style={{ marginLeft: '20px', marginRight: '20px' }}
                                ></img>
                                <p className="navBarMenuAvatarIconConP">Đăng xuất</p>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    };

    const [page, setPage] = useState(1);

    const IconBar1 = () => {
        return (
            <div className="Navbar_iconBar">
                <div
                    style={{ textDecoration: 'none', color: 'black' }}
                    onClick={() => setShowLoginForm(true)}
                    className="phancontro"
                >
                    <div className="cangiuu">
                        <img
                            style={{ marginLeft: '10px' }}
                            src="https://icons.iconarchive.com/icons/pictogrammers/material-light/24/plus-icon.png"
                            width="24"
                            height="24"
                        />
                        Tải Lên
                    </div>
                </div>

                <Link to="" style={{ textDecoration: 'none', marginLeft: '20px' }} className="mo">
                    <div
                        onClick={() => {
                            setShowLoginForm(true);
                        }}
                        className="cangiuu"
                        style={{ backgroundColor: '#fe2c55', borderRadius: '5px', color: 'white' }}
                    >
                        Đăng Nhập
                    </div>
                </Link>
                <div className="tuychon">
                    <button className="butonnnn">
                        <img
                            src="https://icons.iconarchive.com/icons/bootstrap/bootstrap/32/Bootstrap-three-dots-vertical-icon.png"
                            width="32"
                            height="32"
                        ></img>
                    </button>
                    <MenuNavbar itemss={MENUBAR_1} />
                </div>
            </div>
        );
    };
    const IconBar2 = () => {
        return (
            <div className="Navbar_iconBar">
                {localStorage.getItem('user') && JSON.parse(localStorage.getItem('user')).role === 'ADMIN' && (
                    <Link className="Navbar_iconBar--admin_link" to={'/admin/'}>
                        <div className="Navbar_iconBar--admin">
                            <RiAdminLine />
                            Admin
                        </div>
                    </Link>
                )}
                <Link to="/Upload" style={{ textDecoration: 'none', color: 'black' }}>
                    <div className="cangiuu">
                        <img
                            style={{ marginLeft: '10px' }}
                            src="https://icons.iconarchive.com/icons/pictogrammers/material-light/24/plus-icon.png"
                            width="24"
                            height="24"
                        />
                        Tải Lên
                    </div>
                </Link>

                <Link>
                    <button className="iconbar_message">
                        <img
                            style={{ marginLeft: '10px' }}
                            src="https://icons.iconarchive.com/icons/bootstrap/bootstrap/24/Bootstrap-send-icon.png"
                            width="24"
                            height="24"
                        ></img>
                    </button>
                </Link>

                <Link>
                    <button className="iconbar_message">
                        <img
                            style={{ marginLeft: '10px' }}
                            src="https://icons.iconarchive.com/icons/custom-icon-design/mono-general-2/24/mail-icon.png"
                            width="24"
                            height="24"
                        ></img>
                    </button>
                </Link>

                <Link>
                    <button
                        className="iconbar_message"
                        onClick={() => {
                            setPage(1);
                        }}
                    >
                        {localStorage.getItem('user') !== null && (
                            <>
                                {!JSON.parse(localStorage.getItem('user')).avatar && (
                                    <Avatar
                                        link={
                                            'https://icons.iconarchive.com/icons/icons8/ios7/24/Users-Administrator-icon.png'
                                        }
                                    />
                                )}
                                {JSON.parse(localStorage.getItem('user')).avatar && (
                                    <Avatar link={JSON.parse(localStorage.getItem('user')).avatar} />
                                )}
                            </>
                        )}
                    </button>
                </Link>
            </div>
        );
    };
    useEffect(() => {
        const da = localStorage.getItem('user');
        if (da != null) {
            setShowLoginForm(false);
            setPage(2);
        }
    });
    useEffect(() => {
        if (localStorage.getItem('user') !== null) {
            const storedUser = JSON.parse(localStorage.getItem('user'));
            const aicall = async ({ username, password }) => {
                try {
                    const response = await autoLogin({ username: username, password: password });
                    return response;
                } catch (error) {
                    return null;
                }
            };
            if (storedUser != null) {
                if (sessionStorage.getItem('jwt') === null) {
                    aicall({ username: storedUser.userName, password: storedUser.passWord })
                        .then((jwt) => {
                            if (jwt) {
                                sessionStorage.setItem('jwt', jwt);
                            }
                        })
                        .catch((error) => {
                            console.error(error);
                        });
                }
            }
        }
    }, []);
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

    return (
        <div className="Navbar">
            <Link to="/">
                <div className="Navbar_icon">
                    <img
                        src="https://icons.iconarchive.com/icons/fa-team/fontawesome-brands/48/FontAwesome-Brands-Tiktok-icon.png"
                        width="48"
                        height="48"
                    ></img>
                    <span>TIKTOK</span>
                </div>
            </Link>
            <SearchForm />
            {page === 1 && <IconBar1 />}
            {page === 2 && <IconBar2 />}
            {ShowLoginForm && (
                <img
                    src="https://icons.iconarchive.com/icons/icons8/ios7/32/User-Interface-Delete-Sign-icon.png"
                    width="32"
                    height="32"
                    style={{ zIndex: '101', position: 'fixed', top: '15vh', right: '39vw' }}
                    className="oloso"
                    onClick={() => setShowLoginForm(false)}
                ></img>
            )}
            <LoginForm showLoginForm={ShowLoginForm} />
        </div>
    );
}

export default Navbar;
