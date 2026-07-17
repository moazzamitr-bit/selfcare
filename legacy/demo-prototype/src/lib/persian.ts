export const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];

export function toPersianDigits(value: string | number) {
  return String(value).replace(/\d/g, (digit) => persianDigits[Number(digit)]);
}

export function normalizePersian(input: string) {
  return input
    .replace(/[يى]/g, "ی")
    .replace(/ك/g, "ک")
    .replace(/[ۀة]/g, "ه")
    .replace(/ؤ/g, "و")
    .replace(/أ|إ|آ/g, "ا")
    .replace(/\u200c+/g, "‌")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

export function formatPersianDate(date: string) {
  const formatted = new Intl.DateTimeFormat("fa-IR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date));

  return toPersianDigits(formatted);
}

