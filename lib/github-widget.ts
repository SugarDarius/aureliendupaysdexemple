import { graphql } from '@octokit/graphql'
import { User, ContributionCalendarWeek } from '@octokit/graphql-schema'

import { env } from '@/config/env'

const TOTAL_NUMBER_OF_DAYS = 49

const getUserContributionsQuery = `
query getUserContributions($username:String!) {
  user(login: $username){
    contributionsCollection {
      contributionCalendar {
        totalContributions
        weeks {
          contributionDays {
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
        const contributions = current.contributionDays.map((day) => ({
          date: day.date,
          count: day.contributionCount,
          color: day.color,
        }))

        return [...acc, ...contributions]
      },
      []
    )

    return {
      totalContributions,
      contributionsPerDays,
    }
  } catch {
    return { totalContributions: 0, contributionsPerDays: [] }
  }
}
