import '../Admin/Admin.scss';
import AdminslideBar from './AdminslideBar';
import AdminNavbar from './AdminNavbar';
import AdminDashBoard from './AdminDashboard';
import AdminUsers from './AdminUsers';
import AdminCmts from './AdminCmts';
import AdminBaiViets from './AdminBaiViets';
import { useEffect, useState } from 'react';

function Admin() {
    const [page, setPage] = useState('DashBoard');

    const changePage = (xx) => {
        setPage(xx);
    };
    useEffect(() => {
        if (localStorage.getItem('user') && JSON.parse(localStorage.getItem('user')).role === 'ADMIN') {
            setPage('Dashboard');
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
