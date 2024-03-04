export const setSuffix = (value: number): string => {
  let suffix = ''
  if (value > 10 && value < 20) {
    return suffix
  }

  if (value) {
    switch (value % 10) {
      case 1:
        suffix = '-1'
        break
      case 2:
      case 3:
      case 4:
        suffix = '-2'
        break
    }
  }

  return suffix
}

export const UkrainianLetterByIndex = (index: number): string => {
  const all = 'АБВГҐДЕЄЖЗИІЇЙКЛМНОПРСТУФХЦЧШЩЬЮЯ'
  if (index < 0 || index > all.length || all[index] === undefined) {
    return index + ''
  }

  return all[index]
}
