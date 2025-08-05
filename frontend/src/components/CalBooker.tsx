"use client";

import { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";
import { X } from "lucide-react";

interface BookerProps {
  username: string;
  eventSlug?: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function CalBooker({ username, eventSlug = "30min", isOpen, onClose }: BookerProps) {
  useEffect(() => {
    if (isOpen) {
      (async function () {
        const cal = await getCalApi({ "namespace": eventSlug });
        cal("ui", { "hideEventTypeDetails": false, "layout": "month_view" });
      })();
    }
  }, [isOpen, eventSlug]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-4xl h-full max-h-[90vh] bg-background rounded-lg shadow-2xl overflow-hidden">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-background/80 hover:bg-background rounded-full transition-colors"
        >
          <X className="h-5 w-5" />
        </button>
        
        {/* Cal.com embed */}
        <div className="w-full h-full p-4 flex items-center justify-center">
          <button 
            data-cal-namespace={eventSlug}
            data-cal-link={`${username}/${eventSlug}`}
            data-cal-config='{"layout":"month_view"}'
            className="px-8 py-4 bg-gradient-to-r from-primary to-accent text-white rounded-lg font-semibold text-lg hover:shadow-lg hover:shadow-primary/25 transition-all duration-300"
          >
            Schedule with {username}
          </button>
        </div>
      </div>
    </div>
  );
}
