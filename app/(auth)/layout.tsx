import type { Metadata } from "next";
import type { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

export const metadata: Metadata = {
  title: {
    template: "%s | Rebel Boxing Club",
    default: "Staff Sign In | Rebel Boxing Club",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function AuthLayout({
  children,
}: AuthLayoutProps) {
  return (
    <main
      id="auth-main"
      className="
        flex min-h-dvh w-full
        min-w-0 items-center
        justify-center
        bg-background
        text-foreground
      "
    >
      <div className="w-full min-w-0">
        {children}
      </div>
    </main>
  );
}