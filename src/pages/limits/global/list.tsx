import { useState } from 'react';
import {
    useCreateGlobalLimitMutation,
    useEditGlobalLimitMutation,
    useGetGlobalLimitsQuery,
} from '@/features/limits';
import type { GlobalLimitsData } from '@/features/limits/type';
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
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Pencil, Plus } from 'lucide-react';
import { CardsPagination } from '@/pages/cards/ui/pagination';

const emptyForm = {
    amount: '',
    creditor_type: '',
    currency: '',
    debitor_type: '',
    limit_order: '',
    op_number: '',
    period: '',
    subtype: '',
    type: '',
};

type FormState = typeof emptyForm;

function fmt(val: string | number | null | undefined) {
    return val ?? '—';
}

const GlobalLimits = () => {
    const [page, setPage] = useState(1);
    const { data: response } = useGetGlobalLimitsQuery({ page });
    const [_createGlobalLimit, { isLoading: createLoading }] = useCreateGlobalLimitMutation();
    const [_editGlobalLimit, { isLoading: editLoading }] = useEditGlobalLimitMutation();

    const limits: GlobalLimitsData[] = response?.data ?? [];
    const lastPage: number = response?.last_page ?? 1;
    const total: number = response?.total ?? 0;

    const [open, setOpen] = useState(false);
    const [editTarget, setEditTarget] = useState<GlobalLimitsData | null>(null);
    const [form, setForm] = useState<FormState>(emptyForm);

    const isLoading = createLoading || editLoading;

    const openCreate = () => {
        setEditTarget(null);
        setForm(emptyForm);
        setOpen(true);
    };

    const openEdit = (limit: GlobalLimitsData) => {
        setEditTarget(limit);
        setForm({
            amount: limit.amount,
            creditor_type: limit.creditor_type,
            currency: limit.currency,
            debitor_type: limit.debitor_type,
            limit_order: String(limit.limit_order),
            op_number: String(limit.op_number),
            period: limit.period,
            subtype: limit.subtype,
            type: limit.type,
        });
        setOpen(true);
    };

    const handleChange = (key: keyof FormState, value: string) => {
        setForm((prev) => ({ ...prev, [key]: value }));
    };

    const handleSubmit = async () => {
        // const payload = {
        //     ...form,
        //     limit_order: Number(form.limit_order),
        //     op_number:   Number(form.op_number),
        // };
        // if (editTarget) {
        //     await editGlobalLimit({ id: editTarget.id, ...payload });
        // } else {
        //     await createGlobalLimit(payload);
        // }
        // setOpen(false);
    };

    return (
        <div className="flex flex-col gap-4 h-full overflow-y-auto no-scrollbar">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-lg font-semibold">Global Limits</h2>
                    <p className="text-sm text-muted-foreground">
                        Total: <span className="font-medium">{total}</span> limits
                    </p>
                </div>
                <Button onClick={openCreate} className="gap-2">
                    <Plus className="w-4 h-4" />
                    Create
                </Button>
            </div>

            <div className="rounded-xl border border-border/60 overflow-auto flex-1 min-h-0">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-muted/30 hover:bg-muted/30 sticky top-0 z-10">
                            <TableHead className="bg-muted/30">Type</TableHead>
                            <TableHead className="bg-muted/30">Subtype</TableHead>
                            <TableHead className="bg-muted/30">Amount</TableHead>
                            <TableHead className="bg-muted/30">Currency</TableHead>
                            <TableHead className="bg-muted/30">Period</TableHead>
                            <TableHead className="bg-muted/30">Creditor</TableHead>
                            <TableHead className="bg-muted/30">Debitor</TableHead>
                            <TableHead className="bg-muted/30">Op №</TableHead>
                            <TableHead className="bg-muted/30">Order</TableHead>
                            <TableHead className="bg-muted/30 text-right pr-4">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {limits.length === 0 ? (
                            <TableRow>
                                <TableCell
                                    colSpan={10}
                                    className="text-center py-12 text-muted-foreground"
                                >
                                    No limits found
                                </TableCell>
                            </TableRow>
                        ) : (
                            limits.map((limit) => (
                                <TableRow
                                    key={limit.id}
                                    className="hover:bg-muted/20 transition-colors"
                                >
                                    <TableCell>
                                        <Badge variant="outline">{fmt(limit.type)}</Badge>
                                    </TableCell>
                                    <TableCell className="text-sm">{fmt(limit.subtype)}</TableCell>
                                    <TableCell className="font-semibold tabular-nums">
                                        {Number(limit.amount).toLocaleString('en-US')}
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant="secondary" className="font-mono">
                                            {fmt(limit.currency)}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-sm">{fmt(limit.period)}</TableCell>
                                    <TableCell className="text-sm">
                                        {fmt(limit.creditor_type)}
                                    </TableCell>
                                    <TableCell className="text-sm">
                                        {fmt(limit.debitor_type)}
                                    </TableCell>
                                    <TableCell className="text-sm tabular-nums">
                                        {fmt(limit.op_number)}
                                    </TableCell>
                                    <TableCell className="text-sm tabular-nums">
                                        {fmt(limit.limit_order)}
                                    </TableCell>
                                    <TableCell className="text-right pr-4">
                                        <Button
                                            size="icon"
                                            variant="outline"
                                            onClick={() => openEdit(limit)}
                                        >
                                            <Pencil className="w-4 h-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>

            {lastPage > 1 && (
                <CardsPagination
                    page={page}
                    lastPage={lastPage}
                    onPrev={() => setPage((p) => Math.max(1, p - 1))}
                    onNext={() => setPage((p) => Math.min(lastPage, p + 1))}
                />
            )}

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="max-w-lg">
                    <DialogHeader>
                        <DialogTitle>{editTarget ? 'Edit Limit' : 'Create Limit'}</DialogTitle>
                    </DialogHeader>

                    <div className="grid grid-cols-2 gap-4 py-2">
                        {(
                            [
                                { key: 'amount', label: 'Amount' },
                                { key: 'currency', label: 'Currency' },
                                { key: 'type', label: 'Type' },
                                { key: 'subtype', label: 'Subtype' },
                                { key: 'period', label: 'Period' },
                                { key: 'creditor_type', label: 'Creditor Type' },
                                { key: 'debitor_type', label: 'Debitor Type' },
                                { key: 'op_number', label: 'Op Number' },
                                { key: 'limit_order', label: 'Limit Order' },
                            ] as { key: keyof FormState; label: string }[]
                        ).map(({ key, label }) => (
                            <div key={key} className="flex flex-col gap-1.5">
                                <Label htmlFor={key} className="text-xs text-muted-foreground">
                                    {label}
                                </Label>
                                <Input
                                    id={key}
                                    value={form[key]}
                                    onChange={(e) => handleChange(key, e.target.value)}
                                    placeholder={label}
                                />
                            </div>
                        ))}
                    </div>

                    <DialogFooter>
                        <Button variant="outline" onClick={() => setOpen(false)}>
                            Cancel
                        </Button>
                        <Button onClick={handleSubmit} disabled={isLoading}>
                            {isLoading ? 'Saving…' : editTarget ? 'Save Changes' : 'Create'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default GlobalLimits;
