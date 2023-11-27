import '../AdminNavbar/AdminNavbar.scss';
import { TiThMenu } from 'react-icons/ti';
import { Link } from 'react-router-dom';
function AdminNavbar() {
    return (
        <>
            <div className="Admin_Navbar">
                <TiThMenu style={{ marginLeft: '20px', fontSize: '22px' }} className="Admin_Navbar-menu" />
                <Link to="/">
                    <div>HOME</div>
                </Link>
                <Link>
                    <div>LIÊN HỆ KỸ THUẬT</div>
                </Link>
            </div>
        </>
    );
}

export default AdminNavbar;
