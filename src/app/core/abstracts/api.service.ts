import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'

import { LangService } from 'src/app/core/services/lang.service'
import { SsrService } from 'src/app/core/services/ssr.service'

import { environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root',
})
export abstract class ApiService {
  baseUrl = ''

  constructor(protected http: HttpClient, protected ssrService: SsrService, protected langService: LangService) {
    this.baseUrl = ssrService.isBrowser ? environment.publicApi.baseUrl : environment.publicApi.baseUrlSsr || environment.publicApi.baseUrl
  }
}
