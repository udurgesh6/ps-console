import { LandingPage } from "@/types";
import { useRef, useEffect, useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LandingPagePreviewProps {
  item: LandingPage;
  onRemove: () => void;
}

export const LandingPagePreview = ({
  item,
  onRemove,
}: LandingPagePreviewProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.5);

  useEffect(() => {
    const updateScale = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const pageWidth = 1200; // Full landing page width
        const calculatedScale = (containerWidth / pageWidth) * 0.9;
        setScale(Math.min(calculatedScale, 0.8)); // Allow larger scale for better visibility
      }
    };

    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  return (
    <div className="w-full border border-gray-200 rounded-lg bg-white shadow-sm">
      {/* Header with title and remove button */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50">
        <div>
          <h3 className="text-sm font-medium text-gray-900">{item.name}</h3>
          {item.description && (
            <p className="text-xs text-gray-500 mt-1">{item.description}</p>
          )}
        </div>
        <Button onClick={onRemove} size="icon" title="Remove landing page">
          <X className="h-4 w-4" />
        </Button>
      </div>

      {/* Preview Content */}
      <div className="pt-10">
        <div
          ref={containerRef}
          className="w-full bg-white rounded-lg shadow-lg overflow-hidden flex justify-center"
        >
          <div
            style={{
              transform: `scale(${scale})`,
              transformOrigin: "top center",
              width: "100%",
            }}
          >
            <iframe
              className="w-full border-0 bg-white block"
              style={{
                width: "100%",
                height: "auto",
                minHeight: "400px",
              }}
              srcDoc={item.htmlTemplate}
              sandbox=""
              title={`Landing page preview for ${item.name}`}
              onLoad={(e) => {
                const iframe = e.target as HTMLIFrameElement;
                try {
                  const iframeDoc =
                    iframe.contentDocument || iframe.contentWindow?.document;
                  if (iframeDoc) {
                    const height = iframeDoc.documentElement.scrollHeight;
                    iframe.style.height = `${height}px`;
                  }
                } catch (error) {
                  console.log(error);
                  // Fallback for cross-origin restrictions
                  iframe.style.height = "800px";
                }
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
