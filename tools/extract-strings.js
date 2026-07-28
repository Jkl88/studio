const fs = require("fs");
const path = require("path");

const strings = new Set();

function walk(dir) {
    for (const f of fs.readdirSync(dir, { withFileTypes: true })) {
        const p = path.join(dir, f.name);
        if (
            f.isDirectory() &&
            f.name !== "node_modules" &&
            f.name !== "build"
        ) {
            walk(p);
        } else if (/\.(tsx?|ts)$/.test(f.name)) {
            const c = fs.readFileSync(p, "utf8");
            for (const m of c.matchAll(/displayName:\s*["']([^"']+)["']/g)) {
                strings.add(m[1]);
            }
            for (const m of c.matchAll(/label:\s*["']([^"']+)["']/g)) {
                strings.add(m[1]);
            }
            for (const m of c.matchAll(/title:\s*["']([^"']+)["']/g)) {
                strings.add(m[1]);
            }
            for (const m of c.matchAll(/name=\{?`([^`]+)`\}?/g)) {
                strings.add(m[1]);
            }
            for (const m of c.matchAll(/name="([^"]+)"/g)) {
                strings.add(m[1]);
            }
            for (const m of c.matchAll(
                /notification\.(info|error|success|warning)\(["']([^"']+)/g
            )) {
                strings.add(m[2]);
            }
        }
    }
}

walk("packages");
console.log("count:", strings.size);
const arr = [...strings].sort();
fs.writeFileSync(
    "tools/extracted-strings.json",
    JSON.stringify(arr, null, 2)
);
