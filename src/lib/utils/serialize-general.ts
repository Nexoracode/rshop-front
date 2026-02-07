export function serializeQuery(obj: Record<string, any>, prefix = ""): string {
  const parts: string[] = [];

  Object.entries(obj).forEach(([key, value]) => {
    if (value === null || value === undefined) return;

    const encodedKey = prefix
      ? `${prefix}[${encodeURIComponent(key)}]`
      : encodeURIComponent(key);

    if (value && typeof value === "object" && !Array.isArray(value)) {
      parts.push(serializeQuery(value, encodedKey));
    } else if (Array.isArray(value)) {
      if (value.length > 0) {
        const encodedValues = value
          .filter((v) => v != null)
          .map((v) => encodeURIComponent(String(v)))
          .join(",");
        parts.push(`${encodedKey}=${encodedValues}`);
      }
    } else {
      parts.push(`${encodedKey}=${encodeURIComponent(String(value))}`);
    }
  });

  return parts.join("&");
}
