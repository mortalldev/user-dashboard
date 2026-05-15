import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { useDispatch, useSelector, type TypedUseSelectorHook } from 'react-redux';
import type { AppDispatch, RootState } from '@/app/store';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const formatCard = (num: string) => num.replace(/(.{4})/g, '$1 ').trim();

export function extractArray<T>(data: unknown): T[] {
    if (!data) return [];
    if (Array.isArray(data)) return data as T[];
    if (Array.isArray((data as any).data)) return (data as any).data as T[];
    if (Array.isArray((data as any).results)) return (data as any).results as T[];
    if (Array.isArray((data as any).items)) return (data as any).items as T[];
    return [];
}
