import { X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SidebarMenu from '@/widgets/sidebar/menu';
import { Button } from '@/components/ui/button';

interface MobileSidebarProps {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const MobileSidebar = ({ isOpen, setIsOpen }: MobileSidebarProps) => {
    const navigate = useNavigate();

    return (
        <>
            <div
                onClick={() => setIsOpen(false)}
                className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-300
                    ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
            />

            <div
                className={`fixed top-0 left-0 z-50 h-full w-70 bg-background border-r
                    flex flex-col transition-transform duration-300 ease-in-out
                    ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
            >
                <div className="p-4 border-b flex items-center justify-between">
                    <button
                        onClick={() => {
                            navigate('/');
                            setIsOpen(false);
                        }}
                        className="text-base sm:text-xl font-semibold text-foreground"
                    >
                        Test Project
                    </button>
                    <Button size="icon" variant="ghost" onClick={() => setIsOpen(false)}>
                        <X className="w-5 h-5" />
                    </Button>
                </div>

                <SidebarMenu collapse={false} setCloseSidebar={setIsOpen} />
            </div>
        </>
    );
};

export default MobileSidebar;
