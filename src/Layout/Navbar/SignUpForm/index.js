import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../SignUpForm/SignUpForm.scss';
import LoginForm from '../LoginForm';
import Error from '../../../component/toast/error';
import Success from '../../../component/toast/success';
import request from '../../../utils/request';
import { searchUserByGmail, autoLogin } from '../../../utils/CallApiOverView';
function SignUpForm() {
    const [y, sety] = useState(true);
    const [x, setx] = useState('nha');
    const [userName, setUserName] = useState('');
    const [passWord, setPassWord] = useState('');
    const [gmail, setGmail] = useState('');
    const [name, setName] = useState('');
    const [birthday, setBirthday] = useState();
    const [notifiiContent, setNotifiiContent] = useState('');
    const [notifiiSubject, setNotifiiSubject] = useState('');
    const [a3, seta3] = useState(false);
    const [a4, seta4] = useState(false);
    useEffect(() => {
        if (a4) {
            seta3(false);
        }
    });
    useEffect(() => {
        if (a3) {
            setTimeout(() => {
                seta3(false);
            }, 2000);
        }
    });
    useEffect(() => {
        if (userName !== '' && passWord !== '' && gmail !== '' && name !== '' && birthday !== null) {
            setx('nhaa');
        }
    });
    useEffect(() => {
        if (userName === '' || passWord === '' || gmail === '' || name === '' || birthday === null) {
            setx('nha');
        }
    });

    const signUpLoginprocessing = async () => {
        try {
            const data = await request.post('public/SignUp', {
                userName: userName,
                passWord: passWord,
                gmail: gmail,
                name: name,
                birthDay: birthday,
            });
            console.log(data);
            if (data.status == 201) {
                const lewlew = await searchUserByGmail({ gmail: gmail });
                let lowlow = lewlew;
                lowlow.passWord = passWord;
                const jwt = await autoLogin({ username: userName, password: passWord });
                console.log(lewlew, jwt);
                seta4(true);
                setNotifiiSubject('Thành Công!');
                setNotifiiContent('Chúc mừng bạn đã Đăng Ký thành công');
                localStorage.setItem('user', JSON.stringify(lowlow));
                sessionStorage.setItem('jwt', jwt);
                window.location.reload();
            } else {
                seta3(true);
                if (data.msg == 'userName existed') {
                    setNotifiiSubject('Thất Bại!');
                    setNotifiiContent('Tên đăng nhập đã tồn tại.');
                } else {
                    setNotifiiSubject('Thất Bại!');
                    setNotifiiContent('Gmail đã tồn tại.');
                }
            }
        } catch (error) {
            console.log(error);
        }
    };
    if (y) {
        return (
            <>
                <Error hien={a3} content={notifiiContent} subject={notifiiSubject} />
                <Success hien={a4} content={notifiiContent} subject={notifiiSubject} />
                <div style={{ maxHeight: '75%', overflowY: 'auto' }}>
                    <div className="phu"></div>
                    <div className="login-form">
                        <h2>Đăng Ký</h2>
                        <div className="chotoi" style={{ overflow: 'hidden' }}>
                            <p style={{ color: 'black', fontWeight: 'bold' }}>Tên Đăng Nhập</p>
                            <input
                                type="text"
                                placeholder="Tên đăng nhập"
                                className="nhap"
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)}
                                style={{ color: 'black' }}
                                required
                            />
                            <p style={{ color: 'black', fontWeight: 'bold' }}>Mật Khẩu</p>
                            <input
                                type="password"
                                placeholder="Mật khẩu"
                                className="nhap"
                                value={passWord}
                                onChange={(e) => setPassWord(e.target.value)}
                                style={{ color: 'black' }}
                                required
                            />

                            <p style={{ color: 'black', fontWeight: 'bold' }}>Gmail</p>
                            <input
                                type="email"
                                placeholder="Gmail"
                                className="nhap"
                                value={gmail}
                                onChange={(e) => setGmail(e.target.value)}
                                style={{ color: 'black' }}
                                required
                            />

                            <p style={{ color: 'black', fontWeight: 'bold' }}>FullName</p>
                            <input
                                type="text"
                                placeholder="Họ Và Tên"
                                className="nhap"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                style={{ color: 'black' }}
                                required
                            />

                            <p style={{ color: 'black', fontWeight: 'bold' }}>Ngày Sinh</p>
                            <input
                                type="date"
                                placeholder="birtday"
                                className="nhap"
                                value={birthday}
                                onChange={(e) => setBirthday(e.target.value)}
                                style={{ color: 'black' }}
                                required
                            />

                            <button
                                type="submit"
                                className={x}
                                onClick={() => {
                                    if (x !== 'nha') {
                                        signUpLoginprocessing();
                                    }
                                }}
                            >
                                Đăng Ký
                            </button>
                        </div>
                        <div
                            style={{
                                marginTop: '62px',
                            }}
                        >
                            <hr style={{ width: '27vw', color: 'rgba(0,0,0,0.7)' }} />
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                <p style={{ color: 'black' }}>Bạn đã có tài khoản?</p>

                                <Link
                                    className="io"
                                    onClick={() => sety(false)}
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}
                                >
                                    Đăng Nhập
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    } else {
        return <LoginForm showLoginForm={true} />;
    }
}

export default SignUpForm;
