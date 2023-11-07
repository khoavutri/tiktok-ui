import '../SlideBar1Button/SlideBar1Button.scss';
function SlideBar1Button({ img, content, color, onClick }) {
    const isLive = content === 'LIVE';
    return (
        <>
            <button className="SlideBar1Button" style={{ color: color }} onClick={onClick} disabled={isLive}>
                <div style={{ marginRight: '10px', fontWeight: 'bold', lineHeight: '1' }}>{img}</div>
                <div style={{ fontSize: '16px' }}>{content}</div>
            </button>
        </>
    );
}

export default SlideBar1Button;
