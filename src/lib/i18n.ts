import {notFound} from 'next/navigation';
import {getRequestConfig} from 'next-intl/server';
 
// Can be imported from a shared config
export const LOCALES = ['pl', 'en', 'ua'] as const;
export const DEFAULT_LOCALE = 'pl';
 
export default getRequestConfig(async ({locale}) => {
  // Validate that the incoming `locale` parameter is valid
  if (!LOCALES.includes(locale as any)) notFound();
 
  return {
    locale: locale!,
    messages: (await import(`../messages/${locale}.json`)).default
  };
});