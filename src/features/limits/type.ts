import type { Currency } from '@/shared/types';

export type LimitCreditType = 'card' | 'credit' | 'uzcard' | 'visa';

export type LimitPeriodType = 'day' | 'week' | 'month';

export type LimitHumanType = 'p2p' | 'b2b';

export type LimitsData = {
    amount: string;
    creditor_type: LimitCreditType;
    currency: Currency;
    debitor_type: LimitCreditType;
    id: number;
    limit_order: number;
    op_number: number;
    period: LimitPeriodType;
    subtype: string;
    type: LimitHumanType;
};
