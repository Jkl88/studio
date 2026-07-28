import i18n from "i18next";
import { observable, runInAction } from "mobx";

import { isRenderer } from "eez-studio-shared/util-electron";
import { DEFAULT_LOCALE } from "eez-studio-shared/i10n";
import { ru } from "eez-studio-shared/locales/ru";

////////////////////////////////////////////////////////////////////////////////

export const i18nState = observable({
    version: 0
});

export function localeToLanguage(locale: string): string {
    if (!locale) {
        return "ru";
    }
    if (locale.startsWith("ru")) {
        return "ru";
    }
    return "en";
}

////////////////////////////////////////////////////////////////////////////////

let initialized = false;

export function initI18n(locale?: string, withReact?: boolean) {
    if (initialized) {
        if (locale) {
            changeLanguage(locale);
        }
        return;
    }

    if (withReact && isRenderer()) {
        const { initReactI18next } = require("react-i18next");
        i18n.use(initReactI18next);
    }

    const lng = localeToLanguage(locale || DEFAULT_LOCALE);

    i18n.init({
        resources: {
            en: { translation: {} },
            ru: { translation: ru }
        },
        lng,
        fallbackLng: "en",
        keySeparator: false,
        nsSeparator: false,
        interpolation: {
            escapeValue: false
        },
        returnEmptyString: false
    });

    i18n.on("languageChanged", () => {
        runInAction(() => {
            i18nState.version++;
        });
    });

    initialized = true;
}

export function changeLanguage(locale: string) {
    return i18n.changeLanguage(localeToLanguage(locale));
}

export function t(key: string, options?: Record<string, unknown>): string {
    if (!key) {
        return key;
    }
    return i18n.t(key, { defaultValue: key, ...options });
}

export function translateMenuItems(
    items: Electron.MenuItemConstructorOptions[]
): Electron.MenuItemConstructorOptions[] {
    return items.map(item => {
        const result: Electron.MenuItemConstructorOptions = { ...item };

        if (typeof result.label === "string") {
            result.label = t(result.label);
        }

        if (result.submenu && Array.isArray(result.submenu)) {
            result.submenu = translateMenuItems(
                result.submenu as Electron.MenuItemConstructorOptions[]
            );
        }

        return result;
    });
}

export { i18n };
