import { useState, useEffect } from 'react';
import '../AdminDashboard/AdminDashboard.scss';
import { countAllCmts, countAllLikes, countAllUsers, countAllVideos, autoLogin } from '../../../utils/CallApiOverView';


function AdminDashBoard({ click }) {
    const [baiViets, setBaiViets] = useState(0);
    const [users, setUsers] = useState(0);
    const [likes, setLikes] = useState(0);
    const [cmts, setCmts] = useState(0);
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
                const result1 = await countAllVideos(codeeee);
                const result2 = await countAllUsers(codeeee);
                const result3 = await countAllCmts(codeeee);
                const result4 = await countAllLikes(codeeee);
                setBaiViets(result1.data);
                setUsers(result2.data);
                setCmts(result3.data);
                setLikes(result4.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);
    return (
        <>
            <div className="AdminDashBoard">
                <div className="AdminDashBoard_icon">
                    <p>Thành Viên</p>
                    <h2>{users}</h2>
                    <hr style={{ width: '80%', color: 'rgba(0,0,0,0.005)', backgroundColor: 'rgba(0,0,0,0.005)' }} />
                    <button className="AdminDashBoard_icon--button" onClick={() => click('users')}>
                        Xem Ngay
                    </button>
                </div>
                <div className="AdminDashBoard_icon">
                    <p>Bài Viết</p>
                    <h2>{baiViets}</h2>
                    <hr style={{ width: '80%', color: 'rgba(0,0,0,0.00)', backgroundColor: 'rgba(0,0,0,0.00)' }} />
                    <button className="AdminDashBoard_icon--button" onClick={() => click('BaiViets')}>
                        Xem Ngay
                    </button>
                </div>
                <div className="AdminDashBoard_icon">
                    <p>Cmts</p>
                    <h2>{cmts}</h2>
                    <hr style={{ width: '80%', color: 'rgba(0,0,0,0.005)', backgroundColor: 'rgba(0,0,0,0.005)' }} />
                    <button className="AdminDashBoard_icon--button" onClick={() => click('Comments')}>
                        Xem Ngay
                    </button>
                </div>
                <div className="AdminDashBoard_icon">
                    <p>Likes</p>
                    <h2>{likes}</h2>
                    <hr style={{ width: '80%', color: 'rgba(0,0,0,0.005)', backgroundColor: 'rgba(0,0,0,0.005)' }} />
                    <button className="AdminDashBoard_icon--button" disabled>
                        Xem Ngay
                    </button>
                </div>
            </div>
        </>
    );
}

export default AdminDashBoard;
