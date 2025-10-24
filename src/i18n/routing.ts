import {defineRouting} from 'next-intl/routing';
 
export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ['pl', 'en', 'ua'],
 
  // Used when no locale matches
  defaultLocale: 'pl',
  
  // Always show the locale prefix in the URL
  localePrefix: 'always'
});