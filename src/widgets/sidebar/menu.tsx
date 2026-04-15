import {
    Package,
    SlidersHorizontal,
    Users,
    ArrowLeftRight,
    CreditCard,
    Wallet,
    House,
} from 'lucide-react';
import { NavLink } from 'react-router-dom';
import type { LucideIcon } from 'lucide-react';

type SidebarMenuType = {
    path: string;
    value: string;
    icon: LucideIcon;
};

export const menu: SidebarMenuType[] = [
    {
        path: '/',
        value: 'Dashboard',
        icon: House,
    },
    {
        path: '/products',
        value: 'Products',
        icon: Package,
    },
    {
        path: '/limits',
        value: 'Limits',
        icon: SlidersHorizontal,
    },
    {
        path: '/users',
        value: 'Users',
        icon: Users,
    },
    {
        path: '/transfers',
        value: 'Transfers',
        icon: ArrowLeftRight,
    },
    {
        path: '/cards',
        value: 'Cards',
        icon: CreditCard,
    },
    {
        path: '/wallets',
        value: 'Wallets',
        icon: Wallet,
    },
];

const SidebarMenu = () => {
    return (
        <div className="w-64 h-screen p-4 space-y-2">
            {menu.map((item) => {
                const Icon = item.icon;

                return (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) =>
                            `flex items-center gap-3 p-2 rounded-md transition
              ${isActive ? 'bg-primary text-white' : 'hover:bg-gray-100 dark:hover:bg-primary/20'}`
                        }
                    >
                        <Icon size={18} />
                        <span>{item.value}</span>
                    </NavLink>
                );
            })}
        </div>
    );
};

export default SidebarMenu;
