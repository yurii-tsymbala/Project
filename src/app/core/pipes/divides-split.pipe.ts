import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'dividesSplit',
})
export class DividesSplitPipe implements PipeTransform {
  transform(value: number, splitLength = 3, minLength = 0): string {
    if (!value) {
      return '0'
    }

    const tmp = value.toString().split('.')
    let valueStr = tmp[0]

    const res = []

    if (tmp.length > 1) {
      for (let i = 1; i < tmp.length; i++) {
        res.push(tmp[i])
      }

      res.push(',')
    }

    if (valueStr.length < minLength) {
      valueStr =
        Array(minLength - valueStr.length)
          .fill('0')
          .join('') + valueStr
    }

    for (let i = valueStr.length; i > 0; i -= splitLength) {
      res.push(valueStr.substring(Math.max(0, i - splitLength), i))
    }

    return res.reverse().join(' ').replace(/ ,/, ',')
  }
}
