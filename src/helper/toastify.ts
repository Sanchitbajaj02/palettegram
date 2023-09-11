import "react-toastify/dist/ReactToastify.css";

import { toast } from "react-toastify";
import type { TypeOptions } from "react-toastify";

/**
 * @work create a toastify by parsing the following values
 * @param {String} text
 * @param {TypeOptions} statusType
 * @param {boolean} loadingStatus
 * @returns
 */
export function toastify(text: string, statusType: TypeOptions, loadingStatus: boolean = false) {
  return toast(text, {
    type: statusType,
    isLoading: loadingStatus,
  });
}
