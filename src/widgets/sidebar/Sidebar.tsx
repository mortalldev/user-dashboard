import SidebarMenu from '@/widgets/sidebar/menu';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
    const navigate = useNavigate();

    return (
        <div className="w-75 h-screen p-6 border-r">
            <div className="pb-6 border-b">
                <button
                    onClick={() => navigate('/')}
                    className="text-2xl font-semibold text-foreground"
                >
                    Test Project
                </button>
            </div>

            <SidebarMenu />
        </div>
    );
};

export default Sidebar;
