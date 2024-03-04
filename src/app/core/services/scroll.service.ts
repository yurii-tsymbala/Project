import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root',
})
export class ScrollService {
  scrollToFragment(fragment: string): void {
    if (document.getElementById(fragment)) {
      document.getElementById(fragment)?.scrollIntoView({ block: 'start', behavior: 'smooth' })
    }
  }
}
