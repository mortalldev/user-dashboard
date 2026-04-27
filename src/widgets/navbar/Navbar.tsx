import Menu from '@/widgets/navbar/menu';
import ThemeToggle from '@/widgets/navbar/ThemeToggle';
import { menu } from '@/widgets/sidebar/menu';
import { useLocation } from 'react-router-dom';

const Navbar = () => {
    const { pathname } = useLocation();

    const navTitle = menu.find((p) => p.path === pathname);

    return (
        <div className="w-full border-b h-14 flex items-center justify-between pl-4 pr-10 ">
            <h2 className="font-semibold">{navTitle?.value}</h2>

            <div className="flex items-center gap-2">
                <ThemeToggle />
                <Menu />
            </div>
        </div>
    );
};

export default Navbar;
