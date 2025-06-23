import { createI18n } from 'vue-i18n'
import es from './es.json'
import en from './en.json'

const i18n = createI18n({
    legacy: true,
    locale: 'en',
    globalInjection: true,
    messages: {
        en,
        es
    }
});

export default i18n;