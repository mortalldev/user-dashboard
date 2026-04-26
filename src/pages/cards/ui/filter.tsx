import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';

export type CardsFilter = {
    search: string;
    type: string;
    status: string;
};

type Props = {
    filter: CardsFilter;
    onChange: (filter: CardsFilter) => void;
    onReset: () => void;
};

export const CardsFilter = ({ filter, onChange, onReset }: Props) => {
    const isActive = filter.search || filter.type !== 'all' || filter.status !== 'all';

    return (
        <div className="flex flex-col items-center sm:flex-row gap-3 w-full">
            {/* Search */}

            <div className="w-full max-w-sm border rounded-xl flex items-center pl-3 focus-within:border-primary bg-input duration-200">
                <Search size={18} className="text-muted-foreground" />

                <Input
                    value={filter.search}
                    onChange={(e) => onChange({ ...filter, search: e.target.value })}
                    placeholder="Search products..."
                    className="pl-2 py-5 border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                />
            </div>

            {/* Type */}
            <Select value={filter.type} onValueChange={(val) => onChange({ ...filter, type: val })}>
                <SelectTrigger className="py-5 px-10 rounded-xl border bg-input focus:ring-0 focus:ring-offset-0 outline-none">
                    <SelectValue placeholder="Card type" />
                </SelectTrigger>
                <SelectContent position="popper">
                    <SelectItem value="all" className="py-2">
                        All types
                    </SelectItem>
                    <SelectItem value="uzcard" className="py-2">
                        UzCard
                    </SelectItem>
                    <SelectItem value="humo" className="py-2">
                        Humo
                    </SelectItem>
                    <SelectItem value="visa" className="py-2">
                        Visa
                    </SelectItem>
                </SelectContent>
            </Select>

            {/* Status */}
            <Select
                value={filter.status}
                onValueChange={(val) => onChange({ ...filter, status: val })}
            >
                <SelectTrigger className="py-5 px-10 rounded-xl border bg-input focus:ring-0 focus:ring-offset-0 outline-none">
                    <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent position="popper">
                    <SelectItem value="all" className="py-2">
                        All statuses
                    </SelectItem>
                    <SelectItem value="1" className="py-2">
                        Active
                    </SelectItem>
                    <SelectItem value="0" className="py-2">
                        Inactive
                    </SelectItem>
                </SelectContent>
            </Select>

            {/* Reset */}
            {isActive && (
                <Button variant="ghost" onClick={onReset} className="py-5 px-5">
                    Reset
                </Button>
            )}
        </div>
    );
};
