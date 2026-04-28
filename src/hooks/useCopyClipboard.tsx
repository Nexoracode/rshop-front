import { toast } from "sonner";

export default function useCopyClipboard() {
  const handleCopy = async (
    text: string,
    formatted?: string,
    message: string = "کپی شد"
  ) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success(message, { description: formatted });
    } catch {
      // fallback
      const tmp = document.createElement("textarea");
      tmp.value = text;
      document.body.appendChild(tmp);
      tmp.select();
      document.execCommand("copy");
      document.body.removeChild(tmp);
      toast(message, { description: formatted });
    }
  };

  return { handleCopy };
}
