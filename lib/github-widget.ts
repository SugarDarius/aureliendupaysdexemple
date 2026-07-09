import { graphql } from '@octokit/graphql'
import type { User } from '@octokit/graphql-schema'
import { addDays, format } from 'date-fns'

import { env } from '@/config/env'

const TOTAL_NUMBER_OF_DAYS = 49
const NO_CONTRIBUTIONS_COLOR = '#ebedf0'

const completeContributionsPerWeekdays = (
  weekdays: ContributionsPerDay[],
): ContributionsPerDay[] => {
  if (weekdays.length < 7) {
    const rest = Math.max(7 - weekdays.length, 0)
    const lastContributedWeekday = weekdays[weekdays.length - rest]

    for (let i = 0; i < rest; i += 1) {
      const nextDay = addDays(new Date(lastContributedWeekday.date), 7)
      weekdays.push({
        color: NO_CONTRIBUTIONS_COLOR,
        count: 0,
        date: format(nextDay, 'yyy-MM-dd'),
      })
    }
  }

  return weekdays
}

const getUserContributionsQuery = `
query getUserContributions($username:String!) {
  user(login: $username){
    contributionsCollection {
      contributionCalendar {
        totalContributions
        weeks {
          contributionDays {
            weekday
            date
            color
            contributionCount
          }
        }
      }
    }
  }
}
`

interface ContributionsPerDay {
  date: string
  count: number
  color: string
}

type ContributionsPerWeekDays = [
  // Sunday
  ContributionsPerDay[],
  // Monday
  ContributionsPerDay[],
  // Tuesday
  ContributionsPerDay[],
  // Wednesday
  ContributionsPerDay[],
  // Thursday
  ContributionsPerDay[],
  // Friday
  ContributionsPerDay[],
  // Saturday
  ContributionsPerDay[],
]

interface GitHubContributions {
  totalContributions: number
  contributionsPerDays: ContributionsPerDay[]
}

export async function getGitHubContributions(
  username: string,
): Promise<GitHubContributions> {
  try {
    const { user } = await graphql<{ user: User }>(getUserContributionsQuery, {
      headers: {
        Authorization: `Bearer ${env.GITHUB_CONTRIBUTIONS_READER_TOKEN}`,
      },
      username,
    })

    const { contributionCalendar } = user.contributionsCollection

    const { totalContributions } = contributionCalendar

    const numberOfWeeks = Math.round(TOTAL_NUMBER_OF_DAYS / 7)
    const weeks = contributionCalendar.weeks.slice(
      Math.max(contributionCalendar.weeks.length - numberOfWeeks, 0),
    )

    const contributionDays = weeks.flatMap((week) => week.contributionDays)

    const contributionsPerWeekDays =
      contributionDays.reduce<ContributionsPerWeekDays>(
        (tuple, contributionDay) => {
          tuple[contributionDay.weekday].push({
            color: contributionDay.color,
            count: contributionDay.contributionCount,
            date: contributionDay.date,
          })

          return tuple
        },
        [[], [], [], [], [], [], []],
      )

    const contributionsPerDays: ContributionsPerDay[] = [
      ...completeContributionsPerWeekdays(contributionsPerWeekDays[0]),
      ...completeContributionsPerWeekdays(contributionsPerWeekDays[1]),
      ...completeContributionsPerWeekdays(contributionsPerWeekDays[2]),
      ...completeContributionsPerWeekdays(contributionsPerWeekDays[3]),
      ...completeContributionsPerWeekdays(contributionsPerWeekDays[4]),
      ...completeContributionsPerWeekdays(contributionsPerWeekDays[5]),
      ...completeContributionsPerWeekdays(contributionsPerWeekDays[6]),
    ]

    return {
      contributionsPerDays,
      totalContributions,
    }
  } catch {
    return { contributionsPerDays: [], totalContributions: 0 }
  }
}
