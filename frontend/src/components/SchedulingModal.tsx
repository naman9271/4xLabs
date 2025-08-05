"use client";

import { motion } from "framer-motion";
import { X, Calendar, User } from "lucide-react";
import { calAccounts } from "@/hooks/useCalBooking";

interface SchedulingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectAccount: (account: { username: string; name: string; role?: string }) => void;
}

export default function SchedulingModal({ isOpen, onClose, onSelectAccount }: SchedulingModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="relative w-full max-w-md bg-background rounded-xl shadow-2xl p-6 mx-4"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-muted rounded-full transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="p-3 bg-primary/10 rounded-full w-fit mx-auto mb-4">
            <Calendar className="h-6 w-6 text-primary" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Schedule a Meeting</h2>
          <p className="text-muted-foreground">
            Choose who you&apos;d like to meet with
          </p>
        </div>

        {/* Account selection */}
        <div className="space-y-3">
          {calAccounts.map((account, index) => (
            <motion.button
              key={account.username}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => {
                onSelectAccount(account);
                onClose();
              }}
              className="w-full p-4 border border-border hover:border-primary/50 rounded-lg hover:bg-primary/5 transition-all duration-300 text-left group"
            >
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-primary/10 rounded-full group-hover:bg-primary/20 transition-colors">
                  <User className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">{account.name}</h3>
                  {account.role && (
                    <p className="text-sm text-muted-foreground">{account.role}</p>
                  )}
                </div>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-xs text-muted-foreground">
            You&apos;ll be redirected to our scheduling platform
          </p>
        </div>
      </motion.div>
    </div>
  );
}
