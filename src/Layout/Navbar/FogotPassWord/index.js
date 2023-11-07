import '../FogotPassWord/ForgotPassWord.scss';
import '../LoginForm/LoginForm.scss';
import '../Navbar.scss';
import Error from '../../../component/toast/error';
import Success from '../../../component/toast/success';
import { useEffect, useState } from 'react';
import { Link, json } from 'react-router-dom';
import SignUpForm from '../SignUpForm';
import LoginForm from '../LoginForm';
import { authenticationCode, searchUserByGmail, updatePassWord, autoLogin } from '../../../utils/CallApiOverView';
function FogotPassWord() {
    const [login, setLogin] = useState(false);
    const [a1, seta1] = useState('');
    const [a2, seta2] = useState('');
    const [a3, seta3] = useState(false);
    const [manhap, setManhap] = useState('');
    const [a4, seta4] = useState(false);
    const [x, setx] = useState('nha');
    const [notifiiContent, setNotifiiContent] = useState('');
    const [notifiiSubject, setNotifiiSubject] = useState('');
    const [contentCode, setContentCode] = useState('Gửi mã');
    const [contentCodeColor, setContentCodeColor] = useState('buttonForgotPassword2');
    const [cothe, setCothe] = useState(true);
    const [hien, setHien] = useState('an');
    const [countdown, setCountdown] = useState(0);
    const [manhan, setManhan] = useState('');
    const [truoc, SetTruoc] = useState('');
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    function kiemTraChuoi(chuoi) {
        var regex = /^\d{6}$/;
        return regex.test(chuoi);
    }
    useEffect(() => {
        const interval = setInterval(() => {
            setCountdown((prevCountdown) => prevCountdown - 1);
        }, 1000);

        if (countdown === 0) {
            clearInterval(interval);
        }

        return () => clearInterval(interval);
    }, [countdown]);

    useEffect(() => {
        if (isValidEmail(a1) && cothe) {
            setContentCodeColor('buttonForgotPassword');
        } else {
            setContentCodeColor('buttonForgotPassword2');
        }
    });
    useEffect(() => {
        if (isValidEmail(a1) && a2 && kiemTraChuoi(manhap)) {
            setx('nhaa');
        }
    });
    useEffect(() => {
        if (!isValidEmail(a1) || !a2 || !kiemTraChuoi(manhap)) {
            setx('nha');
        }
    });
    const CallForgot = async () => {
        setHien('hien');
        setCothe(false);
        setContentCode('Gửi lại mã ');
        setContentCodeColor('buttonForgotPassword2');

        await authenticationCode({ gmail: a1 })
            .then((data) => {
                setHien('an');
                setCountdown(60);
                setManhan(data);
                SetTruoc(a1);
                setTimeout(() => {
                    setManhan('');
                    setCothe(true);
                    setContentCodeColor('buttonForgotPassword');
                }, 60000);
            })
            .catch((error) => {
                setHien('an');
                setManhan('');
                setContentCodeColor('buttonForgotPassword');
                setCothe(true);
            });
    };
    const loginVao = async () => {
        if (manhan === manhap && truoc === a1) {
            const lewlew = await searchUserByGmail({ gmail: a1 })
                .then((data) => {
                    return data;
                })
                .catch((error) => {
                    return error;
                });

            const settt = async () => {
                const jwt = await autoLogin({ username: lewlew.userName, password: lewlew.passWord })
                    .then((jwt) => {
                        return jwt;
                    })
                    .catch((error) => {
                        console.log(error);
                    });
                localStorage.setItem('user', JSON.stringify(lewlew));
                sessionStorage.setItem('jwt', jwt);
            };
            await updatePassWord({ gmail: a1, password: a2 })
                .then((data) => {
                    lewlew.passWord = data.data;
                    settt();
                    window.location.reload();
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };
    return (
        <>
            {!login && (
                <div>
                    <Error hien={a3} content={notifiiContent} subject={notifiiSubject} />
                    <Success hien={a4} content={notifiiContent} subject={notifiiSubject} />
                    <div className="phu"></div>
                    <div className="login-form" style={{ marginBottom: '100px', overflow: 'visible' }}>
                        <img
                            src="https://icons.iconarchive.com/icons/icons8/ios7/32/Arrows-Back-icon.png"
                            width="32"
                            height="32"
                            className="ForgotPassWordBAckIcon"
                            onClick={() => {
                                setLogin(true);
                            }}
                        ></img>
                        <h2>Đặt lại mật khẩu</h2>
                        <div className="chotoi" style={{ overflow: 'visible' }}>
                            <p style={{ color: 'black', fontWeight: 'bold' }}>Nhập địa chỉ email</p>
                            <input
                                type="email"
                                placeholder="Địa chỉ Gmail "
                                className="nhap"
                                value={a1}
                                onChange={(e) => seta1(e.target.value)}
                                style={{ color: 'black' }}
                                required
                            />
                            <div style={{ display: 'flex' }}>
                                <input
                                    type="text"
                                    placeholder="Nhập mã gồm 6 chữ số"
                                    value={manhap}
                                    onChange={(e) => setManhap(e.target.value)}
                                    style={{
                                        border: 'none',
                                        color: 'black',
                                        width: '12vw',
                                        borderRight: 'solid #d7d7d9 1px',
                                        borderTopLeftRadius: '5px',
                                        backgroundColor: '#f1f1f2',
                                        height: '40px',
                                        outline: 'none',
                                        paddingLeft: '10px',
                                    }}
                                    required //#d7d7d9
                                />
                                <button
                                    className={contentCodeColor}
                                    onClick={() => {
                                        if (contentCodeColor === 'buttonForgotPassword' && cothe) {
                                            CallForgot();
                                        }
                                    }}
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        textAlign: 'center',
                                        alignItems: 'center',
                                    }}
                                >
                                    <span style={{}}>{contentCode}</span>
                                    {countdown !== 0 && <span>{' :' + countdown}</span>}
                                    <img
                                        src="https://icons.iconarchive.com/icons/amitjakhu/drip/16/loading-icon.png"
                                        width="16"
                                        height="16"
                                        style={{ opacity: '0.6', marginLeft: '10px' }}
                                        className={hien + ' ' + 'loading'}
                                    ></img>
                                </button>
                            </div>

                            <input
                                type="password"
                                placeholder="Nhập mật khẩu mới"
                                className="nhap"
                                value={a2}
                                onChange={(e) => seta2(e.target.value)}
                                style={{
                                    color: 'black',
                                }}
                                required
                            />

                            <button
                                type="submit"
                                className={x}
                                onClick={() => {
                                    if (x === 'nhaa') {
                                        loginVao();
                                    }
                                }}
                            >
                                Đăng Nhập
                            </button>
                        </div>
                        <div
                            style={{
                                marginTop: '226px',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <hr style={{ width: '27vw', color: 'rgba(0,0,0,0.6)' }} />
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                <p style={{ color: 'black' }}>Bạn không có tài khoản?</p>
                                <Link
                                    className="io"
                                    onClick={() => {
                                        setLogin(true);
                                    }}
                                >
                                    Đăng Ký
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {login && <LoginForm showLoginForm={true} />}
        </>
    );
}

export default FogotPassWord;
