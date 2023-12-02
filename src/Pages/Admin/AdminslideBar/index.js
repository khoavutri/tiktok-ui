import './AdminslideBar.scss';
import { FaUser } from 'react-icons/fa6';
import { RiDashboard3Fill } from 'react-icons/ri';
import { FaPlus } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { MdArticle } from 'react-icons/md';
import { FaComments } from 'react-icons/fa';

function AdminslideBar({ page, click }) {
    const [mau, setMau] = useState([1, 0, 0, 0]);
    function lamdi(li) {
        const n = 4;
        let a = [...mau];
        for (let i = 0; i < n; i++) {
            a[i] = 0;
        }
        a[li] = 1;
        setMau(a);
    }
    useEffect(() => {
        if (page === 'Dashboard') {
            lamdi(0);
        }
        if (page === 'users') {
            lamdi(1);
        }
        if (page === 'BaiViets') {
            lamdi(2);
        }
        if (page === 'Comments') {
            lamdi(3);
        }
    }, [page]);
    return (
        <>
            <div className="Admin-slideBar">
                <div
                    style={{ marginTop: '20px' }}
                    className={mau[0] === 0 ? 'xx' : 'xx dam'}
                    onClick={() => {
                        click('Dashboard');
                    }}
                >
                    <RiDashboard3Fill style={{ fontSize: '22px', marginRight: '10px' }} />
                    <span>Dashboard</span>
                </div>
                <div
                    className={mau[1] === 0 ? 'xx' : 'xx dam'}
                    onClick={() => {
                        click('users');
                    }}
                >
                    <FaUser style={{ fontSize: '22px', marginRight: '10px' }} />
                    <span>Thành Viên</span>
                </div>
                <div
                    className={mau[2] === 0 ? 'xx' : 'xx dam'}
                    onClick={() => {
                        click('BaiViets');
                    }}
                >
                    <MdArticle style={{ fontSize: '22px', marginRight: '10px' }} />
                    <span>Bài Viết</span>
                </div>
                <div
                    className={mau[3] === 0 ? 'xx' : 'xx dam'}
                    onClick={() => {
                        click('Comments');
                    }}
                >
                    <FaComments style={{ fontSize: '22px', marginRight: '10px' }} />
                    <span>Comments</span>
                </div>
            </div>
        </>
    );
}

export default AdminslideBar;
