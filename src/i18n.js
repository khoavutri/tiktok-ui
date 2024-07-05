import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
    en: {
        translation: {
            "handleLanguage": "Tiếng việt"
        }
    },
    vi: {
        translation: {
            "handleLanguage": "English"
        }
    }
}

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: 'vi',
        fallbackLng: 'vi',
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;
