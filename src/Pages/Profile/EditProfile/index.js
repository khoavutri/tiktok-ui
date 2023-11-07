import '../EditProfile/EditProfile.scss';
import { AiOutlineClose } from 'react-icons/ai';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { updateMyProfile, autoLogin } from '../../../utils/CallApiOverView';
function EditProfile({ onClick, LinkAnh, UserName, Name, Bio }) {
    const [hienAnh, setHienAnh] = useState(LinkAnh);
    const [link, setLink] = useState(LinkAnh);
    const [userName, setUserName] = useState(UserName);
    const [ten, setTen] = useState(Name);
    const [bio, setBio] = useState(Bio);
    const [anCheck, setAnCheck] = useState(true);
    const [anLuu, setAnLuu] = useState(true);
    useEffect(() => {
        if (hienAnh !== link) {
            setAnCheck(false);
        } else {
            setAnCheck(true);
        }
    });
    useEffect(() => {
        if (link !== LinkAnh || userName !== UserName || ten !== Name || bio !== Bio) {
            setAnLuu(false);
        } else {
            setAnLuu(true);
        }
    });

    const setUpdate = () => {
        const fetdata = async () => {
            const xxx = await updateMyProfile(
                JSON.parse(localStorage.getItem('user')).id,
                link,
                userName,
                ten,
                bio,
                sessionStorage.getItem('jwt'),
            )
                .then((da) => {
                    let user = JSON.parse(localStorage.getItem('user'));
                    user.bio = bio;
                    user.userName = userName;
                    user.name = ten;
                    user.avatar = link;
                    localStorage.setItem('user', JSON.stringify(user));
                    return da;
                })
                .catch((err) => {
                    console.log(err);
                });
            console.log(xxx.msg);
            window.location.href = '/' + userName;
        };
        fetdata();
    };

    return (
        <>
            <div className="EditProfileMan"></div>
            <div className="EditProfile">
                <div className="EditProfileHead">
                    <h1
                        style={{
                            fontWeight: '300',
                            position: 'absolute',
                            left: '2vw',
                            top: 'calc(5vh - 42px)',
                        }}
                    >
                        Sửa hồ sơ
                    </h1>
                    <AiOutlineClose className="EditProfileClose" onClick={onClick} />
                </div>
                <div className="EditProfile_Center">
                    <div className="EditProfile_Center-imgForm">
                        <img src={hienAnh} alt="avatar" className="EditProfile_Center-img" />
                        <h3 style={{ position: 'absolute', fontWeight: '350', top: 'calc(10vh - 3.5vw)' }}>
                            Ảnh hồ sơ
                        </h3>
                    </div>
                    <div className="EditProfile_Center-Link">
                        <Link to="https://www.truongblogger.top/p/upload-anh.html" target="_blank">
                            <h3 style={{ fontWeight: '350', color: '#0069ff' }}>Lấy Link</h3>
                        </Link>
                        <input
                            className="EditProfile_Center-Link--input"
                            placeholder="Link Ảnh"
                            value={link}
                            onChange={(e) => {
                                setLink(e.target.value);
                            }}
                        />
                        <button
                            className="EditProfile_Center-Link--check"
                            disabled={anCheck}
                            onClick={() => {
                                if (!anCheck) {
                                    setHienAnh(link);
                                }
                            }}
                        >
                            check
                        </button>
                    </div>
                    {/* <div className="EditProfile_Center-userName">
                        <h3 style={{ fontWeight: '350', marginTop: '15px' }}>UserName</h3>
                        <div className="EditProfile_Center-userName--content">
                            <input
                                className="EditProfile_Center-userName--content_input"
                                placeholder="UserName"
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)}
                            />
                            <p style={{ fontSize: '12px', color: 'black', lineHeight: '18px' }}>
                                http://localhost:3000/{userName}
                            </p>
                            <p style={{ fontSize: '12px', color: 'black', lineHeight: '18px' }}>
                                TikTok ID chỉ có thể bao gồm chữ cái, chữ số, dấu gạch dưới và dấu chấm. Khi thay đổi
                                TikTok ID, liên kết hồ sơ của bạn cũng sẽ thay đổi.
                            </p>
                        </div>
                    </div> */}
                    <div className="EditProfile_Center-Link">
                        <h3 style={{ fontWeight: '350' }}>Tên</h3>
                        <input
                            className="EditProfile_Center-Link--input"
                            placeholder="Tên"
                            value={ten}
                            onChange={(e) => setTen(e.target.value)}
                        />
                    </div>
                    <div className="EditProfile_Center-Bio">
                        <h3 style={{ fontWeight: '350' }}>Tiểu Sử</h3>
                        <textarea
                            className="EditProfile_Center-Bio--input"
                            placeholder="Tiểu Sử"
                            value={bio}
                            onChange={(e) => {
                                if (e.target.value.length <= 80) setBio(e.target.value);
                            }}
                        />
                        <p className="EditProfile_Center-Bio--input_dem">{bio.length}/80</p>
                    </div>
                </div>
                <div className="EditProfile_Bottom">
                    <div className="EditProfile_Bottom-button EditProfile_Bottom-buttonHuy" onClick={onClick}>
                        Hủy
                    </div>
                    <div
                        className="EditProfile_Bottom-button EditProfile_Bottom-buttonLuu"
                        disabled={anLuu}
                        onClick={() => {
                            if (!anLuu) {
                                setUpdate();
                            }
                        }}
                    >
                        Lưu
                    </div>
                </div>
            </div>
        </>
    );
}

export default EditProfile;
