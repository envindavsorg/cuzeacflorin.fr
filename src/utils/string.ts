import { formatIncompletePhoneNumber } from '@/lib/libphonenumber';

export const decodeEmail = (email: string) => atob(email);

export const decodePhoneNumber = (phone: string) => atob(phone);

export const formatPhoneNumber = (phone: string) =>
	formatIncompletePhoneNumber(phone);
