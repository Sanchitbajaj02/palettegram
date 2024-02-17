import { KeyboardEvent } from "react";

/**
 * Checks if given keyboard event is Ctrl + Enter or Cmd + Enter
 * @param event Keydown event
 * @returns true if Ctrl + Enter (on windows) or Cmd + Enter (on mac) is pressed
 */
export default function isCtrlEnter(
  event: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement> | KeyboardEvent<HTMLDivElement>,
) {
  if ((event.ctrlKey || event.metaKey) && event.key === "Enter") {
    return true;
  }
  return false;
}
