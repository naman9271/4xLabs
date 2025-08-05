"use client";

import { useState } from "react";

interface CalAccount {
  username: string;
  name: string;
  role?: string;
}

export const calAccounts: CalAccount[] = [
  {
    username: "naman9271",
    name: "Naman",
    role: "Tech Lead"
  },
  {
    username: "amank1412", 
    name: "Aman",
    role: "Developer"
  }
];

export function useCalBooking() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState<CalAccount | null>(null);

  const openBooking = (account: CalAccount) => {
    setSelectedAccount(account);
    setIsBookingOpen(true);
  };

  const closeBooking = () => {
    setIsBookingOpen(false);
    setSelectedAccount(null);
  };

  return {
    isBookingOpen,
    selectedAccount,
    openBooking,
    closeBooking,
    calAccounts
  };
}
