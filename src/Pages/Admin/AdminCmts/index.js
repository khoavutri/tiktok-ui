import '../AdminCmts/AdminCmts.scss';
import '../AdminUsers/AdminUsers.scss';

import { MdAutoFixNormal } from 'react-icons/md';
import { FaSearch } from 'react-icons/fa';
import {
    MdOutlineKeyboardDoubleArrowLeft,
    MdOutlineKeyboardDoubleArrowRight,
    MdOutlineKeyboardArrowLeft,
    MdOutlineKeyboardArrowRight,
} from 'react-icons/md';
import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { autoLogin, countAllCmts, adminSearchAllCmts, deleteCmtAtAdmin } from '../../../utils/CallApiOverView';

const userTrenPage = 9;
function AdminCmts() {
    const [searchValue, setSearchValue] = useState('');
    const [a, setA] = useState([1, 2, 3, 4, 5, 6, 7]);
    const [n, setN] = useState(7);
    const [data, setData] = useState([]);
    const history = useNavigate();
    const path = window.location.pathname.slice(12);
    const callData = async () => {
        const x = await adminSearchAllCmts(Number(path), userTrenPage, sessionStorage.getItem('jwt'));
        // setSearchValue('');
        setData(x);
    };
    useEffect(() => {
        if (isNaN(path)) {
            history('/NotFound');
        }
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
                const result = await countAllCmts(codeeee);
                var soluongpageshh;
                if (result.data % userTrenPage === 0) {
                    soluongpageshh = result.data / userTrenPage;
                } else {
                    soluongpageshh = Math.floor(result.data / userTrenPage + 1);
                }
                if (path > soluongpageshh) {
                    history('/notFound');
                }
                if (soluongpageshh < 7) {
                    setN(soluongpageshh);
                    var xxxxxxxx = [];
                    for (let i = 0; i < soluongpageshh; i++) {
                        xxxxxxxx[i] = a[i];
                    }
                    setA(xxxxxxxx);
                }
                if (path >= 7) {
                    if (path == soluongpageshh) {
                        var soNguyen = parseInt(path, 10);
                        setA([
                            soNguyen - 6,
                            soNguyen - 5,
                            soNguyen - 4,
                            soNguyen - 3,
                            soNguyen - 2,
                            soNguyen - 1,
                            soNguyen,
                        ]);
                    }
                    if (path < soluongpageshh) {
                        var soNguyen = parseInt(path, 10);
                        setA([
                            soNguyen - 5,
                            soNguyen - 4,
                            soNguyen - 3,
                            soNguyen - 2,
                            soNguyen - 1,
                            soNguyen,
                            soNguyen + 1,
                        ]);
                    }
                }
                setN(soluongpageshh);
                callData();
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);
    const raDimaimai = async (number) => {
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
            const mul = await deleteCmtAtAdmin(number, codeeee);
            console.log(mul.data);
            callData();
        } catch (error) {
            console.error('An error occurred:', error);
        }
    };
    return (
        <>
            {' '}
            <div className="AdminUsers">
                <div className="AdminUsers_head">
                    <h3 style={{ fontWeight: '400' }}>NHÓM NGƯỜI DÙNG</h3>
                    <div className="AdminUsers_head-Search">
                        <input
                            className="AdminUsers_head-Search--input"
                            placeholder="Nhập ID, Tên hoặc UserName"
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                        />
                        <FaSearch style={{ marginLeft: '10px', fontSize: '20px' }} />
                    </div>
                </div>
                <table className="AdminUsers_table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>ID Video</th>

                            <th>Chủ sở hữu</th>
                            <th>Nội Dung</th>
                            <th>Xóa</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((number) => (
                            <tr key={number.cmt.id}>
                                <td>{number.cmt.id}</td>
                                <td>{number.video.id}</td>
                                <td>
                                    <Link to={'/' + number.user.userName}>{number.user.name}</Link>
                                </td>
                                <td>{number.cmt.content}</td>
                                <td>
                                    <button
                                        className="AdminUsers_table-button"
                                        onClick={() => {
                                            raDimaimai(number.cmt.id);
                                        }}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="AdminUsers_paginate" style={{ marginBottom: '10px' }}>
                    {path != 1 && (
                        <>
                            <MdOutlineKeyboardDoubleArrowLeft
                                className="AdminUsers_paginate-fixed"
                                onClick={() => {
                                    window.location.href = '/admin/cmts/' + 1;
                                }}
                            />
                            <MdOutlineKeyboardArrowLeft
                                className="AdminUsers_paginate-fixed"
                                onClick={() => {
                                    const xiu = parseInt(path, 10) - 1;
                                    window.location.href = '/admin/cmts/' + xiu;
                                }}
                            />
                        </>
                    )}
                    {a.map((number) => (
                        <button
                            className={'AdminUsers_paginate-icon'}
                            key={number}
                            style={{
                                backgroundColor: number == path ? 'rgba(0, 0, 0, 0.05)' : 'white',
                            }}
                            onClick={() => {
                                window.location.href = '/admin/cmts/' + number;
                            }}
                        >
                            {number}
                        </button>
                    ))}
                    {path != n && (
                        <>
                            <MdOutlineKeyboardArrowRight
                                className="AdminUsers_paginate-fixed"
                                onClick={() => {
                                    const xiu = parseInt(path, 10) + 1;
                                    window.location.href = '/admin/cmts/' + xiu;
                                }}
                            />
                            <MdOutlineKeyboardDoubleArrowRight
                                className="AdminUsers_paginate-fixed"
                                onClick={() => {
                                    window.location.href = '/admin/cmts/' + n;
                                }}
                            />
                        </>
                    )}
                </div>
            </div>
        </>
    );
}

export default AdminCmts;
