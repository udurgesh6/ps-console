"use client";

import { useEffect, Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import NProgress from "nprogress";

// Configure NProgress
NProgress.configure({
  showSpinner: false,
  trickleSpeed: 200,
  minimum: 0.08,
});

// Internal component that uses useSearchParams
function ProgressBarHandler() {
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

  return null;
}

// Main provider component with Suspense boundary
export function ProgressBarProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Suspense fallback={null}>
        <ProgressBarHandler />
      </Suspense>
      {children}
    </>
  );
}