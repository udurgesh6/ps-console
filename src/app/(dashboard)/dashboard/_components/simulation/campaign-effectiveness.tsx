
import { Card, CardContent } from '@/components/ui/card';
import { ChartHeading } from '@/components/charts/chart-heading';
import { TrendingUp } from 'lucide-react';

export const CampaignEffectiveness = () => {

  const overallGrade="A+"
  const campaigns=[
    { name: 'Email Campaigns', grade: 'A' },
    { name: 'SMS Campaigns', grade: 'B+' },
    { name: 'Browser Pop-ups', grade: 'A-' }
  ]

  const getGradeColor = (grade: string) => {
    const firstChar = grade.charAt(0).toUpperCase();
    if (firstChar === 'A') return 'text-emerald-700 bg-emerald-50 border-emerald-200';
    if (firstChar === 'B') return 'text-blue-700 bg-blue-50 border-blue-200';
    if (firstChar === 'C') return 'text-amber-700 bg-amber-50 border-amber-200';
    return 'text-slate-700 bg-slate-50 border-slate-200';
  };

  return (
    <Card>
      <ChartHeading title="Campaign Effectiveness" icon={TrendingUp} />
      <CardContent className="space-y-4">
        <div className={`text-center p-6 rounded-lg border ${getGradeColor(overallGrade)}`}>
          <p className="text-4xl font-bold mb-1">{overallGrade}</p>
          <p className="text-sm font-medium opacity-80">Overall Grade</p>
        </div>
        
        <div className="space-y-2">
          {campaigns.map((campaign, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 rounded-lg border border-slate-200 bg-white hover:shadow-sm transition-all group"
            >
              <span className="text-sm text-slate-600">{campaign.name}</span>
              <span className={`px-3 py-1 rounded-md border text-sm font-medium ${getGradeColor(campaign.grade)}`}>
                {campaign.grade}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
};
