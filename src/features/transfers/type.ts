import type { Currency } from '@/shared/types';

export type TransfersData = {
    id: number;
    user_id: number;
    from: string;
    from_mfo: string | null;
    to: string;
    tag_id: number | null;
    to_mfo: string | null;
    receiver_name: string | null;
    sender_name: string | null;
    amount: string;
    nominal: string;
    commission: string;
    real_commission: string;
    currency: string;
    desc: string | null;
    date: string;
    utid: string;
    status: string;
    aditional: string | null;
    app_type: null;
    error_text: string | null;
    cashback_amount: number;
    op_type: string;
};

export type EcommTransfersData = {
    id: number;
    utid: string;
    order_id: string;
    request_id: string;
    token: string | null;
    create_at: string;
    status: string;
    refund_url: string | null;
};

export type P2pReceiversData = {
    id: number;
    user_id: number;
    pan: string;
    holder: string;
    key: string;
    currency: Currency;
    rating: number;
    created_at: string;
    updated_at: string;
};

export type P2pSettingsData = {
    id: number;
    bank: string;
    receiver_code: string;
    type: string;
    sender: string;
    merchant: string;
    terminal: string;
    port: string;
    commission_code: string;
    active: number;
    add_date: string;
};
