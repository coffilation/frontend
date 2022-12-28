const colorToRGBString = (color: Components.Schemas.Color) => {
  return `rgb(${[color.red, color.green, color.blue].join()})`
}

export const gradientToBackground = (
  gradient: Components.Schemas.CollectionGradient | undefined,
) => {
  return gradient
    ? `linear-gradient(${[
        `45deg`,
        colorToRGBString(gradient.startColor),
        colorToRGBString(gradient.endColor),
      ]})`
    : undefined
}
