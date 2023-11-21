import '../NotFound/NotFound.scss';
import { FaPlay } from 'react-icons/fa6';
function NotFound() {
    return (
        <>
            <div className="NotFound">
                <div style={{ fontSize: '20vw', marginBottom: '-12vh' }}>404</div>
                <div style={{ color: 'grey' }}>Không thể tìm thấy trang này</div>
                <div style={{ fontSize: '2vw' }}>Xem những video thịnh hành khác trên TikTok</div>
                <button
                    className="NotFound_Xem"
                    onClick={() => {
                        window.location.href = '/';
                    }}
                >
                    <FaPlay />
                    Xem ngay
                </button>
            </div>
        </>
    );
}

export default NotFound;
