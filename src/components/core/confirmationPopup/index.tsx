"use client";
import { useEffect } from "react";
import { CheckCircle } from "lucide-react";

interface ConfirmationPopupProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
}

export default function ConfirmationPopup({ message, isVisible, onClose }: ConfirmationPopupProps) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <div className="fixed top-5 right-5 z-[100] animate-in slide-in-from-right fade-in duration-300">
      <div role="status" aria-live="polite" className="flex items-center gap-3 bg-green-500 text-white px-5 py-3 rounded-lg shadow-lg">
        <CheckCircle size={20} />
        <span className="font-medium">{message}</span>
      </div>
    </div>
  );
}
