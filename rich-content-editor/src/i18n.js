import i18next from 'i18next';

export default function i18n({ locale, translations }) {
  return i18next
    .init({
      lng: locale,
      fallbackLng: 'en',
      keySeparator: '$',
      interpolation: {
        escapeValue: false
      },
      resources: translations,
    });
}
