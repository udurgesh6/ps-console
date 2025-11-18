"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import NProgress from "nprogress";

// Configure NProgress
NProgress.configure({
  showSpinner: false,
  trickleSpeed: 200,
  minimum: 0.08,
});

export function ProgressBarProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Start progress when route changes
    const handleStart = () => {
      NProgress.start();
    };

    // Complete progress when route change is done
    const handleComplete = () => {
      NProgress.done();
    };

    // Handle route change start
    handleStart();
    
    // Complete progress after a short delay to ensure smooth transition
    const timer = setTimeout(() => {
      handleComplete();
    }, 100);

    return () => {
      clearTimeout(timer);
      NProgress.done();
    };
  }, [pathname, searchParams]);

  return <>{children}</>;
}