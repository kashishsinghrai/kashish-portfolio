const fs = require('fs');
const path = require('path');

const mjsPath = path.join(__dirname, '../node_modules/@navojit/auth/dist/index.mjs');
const jsPath = path.join(__dirname, '../node_modules/@navojit/auth/dist/index.js');

function patchMjs(filePath) {
  if (!fs.existsSync(filePath)) {
    console.log(`⚠️  Patch skipped (not found): ${filePath}`);
    return;
  }
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;

  // ─── FIX 1: Inject createRequire so __require works inside an ESM file ──────
  // The .mjs file has a __require shim that falls through to an error in ESM scope.
  // We prepend a real require via createRequire(import.meta.url) as a banner comment
  // that replaces the broken shim.
  const createRequireBanner = `import { createRequire as _createRequire } from "module";
const require = _createRequire(import.meta.url);
`;
  if (!content.includes('_createRequire')) {
    content = createRequireBanner + content;
    modified = true;
  }

  // ─── FIX 2: SovereignEnclave polyfill if WASM bindings are missing ─────────
  if (!content.includes('class SovereignEnclave')) {
    const polyfill = `
if (!wasm2.SovereignEnclave) {
  wasm2.SovereignEnclave = class SovereignEnclave {
    constructor(secret) { this.secret = secret; }
    generate_omni_tokens(userId, email, role, mfa_v, am) {
      const crypto = require("crypto");
      const header = Buffer.from(JSON.stringify({alg:"HS256",typ:"JWT"})).toString("base64url").replace(/=/g, "");
      const payload = Buffer.from(JSON.stringify({sub: userId, email, role, exp: Date.now() + 86400000})).toString("base64url").replace(/=/g, "");
      const sig = crypto.createHmac("sha256", this.secret || "fallback").update(\`\${header}.\${payload}\`).digest("base64url");
      return { access_token: \`\${header}.\${payload}.\${sig}\` };
    }
    verify_token(token) {
      try {
        const crypto = require("crypto");
        const parts = token.split(".");
        const expectedSig = crypto.createHmac("sha256", this.secret || "fallback").update(\`\${parts[0]}.\${parts[1]}\`).digest("base64url");
        if (expectedSig === parts[2]) {
          return JSON.parse(Buffer.from(parts[1], "base64url").toString());
        }
      } catch (e) {}
      return null;
    }
  };
}
var NavojitAuth = class {`;
    content = content.replace('var NavojitAuth = class {', polyfill);
    modified = true;
  }

  // ─── FIX 3: Resend API key crash ────────────────────────────────────────────
  if (content.includes('new Resend(process.env.RESEND_API_KEY)')) {
    content = content.replace(
      /new Resend\(process\.env\.RESEND_API_KEY\)/g,
      'new Resend(process.env.RESEND_API_KEY || "re_123456789_dummy_key")'
    );
    modified = true;
  }

  if (modified) {
    fs.writeFileSync(filePath, content);
    console.log(`✅ Patched (mjs): ${path.basename(filePath)}`);
  } else {
    console.log(`ℹ️  Already patched (mjs): ${path.basename(filePath)}`);
  }
}

function patchCjs(filePath) {
  if (!fs.existsSync(filePath)) {
    console.log(`⚠️  Patch skipped (not found): ${filePath}`);
    return;
  }
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;

  // ─── FIX 1: SovereignEnclave polyfill if WASM bindings are missing ─────────
  if (!content.includes('class SovereignEnclave')) {
    const polyfill = `
if (!wasm2.SovereignEnclave) {
  wasm2.SovereignEnclave = class SovereignEnclave {
    constructor(secret) { this.secret = secret; }
    generate_omni_tokens(userId, email, role, mfa_v, am) {
      const crypto = require("crypto");
      const header = Buffer.from(JSON.stringify({alg:"HS256",typ:"JWT"})).toString("base64url").replace(/=/g, "");
      const payload = Buffer.from(JSON.stringify({sub: userId, email, role, exp: Date.now() + 86400000})).toString("base64url").replace(/=/g, "");
      const sig = crypto.createHmac("sha256", this.secret || "fallback").update(\`\${header}.\${payload}\`).digest("base64url");
      return { access_token: \`\${header}.\${payload}.\${sig}\` };
    }
    verify_token(token) {
      try {
        const crypto = require("crypto");
        const parts = token.split(".");
        const expectedSig = crypto.createHmac("sha256", this.secret || "fallback").update(\`\${parts[0]}.\${parts[1]}\`).digest("base64url");
        if (expectedSig === parts[2]) {
          return JSON.parse(Buffer.from(parts[1], "base64url").toString());
        }
      } catch (e) {}
      return null;
    }
  };
}
var NavojitAuth = class {`;
    content = content.replace('var NavojitAuth = class {', polyfill);
    modified = true;
  }

  // ─── FIX 2: Resend API key crash ────────────────────────────────────────────
  if (content.includes('new import_resend.Resend(process.env.RESEND_API_KEY)')) {
    content = content.replace(
      /new import_resend\.Resend\(process\.env\.RESEND_API_KEY\)/g,
      'new import_resend.Resend(process.env.RESEND_API_KEY || "re_123456789_dummy_key")'
    );
    modified = true;
  }

  if (modified) {
    fs.writeFileSync(filePath, content);
    console.log(`✅ Patched (cjs): ${path.basename(filePath)}`);
  } else {
    console.log(`ℹ️  Already patched (cjs): ${path.basename(filePath)}`);
  }
}

patchMjs(mjsPath);
patchCjs(jsPath);
