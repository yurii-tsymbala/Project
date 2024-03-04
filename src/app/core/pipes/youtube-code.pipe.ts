import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'youtubeCode',
})
export class YoutubeCodePipe implements PipeTransform {
  transform(value: string): string | undefined {
    if (value.indexOf('watch?v=') !== -1) {
      return value.match('v=([a-zA-Z0-9-_]+)')?.[1]
    } else {
      return value.split('/').pop()
    }
  }
}
