import type { Metadata } from 'next'
import Image from 'next/image'

import { cn } from '@/lib/utils'

import { ReactIcon } from '@/components/icons/react-icon'
import { NextJSSquareIcon } from '@/components/icons/nextjs-square-icon'
import { ClaapIcon } from '@/components/icons/claap-icon'

import { Separator } from '@/components/ui/separator'
import { PageContent } from '@/components/content/page-content'
import { PageHero } from '@/components/content/page-hero'
import { InlineLink } from '@/components/content/inline-link'
import { TagLink } from '@/components/content/tag-link'
import { WorkCard } from '@/components/grids/work-card'

const ItemsSeparator = ({ className }: { className?: string }) => (
  <Separator className={cn('mx-auto w-[90%]', className)} />
)

export const metadata: Metadata = {
  title: 'Work',
  description: 'Check my work and contributions',
}

export default function WorkPage() {
  return (
    <PageContent>
      <PageHero
        title='Work'
        description='A look at my professional work and contributions.'
      />
      <Separator />
      <p>
        My main goal is to craft interfaces and products with{' '}
        <TagLink href='https://react.dev/'>
          <ReactIcon className='mr-1 inline-flex h-3 w-3' />
          React
        </TagLink>{' '}
        and{' '}
        <TagLink href='https://nextjs.org/'>
          <NextJSSquareIcon className='mr-1 inline-flex h-3 w-3' />
          Next.js
        </TagLink>
        .<br />
        Here&apos;s a look at my professional work and contributions.
      </p>
      <div className='flex w-full flex-col gap-8 text-neutral-900 dark:text-neutral-100'>
        <WorkCard
          href='https://liveblocks.io/'
          companyName='L . . . . . . . ks'
          jobTitle='Senior Software Engineer (remote)'
          startDate='July 2024'
        >
          <p>My new journey starts very soon 🙂</p>
        </WorkCard>
        <ItemsSeparator />
        <WorkCard
          href='https://www.claap.io/'
          companyName='Claap'
          companyLogo={<ClaapIcon className='size-6' />}
          jobTitle='Senior Software Engineer (remote)'
          startDate='October 2021'
          endDate='March 2024'
        >
          <div className='flex w-full flex-col gap-6'>
            <p>
              I joined{' '}
              <InlineLink href='https://www.claap.io/' aria-label='Claap'>
                Claap
              </InlineLink>{' '}
              early stage back in October 2021 to help teams record meetings
              with AI powered notes, send short followup videos, and centralize
              best practices in video library.
            </p>
            <div className='flex w-full flex-col gap-2'>
              <p>
                During my time at Claap I contributed to develop multiple and
                different features for the product&apos;s web app such as:
              </p>
              <ul className='ml-5 list-disc font-medium'>
                <li>Video uploads</li>
                <li>Video replies in comments</li>
                <li>File uploads in comments</li>
                <li>Slack integration</li>
                <li>
                  Video editor (trimming by timeline, trimming by transcript and
                  stitching)
                </li>
              </ul>
              <p>
                My scope of contributions was extended to the implementation of
                the Chrome extension and I&apos;ve been part of the first team
                of two developers who has implemented and released the first
                version of the desktop app based on{' '}
                <InlineLink
                  href='https://www.electronjs.org/'
                  aria-label='Electron'
                >
                  Electron
                </InlineLink>{' '}
                where I enjoyed play a bit with blurred background feature.
              </p>
            </div>
            <p>
              Sadly my contract was ended because I was selected to be part of a
              first lay off batch early in January 2024 and my legal notice
              ended in March 2024.
            </p>
            <p>
              Claap has been nominated in the top 10 best designed products in
              2022 on ProductHunt 🚀 and recently Claap was referenced by
              ProductHunt in{' '}
              <InlineLink
                href='https://www.producthunt.com/categories/screenshots-and-screen-recording'
                aria-label='Product Hunt | The best screenshots and screen recording apps in 2024'
              >
                The best screenshots and screen recording apps in 2024
              </InlineLink>{' '}
              🎉.
            </p>
          </div>
        </WorkCard>
        <Separator className='mx-auto w-[90%]' />
        <WorkCard
          href='https://www.lifen.fr/'
          companyName='Lifen'
          companyLogo={
            <Image
              src='/medias/images/lifen-logo.webp'
              alt='Lifen logo'
              width={24}
              height={24}
            />
          }
          jobTitle='Senior Full Stack Engineer (remote)'
          startDate='January 2021'
          endDate='October 2021'
        >
          <div className='flex w-full flex-col gap-6'>
            <p>
              In 2021 I joined{' '}
              <InlineLink href='https://www.lifen.fr/' aria-label='Lifen'>
                Lifen
              </InlineLink>{' '}
              after my adventure in Luxembourg to treat better whereas caring
              together.
            </p>
            <p>
              My mission at Lifen was to help the core apps team to analyze the
              existing and identify the pain points to apply the good practice
              with React. I&apos;ve mostly contributed to the{' '}
              <span className='font-semibold'>Lifen documents</span> web and
              desktop app and made a proof of concept to test the{' '}
              <span className='font-semibold'>JMAP</span> mail protocol for a
              new mail web client.
            </p>
            <p>
              I gained proficiency in and contributed to projects using the{' '}
              <span className='font-semibold'>FHIR</span> protocol
            </p>
          </div>
        </WorkCard>
        <ItemsSeparator />
        <WorkCard
          href='https://sfeir.com/en/'
          companyName='SFEIR'
          companyLogo={
            <Image
              src='/medias/images/sfeir-logo.webp'
              alt='Sfeir logo'
              width={24}
              height={24}
            />
          }
          jobTitle='Full Stack Engineer & Team Leader'
          startDate='July 2017'
          endDate='December 2020'
        >
          <div className='flex w-full flex-col gap-6'>
            <p>
              SFEIR was my first and only experience in a digital services
              company based in France 🇫🇷 and Luxembourg 🇱🇺.
              <br />I joined it back in 2017 to work as a consultant for the
              Luxembourg Stock Exchange where I contributed to many different
              projects.
            </p>
            <div className='flex w-full flex-col gap-2'>
              <p>
                At Luxembourg Stock Exchange I&apos;ve mostly contributed to
                full stack projects where my first mission was to migrate some
                old monolith web apps to a new modern architecture with React
                and Node.js.
              </p>
              <p>I did many significant contributions such as:</p>
              <ul className='ml-5 list-disc font-medium'>
                <li>
                  Implemented a suite of NPM packages in a private registry to
                  be used and reused across multiples web applications
                </li>
                <li>Added unit testing in web applications </li>
                <li>
                  Designed a new architecture for modern web applications to be
                  deployed in the k8s cloud infrastructure
                </li>
                <li>
                  Implemented a new design system to be used across multiples
                  web applications
                </li>
                <li>Integrated SiteCore CMS</li>
                <li>
                  Implemented a backend for frontend based on{' '}
                  <span className='font-semibold'>NestJS</span> and{' '}
                  <span className='font-semibold'>GraphQL</span> to ease
                  communication between frontend web apps and micro-services
                </li>
              </ul>
              <p>
                It was a great experience during these three years and a half at
                Luxembourg Stock Exchange. A lot of challenges to manage where I
                gained a lot of knowledge.
              </p>
            </div>
            <p>
              At Sfeir I was not only a developer but I had the role of{' '}
              <span className='font-semibold'>Team Leader</span> to manage a
              team of developers to help them grow in their careers. I was also
              a<span className='font-semibold'>technical recruiter</span> to
              help the talent team hires new developers in the company. I
              completed my scope by being a{' '}
              <span className='font-semibold'>React trainer</span> to help
              developers at Sfeir learn and grow on React.
            </p>
          </div>
        </WorkCard>
        <ItemsSeparator />
        <WorkCard
          companyName='PhiXL'
          companyLogo={
            <div className='relative size-6 overflow-hidden'>
              <div className='absolute inset-0 m-auto h-full w-full scale-125 overflow-hidden'>
                <Image
                  src='/medias/images/phixl-logo.webp'
                  alt='PhiXL logo'
                  fill
                  sizes='60px'
                />
              </div>
            </div>
          }
          jobTitle='Lead developer'
          startDate='April 2016'
          endDate='July 2017'
        >
          <div className='flex w-full flex-col gap-6'>
            <p>
              At PhiXL I was in charge to create and develop a new social
              network around books theme. The startup was very early stage so I
              had to build everything from scratch.
            </p>
            <p>
              I leaned to work and play with{' '}
              <span className='font-semibold'>Neo4J</span> (a graph database)
              and cypher to implement a recommendation engine. I contributed to
              implement the frontend, the backend and the infrastructure to
              deploy the social network. I also contributed to implement a
              back-office to manager users and data.
            </p>
            <p>
              The experience at PhiXL was great as I leaned a lot of knowledge
              on different fields but sadly the company closed mid 2017 as it
              did not meet the expected success we were looking for.
            </p>
          </div>
        </WorkCard>
        <ItemsSeparator />
        <WorkCard
          href='https://madmix.digital'
          companyName='Madmix Digital'
          companyLogo={
            <Image
              src='/medias/images/madmix-digital-logo.webp'
              alt='Madmix Digital logo'
              width={24}
              height={24}
            />
          }
          jobTitle='Developer'
          startDate='May 2014'
          endDate='April 2016'
        >
          <div className='flex w-full flex-col gap-6'>
            <p>
              Madmix Digital is a digital studio working in the internet
              marketing industry and collaborating with clients, brands and
              agencies. I first joined Madmix Digital as an intern developer
              back in May 2014. It was at Madmix Digital I gained my first
              experience using <span className='font-semibold'>React</span>.
            </p>
            <p>
              I worked a lot on website development like marketing landing pages
              and mini-websites. It was there at Madmix Digital that I put in
              production my first web applications with databases and data
              processing such as for example marketing game contest, mini-social
              networks and back offices.
            </p>
            <p>
              I also had the chance to play with the language{' '}
              <span className='font-semibold'>Swift</span> and to contribute to
              an iOS app for testing HTML 5 interstitial advertisements.
            </p>
          </div>
        </WorkCard>
      </div>
    </PageContent>
  )
}
