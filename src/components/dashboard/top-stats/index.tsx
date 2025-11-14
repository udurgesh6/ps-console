import { TopStatsCard } from '@/components/dashboard/top-stats/top-stats-card'
import { TopStatsCardProps } from '@/types'

export const TopStats = ({topStats}: {topStats: TopStatsCardProps[]}) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
         {topStats.map((stat: TopStatsCardProps) => (
            <TopStatsCard
              key={stat.title}
              icon={stat.icon}
              title={stat.title}
              value={stat.value}
            />
          ))}
    </div>
  )
}
