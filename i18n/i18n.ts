import * as Localization from "expo-localization";
import i18next, { use as i18nextUse, init } from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  sk: {
    common: require("../locales/sk/common.json"),
  },
  en: {
    common: require("../locales/en/common.json"),
  },
};

i18nextUse(initReactI18next);

init({
  resources,
  lng: Localization.getLocales?.()[0]?.languageCode || "sk",
  fallbackLng: "sk",
  ns: ["common"],
  defaultNS: "common",
  interpolation: { escapeValue: false },
  compatibilityJSON: "v4",
});

export default i18next;

export { default as i18n } from "./i18n";
export type Resources = typeof resources;
