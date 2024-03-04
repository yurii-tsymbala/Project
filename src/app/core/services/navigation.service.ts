import { Location } from '@angular/common'
import { Injectable } from '@angular/core'
import { Router } from '@angular/router'

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  constructor(private location: Location, private router: Router) {}

  goBack(defaultUrl = '/'): void {
    const state = <{ navigationId: number }>this.location.getState()

    if (state?.navigationId !== 1) {
      this.location.back()
    } else {
      this.router.navigateByUrl(defaultUrl)
    }
  }
}
