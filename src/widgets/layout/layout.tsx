import { Outlet } from 'react-router-dom';
import Sidebar from '../sidebar/Sidebar';
import Navbar from '../navbar/Navbar';

const Layout = () => {
    return (
        <div className="flex w-full h-screen overflow-hidden">
            <Sidebar />
            <div className="w-full">
                <Navbar />
                <main className="p-4 h-[calc(100vh-56px)] flex-1">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default Layout;
