import '../Admin/Admin.scss';
import AdminslideBar from './AdminslideBar';
import AdminNavbar from './AdminNavbar';
function Admin() {
    return (
        <>
            <div className="Admin">
                <AdminslideBar />
                <div className="Admin_right">
                    <AdminNavbar />
                </div>
            </div>
        </>
    );
}

export default Admin;
