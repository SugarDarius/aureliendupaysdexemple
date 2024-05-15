import { PageBentoItem } from '@/components/bento/page-bento-item'

export function WorkBentoItem() {
  return (
    <PageBentoItem
      title='Work'
      description='Check my work and contributions'
      href='/work'
    >
      <div className='flex h-full w-full flex-col items-center'></div>
    </PageBentoItem>
  )
}
