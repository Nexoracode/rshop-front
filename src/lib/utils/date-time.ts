export function getTimeString(date: string): string {
  return Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
    timeZone: "Asia/Tehran",
  }).format(new Date(date));
}

export function toPersianDate(date: string): string {
  return Intl.DateTimeFormat("fa-IR-u-ca-persian", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}

export function toPersianDateTime(date: string): string {
  return Intl.DateTimeFormat("fa-IR-u-ca-persian", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date));
}

export function formatDurationFa(totalSeconds: number): string {
  if (totalSeconds <= 0) return "۰ دقیقه";

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);

  const parts: string[] = [];
  if (hours > 0) parts.push(`${hours} ساعت`);
  if (minutes > 0) parts.push(`${minutes} دقیقه`);

  return parts.join(" و ");
}

export function getRemainingSeconds(
  createdAt: string,
  expireMinutes: number,
): number {
  const createdTime = new Date(createdAt).getTime();
  const now = Date.now();
  const expireAt = createdTime + expireMinutes * 60 * 1000;
  const remainingMs = expireAt - now;
  return Math.max(0, Math.floor(remainingMs / 1000));
}
