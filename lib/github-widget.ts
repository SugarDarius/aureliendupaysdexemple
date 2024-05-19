import { graphql } from '@octokit/graphql'
import { User, ContributionCalendarWeek } from '@octokit/graphql-schema'

import { env } from '@/config/env'

const TOTAL_NUMBER_OF_DAYS = 49
const NO_CONTRIBUTIONS_COLOR = '#ebedf0'

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

type ContributionsPerDay = {
  date: string
  count: number
  color: string
}

type GitHubContributions = {
  totalContributions: number
  contributionsPerDays: ContributionsPerDay[]
}

export async function getGitHubContributions(
  username: string
): Promise<GitHubContributions> {
  try {
    const { user } = await graphql<{ user: User }>(getUserContributionsQuery, {
      username,
      headers: {
        Authorization: `Bearer ${env.GITHUB_CONTRIBUTIONS_READER_TOKEN}`,
      },
    })

    const contributionCalendar =
      user.contributionsCollection.contributionCalendar

    const totalContributions = contributionCalendar.totalContributions

    const numberOfWeeks = Math.round(TOTAL_NUMBER_OF_DAYS / 7)
    const weeks = contributionCalendar.weeks.slice(
      Math.max(contributionCalendar.weeks.length - numberOfWeeks, 0)
    )

    const contributionsPerDays: ContributionsPerDay[] = weeks.reduce(
      (acc: ContributionsPerDay[], current: ContributionCalendarWeek) => {
        const contributions = current.contributionDays
          .sort((a, b) => a.weekday - b.weekday)
          .map((day) => ({
            date: day.date,
            count: day.contributionCount,
            color: day.color,
          }))

        return [...acc, ...contributions]
      },
      []
    )

    const rest = Math.max(TOTAL_NUMBER_OF_DAYS - contributionsPerDays.length, 0)
    if (rest > 0) {
      for (let i = 0; i < rest; i++) {
        contributionsPerDays.push({
          date: 'XXXX-XX-XX-' + i,
          count: 0,
          color: NO_CONTRIBUTIONS_COLOR,
        })
      }
    }

    return {
      totalContributions,
      contributionsPerDays,
    }
  } catch {
    return { totalContributions: 0, contributionsPerDays: [] }
  }
}
