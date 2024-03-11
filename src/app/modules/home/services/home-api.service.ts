import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { error } from 'protractor';
import { Observable, catchError, delay, map, of, tap } from 'rxjs';

import { ApiService } from 'src/app/core/abstracts/api.service';

@Injectable({
  providedIn: 'root',
})
export abstract class HomeApiService extends ApiService {
  override readonly baseUrl: string =
    'https://rm-united24-rebuild-api-public.demo.ukrohost.com/appeal/check-unique-email';

  private readonly formUrl: string =
    'https://rm-united24-rebuild-api-public.demo.ukrohost.com/appeal/create';

  sendValidatedEmail(data: string): Observable<any> {
    return this.http.post<any>(this.formUrl, { email: data });
  }

  private subscribeWithEmail(data: string): Observable<any> {
    return this.http.post<any>(this.baseUrl, { email: data });
  }

  checkIfEmailExists(data: string): Observable<boolean> {
    return this.subscribeWithEmail(data).pipe(
      delay(50),
      map((value) => value.data.success),
      map((value) => {
        if (value === true) {
          return true;
        } else {
          return false;
        }
      })
    );
  }
}
