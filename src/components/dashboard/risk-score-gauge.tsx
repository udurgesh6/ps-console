import { Card, CardContent } from "../ui/card";
import { PieChart, Cell, Pie } from "recharts";

export const RiskScoreGauge = ({ score, severity }: { score: number, severity: string }) => {
  const getSeverityColor = (sev: string) => {
    switch(sev.toLowerCase()) {
      case 'low': return 'text-green-600';
      case 'medium': return 'text-yellow-600';
      case 'high': return 'text-orange-600';
      case 'critical': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getGaugeColor = (sev: string) => {
    switch(sev.toLowerCase()) {
      case 'low': return '#10b981';
      case 'medium': return '#f59e0b';
      case 'high': return '#f97316';
      case 'critical': return '#ef4444';
      default: return '#6b7280';
    }
  };

  // Data for the gauge - showing filled and empty portions
  const data = [
    { name: 'Score', value: score, fill: getGaugeColor(severity) },
    { name: 'Remaining', value: 100 - score, fill: '#f3f4f6' }
  ];

  return (
    <Card className="bg-white">
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">
          Organization Wise Risk Score
        </h3>
        <div className="flex flex-col items-center justify-center py-4">
          <div className="relative w-full flex items-center justify-center">
            <PieChart width={280} height={180}>
              <Pie
                data={data}
                cx="50%"
                cy="80%"
                startAngle={180}
                endAngle={0}
                innerRadius={80}
                outerRadius={110}
                paddingAngle={0}
                dataKey="value"
                stroke="none"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
            </PieChart>
            <div className="absolute bottom-8 flex flex-col items-center">
              <div className="text-4xl font-bold text-gray-900">{score}%</div>
              <div className={`text-sm font-medium ${getSeverityColor(severity)}`}>
                Severity - {severity}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};