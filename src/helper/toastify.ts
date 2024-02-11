import "react-toastify/dist/ReactToastify.css";

import { toast } from "sonner";

// import { toast } from "react-toastify";
// import type { TypeOptions } from "react-toastify";

type ToastTypes = 'success' | 'info' | 'warning' | 'error';


/**
 * @work create a toastify by parsing the following values
 * @param {String} text
 * @param {TypeOptions} statusType
 * @returns
 */



export function toastify(text: string, statusType: ToastTypes) {
  if (statusType == 'success') {
    return toast.success(text)
  }
  if (statusType == 'info') {
    return toast.info(text)
  }
  if (statusType == 'error') {
    return toast.error(text)
  }
  // return toast(text, {
  //   type: statusType,
  //   isLoading: loadingStatus,
  // });
}
