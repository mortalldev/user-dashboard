import type { ROLE } from '../auth/type';

export type UserPremiumType = 'premium' | 'simple';

export type UserStatusType = 'pending' | 'finished';

export type UsersData = {
    answer: string | null;
    antifrod: string | null;
    bank: null;
    birthdate: string | null;
    cp_try: number;
    currency: string;
    customer: string;
    fiscal_phone: string | null;
    fullname: string;
    id: number;
    inn: string;
    last_supplier_id: number | null;
    last_use: null;
    level: UserPremiumType;
    level_date: string;
    nibbd: null;
    passport: string;
    passport_expire: string | null;
    password: string;
    password_2: string | null;
    phone: string;
    registration_date: string;
    secret_question_id: number | null;
    status: UserStatusType;
    user_type: ROLE;
    ussd_pin: null;
    widgets: null;
};
