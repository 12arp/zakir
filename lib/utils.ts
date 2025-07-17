import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function setTranslateCookie(lang: 'en' | 'hi') {
  const host = window.location.hostname;
  const domain = host.includes('sahumetals.in') ? '.sahumetals.in' : host;

  // Reset the cookie
  document.cookie = `googtrans=; path=/; domain=${domain}; expires=Thu, 01 Jan 1970 00:00:00 GMT`;

  // Set the new cookie
  if (lang === 'hi') {
    document.cookie = `googtrans=/en/hi; path=/; domain=${domain}`;
  } else {
    document.cookie = `googtrans=/en/en; path=/; domain=${domain}`;
  }

  // Reload the page to apply the new language
  window.location.reload();
}
