import '../AdminUsers/AdminUsers.scss';
import { MdAutoFixNormal } from 'react-icons/md';
import { FaSearch } from 'react-icons/fa';
import {
    MdOutlineKeyboardDoubleArrowLeft,
    MdOutlineKeyboardDoubleArrowRight,
    MdOutlineKeyboardArrowLeft,
    MdOutlineKeyboardArrowRight,
} from 'react-icons/md';

import { useState } from 'react';
function AdminUsers() {
    const [searchValue, setSearchValue] = useState('');
    const [a, setA] = useState([1, 2, 3, 4, 5, 6, 7]);
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
                        />
                        <FaSearch style={{ marginLeft: '10px', fontSize: '20px' }} />
                    </div>
                </div>
                <table className="AdminUsers_table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>UserName</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Famous</th>
                            <th>Quyền</th>
                            <th>Bio</th>
                            <th>Xóa</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>John Doe</td>
                            <td>khoa</td>
                            <td>john@example.com</td>
                            <td>
                                true{' '}
                                <button className="AdminUsers_table-BlueTick">
                                    <MdAutoFixNormal />
                                </button>
                            </td>
                            <td>
                                admin{' '}
                                <button className="AdminUsers_table-BlueTick">
                                    <MdAutoFixNormal />
                                </button>
                            </td>
                            <td>khoa vip</td>
                            <td>
                                <button className="AdminUsers_table-button">Delete</button>
                            </td>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>John Doe</td>
                            <td>khoa</td>
                            <td>john@example.com</td>
                            <td>
                                false{' '}
                                <button className="AdminUsers_table-BlueTick">
                                    <MdAutoFixNormal />
                                </button>
                            </td>
                            <td>
                                user{' '}
                                <button className="AdminUsers_table-BlueTick">
                                    <MdAutoFixNormal />
                                </button>
                            </td>
                            <td>khoa vip</td>
                            <td>
                                <button className="AdminUsers_table-button">Delete</button>
                            </td>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>John Doe</td>
                            <td>khoa</td>
                            <td>john@example.com</td>
                            <td>true</td>
                            <td>admin</td>
                            <td>khoa vip</td>
                            <td>
                                <button className="AdminUsers_table-button">Delete</button>
                            </td>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>John Doe</td>
                            <td>khoa</td>
                            <td>john@example.com</td>
                            <td>true</td>
                            <td>admin</td>
                            <td>khoa vip</td>
                            <td>
                                <button className="AdminUsers_table-button">Delete</button>
                            </td>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>John Doe</td>
                            <td>khoa</td>
                            <td>john@example.com</td>
                            <td>true</td>
                            <td>admin</td>
                            <td>khoa vip</td>
                            <td>
                                <button className="AdminUsers_table-button">Delete</button>
                            </td>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>John Doe</td>
                            <td>khoa</td>
                            <td>john@example.com</td>
                            <td>true</td>
                            <td>admin</td>
                            <td>khoa vip</td>
                            <td>
                                <button className="AdminUsers_table-button">Delete</button>
                            </td>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>John Doe</td>
                            <td>khoa</td>
                            <td>john@example.com</td>
                            <td>true</td>
                            <td>admin</td>
                            <td>khoa vip</td>
                            <td>
                                <button className="AdminUsers_table-button">Delete</button>
                            </td>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>John Doe</td>
                            <td>khoa</td>
                            <td>john@example.com</td>
                            <td>true</td>
                            <td>admin</td>
                            <td>khoa vip</td>
                            <td>
                                <button className="AdminUsers_table-button">Delete</button>
                            </td>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>John Doe</td>
                            <td>khoa</td>
                            <td>john@example.com</td>
                            <td>true</td>
                            <td>admin</td>
                            <td>khoa vip</td>
                            <td>
                                <button className="AdminUsers_table-button">Delete</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div className="AdminUsers_paginate">
                    <MdOutlineKeyboardDoubleArrowLeft className="AdminUsers_paginate-fixed" />
                    <MdOutlineKeyboardArrowLeft className="AdminUsers_paginate-fixed" />
                    <button className="AdminUsers_paginate-icon">{a[0]}</button>
                    <button className="AdminUsers_paginate-icon">{a[1]}</button>
                    <button className="AdminUsers_paginate-icon">{a[2]}</button>
                    <button className="AdminUsers_paginate-icon">{a[3]}</button>
                    <button className="AdminUsers_paginate-icon">{a[4]}</button>
                    <button className="AdminUsers_paginate-icon">{a[5]}</button>
                    <button className="AdminUsers_paginate-icon">{a[6]}</button>
                    <MdOutlineKeyboardArrowRight className="AdminUsers_paginate-fixed" />
                    <MdOutlineKeyboardDoubleArrowRight className="AdminUsers_paginate-fixed" />
                </div>
            </div>
        </>
    );
}

export default AdminUsers;
