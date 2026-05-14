import { Button } from '@/components/ui/button';
import ThemeToggle from '@/widgets/navbar/ThemeToggle';
import { menu } from '@/widgets/sidebar/menu';
import MobileSidebar from '@/widgets/sidebar/mobile-sidebar';
import { TextAlignJustify } from 'lucide-react';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';

const Navbar = () => {
    const { pathname } = useLocation();

    const navTitle = menu.find((p) => p.path === pathname);

    const [openSidebar, setOpenSidebar] = useState(false);

    return (
        <div className="w-full border-b h-14 flex items-center justify-between pl-4 pr-4">
            <div className="flex items-center gap-4">
                <div className="flex sm:hidden">
                    <Button onClick={() => setOpenSidebar(true)} size={'icon-lg'}>
                        <TextAlignJustify />
                    </Button>
                </div>

                <h2 className="font-semibold">{navTitle?.value}</h2>
            </div>

            <div className="flex items-center gap-2">
                <ThemeToggle />
            </div>

            <MobileSidebar isOpen={openSidebar} setIsOpen={setOpenSidebar} />
        </div>
    );
};

export default Navbar;
