"use client";

import { Card } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { Calendar, BookOpen, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { format, differenceInDays } from "date-fns";
import { useState, useEffect } from "react";

export const AwarenessProfileItem = (
  item,
  isSelected = false,
  isSelectEnabled = false
) => {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  // Calculate date-dependent values only on client
  useEffect(() => {
    setMounted(true);
  }, []);

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      Security: "bg-red-50 text-red-700 border-red-200",
      "AI & Machine Learning": "bg-purple-50 text-purple-700 border-purple-200",
      Development: "bg-blue-50 text-blue-700 border-blue-200",
      "HR & Compliance": "bg-green-50 text-green-700 border-green-200",
    };
    return colors[category] || "bg-gray-50 text-gray-700 border-gray-200";
  };

  const getDaysRemaining = () => {
    if (!mounted) return { text: "...", color: "text-gray-500" };
    
    const today = new Date();
    const end = new Date(item.endDate);
    const days = differenceInDays(end, today);

    if (days < 0) return { text: "Ended", color: "text-gray-500" };
    if (days === 0) return { text: "Ends today", color: "text-orange-600" };
    if (days <= 7) return { text: `${days}d left`, color: "text-orange-600" };
    if (days <= 30) return { text: `${days}d left`, color: "text-blue-600" };
    return { text: `${days}d left`, color: "text-green-600" };
  };

  const getDuration = () => {
    if (!mounted) return "...";
    
    const start = new Date(item.startDate);
    const end = new Date(item.endDate);
    const months = Math.round(differenceInDays(end, start) / 30);
    return `${months} ${months === 1 ? "month" : "months"}`;
  };

  const getFormattedDate = (date: Date) => {
    if (!mounted) return "...";
    return format(new Date(date), "MMM dd, yyyy");
  };

  const onProfileClick = () => {
    if (isSelectEnabled) {
      return;
    }
    router.push(`/awareness/${item.id}`);
  };

  const daysRemaining = getDaysRemaining();

  return (
    <Card
      onClick={onProfileClick}
      className={`relative py-0 overflow-hidden transition-all duration-200 hover:shadow-lg group cursor-pointer ${
        isSelected ? "ring-2 ring-primary ring-offset-2" : ""
      } ${!item.isActive ? "opacity-60" : ""}`}
    >
      {/* Hover Overlay */}
      {!isSelected && (
        <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      )}

      <div className="p-6">
        {/* Header Section */}
        <div className="mb-4">
          <h3 className="font-semibold text-lg mb-2 line-clamp-2 pr-10 min-h-[3.5rem]">
            {item.name}
          </h3>

          {item.description && (
            <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
              {item.description}
            </p>
          )}

          {/* Category Badge */}
          <Badge
            variant="outline"
            className={`text-xs font-medium ${getCategoryColor(item.category)}`}
          >
            {item.category}
          </Badge>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-4 mb-4 pt-4 border-t">
          {/* Courses Count */}
          <div className="flex flex-col items-center text-center">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 mb-2">
              <BookOpen className="h-5 w-5 text-primary" />
            </div>
            <p className="text-lg font-semibold">{item.courses.length}</p>
            <p className="text-xs text-muted-foreground">
              {item.courses.length === 1 ? "Course" : "Courses"}
            </p>
          </div>

          {/* Duration */}
          <div className="flex flex-col items-center text-center">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 mb-2">
              <Clock className="h-5 w-5 text-blue-600" />
            </div>
            <p className="text-lg font-semibold">{getDuration()}</p>
            <p className="text-xs text-muted-foreground">Duration</p>
          </div>

          {/* Days Remaining */}
          <div className="flex flex-col items-center text-center">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-orange-100 mb-2">
              <Calendar className="h-5 w-5 text-orange-600" />
            </div>
            <p className={`text-lg font-semibold ${daysRemaining.color}`}>
              {daysRemaining.text}
            </p>
            <p className="text-xs text-muted-foreground">Timeline</p>
          </div>
        </div>

        {/* Footer Section */}
        <div className="pt-4 border-t space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Start Date</span>
            <span className="font-medium">
              {getFormattedDate(item.startDate)}
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">End Date</span>
            <span className="font-medium">
              {getFormattedDate(item.endDate)}
            </span>
          </div>
        </div>

        {/* Status Indicator Bar */}
        <div className="mt-4 pt-3 border-t">
          <div className="flex items-center gap-2">
            <div
              className={`w-2 h-2 rounded-full ${
                item.isActive ? "bg-green-500 animate-pulse" : "bg-gray-300"
              }`}
            />
            <span className="text-xs font-medium">
              {item.isActive ? "Active Campaign" : "Inactive Campaign"}
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
};
