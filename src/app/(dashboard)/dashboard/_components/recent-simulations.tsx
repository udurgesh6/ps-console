
import { Card, CardContent } from "@/components/ui/card";
import { Mail } from "lucide-react";
import { DetailCard } from "@/components/shared/detail-card";
import { ChartHeading } from "@/components/charts/chart-heading";
import { Users, AlertCircle, Clock } from "lucide-react";

const simulationsData = [
    {
        id: 1,
        name: "Executive Impersonation - Q2",
        type: "CEO Fraud",
        status: "Active",
        targets: 234,
        clicked: 12,
        reported: 18,
        timestamp: "2 hours ago",
        badgeVariant: "default",
    },
    {
        id: 2,
        name: "Microsoft 365 Login Alert",
        type: "Credential Harvest",
        status: "Completed",
        targets: 456,
        clicked: 34,
        reported: 89,
        timestamp: "1 day ago",
        badgeVariant: "secondary",
    },
    {
        id: 3,
        name: "Urgent Security Update",
        type: "Malware",
        status: "Active",
        targets: 178,
        clicked: 8,
        reported: 23,
        timestamp: "3 hours ago",
        badgeVariant: "default",
    },
];

export const RecentSimulations = () => {
    const simulations = simulationsData.map(sim => ({
        ...sim,
        stats: [
            { icon: Users, label: `${sim.targets} targets`, iconClassName: "text-blue-500" },
            { icon: AlertCircle, label: `${sim.clicked} clicked`, iconClassName: "text-red-500" },
            { icon: Clock, label: sim.timestamp, iconClassName: "text-slate-500" },
        ]
    }));

    return (
        <Card>
            <ChartHeading title="Recent Simulations" icon={Mail} />
            <CardContent>
                <div className="space-y-4">
                    {simulations.map((sim) => (
                        // Pass the entire transformed object
                        <DetailCard key={sim.id} details={sim} /> 
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};
