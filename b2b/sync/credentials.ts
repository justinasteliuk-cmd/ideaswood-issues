// Prisijungimai aktyviems klientams: atsitiktinis slaptažodis, registre saugomas TIK hash'as (argon2id).
// Atviras slaptažodis egzistuoja vieną kartą — laiške klientui. Jokio CSV Drive'e, jokio Git, jokio Slack.
// Pirmo prisijungimo metu portalas prašo pasikeisti slaptažodį (must_change_password = 1).

// Be 0/O, 1/l/I — kad klientas neperrašinėtų klaidingai.
const ALPHABET = "abcdefghijkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789";

export function randomPassword(length = 16): string {
  // Atmetimo metodas: be poslinkio į pirmus simbolius (256 % 56 ≠ 0).
  const limit = 256 - (256 % ALPHABET.length);
  let out = "";
  while (out.length < length) {
    for (const b of crypto.getRandomValues(new Uint8Array(length * 2))) {
      if (b < limit && out.length < length) out += ALPHABET[b % ALPHABET.length];
    }
  }
  return out;
}

export async function hashPassword(pw: string): Promise<string> {
  return Bun.password.hash(pw, { algorithm: "argon2id" });
}

export type NewLogin = { clientKey: string; email: string; password: string; hash: string };

/** Sukuria prisijungimus tik tiems aktyviems klientams, kurie jo dar neturi. Esamų slaptažodžių NEKEIČIA. */
export async function planLogins(clients: { clientKey: string; email: string | null; active: boolean; hasLogin: boolean }[]): Promise<{ create: NewLogin[]; skipped: { clientKey: string; reason: string }[] }> {
  const create: NewLogin[] = [], skipped: { clientKey: string; reason: string }[] = [];
  const seen = new Set<string>();
  for (const c of clients) {
    if (!c.active) { skipped.push({ clientKey: c.clientKey, reason: "neaktyvus" }); continue; }
    if (c.hasLogin) { skipped.push({ clientKey: c.clientKey, reason: "jau turi prisijungimą" }); continue; }
    const email = c.email?.trim().toLowerCase();
    if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) { skipped.push({ clientKey: c.clientKey, reason: "nėra tinkamo el. pašto" }); continue; }
    if (seen.has(email)) { skipped.push({ clientKey: c.clientKey, reason: `el. paštas ${email} jau naudojamas kitam klientui` }); continue; }
    seen.add(email);
    const password = randomPassword();
    create.push({ clientKey: c.clientKey, email, password, hash: await hashPassword(password) });
  }
  return { create, skipped };
}

export function welcomeEmail(name: string, email: string, password: string): { subject: string; text: string } {
  return {
    subject: "Your IdeasWood partner portal login",
    text: `Hello ${name},

Your IdeasWood partner portal is ready: https://b2b.ideaswood.eu

Login: ${email}
Temporary password: ${password}

You will be asked to set your own password at first login.
In the portal you can see your active orders, their status and documents, and place new orders with your partner prices.

IdeasWood
info@ideaswood.eu · +370 678 22055`,
  };
}
