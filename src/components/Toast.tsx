import React from 'react';
import { useEstate } from '../context/EstateContext';
import { CheckCircle, Info } from 'lucide-react';

export const Toast: React.FC = () => {
  const { toastMessage } = useEstate();

  if (!toastMessage) return null;

  return (
    <div
      id="global-toast-notification"
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 max-w-md w-full px-4 pointer-events-none"
    >
      <div className="bg-[#1a1c20] text-white px-5 py-3 rounded-2xl shadow-2xl border border-[#c5a059]/40 flex items-center gap-3 animate-in fade-in slide-in-from-bottom-3 duration-300">
        <CheckCircle className="w-4 h-4 text-[#c5a059] shrink-0" />
        <span className="text-xs font-medium tracking-wide flex-1">
          {toastMessage}
        </span>
      </div>
    </div>
  );
};
