// react-i18next.d.ts v koreňovom priečinku src/
import "react-i18next";
import type { Resources } from "./src/i18n";

declare module "react-i18next" {
  interface CustomTypeOptions {
    resources: Resources["en"]; // podľa štruktúry resources
    defaultNS: "common";
  }
}
