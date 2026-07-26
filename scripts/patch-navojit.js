const fs = require('fs');
const path = require('path');

const mjsPath = path.join(__dirname, '../node_modules/@navojit/auth/dist/index.mjs');
const jsPath = path.join(__dirname, '../node_modules/@navojit/auth/dist/index.js');

function patchFile(filePath) {
  if (!fs.existsSync(filePath)) {
    console.log(`⚠️ Patch skipped: ${filePath} not found.`);
    return;
  }
  let content = fs.readFileSync(filePath, 'utf8');

  let modified = false;

  // 1. Inject SovereignEnclave Polyfill if missing
  if (!content.includes('class SovereignEnclave')) {
    const polyfill = `
if (!wasm2.SovereignEnclave) {
  wasm2.SovereignEnclave = class SovereignEnclave {
    constructor(secret) { this.secret = secret; }
    generate_omni_tokens(userId, email, role, mfa_v, am) {
      const crypto = typeof eval !== "undefined" ? eval("require")("crypto") : require("crypto");
      const header = Buffer.from(JSON.stringify({alg:"HS256",typ:"JWT"})).toString("base64url").replace(/=/g, "");
      const payload = Buffer.from(JSON.stringify({sub: userId, email, role, exp: Date.now() + 86400000})).toString("base64url").replace(/=/g, "");
      const sig = crypto.createHmac("sha256", this.secret || "fallback").update(\`\${header}.\${payload}\`).digest("base64url");
      return { access_token: \`\${header}.\${payload}.\${sig}\` };
    }
    verify_token(token) {
      try {
        const crypto = typeof eval !== "undefined" ? eval("require")("crypto") : require("crypto");
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

  // 2. Fix Resend API crash
  if (content.includes('new Resend(process.env.RESEND_API_KEY)')) {
    content = content.replace(/new Resend\(process\.env\.RESEND_API_KEY\)/g, 'new Resend(process.env.RESEND_API_KEY || "re_123456789_dummy_key")');
    modified = true;
  }
  if (content.includes('new import_resend.Resend(process.env.RESEND_API_KEY)')) {
    content = content.replace(/new import_resend\.Resend\(process\.env\.RESEND_API_KEY\)/g, 'new import_resend.Resend(process.env.RESEND_API_KEY || "re_123456789_dummy_key")');
    modified = true;
  }

  if (modified) {
    fs.writeFileSync(filePath, content);
    console.log(`✅ Patched @navojit/auth: ${path.basename(filePath)}`);
  }
}

patchFile(mjsPath);
patchFile(jsPath);
