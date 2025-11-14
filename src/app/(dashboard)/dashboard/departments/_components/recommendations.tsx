import { ChartHeading } from '@/components/charts/chart-heading'
import { Card, CardContent } from '@/components/ui/card'
import { AlertTriangle } from 'lucide-react'

export const Recommendations = () => {
  return (
    <Card>
        <ChartHeading title="Department-Specific Recommendations" icon={AlertTriangle} />
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <h4 className="font-medium text-red-900 mb-2">Finance Department - Critical</h4>
              <p className="text-sm text-red-700">
                Highest click rate (31.2%) and risk score (67). Implement immediate targeted training 
                and increase simulation frequency to weekly.
              </p>
            </div>
            
            <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
              <h4 className="font-medium text-amber-900 mb-2">Executive Team - High Priority</h4>
              <p className="text-sm text-amber-700">
                High-value targets with poor awareness (28.9% click rate). Require specialized 
                executive-focused training programs.
              </p>
            </div>
            
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-2">Sales Department - Moderate</h4>
              <p className="text-sm text-blue-700">
                Above-average click rate (22.1%) likely due to external communication patterns. 
                Focus on email verification training.
              </p>
            </div>
            
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <h4 className="font-medium text-green-900 mb-2">IT Department - Good Performance</h4>
              <p className="text-sm text-green-700">
                Lowest click rate (8.3%) and good reporting rate (42.7%). Continue current training 
                schedule and use as mentors for other departments.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
  )
}
