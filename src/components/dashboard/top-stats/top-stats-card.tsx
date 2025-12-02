import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { TopStatsCardProps } from "@/types";

export const TopStatsCard = ({
  icon: Icon,
  title,
  value,
  isLoading,
}: TopStatsCardProps & { isLoading?: boolean }) => {
  return (
    <Card className={`py-3 md:py-6 border-0 shadow-0 rounded-3xl`}>
      <CardContent className="p-6 py-2 border-0">
        <div className="flex items-left justify-between mb-2">
          <div className="flex items-center space-x-2">
            {isLoading ? (
              <>
                <Skeleton className="h-6 w-6 rounded" />
                <Skeleton className="h-4 w-24" />
              </>
            ) : (
              <>
                <Icon className={`h-6 w-6`} />
                <span className="text-sm font-medium text-gray-600">
                  {title}
                </span>
              </>
            )}
          </div>
        </div>
        <div className="text-3xl font-bold text-gray-900">
          {isLoading ? <Skeleton className="h-9 w-16" /> : value}
        </div>
      </CardContent>
    </Card>
  );
};
