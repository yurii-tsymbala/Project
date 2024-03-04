import { Injectable } from '@angular/core'

import { ApiService } from 'src/app/core/abstracts/api.service'

@Injectable({
  providedIn: 'root',
})
export abstract class HomeApiService extends ApiService {}
