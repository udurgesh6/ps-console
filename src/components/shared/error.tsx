import React from "react";
import { ApiError } from "@/types";
import { getErrorMessage } from "@/lib/utils";

export const Error = ({ error }: { error: ApiError }) => {
  return (
    <div className="flex items-center justify-center min-h-[200px] border-0 rounded-3xl bg-white p-6">
      <div className="text-center space-y-2">
        <p className="text-primary font-medium">
          {getErrorMessage(error, "An error occurred")}
        </p>
      </div>
    </div>
  );
};
