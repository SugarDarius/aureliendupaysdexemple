const contributionRateColors = [
  '#E8EAEE',
  '#93E7A2',
  '#3EBE5E',
  '#2F984A',
  '#216435',
]

const generateContributionRateColor = (): string => {
  const index = Math.floor(Math.random() * contributionRateColors.length)
  const color = contributionRateColors[index]

  return color
}

const LENGTH = 7

export function generateGitHubRandomContributions(): string[][] {
  const contributions: string[][] = []

  for (let i = 0; i < LENGTH * LENGTH; i++) {
    const row = Math.floor(i / LENGTH)
    if (!contributions[row]) {
      contributions[row] = []
    }

    const color = generateContributionRateColor()
    contributions[row].push(color)
  }

  return contributions
}
