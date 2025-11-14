"use client"

import { Card } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { AttackVector } from "@/types/attack-vector";

export const AttackVectorItem = (
  item: AttackVector,
  isSelected: boolean,
  isSelectEnabled: boolean
) => {
  const router = useRouter();
  // console.log(item);
  // const getTropicalityColor = (tropicality: string) => {
  //   switch (tropicality) {
  //     case "Critical":
  //       return "bg-red-100 text-red-800 border-red-200";
  //     case "High":
  //       return "bg-orange-100 text-orange-800 border-orange-200";
  //     case "Medium":
  //       return "bg-yellow-100 text-yellow-800 border-yellow-200";
  //     case "Low":
  //       return "bg-green-100 text-green-800 border-green-200";
  //     default:
  //       return "bg-gray-100 text-gray-800 border-gray-200";
  //   }
  // };

  // const handleEditClick = (e) => {
  //   e.stopPropagation();
  //   router.push(`/attack-vector/${item.id}`);
  // };

  const onVectorClick = () => {
    if (isSelectEnabled) {
      return;
    }
    router.push(`/attack-vector/${item.id}`);
  };

  return (
    <Card
      onClick={onVectorClick}
      className={`cursor-pointer py-0 relative aspect-square rounded-lg transition-all hover:shadow-md group ${isSelected ? "border border-primary" : ""}`}
    >
      {/* <div className="h-full flex flex-col p-4 relative z-10">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1 min-w-0">
            <CardTitle className="text-lg font-bold text-black mb-2 line-clamp-1">
              {item.name || "No Title"}
            </CardTitle>
            <CardDescription className="text-sm text-gray-600 mb-2 line-clamp-2">
              {item.description || "No Description"}
            </CardDescription>
          </div>
          <div className="ml-3 flex-shrink-0">
            {item.status ? (
              <Shield className="h-5 w-5 text-green-500" />
            ) : (
              <Shield className="h-5 w-5 text-gray-400" />
            )}
          </div>
        </div>

        <div className="flex-1"></div>

        <div className="mt-auto space-y-2">
          {item.tropicality && (
            <Badge
              className={`text-xs ${getTropicalityColor(item.tropicality)}`}
            >
              {item.tropicality}
            </Badge>
          )}

          {item.startDate && (
            <div className="flex items-center text-xs text-gray-500">
              <Calendar className="h-3 w-3 mr-1" />
              {formatDateRange(
                new Date(item.startDate),
                item.endDate ? new Date(item.endDate) : null
              )}
            </div>
          )}

          <div className="text-xs text-gray-500">
            <span className="font-medium">Sub-category:</span>{" "}
            {item.subCategory || "N/A"}
          </div>
        </div>
      </div> */}

      {/* <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-end pb-3 pr-3 z-30 rounded-lg">
        <Edit
          onClick={handleEditClick}
          className="w-5 h-5 text-white opacity-80"
        />
      </div> */}
      <div className="w-full h-full bg-gray-50 relative overflow-hidden rounded-lg">
        <iframe
          className="w-full h-full border-0 pointer-events-none rounded-lg"
          style={{
            transform: "scale(0.8)",
            transformOrigin: "top left",
            width: "125%",
            height: "125%",
          }}
          srcDoc={item.emailHtmlTemplate}
          sandbox=""
        />
      </div>
    </Card>
  );
};
