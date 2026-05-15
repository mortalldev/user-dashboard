import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import type { UsersData } from '@/features/users/type';
import { levelVariant, statusVariant } from '@/pages/users/ui/list';
import { Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface UsersTableProps {
    paginated: UsersData[];
}

const UsersTable = ({ paginated }: UsersTableProps) => {
    const navigate = useNavigate();

    const goToDetail = (id: number) => navigate(`/users/${id}`);

    return (
        <div className="rounded-xl border overflow-x-auto no-scrollbar">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Full Name</TableHead>
                        <TableHead>Phone</TableHead>
                        <TableHead>INN</TableHead>
                        <TableHead>Passport</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Level</TableHead>
                        <TableHead>Currency</TableHead>
                        <TableHead className="text-right pr-4">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {paginated.length === 0 ? (
                        <TableRow>
                            <TableCell
                                colSpan={9}
                                className="text-center py-10 text-muted-foreground"
                            >
                                No users found
                            </TableCell>
                        </TableRow>
                    ) : (
                        paginated.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell className="font-medium">{user.fullname}</TableCell>
                                <TableCell>{user.phone}</TableCell>
                                <TableCell>{user.inn}</TableCell>
                                <TableCell>{user.passport}</TableCell>
                                <TableCell>
                                    <Badge variant={statusVariant[user.status] ?? 'outline'}>
                                        {user.status}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    <Badge variant={levelVariant[user.level] ?? 'outline'}>
                                        {user.level}
                                    </Badge>
                                </TableCell>
                                <TableCell>{user.currency}</TableCell>
                                <TableCell className="text-right pr-4">
                                    <Button
                                        size="icon"
                                        variant="outline"
                                        onClick={() => goToDetail(user.id)}
                                    >
                                        <Eye className="w-4 h-4" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    );
};

export default UsersTable;
