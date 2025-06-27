
export const useUnits = () => {
  const isClient = typeof window !== 'undefined'
  const override = isClient ? localStorage.getItem('unitOverride') : null

  const locale = isClient ? window.navigator.language : 'en-US'
  const region = locale.split('-')[1] || 'US'
  const imperialCountries = ['US', 'LR', 'MM']
  const systemIsMetric = !imperialCountries.includes(region)

  const isMetric = override === 'metric' ? true
                  : override === 'imperial' ? false
                  : systemIsMetric

  const unitFor = (type: string): string => {
    switch (type) {
      case 'temperature': return isMetric ? '°C' : '°F'
      case 'distance': return isMetric ? 'km' : 'mi'
      case 'weight': return isMetric ? 'kg' : 'lbs'
      case 'speed': return isMetric ? 'km/h' : 'mph'
      default: return ''
    }
  }

  return { region, isMetric, unitFor }
}
