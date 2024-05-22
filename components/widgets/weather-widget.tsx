'use client'

import { NavigationIcon } from '@/components/icons/navigation-icon'
import { SunWeatherIcon } from '@/components/icons/sun-weather-icon'

export function WeatherWidget() {
  return (
    <div className='flex h-full w-full flex-col items-center justify-center p-4'>
      <div className='flex w-full flex-col gap-2'>
        <div className='flex w-full flex-col gap-2'>
          <div className='flex w-full flex-row items-center gap-1'>
            <span className='text-lg font-semibold leading-none'>Arches</span>
            <NavigationIcon className='size-4' />
          </div>
          <span className='text-6xl leading-none'>18˚</span>
        </div>
        <div className='flex w-full flex-col gap-2'>
          <div className='flex w-full flex-row items-center gap-2'>
            <SunWeatherIcon className='size-8' />
            <span className='text-lg font-semibold leading-none'>Sunny</span>
          </div>
          <div className='flex w-full flex-row items-center gap-1 font-semibold leading-none'>
            <span>H:28˚</span>
            <span>L:11˚</span>
          </div>
        </div>
      </div>
    </div>
  )
}
