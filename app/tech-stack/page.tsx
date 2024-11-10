import type { Metadata } from 'next'

import {
  languagesTechStackItems,
  frontendTechnologiesTechStackItems,
  backendTechnologiesTechStackItems,
  hoistingAndDeploymentTechStackItems,
  toolsAndSoftwaresBaseTechStackItems,
  toolsAndSoftwaresRepoTechStackItems,
  toolsAndSoftwaresDesignTechStackItems,
} from '@/lib/tech-stack'

import { Separator } from '@/components/ui/separator'
import { PageContent } from '@/components/content/page-content'
import { PageHero } from '@/components/content/page-hero'
import { TechStackGrid } from '@/components/grids/tech-stack-grid'
import { TechStackCard } from '@/components/grids/tech-stack-card'

export const metadata: Metadata = {
  title: 'Tech Stack',
  description: 'Check my tech stack I use everyday',
}

export default function TechStackPage() {
  return (
    <PageContent>
      <PageHero
        title='Tech Stack'
        description='A look at the programming languages, technologies, libraries and dev tools I use and play with.'
      />
      <Separator />
      <TechStackGrid title='Technologies'>
        {frontendTechnologiesTechStackItems.map(({ Icon, ...props }) => (
          <TechStackCard key={props.name} {...props}>
            <Icon className='size-20' />
          </TechStackCard>
        ))}
        <div className='col-span-1 max-sm:hidden' />
        {backendTechnologiesTechStackItems.map(({ Icon, ...props }) => (
          <TechStackCard key={props.name} {...props}>
            <Icon className='size-20' />
          </TechStackCard>
        ))}
      </TechStackGrid>
      <TechStackGrid title='Hoisting & Deployment'>
        {hoistingAndDeploymentTechStackItems.map(({ Icon, ...props }) => (
          <TechStackCard key={props.name} {...props}>
            <Icon className='size-20' />
          </TechStackCard>
        ))}
      </TechStackGrid>
      <TechStackGrid title='Tools & Softwares'>
        {toolsAndSoftwaresBaseTechStackItems.map(({ Icon, ...props }) => (
          <TechStackCard key={props.name} {...props}>
            <Icon className='size-20' />
          </TechStackCard>
        ))}
        <div className='col-span-1 max-sm:hidden' />
        <div className='col-span-1 max-sm:hidden' />
        {toolsAndSoftwaresRepoTechStackItems.map(({ Icon, ...props }) => (
          <TechStackCard key={props.name} {...props}>
            <Icon className='size-20' />
          </TechStackCard>
        ))}
        {toolsAndSoftwaresDesignTechStackItems.map(({ Icon, ...props }) => (
          <TechStackCard key={props.name} {...props}>
            <Icon className='size-20' />
          </TechStackCard>
        ))}
      </TechStackGrid>
      <TechStackGrid title='Languages'>
        {languagesTechStackItems.map(({ Icon, ...props }) => (
          <TechStackCard key={props.name} {...props}>
            <Icon className='size-20' />
          </TechStackCard>
        ))}
      </TechStackGrid>
    </PageContent>
  )
}
