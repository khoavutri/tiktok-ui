import '../Upload/Upload.scss';
import { useState, useEffect } from 'react';
import { uploadImgPost } from '../../utils/CallApiOverView';
import Success from '../../component/toast/success';
import Error from '../../component/toast/error';
import checkLink from '../../utils/checkLink';
function Upload() {
    const [link, setLink] = useState('');
    const [note, setNote] = useState('');
    const [dang, setDang] = useState('UploadFormFlexButtonDang1');
    const [dem, setDem] = useState(0);
    const [showSuccess, setShowSuccess] = useState(false);
    const [showErr, setShowErr] = useState(false);
    const [notifiiContent, setNotifiiContent] = useState('');
    const [notifiiSubject, setNotifiiSubject] = useState('');
    useEffect(() => {
        if (link !== '' && note !== '') {
            setDang('UploadFormFlexButtonDang2');
        }
    });
    useEffect(() => {
        if (link == '' || note == '') {
            setDang('UploadFormFlexButtonDang1');
        }
    });
    useEffect(() => {
        if (showErr == true) {
            setTimeout(() => {
                setShowErr(false);
            }, 2000);
        }
    }, [showErr]);
    useEffect(() => {
        if (showSuccess == true) {
            setTimeout(() => {
                setShowSuccess(false);
            }, 2000);
        }
    }, [showSuccess]);
    const getuploadImgPost = async () => {
        const user = JSON.parse(localStorage.getItem('user'));
        const jwtToken = sessionStorage.getItem('jwt');
        if (checkLink(link) === true) {
            const data = await uploadImgPost(link, note, user.id, jwtToken)
                .then((data) => {
                    return data;
                })
                .catch((err) => {
                    return err;
                });
            if (data.status === 201) {
                setShowSuccess(true);
                setNotifiiSubject('Thành Công!');
                setNotifiiContent('Đăng bài thành công');
                window.location.href = '/';
            } else {
                setShowErr(true);
                setNotifiiSubject('Thất bại!');
                setNotifiiContent('Vui lòng thử lại');
            }
        } else {
            setShowErr(true);
            setNotifiiSubject('Thất bại!');
            setNotifiiContent('Đường dẫn sai bét');
        }
    };

    return (
        <>
            {' '}
            <Error hien={showErr} content={notifiiContent} subject={notifiiSubject} />
            <Success hien={showSuccess} content={notifiiContent} subject={notifiiSubject} />
            <div className="Upload">
                <div className="UploadForm">
                    <h1 style={{ marginTop: '3vh' }}>Upload Image</h1>
                    <div className="UploadFormDiv">
                        <p style={{ color: 'black' }}>
                            Chuyển ảnh thành Link{' '}
                            <a
                                href="https://www.truongblogger.top/p/upload-anh.html"
                                target="_blank"
                                className="UploadFormP"
                            >
                                tại đây
                            </a>
                        </p>
                        <input
                            className="UploadFormInput"
                            placeholder="Nhập Link ảnh tại đây"
                            type="text"
                            value={link}
                            onChange={(e) => {
                                setLink(e.target.value);
                            }}
                        />
                    </div>
                    <div className="UploadFormDiv">
                        <p style={{ color: 'black' }}>Chú thích </p>
                        <input
                            style={{ paddingRight: '4.5vw' }}
                            className="UploadFormInput"
                            placeholder="Nhập chú thích bạn muốn"
                            type="text"
                            value={note}
                            onChange={(e) => {
                                if (e.target.value.length <= 150) {
                                    setNote(e.target.value);
                                    setDem(e.target.value.length);
                                }
                            }}
                        />
                        <p className="UploadFormInputP" style={{ color: '#918b91' }}>
                            {dem}/150
                        </p>
                    </div>
                    <div className="UploadFormFlex">
                        <button
                            className="UploadFormFlexButton UploadFormFlexButtonHuy"
                            onClick={() => {
                                setLink('');
                                setNote('');
                            }}
                        >
                            Hủy Bỏ
                        </button>
                        <button
                            className={'UploadFormFlexButton ' + dang}
                            disabled={dang === 'UploadFormFlexButtonDang1'}
                            onClick={() => {
                                if (link !== '' && note !== '') {
                                    getuploadImgPost();
                                }
                            }}
                        >
                            Đăng
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Upload;
