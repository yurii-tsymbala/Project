import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'

import { CoreModule } from 'src/app/core/core.module'

import { ErrorRoutingModule } from 'src/app/modules/error/error-routing.module'
import { Error404Component } from 'src/app/modules/error/pages/404/error404.component'

@NgModule({
  declarations: [Error404Component],
  imports: [CommonModule, ErrorRoutingModule, CoreModule],
})
export class ErrorModule {}
