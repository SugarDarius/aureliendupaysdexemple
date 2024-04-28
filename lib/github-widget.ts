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

export function generateGitHubRandomContributionsColors(): string[] {
  const contributions: string[] = []

  for (let i = 0; i < LENGTH * LENGTH; i++) {
    const color = generateContributionRateColor()
    contributions[i] = color
  }

  return contributions
}
