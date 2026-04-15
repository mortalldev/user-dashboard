import { useLogoutMutation, useProfileQuery } from '@/entities/auth';
import { logOut } from '@/entities/auth/authSlice';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useAppDispatch } from '@/shared/lib/utils';

export const Menu = () => {
    const { data: user } = useProfileQuery(undefined);
    const [logout] = useLogoutMutation();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const handleLogout = async () => {
        try {
            const res = await logout(undefined).unwrap();

            if (res) {
                toast.success('Logout success!');
                navigate('/login');
                dispatch(logOut());
            }
        } catch (error: any) {
            console.log(error);
        }
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button className="rounded-full w-10 h-10" variant={'outline'}>
                    {user?.name?.slice(0, 1)}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-40" align="start">
                <DropdownMenuGroup>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => navigate('/profile')}>
                        Profile
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuGroup>
                    <DropdownMenuItem onClick={handleLogout}>Log out</DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default Menu;
