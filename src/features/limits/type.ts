import type { Currency } from '@/shared/types';

export type LimitCreditType = 'card' | 'credit' | 'uzcard' | 'visa';

export type LimitPeriodType = 'day' | 'week' | 'month';

export type LimitHumanType = 'p2p' | 'b2b';

export type GlobalLimitsData = {
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

export type UsersLimitsData = {
    id: number;
    user_id: number;
    period: LimitPeriodType;
    type: LimitHumanType;
    subtype: string;
    currency: Currency;
    amount: string;
    op_number: number;
    debitor_type: LimitCreditType;
    creditor_type: LimitCreditType;
};
