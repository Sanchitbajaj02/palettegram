import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function toastify(text, statusType, loadingStatus = false) {
  return toast(text, {
    type: statusType,
    isLoading: loadingStatus,
  });
}
