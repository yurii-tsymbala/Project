export const sanitazedHtmlString = (rawHtmlString: string): string => {
  if (!rawHtmlString?.length) {
    return ''
  }

  return rawHtmlString.replace(/<[^>]+>/g, '').replace(/\s+/g, '')
}

export const isElementInViewport = (el: HTMLElement): boolean => {
  let top = el.offsetTop
  let left = el.offsetLeft
  const width = el.offsetWidth
  const height = el.offsetHeight

  while (el.offsetParent) {
    el = <HTMLElement>el.offsetParent
    top += el.offsetTop
    left += el.offsetLeft
  }

  const heightOffset = 100

  return (
    top >= window.scrollY &&
    left >= window.scrollX &&
    top + height <= window.scrollY + window.innerHeight + heightOffset &&
    left + width <= window.scrollX + window.innerWidth
  )
}
