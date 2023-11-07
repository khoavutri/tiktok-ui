import '../SlideBar4/SlideBar4.scss';
import { useState, useEffect } from 'react';
import { seachAllFollowing, autoLogin } from '../../../utils/CallApiOverView';
import { BsCheckCircleFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
function SlideBar4() {
    const buoc = 5;
    const [data, setData] = useState([]);
    const [hien, setHien] = useState([]);
    const [content, setContent] = useState(1);
    const [dem, setDem] = useState(2 * buoc);
    const [themBot, setThemBot] = useState('Xem Thêm');
    function limitCharacters(str, maxLength) {
        if (str.length > maxLength) {
            return str.substring(0, maxLength) + '...';
        }
        return str;
    }
    useEffect(() => {
        const fetchData = async () => {
            try {
                var codeeeee;
                if (sessionStorage.getItem('jwt') !== null) {
                    codeeeee = sessionStorage.getItem('jwt');
                } else {
                    codeeeee = await autoLogin({
                        username: JSON.parse(localStorage.getItem('user')).userName,
                        password: JSON.parse(localStorage.getItem('user')).passWord,
                    });
                }
                const da = await seachAllFollowing(JSON.parse(localStorage.getItem('user')).id, codeeeee);
                let xx = [...da];
                for (let i = 0; i < xx.length; i++) {
                    xx[i].name = limitCharacters(xx[i].name, 15);
                }
                setData(xx);
                const newArr = xx.slice(0, buoc);
                setHien(newArr);
                if (da.length > 0) {
                    setContent(2);
                } else setContent(1);
            } catch (err) {
                console.error(err);
            }
        };
        fetchData();
    }, []);
    function layHien(number) {
        const newArr = data.slice(0, number);
        setHien(newArr);
    }
    return (
        <div className="SlideBar4">
            <p style={{ color: '#686a71', marginBottom: '10px' }}>Các tài khoản đang follow</p>

            {content === 2 && (
                <>
                    {hien.map((user) => (
                        <div
                            key={user.id}
                            className="SlideBar4Icon"
                            onClick={() => {
                                window.location.href = '/' + user.userName;
                            }}
                        >
                            <img
                                src={
                                    user.avatar
                                        ? user.avatar
                                        : 'https://icons.iconarchive.com/icons/icons8/ios7/32/Users-Administrator-icon.png'
                                }
                                className="SlideBar4IconImg"
                                alt={user.userName}
                            />
                            <div className="SlideBar4IconContent">
                                <h5>
                                    {user.userName}{' '}
                                    {user.famous === true && <BsCheckCircleFill style={{ color: '#20d5ec' }} />}
                                </h5>
                                <p
                                    style={{
                                        textAlign: 'start',
                                    }}
                                >
                                    {user.name}
                                </p>
                            </div>
                        </div>
                    ))}
                    <h5
                        className="SlideBar4ThemBot"
                        onClick={() => {
                            if (themBot === 'Ẩn Bớt') {
                                setDem(10);
                                layHien(5);
                                setThemBot('Xem Thêm');
                            } else {
                                if (dem >= data.length) {
                                    setThemBot('Ẩn Bớt');
                                    setDem(data.length);
                                    layHien(dem);
                                } else {
                                    setThemBot('Xem Thêm');
                                    setDem((prev) => prev + buoc);
                                    layHien(dem);
                                }
                            }
                        }}
                    >
                        {themBot}
                    </h5>
                </>
            )}
            {content === 1 && <p className="SlideBar4IconContent2">Những tài khoản bạn follow sẽ xuất hiện tại đây</p>}
        </div>
    );
}

export default SlideBar4;
