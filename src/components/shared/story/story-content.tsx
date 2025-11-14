import React from "react";
import { cn } from "@/lib/utils";
import { StoryContentProps } from "./types";
import { Header } from "../header";
import { Description } from "../description";

export const StoryContent: React.FC<StoryContentProps> = ({
  step,
  isActive,
  className,
}) => {
  if (!isActive) return null;

  return (
    <div className={cn("flex-1", className)}>
      <div className="">
        <div className="mb-4 border-b border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-1">
            {step.icon}
            <Header title={step.title} />
          </div>
          {step.description && (
            <Description description={step.description} />
          )}
        </div>

        <div className="bg-white rounded-lg px-6 pb-4">
          {step.content}
        </div>
      </div>
    </div>
  );
};
