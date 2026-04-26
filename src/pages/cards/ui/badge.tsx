import { Badge } from '@/components/ui/badge';

export const StatusBadge = ({ status }: { status: number }) => (
    <Badge variant={status === 1 ? 'default' : 'destructive'}>
        {status === 1 ? 'Active' : 'Inactive'}
    </Badge>
);
