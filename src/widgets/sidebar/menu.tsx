import { useProfileQuery } from '@/entities/auth';
import {
    ArrowLeftRight,
    CreditCard,
    House,
    LogOut,
    Package,
    SlidersHorizontal,
    Users,
    Wallet,
    type LucideIcon,
} from 'lucide-react';
import { useLogoutMutation } from '@/entities/auth';
import { logOut } from '@/entities/auth/authSlice';
import { useAppDispatch } from '@/shared/lib/utils';
import { NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useState } from 'react';
import ConfirmDeleteDialog from '@/components/confirm-delete-modal';

type SidebarMenuType = {
    path: string;
    value: string;
    icon: LucideIcon;
};

export const menu: SidebarMenuType[] = [
    { path: '/', value: 'Dashboard', icon: House },
    { path: '/products', value: 'Products', icon: Package },
    { path: '/limits', value: 'Limits', icon: SlidersHorizontal },
    { path: '/users', value: 'Users', icon: Users },
    { path: '/transfers', value: 'Transfers', icon: ArrowLeftRight },
    { path: '/cards', value: 'Cards', icon: CreditCard },
    { path: '/wallets', value: 'Wallets', icon: Wallet },
];

interface SidebarMenuProps {
    collapse: boolean;
    setCloseSidebar?: React.Dispatch<React.SetStateAction<boolean>>;
}

const SidebarMenu = ({ collapse, setCloseSidebar }: SidebarMenuProps) => {
    const { data: user } = useProfileQuery(undefined);
    const [logout] = useLogoutMutation();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [openLogoutModal, setOpenLogoutModal] = useState(false);

    const closeMobileSidebar = () => {
        if (setCloseSidebar) setCloseSidebar(false);
    };

    const handleLogout = async () => {
        try {
            const res = await logout(undefined).unwrap();
            if (res) {
                toast.success('Logout success!');
                navigate('/login');
                dispatch(logOut());
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <nav className="flex-1 flex flex-col p-3">
            <div className="space-y-1 flex-1">
                {menu.map((item) => {
                    const Icon = item.icon;
                    return (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            title={collapse ? item.value : undefined}
                            onClick={closeMobileSidebar}
                            className={({ isActive }) =>
                                `flex items-center gap-3 p-2.5 pl-3 rounded-lg transition-all duration-300
                                ${
                                    isActive
                                        ? 'bg-primary text-primary-foreground'
                                        : 'hover:bg-muted text-muted-foreground hover:text-foreground'
                                }`
                            }
                        >
                            <Icon size={18} className="shrink-0" />
                            <span
                                className={`transition-all duration-300 overflow-hidden whitespace-nowrap
                                    ${collapse ? 'w-0 opacity-0' : 'w-full opacity-100'}`}
                            >
                                {item.value}
                            </span>
                        </NavLink>
                    );
                })}
            </div>

            <div className="mt-3 pt-3 border-t">
                <DropdownMenu modal={false}>
                    <DropdownMenuTrigger asChild>
                        <button
                            onClick={(e) => e.stopPropagation()}
                            className={`w-full flex items-center gap-3 p-2.5
                    `}
                        >
                            <div className="shrink-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-sm font-semibold">
                                {user?.name?.slice(0, 1)?.toUpperCase()}
                            </div>

                            <div
                                className={`flex-1 min-w-0 text-left transition-all duration-300 overflow-hidden
                        ${collapse ? 'w-0 opacity-0' : 'w-full opacity-100'}`}
                            >
                                <p className="text-sm font-medium truncate">{user?.name}</p>
                                <p className="text-xs text-muted-foreground truncate">
                                    {user?.email}
                                </p>
                            </div>
                        </button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent side="top" align="start" className="w-48">
                        <DropdownMenuLabel>
                            <p className="text-sm font-medium">{user?.name}</p>
                            <p className="text-xs text-muted-foreground font-normal">
                                {user?.email}
                            </p>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                            onClick={() => {
                                navigate('/profile');
                                closeMobileSidebar();
                            }}
                        >
                            Profile
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                            onClick={() => setOpenLogoutModal(true)}
                            className="text-destructive focus:text-destructive focus:bg-destructive/10"
                        >
                            <LogOut size={16} className="mr-2" />
                            Log out
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            <ConfirmDeleteDialog
                open={openLogoutModal}
                onOpenChange={setOpenLogoutModal}
                onConfirm={handleLogout}
                logout
            />
        </nav>
    );
};

export default SidebarMenu;
