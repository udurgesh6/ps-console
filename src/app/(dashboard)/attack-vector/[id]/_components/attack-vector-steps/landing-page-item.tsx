"use client"

import { Card } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { LibraryItem } from "@/types";
import { useEffect, useRef, useState } from "react";

export const LandingPageItem = (
  item: LibraryItem,
  isSelected: boolean,
  isSelectEnabled: boolean,
  showInModal: boolean
) => {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.25);

  useEffect(() => {
    const updateScale = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const pageWidth = 1200; // Typical landing page width
        const calculatedScale = (containerWidth / pageWidth) * 0.9;
        setScale(Math.min(calculatedScale, 0.35));
      }
    };

    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, []);

  const onPageClick = () => {
    if (isSelectEnabled || showInModal) {
      return;
    }
    router.push(`/templates/landing-page/${item.id}`);
  };

  return (
   <Card
      onClick={onPageClick}
      className={`cursor-pointer py-0 relative aspect-square rounded-lg transition-all hover:shadow-md group overflow-hidden ${
        isSelected 
          ? "border-2 border-primary" 
          : ""
      }`}
    >
      {!isSelected && (
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 pointer-events-none" />
      )}
      
      <div 
        ref={containerRef}
        className="w-full h-full bg-gray-50 relative overflow-hidden rounded-lg flex items-start justify-center pt-4"
      >
        <div
          style={{
            transform: `scale(${scale})`,
            transformOrigin: 'top center',
            width: '600px',
            minHeight: '800px',
          }}
        >
          <iframe
            className="w-full h-full border-0 pointer-events-none bg-white shadow-sm"
            style={{
              width: '600px',
              height: '800px',
            }}
            srcDoc={item.htmlTemplate}
            sandbox=""
            title={`Landing page preview for ${item.name}`}
          />
        </div>
      </div>
      
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/50 to-black/80 p-4 z-20 opacity-100 group-hover:opacity-0 transition-opacity duration-300">
        <p className="text-white text-sm font-semibold truncate">{item.name}</p>
        {item.description && (
          <p className="text-white/80 text-xs truncate mt-1">{item.description}</p>
        )}
      </div>
    </Card>
  );
};
