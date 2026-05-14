import type { Currency } from '@/shared/types';

export type WalletsData = {
    id: number;
    user_id: number;
    customer_number: string;
    wallet_id: string;
    account: string;
    mfo: string;
    bxm: string;
    balance: string;
    currency: Currency;
    in_use: number;
    update_at: string;
    settings: null;
    is_total: number;
};
