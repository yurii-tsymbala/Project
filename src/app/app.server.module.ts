import { AppComponent } from './app.component'
import { AppModule } from './app.module'

import { HTTP_INTERCEPTORS } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { ServerModule } from '@angular/platform-server'

import { UniversalInterceptor } from 'src/app/core/interceptors/universal.interceptor'

@NgModule({
  imports: [AppModule, ServerModule],
  bootstrap: [AppComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: UniversalInterceptor,
      multi: true,
    },
  ],
})
export class AppServerModule {}
