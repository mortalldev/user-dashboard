import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
    ArrowLeft,
    User,
    Phone,
    FileText,
    Shield,
    Star,
    Calendar,
    Building2,
    Hash,
    Clock,
    Wallet,
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { useUsersByIdQuery } from '@/features/users';
import Loader from '@/widgets/loader';

const statusVariant: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
    active: 'default',
    inactive: 'secondary',
    blocked: 'destructive',
};

const levelColor: Record<string, string> = {
    basic: 'text-slate-500 bg-slate-100 dark:bg-slate-800',
    standard: 'text-blue-600 bg-blue-50 dark:bg-blue-950',
    premium: 'text-amber-600 bg-amber-50 dark:bg-amber-950',
    vip: 'text-purple-600 bg-purple-50 dark:bg-purple-950',
};

function fmt(val: string | null | undefined) {
    return val ?? '—';
}

function fmtDate(val: string | null | undefined) {
    if (!val) return '—';
    return new Date(val).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    });
}

function InfoRow({
    icon: Icon,
    label,
    value,
}: {
    icon: React.ElementType;
    label: string;
    value: string;
}) {
    return (
        <div className="flex items-center gap-3 py-3 border-b border-border/50 last:border-0">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-muted shrink-0">
                <Icon className="w-4 h-4 text-muted-foreground" />
            </span>
            <span className="text-sm text-muted-foreground w-36 shrink-0">{label}</span>
            <span className="text-sm font-medium break-all">{value}</span>
        </div>
    );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <div className="rounded-2xl border border-border/60 bg-card overflow-hidden">
            <div className="px-5 py-3.5 border-b border-border/60 bg-muted/30">
                <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    {title}
                </h3>
            </div>
            <div className="px-5">{children}</div>
        </div>
    );
}

const UsersDetail = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();

    const { data: user, isLoading, isError } = useUsersByIdQuery(Number(id));

    if (isLoading) {
        return <Loader />;
    }

    if (isError || !user) {
        return (
            <div className="flex flex-col items-center justify-center h-full gap-3">
                <p className="text-muted-foreground text-sm">User not found.</p>
                <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
                    <ArrowLeft className="w-4 h-4 mr-2" /> Go back
                </Button>
            </div>
        );
    }

    const level = String(user.level ?? '').toLowerCase();
    const status = String(user.status ?? '').toLowerCase();

    return (
        <div className="flex flex-col gap-6 p-4 md:p-6 h-full overflow-y-auto no-scrollbar">
            <div className="flex items-center justify-between">
                <Button variant="ghost" onClick={() => navigate(-1)} className="gap-2 pl-2 -ml-2">
                    <ArrowLeft className="w-4 h-4" />
                    Back
                </Button>
                <div className="flex items-center gap-2">
                    <Badge variant={statusVariant[status] ?? 'outline'} className="capitalize">
                        {fmt(user.status)}
                    </Badge>
                    <span
                        className={`text-xs font-semibold px-2.5 py-1 rounded-full capitalize ${levelColor[level] ?? 'text-muted-foreground bg-muted'}`}
                    >
                        {fmt(user.level)}
                    </span>
                </div>
            </div>

            <div className="rounded-2xl border border-border/60 bg-card p-5 flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                    <User className="w-7 h-7 text-primary" />
                </div>
                <div className="min-w-0">
                    <h1 className="text-xl font-bold tracking-tight truncate">
                        {fmt(user.fullname)}
                    </h1>
                    <p className="text-sm text-muted-foreground mt-0.5">{fmt(user.phone)}</p>
                </div>
                <div className="ml-auto text-right shrink-0">
                    <p className="text-xs text-muted-foreground">ID</p>
                    <p className="text-lg font-mono font-semibold">#{user.id}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Section title="Personal Info">
                    <InfoRow icon={User} label="Full Name" value={fmt(user.fullname)} />
                    <InfoRow icon={Calendar} label="Birth Date" value={fmtDate(user.birthdate)} />
                    <InfoRow icon={FileText} label="Passport" value={fmt(user.passport)} />
                    <InfoRow
                        icon={Calendar}
                        label="Passport Expire"
                        value={fmtDate(user.passport_expire)}
                    />
                    <InfoRow icon={Hash} label="INN" value={fmt(user.inn)} />
                </Section>

                <Section title="Contact">
                    <InfoRow icon={Phone} label="Phone" value={fmt(user.phone)} />
                    <InfoRow icon={Phone} label="Fiscal Phone" value={fmt(user.fiscal_phone)} />
                    <InfoRow icon={Hash} label="Customer" value={fmt(user.customer)} />
                </Section>

                <Section title="Account">
                    <InfoRow icon={Shield} label="Status" value={fmt(user.status)} />
                    <InfoRow icon={Star} label="Level" value={fmt(user.level)} />
                    <InfoRow icon={Calendar} label="Level Date" value={fmtDate(user.level_date)} />
                    <InfoRow
                        icon={Calendar}
                        label="Registered"
                        value={fmtDate(user.registration_date)}
                    />
                    <InfoRow icon={Clock} label="Last Use" value={fmt(user.last_use)} />
                    <InfoRow icon={Hash} label="User Type" value={fmt(user.user_type)} />
                    <InfoRow icon={Hash} label="CP Try" value={String(user.cp_try)} />
                </Section>

                <Section title="Financial">
                    <InfoRow icon={Wallet} label="Currency" value={fmt(user.currency)} />
                    <InfoRow icon={Building2} label="Bank" value={fmt(user.bank)} />
                    <InfoRow
                        icon={Hash}
                        label="Last Supplier"
                        value={fmt(String(user.last_supplier_id ?? null))}
                    />
                </Section>
            </div>
        </div>
    );
};

export default UsersDetail;
