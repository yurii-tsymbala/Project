import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { Error404Component } from 'src/app/modules/error/pages/404/error404.component'

const routes: Routes = [
  {
    path: '404',
    component: Error404Component,
  },
  {
    path: '**',
    redirectTo: '404',
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ErrorRoutingModule {}
