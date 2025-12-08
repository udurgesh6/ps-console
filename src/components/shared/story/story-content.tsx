import React from "react";
import { cn } from "@/lib/utils";
import { StoryContentProps } from "./types";
import { Header } from "../header";

export const StoryContent: React.FC<StoryContentProps> = ({
  step,
  isActive,
  className,
}) => {
  
  if (!isActive) return null;

  return (
    <div className={cn("flex-1 rounded-3xl", className)}>
      <div className="border-b border-gray-200 px-4 lg:px-6 py-3 lg:py-4 rounded-t-3xl">
        <div className="flex flex-row items-center gap-2 mb-1">
          <div className="flex-shrink-0">{step.icon}</div>
          <Header title={step.title} />
        </div>
        {/* {step.description && (
          <p className="text-sm text-gray-600 mt-2">{step.description}</p>
        )} */}
      </div>

      <div className="bg-white rounded-lg px-4 lg:px-6 py-4">{step.content}</div>
    </div>
  );
};
