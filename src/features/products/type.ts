import type { Currency } from '@/shared/types';

export type ProductDataType = 'CREDIT' | 'CARD';

export type ProductData = {
    bpm_method: string | null;
    code: string;
    description_en: string;
    description_uz: string;
    description_ru: string;
    grace_period: number | null;
    group_key: string | null;
    icon: string | null;
    id: number;
    lifetime: string;
    max_amount: number;
    orderno: number | null;
    parent_id: number | null;
    percent: string;
    status: number;
    title_en: string;
    title_ru: string;
    title_uz: string;
    type: ProductDataType;
};

export type CardProductData = {
    active: string;
    alias: null;
    cardCode: null;
    cardProductCode: null;
    category: string;
    contractTypeId: null;
    currency: Currency;
    currency_code: string;
    delivery_price: string;
    description: string | null;
    description_en: string | null;
    description_uz: string | null;
    glcode: null;
    id: number;
    image: string | null;
    is_credit: number | null;
    issue_settings: null;
    lifetime: null;
    order: null;
    price: string;
    slip_code: null;
    title: string;
    type: string;
    virtual: null;
    year_service: null;
};
