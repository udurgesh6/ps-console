"use client"

import { Card } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { AttackVector } from "@/types/attack-vector";
import { useEffect, useRef, useState } from "react";

export const AttackVectorItem = (
  item: AttackVector,
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
        const emailWidth = 600;
        const calculatedScale = (containerWidth / emailWidth) * 0.9;
        setScale(Math.min(calculatedScale, 0.4));
      }
    };

    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, []);

  const onVectorClick = () => {
    if (isSelectEnabled || showInModal) {
      return;
    }
    router.push(`/attack-vector/${item.id}`);
  };

  return (
    <Card
      onClick={onVectorClick}
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
            srcDoc={item.emailHtmlTemplate}
            sandbox=""
            title={`Email preview for ${item.name}`}
          />
        </div>
      </div>
      
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 to-gray-100 opacity-100 group-hover:opacity-0 transition-opacity duration-300 p-3 z-20">
        <p className="text-white text-sm font-semibold truncate">{item.name}</p>
        <p className="text-white/80 text-xs truncate">{item.emailSubject}</p>
      </div>
    </Card>
  );
};
