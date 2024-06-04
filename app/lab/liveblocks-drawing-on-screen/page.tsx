import {
  LabPage,
  LabPageContent,
  LabPageHeader,
} from '@/components/content/lab-page'
import { PageHero } from '@/components/content/page-hero'

export default function LiveblocksDrawingOnScreenPage() {
  return (
    <LabPage>
      <LabPageContent>
        <LabPageHeader>
          <PageHero
            title='Liveblocks drawing on screen'
            description='A lab to draw on screen using liveblocks.io'
          />
        </LabPageHeader>
      </LabPageContent>
    </LabPage>
  )
}
