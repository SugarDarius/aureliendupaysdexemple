// NOTE: Empirical value. It could computed by
// measuring the text from an offscreen canvas
const AVG_WIDTH_TO_HEIGHT_RATIO = 0.6

export function computeFontSizeToFitContainerWidth(
  containerWidth: number,
  text: string,
  fontParams: { baseSize: number }
): number {
  const textSize = text.length

  const avgCharWidth = fontParams.baseSize * AVG_WIDTH_TO_HEIGHT_RATIO
  const totalTextWidth = textSize * avgCharWidth

  const scalingFactor = containerWidth / totalTextWidth
  const scaledFontSize = fontParams.baseSize * scalingFactor

  return scaledFontSize
}
