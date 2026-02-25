// This file contains utility functions that can be used across the application.

export const formatCurrency = (amount: number): string => {
    return `$${amount.toFixed(2)}`;
};

export const calculateDiscountedPrice = (price: number, discount: number): number => {
    return price - (price * (discount / 100));
};

export const isValidEmail = (email: string): boolean => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};

export const debounce = (func: Function, delay: number) => {
    let timeoutId: ReturnType<typeof setTimeout>;
    return (...args: any[]) => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(() => {
            func(...args);
        }, delay);
    };
};