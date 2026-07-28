// Auto-generated Russian translations. Run: node tools/build-ru-locale.js
const fs = require("fs");
const path = require("path");

const translations = JSON.parse(
    fs.readFileSync(path.join(__dirname, "ru-translations.json"), "utf8")
);

const extra = JSON.parse(
    fs.readFileSync(path.join(__dirname, "extra-ru-translations.json"), "utf8")
);

Object.assign(translations, extra);

const lines = [
    "// Auto-generated Russian translations. Run: node tools/build-ru-locale.js",
    "export const ru: Record<string, string> = {"
];

for (const [key, value] of Object.entries(translations).sort(([a], [b]) =>
    a.localeCompare(b)
)) {
    const escapedKey = JSON.stringify(key);
    const escapedValue = JSON.stringify(value);
    lines.push(`    ${escapedKey}: ${escapedValue},`);
}

lines.push("};");
lines.push("");

fs.writeFileSync(
    path.join(
        __dirname,
        "../packages/eez-studio-shared/locales/ru.ts"
    ),
    lines.join("\n")
);

console.log("Generated ru.ts with", Object.keys(translations).length, "entries");
