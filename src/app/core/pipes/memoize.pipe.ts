import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'memoize',
})
export class MemoizePipe<T> implements PipeTransform {
  transform(fn: (...args: unknown[]) => T, ...args: unknown[]): T {
    return fn(...args)
  }
}
