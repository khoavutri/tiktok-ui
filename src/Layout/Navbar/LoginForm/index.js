import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../LoginForm/LoginForm.scss';

import SignUpForm from '../SignUpForm';
import Error from '../../../component/toast/error';
import Success from '../../../component/toast/success';
import request from '../../../utils/request';
import FogotPassWord from '../FogotPassWord';
function LoginForm({ showLoginForm }) {
    const [insi, seInsi] = useState(true);
    const [x, setx] = useState('nha');
    const [a1, seta1] = useState('');
    const [a2, seta2] = useState('');
    const [a3, seta3] = useState(false);
    const [a4, seta4] = useState(false);
    const [forgot, setForgot] = useState(false);
    const [notifiiContent, setNotifiiContent] = useState('');
    const [notifiiSubject, setNotifiiSubject] = useState('');
    useEffect(() => {
        if (a1 !== '' && a2 !== '') {
            setx('nhaa');
        }
    });
    useEffect(() => {
        if (a1 === '' || a2 === '') {
            setx('nha');
        }
    });
    useEffect(() => {
        if (a3 == true) {
            setTimeout(() => {
                seta3(false);
            }, 2000);
        }
    }, [a3]);
    useEffect(() => {
        if (a4 == true) {
            setTimeout(() => {
                seta4(false);
            }, 2000);
        }
    }, [a4]);
    useEffect(() => {
        if (a4) {
            seta3(false);
        }
    });
    const loginLoginprocessing = async () => {
        try {
            const data = await request.post('public/Login', {
                userName: a1,
                passWord: a2,
            });
            if (data.status == 200) {
                seta4(true);
                setNotifiiSubject('Thành Công!');
                setNotifiiContent('Chúc mừng bạn đã Đăng Nhập thành công');
                const user = await request.post('public/AutoLogin', {
                    username: a1,
                    password: a2,
                });
                data.data.passWord = a2;
                sessionStorage.setItem('jwt', user.data);
                localStorage.setItem('user', JSON.stringify(data.data));
                window.location.reload();
            } else {
                if (data.msg == 'wrong password') {
                    setNotifiiSubject('Thất Bại!');
                    setNotifiiContent('Mật khẩu sai.');
                } else {
                    setNotifiiSubject('Thất Bại!');
                    setNotifiiContent('Tên Đăng nhập không tồn tại.');
                }
                seta3(true);
            }
        } catch (error) {
            console.log(error);
        }
    };
    if (!insi) {
        return <>{showLoginForm && <SignUpForm />}</>;
    } else {
        return (
            <>
                {forgot && <>{showLoginForm && <FogotPassWord />}</>}
                {!forgot && (
                    <>
                        {showLoginForm && (
                            <div>
                                <Error hien={a3} content={notifiiContent} subject={notifiiSubject} />
                                <Success hien={a4} content={notifiiContent} subject={notifiiSubject} />
                                <div className="phu"></div>
                                <div className="login-form" style={{ marginBottom: '100px' }}>
                                    <h2>Đăng Nhập</h2>
                                    <div className="chotoi" style={{ overflow: 'hidden' }}>
                                        <p style={{ color: 'black', fontWeight: 'bold' }}>Tên Đăng Nhập</p>
                                        <input
                                            type="text"
                                            placeholder="Tên đăng nhập"
                                            className="nhap"
                                            value={a1}
                                            onChange={(e) => seta1(e.target.value)}
                                            style={{ color: 'black' }}
                                            required
                                        />
                                        <input
                                            type="password"
                                            placeholder="Mật khẩu"
                                            className="nhap"
                                            value={a2}
                                            onChange={(e) => seta2(e.target.value)}
                                            style={{ color: 'black' }}
                                            required
                                        />
                                        <button
                                            type="submit"
                                            className={x}
                                            onClick={() => {
                                                if (x != 'nha') {
                                                    loginLoginprocessing();
                                                }
                                            }}
                                        >
                                            Đăng Nhập
                                        </button>

                                        <Link
                                            onClick={() => {
                                                setForgot(true);
                                            }}
                                        >
                                            <p style={{ color: 'rgba(0,0,0,0.8)', marginRight: '30px' }}>
                                                Quên mật khẩu
                                            </p>
                                        </Link>
                                    </div>
                                    <div
                                        style={{
                                            marginTop: '270px',
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
                                                    seInsi(false);
                                                }}
                                            >
                                                Đăng Ký
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </>
        );
    }
}

export default LoginForm;
