import type { LimitCreditType } from '../limits/type';

export type CardData = {
    adding_date: string;
    bank: string | null;
    bank_code: string | null;
    branch: string | null;
    card_number: string;
    currency: number;
    eopc_id: string | null;
    expire: number;
    id: number;
    is_main: number;
    is_salary: null;
    is_total: number;
    mt_allow: number;
    order: null;
    otp_verify: number;
    owner: number;
    pin_resets: number;
    pinfl: string | null;
    send_email: number;
    service_till_date: string;
    settings: null;
    status: number;
    token: string | null;
    type: LimitCreditType;
    user_id: number;
};
