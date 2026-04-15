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
