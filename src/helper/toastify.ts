import "react-toastify/dist/ReactToastify.css";

import { toast } from "react-toastify";
import type { TypeOptions } from "react-toastify";

export function toastify(text: string, statusType: TypeOptions, loadingStatus: boolean = false) {
  return toast(text, {
    type: statusType,
    isLoading: loadingStatus,
  });
}
