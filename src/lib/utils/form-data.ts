export function toFormData(
  data: Record<
    string,
    string | number | null | boolean | object | Array<unknown>
  >,
  formData: FormData = new FormData(),
  parentKey?: string,
): FormData {
  if (data === null || data === undefined) return formData;

  Object.entries(data).forEach(([key, value]) => {
    const fieldKey = parentKey ? `${parentKey}[${key}]` : key;

    if (value === null || value === undefined) return;

    if (value instanceof File || value instanceof Blob) {
      formData.append(fieldKey, value);
      return;
    }

    if (value instanceof Date) {
      formData.append(fieldKey, value.toISOString());
      return;
    }

    if (Array.isArray(value)) {
      value.forEach((item) => {
        if (
          item instanceof File ||
          item instanceof Blob ||
          typeof item !== "object" ||
          item === null
        ) {
          formData.append(fieldKey, item instanceof Blob ? item : String(item));
        } else {
          toFormData(item as Record<string, any>, formData, `${fieldKey}[]`);
        }
      });
      return;
    }

    if (typeof value === "object") {
      toFormData(value as Record<string, any>, formData, fieldKey);
      return;
    }

    formData.append(fieldKey, String(value));
  });

  return formData;
}
