import { ApiError } from "@/types";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
};

export const formatDuration = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  
  if (mins === 0) {
    return `${secs} second${secs !== 1 ? "s" : ""}`;
  }
  
  if (secs === 0) {
    return `${mins} minute${mins !== 1 ? "s" : ""}`;
  }
  
  return `${mins} minute${mins !== 1 ? "s" : ""} ${secs} second${secs !== 1 ? "s" : ""}`;
};

// export const isTimeWarning = (seconds: number): boolean => {
//   return seconds > 0 && seconds <= 60;
// };

// export const isTimeExpired = (seconds: number): boolean => {
//   return seconds <= 0;
// };

export const getErrorMessage = (error: ApiError, fallback = 'An error occurred'): string => {
  return error.response?.data?.message || error.message || fallback
}

/**
 * Formats a date range in compact DD/MM/YY format
 * @param startDate - The start date
 * @param endDate - The end date (optional)
 * @returns Formatted date string (e.g., "15/01/24" or "15/01/24 - 20/02/24")
 */
export const formatDateRange = (startDate: Date, endDate?: Date | null): string => {
  const formatCompactDate = (date: Date): string => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString().slice(-2);
    return `${day}/${month}/${year}`;
  };

  if (endDate) {
    return `${formatCompactDate(startDate)} - ${formatCompactDate(endDate)}`;
  } else {
    return formatCompactDate(startDate);
  }
};
