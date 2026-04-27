import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Eye } from 'lucide-react';
import { formatCard } from '@/shared/lib/utils';
import type { CardData } from '@/features/cards/type';
import { StatusBadge } from '@/pages/cards/ui/badge';

type Props = {
    cards: CardData[];
    onView: (id: number) => void;
};

export const CardsTable = ({ cards, onView }: Props) => (
    <div className="rounded-xl border overflow-hidden">
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="pl-6">ID</TableHead>
                    <TableHead>Card Number</TableHead>
                    <TableHead>Bank</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Expires</TableHead>
                    <TableHead>Owner</TableHead>
                    <TableHead>Added</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right pr-6">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {cards.map((card) => (
                    <TableRow key={card.id}>
                        <TableCell className="pl-6">{card.id}</TableCell>
                        <TableCell className="font-mono">{formatCard(card.card_number)}</TableCell>
                        <TableCell>{card.bank ?? '—'}</TableCell>
                        <TableCell>
                            <Badge variant="secondary">{card.type}</Badge>
                        </TableCell>
                        <TableCell>{card.expire}</TableCell>
                        <TableCell>{card.owner}</TableCell>
                        <TableCell>{new Date(card.adding_date).toLocaleDateString()}</TableCell>
                        <TableCell>
                            <StatusBadge status={card.status} />
                        </TableCell>
                        <TableCell className="text-right pr-6">
                            <Button size="icon" variant="outline" onClick={() => onView(card.id)}>
                                <Eye className="w-4 h-4" />
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </div>
);
