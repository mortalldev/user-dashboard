import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import type { UsersData } from '@/features/users/type';
import { LayoutGrid, List, Search } from 'lucide-react';

interface UsersFilterProps {
    users: UsersData[];
    setPage: React.Dispatch<React.SetStateAction<number>>;
    view: 'card' | 'table';
    setView: React.Dispatch<React.SetStateAction<'table' | 'card'>>;
    usersLength: number;
    search: string;
    setSearch: React.Dispatch<React.SetStateAction<string>>;

    levelFilter: string;
    setLevelFilter: React.Dispatch<React.SetStateAction<string>>;
    statusFilter: string;
    setStatusFilter: React.Dispatch<React.SetStateAction<string>>;
}

const statusOptions = [
    { label: 'All', value: 'all' },
    { label: 'Active', value: 'active' },
    { label: 'Blocked', value: 'blocked' },
];

const levelOptions = [
    { label: 'All', value: 'all' },
    { label: 'Standard', value: 'standard' },
    { label: 'Premium', value: 'premium' },
    { label: 'Basic', value: 'basic' },
];

const UsersFilter = ({
    setPage,
    view,
    setView,
    usersLength,
    search,
    setSearch,
    setLevelFilter,
    setStatusFilter,
    levelFilter,
    statusFilter,
}: UsersFilterProps) => {
    const resetPage = () => setPage(1);

    return (
        <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2 justify-between">
                <div className="flex items-center gap-2 w-full">
                    <div className="w-full max-w-md border rounded-xl flex items-center pl-3 focus-within:border-primary bg-input duration-200">
                        <Search size={18} className="text-muted-foreground" />

                        <Input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search users by phone number"
                            className="pl-2 py-5 border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                        />
                    </div>

                    <div className="flex gap-2">
                        <Select
                            value={statusFilter}
                            onValueChange={(v) => {
                                setStatusFilter(v);
                                resetPage();
                            }}
                        >
                            <SelectTrigger className="w-40 py-5 rounded-xl">
                                <SelectValue placeholder="Status" />
                            </SelectTrigger>
                            <SelectContent position="popper">
                                {statusOptions.map((o) => (
                                    <SelectItem key={o.value} value={o.value}>
                                        {o.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <Select
                            value={levelFilter}
                            onValueChange={(v) => {
                                setLevelFilter(v);
                                resetPage();
                            }}
                        >
                            <SelectTrigger className="w-40 py-5 rounded-xl">
                                <SelectValue placeholder="Level" />
                            </SelectTrigger>
                            <SelectContent position="popper">
                                {levelOptions.map((o) => (
                                    <SelectItem key={o.value} value={o.value}>
                                        {o.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <div className="flex gap-2">
                    <Button
                        size="icon"
                        variant={view === 'card' ? 'default' : 'ghost'}
                        onClick={() => setView('card')}
                    >
                        <LayoutGrid className="w-4 h-4" />
                    </Button>
                    <Button
                        size="icon"
                        variant={view === 'table' ? 'default' : 'ghost'}
                        onClick={() => setView('table')}
                    >
                        <List className="w-4 h-4" />
                    </Button>
                </div>
            </div>
            <p className="text-sm text-muted-foreground">
                Total: <span className="font-medium">{usersLength}</span> users
            </p>
        </div>
    );
};

export default UsersFilter;
