export function getDomain(url) {
  return url.replace(/^https?:\/\//i, '').split(/[/?#]/)[0];
}
