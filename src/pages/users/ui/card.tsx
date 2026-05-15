import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { levelVariant, statusVariant } from '@/pages/users/ui/list';
import { useNavigate } from 'react-router-dom';
import type { UsersData } from '@/features/users/type';

interface UsersCardProps {
    paginated: UsersData[];
}

const UsersCard = ({ paginated }: UsersCardProps) => {
    const navigate = useNavigate();

    const goToDetail = (id: number) => navigate(`/users/${id}`);

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {paginated.length === 0 ? (
                <p className="col-span-full text-center py-10 text-muted-foreground">
                    No users found
                </p>
            ) : (
                paginated.map((user) => (
                    <Card
                        key={user.id}
                        className="hover:shadow-md transition-shadow cursor-pointer"
                        onClick={() => goToDetail(user.id)}
                    >
                        <CardHeader className="pb-2">
                            <div className="flex items-start justify-between gap-2">
                                <div>
                                    <p className="font-semibold leading-tight">{user.fullname}</p>
                                    <p className="text-xs text-muted-foreground mt-0.5">
                                        #{user.id}
                                    </p>
                                </div>
                                <div className="flex flex-col gap-1 items-end">
                                    <Badge variant={statusVariant[user.status] ?? 'outline'}>
                                        {user.status}
                                    </Badge>
                                    <Badge variant={levelVariant[user.level] ?? 'outline'}>
                                        {user.level}
                                    </Badge>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-1 text-sm">
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Phone</span>
                                <span>{user.phone}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">INN</span>
                                <span>{user.inn}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Passport</span>
                                <span>{user.passport}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Currency</span>
                                <span>{user.currency}</span>
                            </div>
                        </CardContent>
                    </Card>
                ))
            )}
        </div>
    );
};

export default UsersCard;
