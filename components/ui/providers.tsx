"use client";

import { ThemeProvider } from "./theme-provider";
import { TooltipProvider } from "./tooltip";


export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <TooltipProvider>{children}</TooltipProvider>
    </ThemeProvider>
  );
};
