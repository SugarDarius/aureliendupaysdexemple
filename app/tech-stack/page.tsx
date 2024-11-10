import type { Metadata } from 'next'

import {
  type TechStackItem,
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

const StackItem = ({ Icon, ...props }: TechStackItem) => (
  <TechStackCard {...props}>
    <Icon className='size-20' />
  </TechStackCard>
)

export default function TechStackPage() {
  return (
    <PageContent>
      <PageHero
        title='Tech Stack'
        description='A look at the programming languages, technologies, libraries and dev tools I use and play with.'
      />
      <Separator />
      <TechStackGrid title='Technologies'>
        {frontendTechnologiesTechStackItems.map((props) => (
          <StackItem key={props.name} {...props} />
        ))}
        <div className='col-span-1 max-sm:hidden' />
        {backendTechnologiesTechStackItems.map((props) => (
          <StackItem key={props.name} {...props} />
        ))}
      </TechStackGrid>
      <TechStackGrid title='Hoisting & Deployment'>
        {hoistingAndDeploymentTechStackItems.map((props) => (
          <StackItem key={props.name} {...props} />
        ))}
      </TechStackGrid>
      <TechStackGrid title='Tools & Softwares'>
        {toolsAndSoftwaresBaseTechStackItems.map((props) => (
          <StackItem key={props.name} {...props} />
        ))}
        <div className='col-span-1 max-sm:hidden' />
        <div className='col-span-1 max-sm:hidden' />
        {toolsAndSoftwaresRepoTechStackItems.map((props) => (
          <StackItem key={props.name} {...props} />
        ))}
        {toolsAndSoftwaresDesignTechStackItems.map((props) => (
          <StackItem key={props.name} {...props} />
        ))}
      </TechStackGrid>
      <TechStackGrid title='Languages'>
        {languagesTechStackItems.map((props) => (
          <StackItem key={props.name} {...props} />
        ))}
      </TechStackGrid>
    </PageContent>
  )
}
