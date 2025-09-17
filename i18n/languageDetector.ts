// src/i18n/languageDetector.ts
import * as Localization from "expo-localization";
import AsyncStorage from "@react-native-async-storage/async-storage";
import type { LanguageDetectorModule } from "i18next";

const STORAGE_KEY = "valvex.lang";

const languageDetector: LanguageDetectorModule = {
  type: "languageDetector",
  init: () => {},
  detect: () => {
    // Synchronous fallback detection (e.g., system language or default)
    return Localization.getLocales?.()[0]?.languageCode || "en";
  },
  cacheUserLanguage: (lng: string) => {
    AsyncStorage.setItem(STORAGE_KEY, lng).catch(() => {});
  },
};

// Async detection helper for use elsewhere if needed
export const detectLanguageAsync = async (): Promise<string> => {
  try {
    const stored = await AsyncStorage.getItem(STORAGE_KEY);
    if (stored) {
      return stored;
    }
    return Localization.getLocales?.()[0]?.languageCode || "en";
  } catch {
    return "en";
  }
};

export default languageDetector;
export const LANGUAGE_STORAGE_KEY = STORAGE_KEY;
