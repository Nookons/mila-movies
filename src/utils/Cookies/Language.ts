import Cookies from "js-cookie";

export type LanguageCookiesType = 'en' | 'ru';

export const getLanguage = (): LanguageCookiesType => {
    const language = Cookies.get('language') as LanguageCookiesType;
    return language || 'en'; // If none, will be return eng like default
};

export const setLanguageCookies = (lang: LanguageCookiesType): void => {
    Cookies.set('language', lang, { expires: 1 }); // Save this on 1 day
};