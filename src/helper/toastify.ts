import "react-toastify/dist/ReactToastify.css";

import { toast } from "sonner";

// import { toast } from "react-toastify";
// import type { TypeOptions } from "react-toastify";

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
      break;
    case "info":
      return toast.info(text);
      break;
    case "error":
      return toast.success(text);
      break;
    case "warning":
      return toast.success(text);
      break;
    default:
      return toast.message(text);
      break;
  }
}
