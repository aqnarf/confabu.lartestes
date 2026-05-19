export const authRealm = "Estante Infantil";

export function hasAuthConfig() {
  return Boolean(process.env.BASIC_AUTH_USER && process.env.BASIC_AUTH_PASSWORD);
}

export function validateBasicAuth(header) {
  if (!hasAuthConfig()) return true;
  if (!header || !header.startsWith("Basic ")) return false;

  const encoded = header.slice("Basic ".length);
  const decoded = Buffer.from(encoded, "base64").toString("utf8");
  const separatorIndex = decoded.indexOf(":");
  if (separatorIndex === -1) return false;

  const username = decoded.slice(0, separatorIndex);
  const password = decoded.slice(separatorIndex + 1);

  return username === process.env.BASIC_AUTH_USER && password === process.env.BASIC_AUTH_PASSWORD;
}
