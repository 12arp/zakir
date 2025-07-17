import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function setTranslateCookie(lang: 'en' | 'hi') {
  const host = window.location.hostname;
  const domain = host.includes('sahumetals.in') ? '.sahumetals.in' : '';

  // Clear the cookie by setting its expiration date to the past
  document.cookie = `googtrans=; path=/; domain=${domain}; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
  document.cookie = `googtrans=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`; // Fallback for localhost

  if (lang === 'hi') {
    // Set the cookie to translate to Hindi
    document.cookie = `googtrans=/en/hi; path=/; domain=${domain}`;
  }

  // Reload the page to apply the changes
  window.location.reload();
}
