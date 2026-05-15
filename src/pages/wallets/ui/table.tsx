import { Badge } from '@/components/ui/badge';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import type { WalletsData } from '@/features/wallets/type';

interface WalletsTabeleProps {
    paginated: WalletsData[];
    userMap: Record<number, string>;
}

function fmt(val: string | null | undefined) {
    return val ?? '—';
}

function fmtBalance(balance: string, currency: string) {
    const num = parseFloat(balance);
    if (isNaN(num)) return balance;
    return (
        new Intl.NumberFormat('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(num) +
        ' ' +
        currency
    );
}

const WalletsTabele = ({ paginated, userMap }: WalletsTabeleProps) => {
    return (
        <div className="rounded-xl border border-border/60 overflow-auto no-scrollbar flex-1 min-h-0">
            <Table>
                <TableHeader>
                    <TableRow className="bg-muted/30 hover:bg-muted/30 sticky top-0 z-10 shadow-[0_1px_0_0_hsl(var(--border))]">
                        <TableHead className="bg-muted/30">Owner</TableHead>
                        <TableHead className="bg-muted/30">Account</TableHead>
                        <TableHead className="bg-muted/30">Wallet ID</TableHead>
                        <TableHead className="bg-muted/30">MFO</TableHead>
                        <TableHead className="bg-muted/30">Balance</TableHead>
                        <TableHead className="bg-muted/30">Currency</TableHead>
                        <TableHead className="bg-muted/30">In Use</TableHead>
                        <TableHead className="bg-muted/30">Updated</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {paginated.length === 0 ? (
                        <TableRow>
                            <TableCell
                                colSpan={8}
                                className="text-center py-12 text-muted-foreground"
                            >
                                No wallets found
                            </TableCell>
                        </TableRow>
                    ) : (
                        paginated.map((wallet) => (
                            <TableRow
                                key={wallet.id}
                                className="hover:bg-muted/20 transition-colors"
                            >
                                <TableCell>
                                    <div className="flex flex-col">
                                        <span className="font-medium text-sm">
                                            {fmt(userMap[wallet.user_id])}
                                        </span>
                                        <span className="text-xs text-muted-foreground">
                                            {wallet.customer_number}
                                        </span>
                                    </div>
                                </TableCell>

                                <TableCell className="font-mono text-sm">
                                    {fmt(wallet.account)}
                                </TableCell>

                                <TableCell className="font-mono text-sm text-muted-foreground">
                                    {fmt(wallet.wallet_id)}
                                </TableCell>

                                <TableCell className="text-sm">{fmt(wallet.mfo)}</TableCell>

                                <TableCell>
                                    <span className="font-semibold tabular-nums">
                                        {fmtBalance(wallet.balance, wallet.currency)}
                                    </span>
                                </TableCell>

                                <TableCell>
                                    <Badge variant="outline" className="font-mono">
                                        {wallet.currency}
                                    </Badge>
                                </TableCell>

                                <TableCell>
                                    <Badge variant={wallet.in_use ? 'default' : 'secondary'}>
                                        {wallet.in_use ? 'Active' : 'Inactive'}
                                    </Badge>
                                </TableCell>

                                <TableCell className="text-sm text-muted-foreground whitespace-nowrap">
                                    {new Date(wallet.update_at).toLocaleDateString('en-GB', {
                                        day: '2-digit',
                                        month: 'short',
                                        year: 'numeric',
                                    })}
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    );
};

export default WalletsTabele;
