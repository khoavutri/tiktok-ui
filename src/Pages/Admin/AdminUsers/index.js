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

import {
    countAllUsers,
    autoLogin,
    searchPageAllAtAdmin,
    banPhuoc,
    dongDam,
    deleteUserAtAdmin,
} from '../../../utils/CallApiOverView';
const userTrenPage = 9;
function AdminUsers() {
    const [searchValue, setSearchValue] = useState('');
    const [a, setA] = useState([1, 2, 3, 4, 5, 6, 7]);
    const [n, setN] = useState(7);
    const [data, setData] = useState([]);
    const history = useNavigate();
    const path = window.location.pathname.slice(13);
    const callData = async () => {
        const x = await searchPageAllAtAdmin(searchValue, path, userTrenPage, sessionStorage.getItem('jwt'));
        // setSearchValue('');
        setData(x.data);
    };

    function convertBio(str) {
        if (str.length <= 8) {
            return str;
        } else {
            const firstPart = str.substring(0, 5);
            return `${firstPart}...`;
        }
    }
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
                const result = await countAllUsers(codeeee);
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
    const choKeoHayBiGheo = async (number) => {
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
            const mul = await banPhuoc(number, codeeee);
            console.log(mul.data);
            callData();
        } catch (error) {
            console.error('An error occurred:', error);
        }
    };
    const xaLuoi = async (number) => {
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
            const mul = await dongDam(number, codeeee);
            console.log(mul.data);
            callData();
        } catch (error) {
            console.error('An error occurred:', error);
        }
    };
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
            const mul = await deleteUserAtAdmin(number, codeeee);
            console.log(mul.data);
            callData();
        } catch (error) {
            console.error('An error occurred:', error);
        }
    };
    return (
        <>
            <div className="AdminUsers">
                <div className="AdminUsers_head">
                    <h3 style={{ fontWeight: '400' }}>NHÓM NGƯỜI DÙNG</h3>
                    <div className="AdminUsers_head-Search">
                        <input
                            className="AdminUsers_head-Search--input"
                            placeholder="Nhập ID, Tên hoặc UserName"
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    history('/admin/users/' + 1);
                                    callData();
                                }
                            }}
                        />
                        <FaSearch
                            style={{ marginLeft: '10px', fontSize: '20px' }}
                            onClick={() => {
                                history('/admin/users/' + 1);
                                callData();
                            }}
                        />
                    </div>
                </div>
                <table className="AdminUsers_table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>UserName</th>
                            <th>Email</th>
                            <th>Famous</th>
                            <th>Quyền</th>
                            <th>Bio</th>
                            <th>Xóa</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(data) &&
                            data.map((number) => (
                                <tr key={number.id}>
                                    <td>{number.id}</td>
                                    <td>
                                        <Link to={'/' + number.userName}>{number.name}</Link>
                                    </td>
                                    <td>{number.userName}</td>
                                    <td>{number.gmail}</td>
                                    <td>
                                        {number.famous ? 'True' : 'False'}{' '}
                                        <button className="AdminUsers_table-BlueTick">
                                            <MdAutoFixNormal
                                                onClick={() => {
                                                    choKeoHayBiGheo(number.id);
                                                }}
                                            />
                                        </button>
                                    </td>
                                    <td>
                                        {number.role}{' '}
                                        {number.id != JSON.parse(localStorage.getItem('user')).id && (
                                            <button className="AdminUsers_table-BlueTick">
                                                <MdAutoFixNormal
                                                    onClick={() => {
                                                        xaLuoi(number.id);
                                                    }}
                                                />
                                            </button>
                                        )}
                                    </td>
                                    <td>{convertBio(number.bio)}</td>
                                    <td>
                                        {number.role !== 'ADMIN' && (
                                            <button
                                                className="AdminUsers_table-button"
                                                onClick={() => {
                                                    raDimaimai(number.id);
                                                }}
                                            >
                                                Delete
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
                <div className="AdminUsers_paginate">
                    {path != 1 && (
                        <>
                            <MdOutlineKeyboardDoubleArrowLeft
                                className="AdminUsers_paginate-fixed"
                                onClick={() => {
                                    window.location.href = '/admin/users/' + 1;
                                }}
                            />
                            <MdOutlineKeyboardArrowLeft
                                className="AdminUsers_paginate-fixed"
                                onClick={() => {
                                    const xiu = parseInt(path, 10) - 1;
                                    window.location.href = '/admin/users/' + xiu;
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
                                window.location.href = '/admin/users/' + number;
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
                                    window.location.href = '/admin/users/' + xiu;
                                }}
                            />
                            <MdOutlineKeyboardDoubleArrowRight
                                className="AdminUsers_paginate-fixed"
                                onClick={() => {
                                    window.location.href = '/admin/users/' + n;
                                }}
                            />
                        </>
                    )}
                </div>
            </div>
        </>
    );
}

export default AdminUsers;
