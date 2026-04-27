import Navbar from '@/widgets/navbar/Navbar';
import Sidebar from '@/widgets/sidebar/Sidebar';
import { Outlet } from 'react-router-dom';

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
