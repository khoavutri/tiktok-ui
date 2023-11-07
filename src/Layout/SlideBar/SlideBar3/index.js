import '../SlideBar3/SlideBar3.scss';
import { BsBadgeHd } from 'react-icons/bs';
import { Link } from 'react-router-dom';


function SlideBar3() {
    return (
        <>
            <div className="SlideBar3">
                <button className="SlideBar3Button">
                    <div className="SlideBar3ButtonContent">
                        <span style={{ marginTop: '50px' }}>
                            <BsBadgeHd />
                        </span>
                        <span>Tạo hiệu ứng</span>
                    </div>
                </button>
                <div style={{ fontSize: '15px', marginTop: '15px', textAlign: 'left' }}>
                    <Link className="SlideBar3ButtonContentLink" to="https://www.facebook.com/" target="_blank">
                        Giới thiệu
                    </Link>
                    &nbsp;
                    <Link className="SlideBar3ButtonContentLink" to="#" target="_blank">
                        Bảng tin
                    </Link>
                    &nbsp;
                    <Link className="SlideBar3ButtonContentLink" to="#" target="_blank">
                        Liên hệ
                    </Link>
                </div>
            </div>
        </>
    );
}

export default SlideBar3;
