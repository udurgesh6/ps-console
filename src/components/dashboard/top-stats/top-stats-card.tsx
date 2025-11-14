import { Card, CardContent } from '@/components/ui/card'
import { TopStatsCardProps } from '@/types'

export const TopStatsCard = ({ icon: Icon, title, value }: TopStatsCardProps) => {
  // const colorClasses = {
  //   green: 'border-green-200 bg-green-50 text-green-600',
  //   blue: 'border-blue-200 bg-blue-50 text-blue-600',
  //   purple: 'border-purple-200 bg-purple-50 text-purple-600',
  //   emerald: 'border-emerald-200 bg-emerald-50 text-emerald-600',
  //   yellow: 'border-yellow-200 bg-yellow-50 text-yellow-600'
  // }

  return (
    <Card className={`py-3 md:py-6 border-0 shadow-0`}>
      <CardContent className="p-6 py-2 border-0">
        <div className="flex items-left justify-between mb-2">
          <div className="flex items-center space-x-2">
            <Icon className={`h-6 w-6`} />
            <span className="text-sm font-medium text-gray-600">{title}</span>
          </div>
        </div>
        <div className="text-3xl font-bold text-gray-900">{value}</div>
      </CardContent>
    </Card>
  )
}
