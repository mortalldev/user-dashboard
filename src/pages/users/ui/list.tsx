import { useState } from 'react';
import { useUsersQuery } from '@/features/users';
import type { UsersData } from '@/features/users/type';
import { CardsPagination } from '@/pages/cards/ui/pagination';
import UsersCard from '@/pages/users/ui/card';
import UsersTable from '@/pages/users/ui/table';
import UsersFilter from '@/pages/users/ui/filter';
import { extractArray } from '@/shared/lib/utils';

export const statusVariant: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
    active: 'default',
    inactive: 'secondary',
    blocked: 'destructive',
};

export const levelVariant: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
    standard: 'outline',
    premium: 'secondary',
    vip: 'default',
};

const UsersList = () => {
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [levelFilter, setLevelFilter] = useState('all');
    const [view, setView] = useState<'card' | 'table'>('table');

    const { data } = useUsersQuery({
        page,
        search: search || undefined,
        status: statusFilter !== 'all' ? statusFilter : undefined,
        level: levelFilter !== 'all' ? levelFilter : undefined,
    });

    const users = extractArray<UsersData>(data);
    const lastPage: number = data?.last_page ?? 1;
    const total: number = data?.total ?? 0;

    const resetPage = () => setPage(1);

    return (
        <div className="flex flex-col gap-4 p-4 h-full overflow-y-auto no-scrollbar">
            <UsersFilter
                search={search}
                setSearch={(v) => {
                    setSearch(v);
                    resetPage();
                }}
                levelFilter={levelFilter}
                setLevelFilter={(v) => {
                    setLevelFilter(v);
                    resetPage();
                }}
                statusFilter={statusFilter}
                setStatusFilter={(v) => {
                    setStatusFilter(v);
                    resetPage();
                }}
                setPage={setPage}
                view={view}
                setView={setView}
                users={users}
                usersLength={total}
            />

            {view === 'table' && <UsersTable paginated={users} />}
            {view === 'card' && <UsersCard paginated={users} />}

            {lastPage > 1 && (
                <CardsPagination
                    page={page}
                    lastPage={lastPage}
                    onPrev={() => setPage((p) => Math.max(1, p - 1))}
                    onNext={() => setPage((p) => Math.min(lastPage, p + 1))}
                />
            )}
        </div>
    );
};

export default UsersList;
