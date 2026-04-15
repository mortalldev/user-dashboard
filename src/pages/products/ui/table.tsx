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

import type { ProductData } from '@/features/products/type';
import { Pencil, Trash2 } from 'lucide-react';
import { useState } from 'react';

type Props = {
    data: ProductData[];
};

const ITEMS_PER_PAGE = 10;

const ProductTable = ({ data }: Props) => {
    const [page, setPage] = useState(1);

    const totalPages = Math.ceil((data?.length || 0) / ITEMS_PER_PAGE);

    const paginatedData = data?.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

    if (!data || data.length === 0) {
        return (
            <div className="w-full mt-6 flex flex-col items-center justify-center py-10 border rounded-xl">
                <p className="text-lg font-medium">Not Found</p>
                <p className="text-sm text-muted-foreground">No products available</p>
            </div>
        );
    }

    return (
        <div className="w-full space-y-4 mt-4">
            <div className="rounded-xl border overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="pl-10">ID</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Amount</TableHead>
                            <TableHead>Percent</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {paginatedData?.map((item) => (
                            <TableRow key={item.id}>
                                <TableCell className="pl-10">{item.id}</TableCell>
                                <TableCell className="font-medium">{item.title_en}</TableCell>

                                <TableCell>
                                    <Badge variant="secondary">{item.type}</Badge>
                                </TableCell>

                                <TableCell>
                                    {item.max_amount.toLocaleString().split(',').join(' ')}
                                </TableCell>

                                <TableCell>{item.percent}%</TableCell>

                                <TableCell>
                                    <Badge variant={item.status === 1 ? 'default' : 'destructive'}>
                                        {item.status === 1 ? 'Active' : 'Inactive'}
                                    </Badge>
                                </TableCell>

                                <TableCell className="text-right space-x-2">
                                    <Button size="icon" variant="outline">
                                        <Pencil className="w-4 h-4" />
                                    </Button>

                                    <Button size="icon" variant="destructive">
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                    Page {page} of {totalPages || 1}
                </p>

                <div className="flex items-center gap-2">
                    <Button
                        variant="outline"
                        disabled={page === 1}
                        onClick={() => setPage((p) => p - 1)}
                    >
                        Prev
                    </Button>

                    <Button
                        variant="outline"
                        disabled={page === totalPages || totalPages === 0}
                        onClick={() => setPage((p) => p + 1)}
                    >
                        Next
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ProductTable;
