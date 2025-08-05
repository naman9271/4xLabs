import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Authentication - BuildUp Agency",
  description: "Sign in or create an account to access BuildUp's professional developer platform",
  keywords: ["authentication", "login", "register", "developer", "freelance"],
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      {children}
    </div>
  );
}
