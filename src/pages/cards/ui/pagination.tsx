import { Button } from '@/components/ui/button';

type Props = {
    page: number;
    lastPage: number;
    onPrev: () => void;
    onNext: () => void;
};

export const CardsPagination = ({ page, lastPage, onPrev, onNext }: Props) => (
    <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
            Page {page} of {lastPage || 1}
        </p>
        <div className="flex items-center gap-2">
            <Button variant="outline" disabled={page === 1} onClick={onPrev}>
                Prev
            </Button>
            <Button
                variant="outline"
                disabled={page === lastPage || lastPage === 0}
                onClick={onNext}
            >
                Next
            </Button>
        </div>
    </div>
);
