import '../SlideBar2/SlideBar2.scss';

function SlideBar2({ total }) {
    return (
        <>
            <div className="SlideBar2">
                <p style={{ fontSize: '15px', color: '#909096', textAlign: 'left', marginBottom: '10px' }}>
                    Đăng nhập để follow các tác giả, thích video, xem bình luận và lưu video.
                </p>
                <button className="SlideBar2Button" onClick={total}>
                    Đăng nhập
                </button>
            </div>
        </>
    );
}

export default SlideBar2;
