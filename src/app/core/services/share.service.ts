import { Injectable } from '@angular/core'
import { Title } from '@angular/platform-browser'

@Injectable({
  providedIn: 'root',
})
export class ShareService {
  constructor(private readonly title: Title) {}

  get shareUrl(): string {
    return `https://${window.location.host}${window.location.pathname}`
  }

  get shareTitle(): string {
    return this.title.getTitle()
  }

  shareTg(params = { shareTitle: this.shareTitle, shareUrl: this.shareUrl }): void {
    window.open('tg://msg_url?url=' + params.shareUrl, '_blank')
  }

  shareTwitter(params = { shareTitle: this.shareTitle, shareUrl: this.shareUrl }): void {
    const twitterLink = `https://twitter.com/intent/tweet?text=${params.shareTitle}&url=${params.shareUrl}`

    window.open(twitterLink, '_blank')
  }

  shareFB(params = { shareTitle: this.shareTitle, shareUrl: this.shareUrl }): void {
    const fbLink = `https://www.facebook.com/sharer/sharer.php?t=${params.shareTitle}&u=${params.shareUrl}`

    window.open(fbLink, '_blank')
  }
}
