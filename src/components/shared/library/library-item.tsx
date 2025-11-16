"use client";

import { useState, FC, memo, MouseEvent } from "react";
import { Check, Eye } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LibraryItemProps, AttackVector } from "@/types";
import { EmailPreviewModal } from "@/app/(dashboard)/templates/components/email-preview-modal";
import Image from "next/image";
import { cn } from "@/lib/utils";

export const LibraryItem: FC<LibraryItemProps> = memo(
  ({ item, isSelected, onToggle, renderItem, isSelectEnabled = false, showInModal = false }) => {
    const [isPreviewOpen, setIsPreviewOpen] = useState(false);

    const borderClass = isSelected
      ? "border-primary shadow-md"
      : "border-transparent hover:shadow-lg border-gray-200 hover:border-gray-300";

    const handleEyeClick = (e: MouseEvent) => {
      e.stopPropagation();
      setIsPreviewOpen(true);
    };

    if (renderItem) {
      return (
        <>
          <div
            className={cn(
              "relative group rounded-lg transition-all duration-200 cursor-pointer overflow-hidden",
              borderClass
            )}
            onClick={isSelectEnabled ? onToggle : undefined}
          >
            {renderItem(item as AttackVector, isSelected, isSelectEnabled, showInModal)}

            <Button
              size="icon"
              variant="ghost"
              className={cn(
                "absolute top-3 right-3 w-6 h-6 rounded text-white p-0 z-10",
                isSelectEnabled && isSelected && "bg-primary hover:bg-primary",
                isSelectEnabled &&
                  !isSelected &&
                  "group-hover:bg-transparent hover:bg-transparent",
                isSelectEnabled &&
                  "group-hover:border group-hover:border-primary"
              )}
            >
              {isSelectEnabled && (
                <Check
                  className={cn(
                    "w-4 h-4 text-transparent ",
                    isSelected && "text-white",
                    !isSelected && "group-hover:text-transparent"
                  )}
                />
              )}
            </Button>

            {/* <div
            className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-3 z-10"
            onClick={handleEyeClick}
          >
            <Eye className="w-5 h-5 text-white opacity-80" />
          </div> */}
          </div>

          {/* <EmailPreviewModal
            open={isPreviewOpen}
            onClose={() => setIsPreviewOpen(false)}
            htmlTemplate={item.htmlTemplate}
            title={item.title}
          /> */}
        </>
      );
    }

    return (
      <>
        <div className="flex flex-col">
          <Card
            onClick={onToggle}
            className={`relative p-0 border-red-500 transition-all duration-200 cursor-pointer overflow-hidden aspect-square group ${borderClass}`}
          >
            {isSelected && (
              <Button
                size="icon"
                variant="ghost"
                className="absolute top-3 right-3 w-6 h-6 rounded bg-primary text-white p-0 hover:bg-primary z-20"
              >
                <Check className="w-4 h-4 text-white" />
              </Button>
            )}

            {item.htmlTemplate && (
              <div className="w-full h-full bg-gray-50 relative overflow-hidden pt-1">
                <iframe
                  className="w-full h-full border-0 pointer-events-none"
                  style={{
                    transform: "scale(0.8)",
                    transformOrigin: "top left",
                    width: "125%",
                    height: "125%",
                  }}
                  srcDoc={item.htmlTemplate}
                  sandbox=""
                />

                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-end p-3 z-10">
                  <Eye
                    className="w-5 h-5 text-white"
                    onClick={handleEyeClick}
                  />
                </div>
              </div>
            )}
          </Card>

          <div className="mt-2 md:mt-4 px-1">
            <div className="flex flex-row items-center gap-1 md:gap-2">
              <Image
                src={item.logo ? item.logo : "/phish-sheriff-small.png"}
                alt="Default logo"
                className="w-7 h-7 md:w-10 md:h-10 object-contain rounded-full border border-gray-100 p-1 bg-gray-100 flex-shrink-0"
                height={20}
                width={20}
              />
              <div className="flex flex-col min-w-0 flex-1">
                <h3 className="font-semibold text-sm text-gray-900 truncate">
                  {item.title || item.name}
                </h3>
                <p className="text-xs text-gray-500 leading-none truncate">
                  {item.description}
                </p>
              </div>
            </div>
          </div>
        </div>

        <EmailPreviewModal
          open={isPreviewOpen}
          onClose={() => setIsPreviewOpen(false)}
          htmlTemplate={item.htmlTemplate}
          title={item.title}
          subject={item.subject}
          templateType={item.templateType}
        />
      </>
    );
  }
);

LibraryItem.displayName = "LibraryItem";
