import { BentoCard } from '@/components/grids/bento-card'
import { ClockWidget } from '@/components/widgets/clock-widget'

export function StandByBentoItem() {
  return (
    <BentoCard className='h-full'>
      <div className='relative flex h-full w-full flex-col'>
        <div className='flex h-full w-1/2 flex-col'>
          <ClockWidget />
        </div>
      </div>
    </BentoCard>
  )
}
