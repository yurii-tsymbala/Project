import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { environment } from 'src/environments/environment'

const routes: Routes = []
const baseRoutes: Routes = [
  { path: '', loadChildren: () => import('./modules/home/home.module').then((m) => m.HomeModule) },
  { path: 'error', loadChildren: () => import('./modules/error/error.module').then((m) => m.ErrorModule) },
]

environment.availableLangs.forEach((lang, index) => {
  baseRoutes.forEach((route) => {
    routes.push({
      ...route,
      path: `${index ? lang : ''}/${route.path}`.replace(/(^\/|\/$)/g, ''),
    })
  })
})

routes.push({ path: '**', redirectTo: '/error/404' })

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      paramsInheritanceStrategy: 'always',
      scrollPositionRestoration: 'top',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
