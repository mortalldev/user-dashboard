import SidebarMenu from '@/widgets/sidebar/menu';
import { PanelRightOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAppDispatch, useAppSelector } from '@/shared/lib/utils';
import { toggleSidebarMenu } from '@/entities/sidebar/sidebarSlice';

const Sidebar = () => {
    const navigate = useNavigate();
    const { sidebarOpen } = useAppSelector((state) => state.sidebar);

    const dispatch = useAppDispatch();

    return (
        <div
            className={`h-screen border-r hidden sm:flex flex-col transition-all duration-300 ease-in-out shrink-0
        ${sidebarOpen ? 'w-17' : 'w-70'}`}
        >
            <div className="p-4 border-b flex items-center justify-between min-h-16.25">
                <div
                    className={`overflow-hidden transition-all duration-300 ${sidebarOpen ? 'max-w-0 opacity-0' : 'max-w-50 opacity-100'}`}
                >
                    <button
                        onClick={() => navigate('/')}
                        className="text-xl font-semibold text-foreground whitespace-nowrap"
                    >
                        Test Project
                    </button>
                </div>

                <Button
                    size="icon-lg"
                    onClick={() => {
                        dispatch(toggleSidebarMenu());
                    }}
                    className={`shrink-0 transition-all duration-300 ${sidebarOpen ? 'mx-auto' : ''}`}
                >
                    <PanelRightOpen
                        className={`transition-transform duration-300 ${sidebarOpen ? 'rotate-180' : 'rotate-0'}`}
                    />
                </Button>
            </div>

            <SidebarMenu collapse={sidebarOpen} />
        </div>
    );
};

export default Sidebar;
