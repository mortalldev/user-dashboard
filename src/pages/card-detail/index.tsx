import { useNavigate, useParams } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    ArrowLeft,
    CreditCard,
    Building2,
    User,
    Calendar,
    Hash,
    Shield,
    Mail,
    Phone,
    Fingerprint,
    BadgeCheck,
    Clock,
} from 'lucide-react';
import Loader from '@/widgets/loader';
import { formatCard } from '@/shared/lib/utils';
import { useCardByIdQuery } from '@/features/cards';

const InfoCard = ({
    icon: Icon,
    label,
    value,
    accent,
}: {
    icon: React.ElementType;
    label: string;
    value: string | number;
    accent?: string;
}) => (
    <Card className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl">
        <CardContent className="p-4 flex items-center gap-3">
            <div
                className={`p-2 rounded-lg bg-white/10 shrink-0 ${accent ?? 'text-muted-foreground'}`}
            >
                <Icon className="w-4 h-4" />
            </div>
            <div className="min-w-0">
                <p className="text-xs text-muted-foreground">{label}</p>
                <p className="text-sm font-medium text-white truncate">{String(value)}</p>
            </div>
        </CardContent>
    </Card>
);

const CardDetail = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const { data: card, isLoading } = useCardByIdQuery(Number(id));

    console.log(card);

    if (isLoading) return <Loader />;

    if (!card)
        return (
            <div className="flex items-center justify-center h-full">
                <p className="text-muted-foreground">Card not found</p>
            </div>
        );

    return (
        <div className="w-full flex flex-col gap-6 p-4 h-full overflow-y-auto no-scrollbar">
            {/* Back */}
            <div className="shrink-0">
                <Button
                    variant="ghost"
                    onClick={() => navigate(-1)}
                    className="gap-2 pl-2 hover:pl-2 transition-all"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back
                </Button>
            </div>

            {/* Hero card */}
            <Card className="rounded-2xl border border-purple-500/20 bg-purple-500/10 backdrop-blur-xl shadow-lg">
                <CardContent className="p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <div className="p-4 rounded-2xl bg-purple-500/20">
                        <CreditCard className="w-8 h-8 text-purple-400" />
                    </div>

                    <div className="flex-1 min-w-0">
                        <p className="text-xs text-muted-foreground mb-1">Card Number</p>
                        <p className="text-2xl font-mono font-bold tracking-widest text-white">
                            {formatCard(card.card_number)}
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">
                            {card.bank ?? 'Unknown Bank'} · {card.type}
                        </p>
                    </div>

                    <div className="flex flex-col items-end gap-2 shrink-0">
                        <Badge variant={card.status === 1 ? 'default' : 'destructive'}>
                            {card.status === 1 ? 'Active' : 'Inactive'}
                        </Badge>
                        {card.is_main === 1 && (
                            <Badge className="bg-yellow-500/10 text-yellow-400 border border-yellow-500/20">
                                Main Card
                            </Badge>
                        )}
                    </div>
                </CardContent>
            </Card>

            {/* General info */}
            <div>
                <p className="text-xs text-muted-foreground uppercase tracking-widest mb-3 pl-1">
                    General
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
                    <InfoCard icon={Hash} label="ID" value={card.id} accent="text-blue-400" />
                    <InfoCard
                        icon={User}
                        label="Owner"
                        value={card.owner}
                        accent="text-green-400"
                    />
                    <InfoCard
                        icon={User}
                        label="User ID"
                        value={card.user_id}
                        accent="text-green-400"
                    />
                    <InfoCard
                        icon={Building2}
                        label="Bank"
                        value={card.bank ?? '—'}
                        accent="text-purple-400"
                    />
                    <InfoCard
                        icon={Hash}
                        label="Bank Code"
                        value={card.bank_code ?? '—'}
                        accent="text-purple-400"
                    />
                    <InfoCard
                        icon={Building2}
                        label="Branch"
                        value={card.branch ?? '—'}
                        accent="text-purple-400"
                    />
                </div>
            </div>

            {/* Card info */}
            <div>
                <p className="text-xs text-muted-foreground uppercase tracking-widest mb-3 pl-1">
                    Card Info
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
                    <InfoCard
                        icon={CreditCard}
                        label="Type"
                        value={card.type}
                        accent="text-yellow-400"
                    />
                    <InfoCard
                        icon={Hash}
                        label="Currency"
                        value={card.currency}
                        accent="text-yellow-400"
                    />
                    <InfoCard
                        icon={Clock}
                        label="Expires"
                        value={card.expire}
                        accent="text-orange-400"
                    />
                    <InfoCard
                        icon={Calendar}
                        label="Adding Date"
                        value={new Date(card.adding_date).toLocaleDateString()}
                        accent="text-cyan-400"
                    />
                    <InfoCard
                        icon={Calendar}
                        label="Service Till"
                        value={new Date(card.service_till_date).toLocaleDateString()}
                        accent="text-cyan-400"
                    />
                    <InfoCard
                        icon={Hash}
                        label="Pin Resets"
                        value={card.pin_resets}
                        accent="text-red-400"
                    />
                </div>
            </div>

            {/* Security & Settings */}
            <div>
                <p className="text-xs text-muted-foreground uppercase tracking-widest mb-3 pl-1">
                    Security & Settings
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
                    <InfoCard
                        icon={BadgeCheck}
                        label="OTP Verify"
                        value={card.otp_verify === 1 ? 'Yes' : 'No'}
                        accent="text-green-400"
                    />
                    <InfoCard
                        icon={Shield}
                        label="MT Allow"
                        value={card.mt_allow === 1 ? 'Yes' : 'No'}
                        accent="text-blue-400"
                    />
                    <InfoCard
                        icon={Mail}
                        label="Send Email"
                        value={card.send_email === 1 ? 'Yes' : 'No'}
                        accent="text-blue-400"
                    />
                    <InfoCard
                        icon={Fingerprint}
                        label="PINFL"
                        value={card.pinfl ?? '—'}
                        accent="text-pink-400"
                    />
                    <InfoCard
                        icon={Hash}
                        label="EOPC ID"
                        value={card.eopc_id ?? '—'}
                        accent="text-pink-400"
                    />
                    <InfoCard
                        icon={Phone}
                        label="Is Salary"
                        value={card.is_salary ?? '—'}
                        accent="text-indigo-400"
                    />
                </div>
            </div>
        </div>
    );
};

export default CardDetail;
