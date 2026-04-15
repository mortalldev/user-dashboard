export type ApiResponse<T> = {
    current_page: number;
    data: T;
    last_page: number;
    total: number;
};

export type Currency = 'UZS' | 'USD';
