import '../Admin/Admin.scss';
import AdminslideBar from './AdminslideBar';
import AdminNavbar from './AdminNavbar';
import AdminDashBoard from './AdminDashboard';
import AdminUsers from './AdminUsers';
import AdminCmts from './AdminCmts';
import AdminBaiViets from './AdminBaiViets';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { autoLogin } from '../../utils/CallApiOverView';
function Admin() {
    const [page, setPage] = useState('DashBoard');
    const history = useNavigate();
    const changePage = (xx) => {
        setPage(xx);
        xx === 'Dashboard' && history('/admin/');
        xx === 'users' && history('/admin/users/1');
        xx === 'Comments' && history('/admin/cmts/1');
        xx === 'BaiViets' && history('/admin/baiviets/1');
    };
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
                    console.log(jwt);
                } catch (error) {
                    console.error(error);
                }
            }, 30 * 60 * 1000);

            return () => clearInterval(intervalId);
        }
    }, []);
    useEffect(() => {
        if (localStorage.getItem('user') && JSON.parse(localStorage.getItem('user')).role === 'ADMIN') {
            const xx = window.location.pathname;
            if (xx.substring(0, 12) === '/admin/users') {
                setPage('users');
            } else if (xx.substring(0, 11) === '/admin/cmts') {
                setPage('Comments');
            } else if (xx.substring(0, 15) === '/admin/baiviets') {
                setPage('BaiViets');
            } else setPage('Dashboard');
        } else window.location.href = '/';
    }, []);
    return (
        <>
            <div className="Admin">
                <AdminslideBar page={page} click={changePage} />
                <div className="Admin_right">
                    <AdminNavbar />
                    {page === 'Dashboard' && <AdminDashBoard click={changePage} />}
                    {page === 'users' && <AdminUsers />}
                    {page === 'Comments' && <AdminCmts />}
                    {page === 'BaiViets' && <AdminBaiViets />}
                </div>
            </div>
        </>
    );
}

export default Admin;
