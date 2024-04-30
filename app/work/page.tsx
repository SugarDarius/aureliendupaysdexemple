import type { Metadata } from 'next'

import { ReactIcon } from '@/components/icons/react-icon'
import { NextJSSquareIcon } from '@/components/icons/nextjs-square-icon'

import { Separator } from '@/components/ui/separator'
import { PageHero } from '@/components/content/page-hero'
import { InlineLink } from '@/components/content/inline-link'
import { WorkCard } from '@/components/grids/work-card'

export const metadata: Metadata = {
  title: 'Work',
  description: 'Check my work and contributions',
}

export default function WorkPage() {
  return (
    <div className='relative flex h-full w-full flex-col items-center'>
      <div className='flex h-full w-full max-w-4xl flex-col gap-10 px-12 py-24 max-sm:px-4 min-[1025px]:px-0'>
        <PageHero
          title='Work'
          description='A look at my professional work and contributions.'
        />
        <Separator />
        <p>
          My main goal is to craft interfaces and products with{' '}
          <a
            href='https://react.dev/'
            target='_blank'
            rel='noopener noreferrer'
            className='inline-flex items-center rounded border border-neutral-200 bg-neutral-50 px-1.5 py-1 text-sm leading-4 text-neutral-900 no-underline dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100'
          >
            <ReactIcon className='mr-1 inline-flex h-3 w-3' />
            React
          </a>{' '}
          and{' '}
          <a
            href='https://nextjs.org/'
            target='_blank'
            rel='noopener noreferrer'
            className='inline-flex items-center rounded border border-neutral-200 bg-neutral-50 px-1.5 py-1 text-sm leading-4 text-neutral-900 no-underline dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100'
          >
            <NextJSSquareIcon className='mr-1 inline-flex h-3 w-3' />
            Next.js
          </a>
          .<br />
          Here&apos;s a look at my professional work and contributions.
        </p>
        <div className='flex w-full flex-col gap-6 text-neutral-900 dark:text-neutral-100'>
          <WorkCard
            href='https://www.claap.io/'
            companyName='Claap'
            jobTitle='Senior Software Engineer (remote)'
            startDate='October 2021'
            endDate='March 2024'
          >
            <div className='flex w-full flex-col gap-6'>
              <p>
                I joined{' '}
                <InlineLink href='https://www.claap.io/'>Claap</InlineLink>{' '}
                early stage back in October 2021 to help teams record meetings
                with AI powered notes, send short followup videos, and
                centralize best practices in video library.
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
                    Video editor (trimming by timeline, trimming by transcript
                    and stitching)
                  </li>
                </ul>
                <p>
                  My scope of contributions was extended to the implementation
                  of Chrome extension and I&apos;ve been part of the first team
                  of two developers who has implemented the first version of
                  desktop app based on{' '}
                  <InlineLink href='https://www.electronjs.org/'>
                    Electron
                  </InlineLink>{' '}
                  where I played a bit with blurred background feature.
                </p>
              </div>
              <p>
                Sadly my contract was ended because I was selected to be part of
                a first lay off batch early in January 2024 and my legal notice
                ended in March 2024.
              </p>
              <p>
                Claap has been nominated in the top 10 best designed products in
                2022 on ProductHunt 🚀 and recently Claap was referenced by
                ProductHunt in{' '}
                <InlineLink href='https://www.producthunt.com/categories/screenshots-and-screen-recording'>
                  The best screenshots and screen recording apps in 2024
                </InlineLink>{' '}
                🎉.
              </p>
            </div>
          </WorkCard>
          <Separator />
          <WorkCard
            href='https://www.lifen.fr/'
            companyName='Lifen'
            jobTitle='Senior Full Stack Engineer (remote)'
            startDate='January 2021'
            endDate='October 2021'
          >
            <div className='flex w-full flex-col gap-6'>
              <p>
                In 2021 I joined{' '}
                <InlineLink href='https://www.lifen.fr/'>Lifen</InlineLink>{' '}
                after my adventure in Luxembourg to treat better whereas caring
                together.
              </p>
              <p>
                My mission at Lifen was to help the core apps team to analyze
                the existing and identify the pain points tp apply the good
                practice with React. I&apos; mostly contributed to the{' '}
                <span className='font-bold'>Lifen documents</span> web and
                desktop app and made some proof of concepts to test the{' '}
                <span className='font-bold'>JMAP</span> mail protocol for a new
                mail web client.
              </p>
              <p>
                I gained proficiency in and contributed to projects using the{' '}
                <span className='font-bold'>FHIR</span> protocol
              </p>
            </div>
          </WorkCard>
          <Separator />
          <WorkCard
            href='https://sfeir.com/en/'
            companyName='SFEIR'
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
                  full stack projects where my first mission was to to migrate
                  some old monolith web apps to a new modern architecture with
                  React and a Node.js server.
                </p>
                <p>I did many significant contributions such as:</p>
                <ul className='ml-5 list-disc font-medium'>
                  <li>
                    Implemented a suite of NPM packages to used and reused
                    across multiples web applications
                  </li>
                  <li>Added unit testing in web applications </li>
                  <li>
                    Designed a new architecture for modern web applications to
                    be deployed in the k8s cloud infrastructure
                  </li>
                  <li>
                    Implemented a new design system to be used across multiples
                    web applications
                  </li>
                  <li>Integrated SiteCore CMS</li>
                </ul>
              </div>
              <p>
                At Sfeir I was not only a developer but I had the role of{' '}
                <span className='font-bold'>Team Leader</span> to manage a team
                of developers to help them grow in their careers. I was also a
                <span className='font-bold'>technical recruiter</span> to help
                the talent team hires new developers in the company. I completed
                my scope by being a{' '}
                <span className='font-bold'>React trainer</span> to help
                developers at Sfeir learn and grow on React.
              </p>
            </div>
          </WorkCard>
          <Separator />
          <WorkCard
            companyName='PhiXL'
            jobTitle='Lead developer'
            startDate='April 2016'
            endDate='July 2017'
          >
            <div className='flex w-full flex-col gap-6'></div>
          </WorkCard>
          <Separator />
          <WorkCard
            href='https://madmix.digital'
            companyName='Madmix Digital'
            jobTitle='Developer'
            startDate='May 2014'
            endDate='April 2016'
          ></WorkCard>
        </div>
      </div>
    </div>
  )
}
