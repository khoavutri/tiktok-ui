import './AdminslideBar.scss';
import { FaUser } from 'react-icons/fa6';
import { RiDashboard3Fill } from 'react-icons/ri';
import { FaPlus } from 'react-icons/fa';
import { useState } from 'react';

function AdminslideBar() {
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
    return (
        <>
            <div className="Admin-slideBar">
                <div
                    style={{ marginTop: '20px' }}
                    className={mau[0] === 0 ? 'xx' : 'xx dam'}
                    onClick={() => {
                        lamdi(0);
                    }}
                >
                    <RiDashboard3Fill style={{ fontSize: '22px', marginRight: '10px' }} />
                    <span>Dashboard</span>
                </div>
                <div
                    className={mau[1] === 0 ? 'xx' : 'xx dam'}
                    onClick={() => {
                        lamdi(1);
                    }}
                >
                    <FaUser style={{ fontSize: '22px', marginRight: '10px' }} />
                    <span>Thành Viên</span>
                </div>
                <div
                    className={mau[2] === 0 ? 'xx' : 'xx dam'}
                    onClick={() => {
                        lamdi(2);
                    }}
                >
                    <FaPlus style={{ fontSize: '22px', marginRight: '10px' }} />
                    <span>Tùy chọn</span>
                </div>
                <div
                    className={mau[3] === 0 ? 'xx' : 'xx dam'}
                    onClick={() => {
                        lamdi(3);
                    }}
                >
                    <FaPlus style={{ fontSize: '22px', marginRight: '10px' }} />
                    <span>Tùy chọn</span>
                </div>
            </div>
        </>
    );
}

export default AdminslideBar;
