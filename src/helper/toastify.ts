import { toast } from "sonner";

type ToastTypes = "success" | "info" | "warning" | "error";

/**
 * @work create a toastify by parsing the following values
 * @param {String} text
 * @param {TypeOptions} statusType
 * @returns
 */

export function toastify(text: string, statusType: ToastTypes) {
  switch (statusType) {
    case "success":
      return toast.success(text);
    case "info":
      return toast.info(text);
    case "error":
      return toast.error(text);
    case "warning":
      return toast.warning(text);
    // default:
    //   return toast.message(text);
    //   break;
  }
}
