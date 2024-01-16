import { KeyboardEvent } from "react";

/**
 * Checks if given keyboard event is Ctrl + Enter or Cmd + Enter
 * @param e Keydown event
 * @returns true if Ctrl + Enter (on windows) or Cmd + Enter (on mac) is pressed
 */
export default function isCtrlEnter(e: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) {
  if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
    return true;
  }
  return false;
}
