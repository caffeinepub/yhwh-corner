import { Toaster } from "@/components/ui/sonner";
import type { ReactNode } from "react";
import { Footer } from "./Footer";
import { Navbar } from "./Navbar";

interface LayoutProps {
  children: ReactNode;
  /** When true, no footer is rendered (e.g. game/video fullscreen pages) */
  noFooter?: boolean;
}

export function Layout({ children, noFooter }: LayoutProps) {
  return (
    <div
      className="min-h-screen flex flex-col bg-background text-foreground"
      data-ocid="layout"
    >
      <Navbar />
      <main className="flex-1">{children}</main>
      {!noFooter && <Footer />}
      <Toaster richColors position="top-right" />
    </div>
  );
}
